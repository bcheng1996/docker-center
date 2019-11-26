const base_url = 'http://localhost:3000'


export async function getProperties() {
    let url = base_url + '/properties'
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        });

        return response.text()
        // const property_json = await parseString(property, (err, res)=>{
        //     return(res['Zestimate:zestimate']['response'][0])
        // })

    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function addProperty(property) {
    let url = base_url + '/properties/create'
    const address = property['address']
    const details = property['details']

    const body = {
        "id": property['zpid'],
        "street": address['street'],
        "city": address['city'],
        "state": address['state'],
        "zipcode": address['zipcode'],
        "latitude": address['latitude'],
        "longitude": address['longitude'],
        "estimate": property['zestimate']['amount']['_'],
        "bedrooms": details['bedrooms'],
        "bathrooms": details['bathrooms'],
        "totalRooms": details['totalRooms'],
        "finishedSqFt": details['finishedSqFt'],
        "lotSizeSqFt": details['lotSizeSqFt'],
        "parkingSize": details['parkingSize'],
        "forSale": true,
        "lastSoldDate": details['lastSoldDate'],
        "rating": property['rating'],
        "images": property['images']
    }

    console.log("BODY", body)

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            mode: 'cors'
        });
        return response.text()
        // const property_json = await parseString(property, (err, res)=>{
        //     return(res['Zestimate:zestimate']['response'][0])
        // })

    } catch (error) {
        console.error(error);
        return null;
    }
}