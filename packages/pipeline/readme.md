### 介绍

有助于实践函数式编程范式的工具函数。

核心思想是 haoel 的课件示例，代码功能如下：

```javascript
const fnA = x => x + 1
const fnB = x => x + 2
const fnC = x => x + 3

const fns = [fnA, fnB, fnC]

const init = 1

const result = fns.reduce((acc, fn) => fn(acc), init)

console.log('result is:', result)
```

在上面的基础上增加：

1. 支持下钻；
2. 支持异步；
3. 连续异步下钻时，使用 `Promise.allSettled + map` 做了并行执行；
4. 做了柯里化，方便在 `control` 代码中使用;

### `pipeline` 示例一：

```javascript
import pipeline from '@designer/pipeline'

const fnA = x => x + 1
const fnB = x => x + 2
const fnC = x => x + 3

const init = 1

const result = pipeline([fnC, fnB, fnA], init)

console.log('result is:', result)
```

### `pipeline` 示例二：下钻（异步语法相同）

```javascript
import pipeline /* , { asyncPipeline } */ from '@designer/pipeline'

const fnA = x => x + 1
const fnB = x => x + 2
const fnC = x => x + 3
const fnD = (x) => {
  x.name = x.name.toUpperCase()

  return x
}

const init = {
  money: 1,
  age: 17,
  height: 177,
  name: '',
}

const result = pipeline(
  [
    fnD,
    [['money'], [fnB, fnA]],
    [['age'], [fnC, fnB]],
    [['height'], [fnC, fnB, fnA]]
  ],
  init
)

console.log('result is:', result)
```
