
function saveToLocalStorage(event){
    event.preventDefault();
    const name = document.getElementById('userNametag').value;
    const email = document.getElementById('emailIdtag').value;
    const phoneNumber = document.getElementById('phoneNumbertag').value;
    let user = {
        name: name,
        email: email,
        phoneNumber: phoneNumber
    }
       
    axios
     .post("https://crudcrud.com/api/73c872ba1b7844db8acc14ee338ca004/appoimentData", user)
     .then((response) => {
         showUserOnScreen(response.data)
     })
     .catch((err) => {
         console.log(err)
     }) 
    //  localStorage.setItem(myObj.email, JSON.stringify(myObj));
    // showUserOnScreen(myObj);

}
//  to avoid disappearing ele after refresh
window.addEventListener("DOMContentLoaded" , () => {
    axios.get("https://crudcrud.com/api/73c872ba1b7844db8acc14ee338ca004/appoimentData")
    .then( (response) =>{
        console.log(response)

        for(var i=0; i<response.data.length; i++){
            showUserOnScreen(response.data[i])
        }
    })
    .catch((err) => {
        console.log(err)
    })
})

function showUserOnScreen(user){
    const parentEle = document.getElementById('listOfItems');
    const childEle = `<li id='${user._id}'> ${user.name} - ${user.email} - ${user.phoneNumber}
                      <button onclick= deleteUser('${user._id}') > Delete </button>
                      <button onclick= editUser('${user._id}' , ${user.name} , ${user.email}) > Edit </button> 
                      </li>` 

    parentEle.innerHTML = parentEle.innerHTML + childEle                  
                   // const childEle = document.createElement('li');
    childEle.textContent = user.name + '-' + user.email + '-' + user.phoneNumber;
    
 /*
    
    const editbtn = document.createElement('input');
    editbtn.type = "button";
    editbtn.value = "Edit";
    editbtn.onclick = () => {
      //  localStorage.removeItem(myObj.email);
        parentEle.removeChild(childEle);
      /*  document.getElementById('userNametag').value = myObj.name;
        document.getElementById('emailIdtag').value = myObj.email;
        document.getElementById('phoneNumbertag').value = myObj.phoneNumber; 
    }
    */
} 

function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/73c872ba1b7844db8acc14ee338ca004/appoimentData/${userId}`)
    .then((response) =>{
        console.log(response)
        removeUserFromScreen(userId)
    })
    .catch((err)=> {
        console.log(err)
    })
}

function removeUserFromScreen(userId){
    const parentnode = document.getElementById('listOfItems')
    const childToBeDeleted = document.getElementById(userId)
    if(childToBeDeleted){
        parentnode.removeChild(childToBeDeleted)
    }
}





