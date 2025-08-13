import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useEffect, useRef } from "react"

// libraries to load with GMap API
// moved outside of the component to avoid reloading on every render
// this is necessary for the AdvancedMarkerElement to work
const libraries= ["marker"]

export default function Map({lat, lng, zoom = 4}) {

    // use as center of the country
    const center = { lat, lng }

    // get api key from .env
    const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    // loads the GMap javascript software dev kit using api key
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apikey,
        libraries
    })

    const marpRef = useRef(null)

    useEffect(() => {
        if (isLoaded && marpRef.current) {
            (async () => {
                const { AdvancedMarkerElement} = await google.maps.importLibrary("marker")
                new AdvancedMarkerElement({
                    map: marpRef.current,
                    position: center,
                    title: "Country Center",
                })
            })
        }
    }, [isLoaded, center])


    if (!isLoaded) return <div>Loading...</div>
    return (

        <GoogleMap
            center={center}
            zoom={zoom}
            mapContainerClassName="map-container"
            onLoad={(map) => (marpRef.current = map)}
        />

    )
}