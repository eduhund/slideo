import React, { createContext, useReducer } from 'react'

type SlidesContextType = {
  content: string
  slides: any[]
  activeSlide: number
}

type slidesReducerAction = {
  type: string
  payload: any
}

const STORAGE_KEY = 'quill-editor-content'

const initialState = {
  content: localStorage.getItem(STORAGE_KEY) || '',
  slides: [],
  activeSlide: 0,
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
      return { ...state, content: payload }
    case 'CHANGE_ACTIVE_SLIDE':
      return { ...state, activeSlide: payload }
    case 'CHANGE_SELECTED_SLIDES':
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
