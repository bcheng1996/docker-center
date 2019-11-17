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