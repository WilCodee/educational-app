export function getData(endPoint){
    const request = fetch(`${process.env.REACT_APP_API_URL}/${endPoint}`)
    const json = request.then(response => response.json()).catch((error) => console.log('error', error))
    return json;
}