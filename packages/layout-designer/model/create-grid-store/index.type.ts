import createGridStore from "./index.ts";

type GridStore = ReturnType<typeof createGridStore>;

/**
 * 容器属性：
 * 1.display: grid;
 * 2.gutter: column-gap, row-gap; -- 表单
 * 3.explicit:
 *  grid-template-rows 自增表单
 *  grid-template-columns 自增表单
 *  grid-template-areas 根据 grid-template-rows 和 grid-template-columns 生成表单
 *
 * 元素属性：
 * 1.grid-area:
 *
 * 使用命名的网格区域方案
 *
 * 单位：fr, px, %, em, auto, min-content, max-content, minmax()
 */

interface GridProps {
  rowGap: string;
  columnGap: string;
}

interface GridState extends GridProps {}

export type { GridProps, GridState, GridStore };
