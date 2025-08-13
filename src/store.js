import { create } from "zustand"
import { fetchData } from "./api"

const fetchedCountryData = await fetchData()

export default create((set, get) => ({
    isSphereHovered: false,
    flagCode: "",
    hoveredCountry: null,
    countryData: fetchedCountryData,
    mousePosition: { x: 0, y: 0 },
    hasUserInteracted: false,
    setHasUserInteracted: (state) => set({ hasInteracted: state }),
    setMousePosition: (position) => set({ mousePosition: position }),
    setCountryName: (name) => set({ countryName: name }),
    setIsSphereHovered: (state) => set({ isSphereHovered: state }),
    setFlagCode: (code) => set({ flagCode: code }),
    setHoveredCountry: (country) => set({ hoveredCountry: country }),
}))