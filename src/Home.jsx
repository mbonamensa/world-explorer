import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import useStore from "./store"
import PopulationDots from "./components/PopulationDots"
import Globe from "./components/Globe"
import { Outlet } from "react-router-dom"
import { Html } from '@react-three/drei'


export default function Home() {

    const data = useStore(state => state.countryData)   

    console.log("Country data loaded:", data)
    
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

    return (
        <>
            <div id="canvas-wrapper">
                <Canvas camera={{position: [0, 0, 3]}}>
                    <OrbitControls onChange={ useStore.setState({setHasUserInteracted: true})}/>
                    {!data ? 
                        (
                            <Html>
                                <div className="loading">Loading...</div>
                            </Html>
                        )  : 
                        (
                            <Globe>
                            {populationDotElements}
                            </Globe>
                        )
                    }
                </Canvas>
                <Outlet />
            </div>
        </>
    )
}