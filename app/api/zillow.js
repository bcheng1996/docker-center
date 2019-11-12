const parseString = require('xml2js').parseString;
const ZWSID = 'X1-ZWz17jqzrwrytn_14qhc';


export async function getProperty(zpid) {
    let base_url = 'https://www.zillow.com/webservice/GetZestimate.htm'
    base_url += `?zws-id=${ZWSID}&zpid=${zpid}`
    console.log(base_url)
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