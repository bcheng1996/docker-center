const key = 'AIzaSyB0QTH9LQFJl1oMMIArXO-zkU1XF5638SE'

// const autoCompleteBaseUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
const placeSearchBaseUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"

export async function placeSearch(value) {
    let url = placeSearchBaseUrl + `?key=${key}&input=${value}&inputtype=textquery&fields=formatted_address,icon,geometry`

    console.log(url)
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        
        const place = await response.json()
        return place
        // const property_json = await parseString(property, (err, res)=>{
        //     return(res['Zestimate:zestimate']['response'][0])
        // })

    } catch (error) {
        console.error(error);
        return null;
    }
}