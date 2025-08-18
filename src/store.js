import { create } from "zustand"
import { fetchData } from "./api"


export default create((set, get) => ({

    isSphereHovered: false,
    flagCode: "",
    hoveredCountry: null,
    countryData: null,
    hasUserInteracted: false,
    setHasUserInteracted: (state) => set({ hasInteracted: state }),
    setCountryName: (name) => set({ countryName: name }),
    setIsSphereHovered: (state) => set({ isSphereHovered: state }),
    setFlagCode: (code) => set({ flagCode: code }),
    setHoveredCountry: (country) => set({ hoveredCountry: country }),
    loadCountryData: async () => {
        try {
            const data = await fetchData()
            set({ countryData: data })
        } catch (error) {
            console.error("Error fetching country data:", error)
        }
    }

}))