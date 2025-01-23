### EFile

1. 文件格式分类，扩展名，浏览器兼容性最优（✓）：
   1. 音频：`mp3，mpeg3，wav，aac，m4a`；✓
   2. 视频：`mp4，m4v`；✓
   3. 图片：`jpg，jpeg，png，gif，bmp，webp，svg`；✓
   4. 字体：`ttf，otf，woff，woff2`；✓
   5. 二进制文件：`wasm`；✓
   6. 代码文件：`html，css，less，js，ts，jsx，tsx，json，md`；✓
   7. 其它：不处理，归档到无法解析的文件夹中，如 pdf；
2. 代码文件，需要保存内容，支持编辑；
3. 媒体文件，把文件整体放到内存中，保存 objectURL 地址；

### EComponent

cdn 包的引用；
