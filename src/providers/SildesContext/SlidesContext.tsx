import React, { createContext, useReducer } from 'react'
import { parseTextToSlides } from '../../utils/textParser'
import { Op } from 'quill'

type SlidesContextType = {
  content: Op[]
  slides: any[]
  selectedTemplates: any[]
  activeSlide: number | null
  activeTheme?: string
}

type slidesReducerAction = {
  type: string
  payload: any
}

const STORAGE_KEY = 'slideo-content'
const SELECTED_TEMPLATES_KEY = 'selected-templates'
const ACTIVE_SLIDE_KEY = 'active-slide'
const ACTIVE_THEME_KEY = 'active-theme'

const content = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

const slides = parseTextToSlides(content)
const selectedTemplates = JSON.parse(
  localStorage.getItem(SELECTED_TEMPLATES_KEY) || '[]'
)
const richedSlides = slides.map((slide: any, i: number) => {
  const selectedTemplate = selectedTemplates[i] || null
  return {
    ...slide,
    selectedTemplate,
  }
})

const initialState = {
  content: content,
  slides: richedSlides,
  selectedTemplates: selectedTemplates,
  activeSlide: Number(localStorage.getItem(ACTIVE_SLIDE_KEY)) || 1,
  activeTheme: localStorage.getItem(ACTIVE_THEME_KEY) || 'sobakapav/light',
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      /*
      const parsedSlides = parseTextToSlides(payload)

      const selectedTemplates = state.selectedTemplates
      const richedSlides = parsedSlides.map((slide: any, i: number) => {
        const selectedTemplate = selectedTemplates[i] || null
        return {
          ...slide,
          selectedTemplate,
        }
      })
        */
      return { ...state, content: payload } //slides: richedSlides }
    case 'CHANGE_ACTIVE_SLIDE':
      localStorage.setItem(ACTIVE_SLIDE_KEY, payload)
      return { ...state, activeSlide: payload }
    case 'UPDATE_SLIDE':
      const { slides, activeSlide } = state
      const updatedSlides = slides.map((slide, i) =>
        i + 1 === activeSlide ? { ...slide, ...payload } : slide
      )
      const newSelectedTemplates = new Array(slides.length).fill(null)
      newSelectedTemplates.splice(
        0,
        state.selectedTemplates.length,
        ...state.selectedTemplates
      )
      if (
        state.activeSlide !== null &&
        state.activeSlide - 1 < newSelectedTemplates.length
      ) {
        newSelectedTemplates[state.activeSlide - 1] = payload.selectedTemplate
      }
      localStorage.setItem(
        SELECTED_TEMPLATES_KEY,
        JSON.stringify(newSelectedTemplates)
      )
      return {
        ...state,
        slides: updatedSlides,
        selectedTemplates: newSelectedTemplates,
      }
    case 'SET_THEME':
      localStorage.setItem(ACTIVE_THEME_KEY, payload)
      return { ...state, activeTheme: payload }
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
