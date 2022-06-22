export function getData(endPoint){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(data)
    }
    const request = fetch(`${process.env.REACT_APP_API_URL}/${endPoint}`, options)
    const json = request.then(response => response.json()).catch((error) => console.log('error', error))
    return json;
}