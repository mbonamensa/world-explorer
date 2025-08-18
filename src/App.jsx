import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import CountryDetails from "./components/CountryDetails"
import useStore from "./store"
import { useEffect } from "react"

export default function App() {

    const loadCountryData = useStore(state => state.loadCountryData)

    useEffect(() => {
        loadCountryData()
    }, [])

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} >
            <Route path="/:id" element={<CountryDetails />}/>
            </Route> 
        </Routes>
        </BrowserRouter>
    )
}