import GridLayout from './ui/GridLayout.tsx'
import GridProvider from './ui/GridProvider.tsx'

const LayoutDesigner = () => {
  return (
    <GridProvider>
      <GridLayout />
    </GridProvider>
  )
}

export default LayoutDesigner
