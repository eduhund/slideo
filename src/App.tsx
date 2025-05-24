import { Route, Routes } from 'react-router-dom'
import './styles/main.scss'
import Main from './pages/Main/Main'
import { SlidesProvider } from './providers'

const App = () => {
  return (
    <SlidesProvider>
      <Routes>
        <Route path={'/'} element={<Main />} />
      </Routes>
    </SlidesProvider>
  )
}

export default App
