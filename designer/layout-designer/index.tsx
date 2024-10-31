import GridLayout from './ui/GridLayout'
import GridProvider from './ui/GridProvider.tsx'

const LayoutDesigner = () => {
  return (
    <GridProvider>
      <GridLayout />
    </GridProvider>
  )
}

export default LayoutDesigner
