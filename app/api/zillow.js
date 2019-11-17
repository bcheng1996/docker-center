const parseString = require('xml2js').parseString;
const ZWSID = 'X1-ZWz17jqzrwrytn_14qhc';


export async function getProperty(zpid) {
    let base_url = 'https://www.zillow.com/webservice/GetZestimate.htm'
    base_url += `?zws-id=${ZWSID}&zpid=${zpid}`

    try {
        const response = await fetch(base_url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const property = await response.text();
        
        return property
        // const property_json = await parseString(property, (err, res)=>{
        //     return(res['Zestimate:zestimate']['response'][0])
        // })

    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getPropertyDetails(zpid) { 
    let base_url = "http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm"
    base_url += `?zws-id=${ZWSID}&zpid=${zpid}`

    try {
        const response = await fetch(base_url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const property = await response.text();
        return property

    } catch (error) {
        console.error(error);
        return null;
    }

    
}