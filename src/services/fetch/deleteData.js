export function deleteData(endPoint){
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const request = fetch(`${process.env.REACT_APP_API_URL}/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}