import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import CountryDetails from "./components/CountryDetails"


export default function App() {
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