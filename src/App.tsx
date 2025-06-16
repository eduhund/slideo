import { Route, Routes } from 'react-router-dom'
import './styles/main.scss'
import Main from './pages/Main/editorConcepts/Concept0/Concept0'
import { SlidesProvider } from './providers'
import Concept1 from './pages/Main/editorConcepts/Concept1/Concept1'

const App = () => {
  return (
    <SlidesProvider>
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/c1'} element={<Concept1 />} />
      </Routes>
    </SlidesProvider>
  )
}

export default App
