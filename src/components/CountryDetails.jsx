import Map from "./Map"
import useStore from "../store"
import { useNavigate, useParams } from "react-router-dom"
import { IoClose } from "react-icons/io5"

export default function CountryDetails() {

    const data = useStore(state => state.countryData) 

    const { id } = useParams()
    const navigate = useNavigate()

    function closeDetail() {
        navigate("/")
    }

    return (
    data && data.map(data => {

        const {
            name,
            continent,
            capital,
            code,
            population,
            languages,
            latitude,
            longitude
        } = data

        const countryName = name.replaceAll(" ", "-").toLowerCase()

        return (

            id === countryName &&
            (<div key={code} className="country-wrapper">
                <div className="close-detail-modal" onClick={closeDetail}><IoClose /></div>
                <div className="country">
                    <h1 className="name">{name}</h1>
                    <p className="continent light-text">{continent}</p>
                </div>

                <div className="cap-and-code">

                    <div>
                        <p className="light-text">Capital</p>
                        <p>{capital}</p>
                    </div>
                    <div>
                        <p className="light-text">Code</p>
                        <p>{code}</p>
                    </div>
                </div>
                <div className="population-wrapper">
                    <p className="light-text">Population</p>
                    <p>{population}</p>
                </div>
                <div>
                    <h2>Languages</h2>
                    <div className="language-wrapper">
                        {languages.map((language, i) => {
                            return <div key={i} className="language">{language}</div>
                        })}
                    </div>
                </div>
                 <Map lat={Number(latitude)} lng={Number(longitude)} />
            </div>)
        )
    })
    )
}