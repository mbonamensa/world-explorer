import { useRef, useEffect, useState } from "react"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { useNavigate } from "react-router-dom"
import useStore from "../store"
import { Html } from '@react-three/drei'


export function DotPlane({ latitude, longitude, country, flagCode }) {
    const meshRef = useRef()
  	const texture = useLoader(TextureLoader, "/white-dot.png")

    const navigate = useNavigate()

    const setHoveredCountry = useStore(state => state.setHoveredCountry)   
    const hoveredCountry = useStore(state => state.hoveredCountry) 

    function showModal() {
      const countryName = country.replaceAll(" ", "-").toLowerCase()
      console.log("Showing country details")
      navigate(`/${countryName}`)
    }

	useEffect(() => {
		// point the plane away from the center of the globe
		meshRef.current.lookAt(0, 0, 0)
		meshRef.current.rotateY(Math.PI) // flip to face outward
	}, [])

    // change cursor to pointer when hovering over a country
    useEffect(() => {
        document.body.style.cursor = hoveredCountry ? "pointer" : "default"
    }, [hoveredCountry])

  return (
    <>
    <mesh 
		ref={meshRef} 
		position={[0, 0, 1.01]} 
		onClick={showModal} 
		onPointerOver={
            () => { 
		        setHoveredCountry(country)
            }
        } 
        onPointerOut={
            () => {
                setHoveredCountry(null)
            }
        }
	>
      	<planeGeometry args={[0.03, 0.03]} />
		<meshBasicMaterial
			map={texture}
			transparent
            opacity={1}
			depthWrite={false}
			color="green"
      	/>

        {hoveredCountry === country && (
            <Html distanceFactor={2} position={[0, 0.09, 0]} transform={false}>
                <div
                    style={{
                        background: "white",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        gap: "6px",
                        pointerEvents: "none", // prevent tooltip from intercepting pointer
                        width: "max-content",
                    }}
                >
                    {flagCode && (
                        <img
                            src={`https://flagcdn.com/w40/${flagCode.toLowerCase()}.png`}
                            width="20"
                            height="15"
                            alt={country}
                        />
                    )}
                    <span>{country}</span>
                </div>
            </Html>
        )}
    </mesh>
    </>
  )
}
