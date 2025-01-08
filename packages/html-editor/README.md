### 介绍

基于 cheerio 实现，html text 修改工具。

内部逻辑通过伪代码描述如下：

```text
const $html = cheerio.load(rawHtml);

executors.forEach(executor => executor($html))

return $html.html()
```

具体如何修改的逻辑放在 executor 中，需要应用方开发后作为参数传入。

### `editHtml` 示例一（伪代码）：

```typescript
import {
  editHtml,
  executorPrefixResource,
  executorPublicPath
} from '@alfyn/html-editor'

// 返回修改后的 html
const html = editHtml([executorPublicPath, executorPrefixResource], `rawHtml`)
```

### `editHtmlWithPath` 示例一（伪代码）：

```typescript
import {
  editHtmlWithPath,
  executorPrefixResource,
  executorPublicPath
} from '@alfyn/html-editor'

// 修改后的 html 会放在内存地址中
const objectURL = editHtmlWithPath([executorPublicPath, executorPrefixResource], `entry`)
```

### 其他

介绍下内置的执行器：

1. executorPrefixResource：给 link 和 script 标签的地址（仅相对路径）加前缀；
2. executorPublicPath：插入一个 script 标签（head 中、最后），覆盖 window.publicPath 的设置;
