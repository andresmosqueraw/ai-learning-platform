'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface Nodo {
  posicion: [number, number, number]
}

interface Conexion {
  inicio: number
  fin: number
}

interface VisualizadorModeloIaProps {
  complejidad: number
}

export function VisualizadorModeloIa({ complejidad }: VisualizadorModeloIaProps) {
  const [nodos, setNodos] = useState<Nodo[]>([])
  const [conexiones, setConexiones] = useState<Conexion[]>([])

  useEffect(() => {
    // Generar nodos y conexiones basados en la complejidad
    const nuevosNodos: Nodo[] = []
    const nuevasConexiones: Conexion[] = []
    const cantidadCapas = Math.floor(complejidad / 20) + 2
    const nodosPorCapa = Math.floor(complejidad / 10) + 3

    for (let capa = 0; capa < cantidadCapas; capa++) {
      for (let nodo = 0; nodo < nodosPorCapa; nodo++) {
        nuevosNodos.push({
          posicion: [
            (capa - (cantidadCapas - 1) / 2) * 2,
            (nodo - (nodosPorCapa - 1) / 2) * 2,
            0
          ]
        })

        if (capa < cantidadCapas - 1) {
          for (let siguienteNodo = 0; siguienteNodo < nodosPorCapa; siguienteNodo++) {
            nuevasConexiones.push({
              inicio: capa * nodosPorCapa + nodo,
              fin: (capa + 1) * nodosPorCapa + siguienteNodo
            })
          }
        }
      }
    }

    setNodos(nuevosNodos)
    setConexiones(nuevasConexiones)
  }, [complejidad])

  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        {nodos.map((nodo, index) => (
          <Sphere key={index} args={[0.2, 16, 16]} position={nodo.posicion}>
            <meshStandardMaterial color="#8b5cf6" />
          </Sphere>
        ))}
        {conexiones.map((conexion, index) => (
          <line key={index}>
            <bufferGeometry attach="geometry" {...obtenerGeometriaLinea(nodos[conexion.inicio].posicion, nodos[conexion.fin].posicion)} />
            <lineBasicMaterial attach="material" color="#9333ea" linewidth={1} />
          </line>
        ))}
      </Canvas>
    </div>
  )
}

function obtenerGeometriaLinea(inicio: [number, number, number], fin: [number, number, number]): THREE.BufferGeometry {
  const puntos = []
  puntos.push(new THREE.Vector3(...inicio))
  puntos.push(new THREE.Vector3(...fin))
  return new THREE.BufferGeometry().setFromPoints(puntos)
}
