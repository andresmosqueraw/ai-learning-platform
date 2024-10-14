'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function EntornoCodigoIa() {
  const [codigo, setCodigo] = useState('')
  const [salida, setSalida] = useState('')

  const ejecutarCodigo = async () => {
    try {
      // Aquí es donde integraríamos con una API de IA para ejecutar el código
      const resultado = await simularEjecucionCodigo(codigo)
      setSalida(resultado)
    } catch (error) {
      if (error instanceof Error) {
        setSalida(`Error: ${error.message}`)
      } else {
        setSalida('Ocurrió un error desconocido')
      }
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Escribe tu código Python aquí..."
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        rows={10}
      />
      <Button onClick={ejecutarCodigo}>Ejecutar Código</Button>
      <div className="bg-zinc-100 p-4 rounded-md">
        <h3 className="font-bold mb-2">Salida:</h3>
        <pre>{salida}</pre>
      </div>
    </div>
  )
}

async function simularEjecucionCodigo(codigo: string): Promise<string> {
  // Aquí simularemos la ejecución del código
  // En una implementación real, enviaríamos el código a una API de IA para su ejecución
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simular retraso
  return `Salida simulada para:\n\n${codigo}\n\nEste es un ejemplo de cómo se integraría con una API de IA para ejecutar código.`
}
