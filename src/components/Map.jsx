import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useRef } from "react"

export default function Map({lat, lng, zoom = 4}) {

    // use as center of the country
    const center = { lat, lng }

    // get api key from .env
    const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    // loads the GMap javascript software dev kit using api key
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apikey,
    })

    const mapRef = useRef(null)


    if (!isLoaded) return <div>Loading...</div>
    return (

        <GoogleMap
            center={center}
            zoom={zoom}
            mapContainerClassName="map-container"
            onLoad={(map) => (mapRef.current = map)}
        >
            <Marker
                position={center}
            />
        </GoogleMap>

    )
}


