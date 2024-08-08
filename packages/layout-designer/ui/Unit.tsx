import useGridContext from '../hooks/use-grid-context.ts'

const Unit = () => {
  const gridTemplateRows = useGridContext(state => state.gridTemplateRows)
  const gridTemplateColumns = useGridContext(
    state => state.gridTemplateColumns,
  )

  const rowCount = gridTemplateRows.length
  const columnCount = gridTemplateColumns.length

  const unitCount = rowCount * columnCount

  return (
    <div>
      {new Array(unitCount).fill(0).map((_, i) => (
        <div key={i} />
      ))}
    </div>
  )
}

export default Unit
