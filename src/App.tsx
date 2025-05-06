import { Route, Routes } from 'react-router-dom'
import './styles/main.scss'
import Main from './pages/Main/Main'

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Main />} />
    </Routes>
  )
}

export default App
