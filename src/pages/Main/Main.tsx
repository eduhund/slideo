import React from 'react'
import { Segmented } from 'antd'
import Concept0 from './editorConcepts/Concept0/Concept0'
import Concept1 from './editorConcepts/Concept1/Concept1'

import '../../themes/sobakapav.scss'
import useSlidesTheme from './hooks/useSlidesTheme'

export default function Main() {
  const [activeContept, setActiveConcept] = React.useState(0)
  const { themeName, themeType } = useSlidesTheme()

  const concepts = [
    { id: 0, name: 'Concept 0', component: Concept0 },
    { id: 1, name: 'Concept 1', component: Concept1 },
  ]

  const ConceptComponent =
    concepts.find((c) => c.id === activeContept)?.component || Concept0

  const handleConceptChange = (conceptName: string) => {
    const conceptIndex = concepts.findIndex((c) => c.name === conceptName)
    if (conceptIndex !== -1) {
      setActiveConcept(concepts[conceptIndex].id)
    }
  }

  return (
    <main id="home" className={`${themeName} _${themeType}`}>
      <div className="concepts">
        <Segmented<string>
          options={concepts.map((c) => c.name)}
          onChange={handleConceptChange}
        />
      </div>
      <ConceptComponent />
    </main>
  )
}
