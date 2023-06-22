import { Route, Routes } from "react-router-dom"
import WidgetTemplates from "./pages/widgetTemplates"
import WidgetPiplene from "./pages/widgetPiplene"

function App() {
  return (
    <Routes>
      <Route path="/" element={<WidgetTemplates />} />
      <Route path="/pipline" element={<WidgetPiplene />} />
    </Routes>
  )
}

export default App
