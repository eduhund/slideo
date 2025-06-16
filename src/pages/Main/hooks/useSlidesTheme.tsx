import { useContext } from 'react'
import { SlidesContext } from '../../../providers'

export default function useSlidesTheme() {
  const { state } = useContext(SlidesContext)
  const { activeTheme } = state

  const [themeName, themeType] = activeTheme
    ? activeTheme.split('/')
    : ['sobakapav', 'light']

  return { themeName, themeType }
}
