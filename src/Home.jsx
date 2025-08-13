import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import useStore from "./store"
import PopulationDots from "./components/PopulationDots"
import { useEffect } from "react"
import Globe from "./components/Globe"
import { Outlet } from "react-router-dom"

export default function Home() {

    const data = useStore.getState().countryData

    const populationDotElements = data && data.map(item => {

        return <PopulationDots 
            key={item.id}
            country={item.name}
            population={item.population}
            latitude={item.latitude}
            longitude={item.longitude}
            flagCode={item.code}
        />
    })

    useEffect(() => {
        function handleMousePosition(event) {
        const canvas = document.getElementById("canvas-wrapper")
        const rect = canvas.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width * 2 - 1
        const y = -(event.clientY - rect.top) / rect.height * 2 + 1

        // update the store with the mouse position
        useStore.setState({ mousePosition: { x, y } })
        }

    }, [])



    return (
        <>
            <div id="canvas-wrapper">
                <Canvas camera={{position: [0, 0, 3]}}>
                    <OrbitControls onChange={ useStore.setState({setHasUserInteracted: true})}/>
                    <Globe>
                        {populationDotElements}
                    </Globe>
                </Canvas>
                <Outlet />
            </div>
        </>
    )
}