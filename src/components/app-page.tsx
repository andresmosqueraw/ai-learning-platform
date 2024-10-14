'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { VisualizadorModeloIa } from '../components/app-components-visualizador-modelo-ia'
import { EntornoCodigoIa } from '../components/app-components-entorno-codigo-ia'
import { CuestionarioIa } from '../components/app-components-cuestionario-ia'

export function Page() {
  const [complejidad, setComplejidad] = useState(50)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Plataforma de Aprendizaje de IA</h1>
      <Card>
        <CardHeader>
          <CardTitle>Explorador Interactivo de Modelos de IA</CardTitle>
          <CardDescription>Visualiza, interactúa y aprende sobre modelos de IA de manera práctica</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visualizador">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="visualizador">Visualizador de Modelos</TabsTrigger>
              <TabsTrigger value="entorno">Entorno de Código</TabsTrigger>
              <TabsTrigger value="cuestionario">Prueba de Conocimientos</TabsTrigger>
            </TabsList>
            <TabsContent value="visualizador">
              <VisualizadorModeloIa complejidad={complejidad} />
            </TabsContent>
            <TabsContent value="entorno">
              <EntornoCodigoIa />
            </TabsContent>
            <TabsContent value="cuestionario">
              <CuestionarioIa />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <p className="mb-2">Ajustar Complejidad del Modelo</p>
            <Slider
              value={[complejidad]}
              onValueChange={(value) => setComplejidad(value[0])}
              max={100}
              step={1}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
