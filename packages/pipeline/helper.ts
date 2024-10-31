// 1st library, just sniff mode
import type { DeepAction } from './actions.type'

function isDeep(mode: any): mode is DeepAction {
  try {
    return typeof mode[0][0] === 'string'
  }
  catch (e) {
    return false
  }
}

// ======= debug tools =======

function log(value: any, signature: string = 'Mid_Result'): any {
  console.log(signature, JSON.stringify(value))

  return value
}

function logCurrying(signature: string) {
  return (value: any) =>
    log(value, signature)
}

export {
  isDeep,
  log,
  logCurrying,
}
