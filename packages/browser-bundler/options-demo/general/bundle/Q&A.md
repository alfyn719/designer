### Q `import(url)` 的处理方式？
A

主要是 import(`./${var}.js`) 的情况，路径存在变量时不会导入；

### Q Glob-style imports
A

把某些“运行时才能知道具体路径”的 require 或 import() 调用也能提前收集进 bundle 的机制

