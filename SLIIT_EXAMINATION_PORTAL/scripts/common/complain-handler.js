var ComplainList = ComplainList || [];

window.addEventListener("load", ()=>{
    getAllComplains('../../php/complain/get-available-complains.php', getComplainsCallback);
});




function getComplainsCallback(error, result)
{
    let callbackEvent;
    if(error){
        console.log(error);
        callbackEvent = new CustomEvent('onLoadComplainList', {
            detail:{
                status: 'fail'
            }
        });
    }
    else
    {
        ComplainList = result.data;
        callbackEvent = new CustomEvent('onLoadComplainList', {
            detail:{
                status: 'success'
            }
        });
    }
    document.dispatchEvent(callbackEvent);
}