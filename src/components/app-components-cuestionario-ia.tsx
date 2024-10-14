'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const preguntasCuestionario = [
  {
    pregunta: "¿Cuál es el objetivo principal del aprendizaje supervisado?",
    opciones: [
      "Agrupar puntos de datos",
      "Predecir resultados basados en datos de entrada",
      "Reducir la dimensionalidad de los datos",
      "Generar nuevas muestras de datos"
    ],
    respuestaCorrecta: 1
  },
  {
    pregunta: "¿Cuál de las siguientes NO es un tipo de red neuronal?",
    opciones: [
      "Red Neuronal Convolucional (CNN)",
      "Red Neuronal Recurrente (RNN)",
      "Red Neuronal Cuántica (QNN)",
      "Red Neuronal Logarítmica (LNN)"
    ],
    respuestaCorrecta: 3
  },
  {
    pregunta: "¿A qué se refiere el término 'época' en aprendizaje automático?",
    opciones: [
      "Un tipo de arquitectura de red neuronal",
      "La precisión de un modelo",
      "Una pasada completa a través de todo el conjunto de datos de entrenamiento",
      "La tasa de aprendizaje de un algoritmo"
    ],
    respuestaCorrecta: 2
  }
]

export function CuestionarioIa() {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null)
  const [puntuacion, setPuntuacion] = useState(0)
  const [cuestionarioCompletado, setCuestionarioCompletado] = useState(false)

  const manejarRespuesta = () => {
    if (respuestaSeleccionada === preguntasCuestionario[preguntaActual].respuestaCorrecta) {
      setPuntuacion(puntuacion + 1)
    }

    if (preguntaActual < preguntasCuestionario.length - 1) {
      setPreguntaActual(preguntaActual + 1)
      setRespuestaSeleccionada(null)
    } else {
      setCuestionarioCompletado(true)
    }
  }

  if (cuestionarioCompletado) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">¡Cuestionario Completado!</h2>
        <p className="text-xl">Tu puntuación: {puntuacion} de {preguntasCuestionario.length}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{preguntasCuestionario[preguntaActual].pregunta}</h2>
      <RadioGroup 
        onValueChange={(value: string) => setRespuestaSeleccionada(parseInt(value))} 
        value={respuestaSeleccionada?.toString() || undefined}
      >
        {preguntasCuestionario[preguntaActual].opciones.map((opcion, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`opcion-${index}`} />
            <Label htmlFor={`opcion-${index}`}>{opcion}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={manejarRespuesta} disabled={respuestaSeleccionada === null}>
        {preguntaActual < preguntasCuestionario.length - 1 ? "Siguiente Pregunta" : "Finalizar Cuestionario"}
      </Button>
    </div>
  )
}
