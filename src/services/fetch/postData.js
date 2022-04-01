import 'dotenv/config' 

export function postFormData(endPoint, data){
    const options = {
        method: 'POST',
        body: data
    }
    const request = fetch(`${process.env.API_URL}/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}


export function postData(endPoint, data){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    const request = fetch(`${process.env.API_URL}/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}