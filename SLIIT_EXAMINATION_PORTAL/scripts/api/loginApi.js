
function loggin(url, empId, password, callback)
{

    fetch(url, {

        method: 'POST',
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                 },
        body: `empId=${encodeURIComponent(empId)}&password=${encodeURIComponent(password)}`

    }).then(response => response.json())
      .then(data =>{
           if(data.success)
              callback(null, data);
            else
              callback(data.error);
    })
    .catch(error =>{
        console.log('Error: ', error);
    });


}