### Q `bundle: true` 和 `format: 'iife'` 它们互相影响吗？
A

`bundle` 是控制是否把导入的依赖项内联到文件本身；
`'iife'` 它会把所有模块打包成一个 立即执行函数（IIFE）。

### Q `'iife'` 如何导出模块？
A

需要配合 `globalName` 使用，并且可以使用 `'a.b.c.x'` 它会层层设置。
若是配置了，打包产物会有一个 `__toCommonJS` 函数，用于导出 a。