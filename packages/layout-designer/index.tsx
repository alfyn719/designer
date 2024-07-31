import styles from "./index.module.less";

// 不是用 repeat()
type Row = string;

type Column = string;

// 二维数组，
type Area = string[];

// 值可以是组件索引，可以是组件，渲染组件会优先索引该表，如果不存在，使用默认 div 元素渲染
interface Binding {
  [K: string]: string;
}

interface GridLayout {
  rows: Row[];
  columns: Column[];
  areas: Area[];
  binding: Binding;
}

/**
 * ✔ 布局
 * ? 表单
 */

const LayoutDesigner = () => {
  return (
    <div className={styles.gridLayout}>
      <div className={styles.form}>
        <p>Gutter</p>
        <p>Rows</p>
        <p>Columns</p>
        <p>Areas</p>
      </div>
      <div className={styles.preview}>preview</div>
    </div>
  );
};

export default LayoutDesigner;
