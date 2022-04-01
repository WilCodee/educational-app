import 'dotenv/config' 


export function putData(endPoint, data){
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    const request = fetch(`${process.env.API_URL}/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}