export async function fetchData() {
    try {

        const response = await fetch("https://countries-api.fly.dev/api")

        if (!response.ok) {
            throw new Error(`error during data fetch: ${response.status}`)
        }

        const data = await response.json()

        return data
        
        
    } catch (error) {
        console.log("there was an error fetching countries",error.message)
    }
}