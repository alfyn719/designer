### 文本处理器

使用 AST 进行标识符替换：

1. 全局依赖替换 `import { useState } from 'react' > const { useState } = React`；
2. 运行时依赖引入，示例同上；
3. 运行时 ESM 引入 `import { Button } from 'antd' > import { Button } from 'blob:hash'`

遇到的问题收集：

1. acorn 默认只能解析 js，所以 jsx、ts 和 tsx 使用 esbuild 先做一次 transform 为 js；
