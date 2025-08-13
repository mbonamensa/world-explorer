import { DotPlane } from "./DotPlane"

export default function PopulationDots({country, population, latitude, longitude, flagCode}) {

    const modifiedPop = population/100000000
    const yPosition = 1 + modifiedPop/2
    const latitudePosition = -latitude * Math.PI/180
    const longitudePosition = longitude * Math.PI/180
    const offsetPosition = Math.PI/2

    return (
      <>
        <group rotation={[0, offsetPosition, 0]}>
            <group rotation={[0, longitudePosition, 0]}>
                <group rotation={[latitudePosition, 0, 0]}>
                    <DotPlane latitude={latitudePosition} longitude={longitudePosition} country={country} yPosition={yPosition} modifiedPop={modifiedPop} flagCode={flagCode} />
                </group>
            </group>
        </group>
               
      </>
    )
}