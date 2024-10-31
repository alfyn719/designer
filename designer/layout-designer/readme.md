### 功能设计

- [x] 功能设计 20240806
- [ ] 界面设计
- [ ] 配置项结构设计
- [ ] 业务模型构建
- [ ] UI 模型编写
- [ ] 总结和文档输出

### 功能设计 -20240812

0808 设计的功能删除
删除轨道交互，仅用于交互提示
切分交互放到 tab 上


### 功能设计 -20240808

Grid layout features：

1. grid's **track** design：counts, width / height；
2. grid's **gutter** design: row gap, column gap;
3. grid's **area** design: use grid lines to split;
4. grid's **alignment** design: justify & align;
5. user helper;

Grid layout UI/UX
类似 excel，轨道有一个标签可以选中；横纵轨道交叉可以形成区域；区域和轨道可以根据焦点上下换层；
gutter = 0 实线，gutter > 0 虚线（2条）；

Ideas：

1. grid background 根据 grid-template-rows/columns 渲染网格单元
2. grid track 根据 grid background 获取的位置渲染轨道
3. grid area 渲染命名的区域

### unit -> area & stack for infinite layout

### 界面和功能设计 命名网格区域 -> 编号的网格线 -20240805

~~命名的网格区域缺点：无法支持多网格区域共用一个网格单元的场景，即网格区域堆叠；✘ 这么理解是错误的！
“网格单元” 同名可以快速合并 “网格单元” 成 “网格区域”，但是同名会影响 grid-area 取用，无法达到堆叠区域的效果；~~

使用网格线划分网格区域，诀窍：左上角横竖线，右下角横竖线，即上边-左边-底边-右边；

可编辑属性：

1. row-gap 行间距
2. column-gap 列间距

3. grid-template-rows 行
4. grid-template-columns 列
5. ~~grid-template-areas 命名区域~~

6. grid-row-start / grid-column-start / grid-row-end / grid-column-end

7. justify-content & align-content 容器对齐
8. justify-items & align-items 区域对齐
9. justify-self & align-self 元素对齐

#### repeat(repeatCount, tracks)

#### track 单位：经常使用的：px，%，em

#### track 单位：fr -fraction 分数

参考文章：[An Introduction to the `fr` CSS unit](https://css-tricks.com/introduction-fr-css-unit/)
fr 相比于 px 或 %，会自动计算 gutter，不会溢出；
fr 是描述如何分配剩余空间，连续或不连续的 fr 会一起分配剩余空间；

#### track 单位：auto

轨道大小设置为 auto，轨道会根据自身内容扩展；

#### track 单位：min-content / max-content

内容的最小/大宽度或最小/大高度，如果是文字会换行成最长的那个单词

#### track 单位：minmax(200, 1fr)

如果最大尺寸小于最小尺寸，最大尺寸就会被忽略

问题？：

1. 如何做嵌套：提供组件，属性是配置项，子组件作为 children；先不添加容器，在 children 上操作；
2. 如何和 Flexbox 结合使用：需要添加 Flexbox 容器，children 作为 flex element
3. 如何与组件结合，组件作为 children

### 功能点设计：Grids 概念的完全透出（过度设计） -> 满足功能即可 -20240724

#### 秀肌肉，但不好用：

知识点转成可视化的操作：网格容器、网格元素、网格线、网格轨道、网格单元、网格区域、显示/隐式网格、网格线编号、命名的网格线、命名的网格区域、网格值的单位、布局算法、网格间距；

构建模型用于存储数据和转换；

根据应用场景限制 UI 层的功能透出：css 导出，lowcode 平台的布局工具；
根据用户能力限制 UI 层的功能透出：显示网格 + 命名的网格区域 -> 隐式网格 -> 全功能释放(???)；

#### 根据应用场景，仅使用 Grids 的部分概念，满足需求即可，功能如下：

1. lowcode 布局，需要应用在拖拽进来的元素上；
2. 使用命名的网格区域概念；
3. 不使用简写属性；

### flex designer -> layout designer with grid -20240718

问题：使用绝对定位设计的大屏，不同比例的屏幕适配上存在缺陷。寻找一种能够可视化配置 flex 布局的方案。

调研后 grid 可能比 flex 更适合布局，flex 和 grid 的区别：

1. 无需嵌套元素：flex 的元素嵌套对可视化布局以及内部的内容渲染增加了难度；
2. Flexbox 本质是一维的，grid 是二维的；
3. Flexbox 是以内容为切入点由内向外工作的，而网格是以布局为切入点从外向内工作的；
