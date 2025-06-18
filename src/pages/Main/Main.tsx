import React, { useState } from 'react'
import { Segmented } from 'antd'
import Concept0 from './editorConcepts/Concept0/Concept0'
import Concept1 from './editorConcepts/Concept1/Concept1'
import Concept2 from './editorConcepts/Concept2/Concept2'

import '../../themes/sobakapav.scss'
import useSlidesTheme from './hooks/useSlidesTheme'

import './Main.scss'

export default function Main() {
  const [activeConcept, setActiveConcept] = useState(
    Number(localStorage.getItem('active-concept') || '0')
  )
  const { themeName, themeType } = useSlidesTheme()

  const concepts = [
    { id: 0, name: 'Concept 0', component: Concept0 },
    { id: 1, name: 'Concept 1', component: Concept1 },
    { id: 2, name: 'Concept 2', component: Concept2 },
  ]

  const ConceptComponent = concepts[activeConcept]?.component || Concept0

  return (
    <main
      id="home"
      className={`${themeName} _${themeType} _concept-${activeConcept}`}
    >
      <header className="editor-header">
        <h1>Slideo</h1>
        <div className="concepts-selector">
          <span>Switch UI concepts →</span>
          <Segmented
            options={concepts.map((c) => c.name)}
            value={concepts[activeConcept]?.name}
            onChange={(conceptName) => {
              const conceptIndex = concepts.findIndex(
                (c) => c.name === conceptName
              )
              setActiveConcept(conceptIndex)
              localStorage.setItem('active-concept', String(conceptIndex))
            }}
          />
        </div>
      </header>
      <ConceptComponent />
    </main>
  )
}
