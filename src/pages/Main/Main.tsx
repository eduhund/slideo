import React, { useState } from 'react'
import { Segmented } from 'antd'
import Concept0 from './editorConcepts/Concept0/Concept0'
import Concept1 from './editorConcepts/Concept1/Concept1'

import '../../themes/sobakapav.scss'
import useSlidesTheme from './hooks/useSlidesTheme'

import './Main.scss'

export default function Main() {
  const [activeConcept, setActiveConcept] = useState(0)
  const { themeName, themeType } = useSlidesTheme()

  const concepts = [
    { id: 0, name: 'Concept 0', component: Concept0 },
    { id: 1, name: 'Concept 1', component: Concept1 },
  ]

  const ConceptComponent = concepts[activeConcept]?.component || Concept0

  return (
    <main id="home" className={`${themeName} _${themeType}`}>
      <div className="concepts-selector">
        <Segmented
          options={concepts.map((c) => c.name)}
          onChange={(conceptName) =>
            setActiveConcept(concepts.findIndex((c) => c.name === conceptName))
          }
        />
      </div>
      <ConceptComponent />
    </main>
  )
}
