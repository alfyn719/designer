Browser bundler powered by esbuild

- [ ] 需要修改文件读取方式，符合浏览器端的模式；
- [ ] 现有的插件系统是基于 Node 环境的，确认是否能在浏览器端使用；
- [ ] 标准化数据结构；
- [ ] 以插件的形式进行打包功能注入；

### Q&A

A1 浏览器没有文件系统如何使用 esbuild-wasm 打包

Q1 在浏览器里 esbuild-wasm 之所以也能跑完整的 build()，原因是 「文件系统」这件事由你自己用插件虚拟出来。

整合 npm 模块系统