import { useContext } from 'react'
import { SlidesContext } from '../../providers'

export default function ThemeSelector() {
  const { state, dispatch } = useContext(SlidesContext)
  const themes = [
    { label: 'Sobakapav / Light', value: 'sobakapav/light' },
    { label: 'Sobakapav / Dark', value: 'sobakapav/dark' },
  ]
  const { activeTheme } = state
  const handleThemeChange = (newTheme: string) => {
    dispatch({ type: 'SET_THEME', payload: newTheme })
  }

  return (
    <div className="themeSelector">
      <label htmlFor="themeSelector">Theme:</label>
      <select
        id="themeSelector"
        value={activeTheme}
        onChange={(e) => handleThemeChange(e.target.value)}
      >
        {themes.map((theme) => (
          <option key={theme.value} value={theme.value}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  )
}
