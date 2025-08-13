import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { TextureLoader } from "three"
import useStore from "../store"
import { useEffect, useRef } from "react"

export default function Globe({children}) { // children added so that dots can rotate with the globe


    const earthTexture = useLoader(TextureLoader, "earthmap1k.jpg")

    const globeRef = useRef()

    const { gl } = useThree()

    const setHasUserInteracted = useStore(state => state.setHasUserInteracted)
    const hasUserInteracted = useStore(state => state.hasUserInteracted)


    useFrame(() => {
        if(!hasUserInteracted && globeRef.current) {
            globeRef.current.rotation.y += 0.001; // rotate the globe slowly
        }

    })

    // stop the globe from rotating when the user interacts with it
    useEffect(() => {

    const stopAniamation = () => {
        useStore.setState({ hasUserInteracted: true })
    }

    gl.domElement.addEventListener("click", stopAniamation)
    gl.domElement.addEventListener("touchstart", stopAniamation)

    return () => {
        gl.domElement.removeEventListener("click", stopAniamation)
        gl.domElement.removeEventListener("touchstart", stopAniamation)
    }
    }, [gl])

    return (
        <>      
            <mesh ref={globeRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial map={earthTexture} />
                {children}
            </mesh>
        </>
    )
}