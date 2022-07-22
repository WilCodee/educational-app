
export function postFormData(endPoint, data){
    let headers = localStorage.getItem("token") !== undefined ?
    {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
    :
    {}
    const options = {
        method: 'POST',
        headers,
        body: data
    }
    const request = fetch(`${process.env.REACT_APP_API_URL}/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}


export function postData(endPoint, data){
    let headers = localStorage.getItem("token") !== undefined ?
    {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
    :
    {
        'Content-Type': 'application/json'
    }
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }
   
    const request = fetch(`${process.env.REACT_APP_API_URL}/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}