import type { InitializeOptions } from 'esbuild'

import * as esbuild from 'esbuild-wasm'
import {
  createActor,
  createMachine,
  fromPromise,
  waitFor,
} from 'xstate'

/* ----------------------------------------------------------
 * 配置与类型
 * -------------------------------------------------------- */

const DEFAULT_TIMEOUT = 5_000 // ms

const defaultOptions: InitializeOptions = {
  wasmURL: 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.25.5/esbuild.wasm',
  worker: true,
}

/* ----------------------------------------------------------
 * 副作用 actor
 * -------------------------------------------------------- */

// 这里的第二个泛型参数就是 input 的类型
const startEsbuild = fromPromise<void, InitializeOptions>(
  async ({ input }) => {
    await esbuild.initialize(input)
  },
)

const stopEsbuild = fromPromise<void>(
  async () => {
    await esbuild.stop()
  },
)

/* ----------------------------------------------------------
 * 状态机
 * -------------------------------------------------------- */

const esbuildMachine = createMachine(
  {
    id: 'esbuild',
    context: { options: defaultOptions },
    initial: 'idle',
    states: {
      idle: {
        on: { START: { target: 'starting', actions: 'assignOptions' } },
      },
      starting: {
        invoke: {
          src: startEsbuild,
          input: ({ context }) => context.options,
          onDone: 'running',
          onError: { target: 'idle', actions: 'reportError' },
        },
      },
      running: {
        on: { STOP: 'stopping' },
      },
      stopping: {
        invoke: {
          src: stopEsbuild,
          onDone: 'idle',
          onError: { target: 'running', actions: 'reportError' },
        },
      },
    },

  },
  {
    actions: {
      assignOptions: ({ context, event }) => {
        if (event.type === 'START' && event.input) {
          context.options = event.input
        }
        else {
          // Not necessary for logic, just to improve readability
        }
      },
      reportError: ({ event }) => {
        console.error('[esbuild-service]', event.error)
      },
    },
  },
)

const service = createActor(esbuildMachine).start()

/* ----------------------------------------------------------
 * helper API
 * -------------------------------------------------------- */

function awaitState(
  target: string,
  timeout = DEFAULT_TIMEOUT,
) {
  return waitFor(
    service,
    snap_ => snap_.matches(target),
    { timeout },
  )
}

/* ----------------------------------------------------------
 * 公共 API
 * -------------------------------------------------------- */

export async function boot(options: InitializeOptions = defaultOptions) {
  const snap = service.getSnapshot()

  switch (true) {
    case snap.matches('idle'):
      service.send({ type: 'START', input: options })
      await awaitState('running')
      return '(boot) in idle fork, is running'

    case snap.matches('starting'):
      await awaitState('running')
      return '(boot) in starting fork, is running'

    case snap.matches('running'):
      return '(boot) in running fork, is running'

    case snap.matches('stopping'):
      await awaitState('stopping')
      service.send({ type: 'START', input: options })
      await awaitState('running')
      return '(boot) in stopping fork, is running'
  }
}

async function shutdown() {
  const snap = service.getSnapshot()

  switch (true) {
    case snap.matches('idle'):
      return '(shutdown) in idle fork, is idle'

    case snap.matches('starting'):
      await awaitState('running')
      service.send({ type: 'STOP' })
      await awaitState('idle')
      return '(shutdown) in starting fork, is idle'

    case snap.matches('running'):
      service.send({ type: 'STOP' })
      await awaitState('idle')
      return '(shutdown) in running fork, is idle'

    case snap.matches('stopping'):
      await awaitState('idle')
      return '(shutdown) in stopping fork, is idle'
  }
}

function isRunning() {
  return service.getSnapshot().matches('running')
}

export default boot

export { isRunning, shutdown }
