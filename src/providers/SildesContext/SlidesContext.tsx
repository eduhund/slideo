import React, { createContext, useReducer } from 'react'
import { parseTextToSlides } from '../../utils/textParser'

type SlidesContextType = {
  content: string
  slides: any[]
  activeSlide: number | null
}

type slidesReducerAction = {
  type: string
  payload: any
}

const STORAGE_KEY = 'quill-editor-content'

const content = localStorage.getItem(STORAGE_KEY) || ''

const initialState = {
  content: content,
  slides: parseTextToSlides(content),
  activeSlide: null,
}

export const SlidesContext = createContext<{
  state: SlidesContextType
  dispatch: React.Dispatch<slidesReducerAction>
}>({
  state: initialState,
  dispatch: () => null,
})

function slidesReducer(
  state: SlidesContextType,
  { type, payload }: slidesReducerAction
) {
  switch (type) {
    case 'UPDATE_CONTENT':
      const parsedSlides = parseTextToSlides(payload)
      return { ...state, content: payload, slides: parsedSlides }
    case 'CHANGE_ACTIVE_SLIDE':
      return { ...state, activeSlide: payload }
    case 'CHANGE_SLIDES':
      const { slides, activeSlide } = state
      const updatedSlides = slides.map((slide, i) =>
        i === activeSlide ? { ...slide, ...payload } : slide
      )
      return { ...state, slides: updatedSlides }
    default:
      return state
  }
}

export function SlidesProvider({ children }: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(slidesReducer, initialState)

  return (
    <SlidesContext.Provider value={{ state, dispatch }}>
      {children}
    </SlidesContext.Provider>
  )
}
