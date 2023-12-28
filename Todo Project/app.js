function saveTask(event){
    event.preventDefault();
    const todoName = document.getElementById('todoName').value;
    const description = document.getElementById('description').value;
    
    let user = {
        todoName:todoName,
        description:description
    }

    axios.post('https://crudcrud.com/api/5c0c52e7436e47368f474d237892d264/todo',user)
    .then((response)=>{
        newTask(response.data)
    })
    .catch((err)=>{
        console.log(err);
    })
    
}

//  to avoid disappearing ele after refresh
window.addEventListener("DOMContentLoaded" , () => {
    axios.get("https://crudcrud.com/api/5c0c52e7436e47368f474d237892d264/todo")
    .then( (response) =>{

        for(var i=0; i<response.data.length; i++){
            newTask(response.data[i])
            CompletedTask(response.data[i])
        }
    })
    .catch((err) => {
        console.log(err)
    })
})


function newTask(user){
    const parentEle = document.getElementById('new_task');
    const childEle = `<li id='${user._id}'> Todo Name : ${user.todoName} / Description : ${user.description}
                      <button onclick= CompletedTask('${user._id}') > ✅ </button> 
                      <button onclick= deleteUser('${user._id}') >❌ </button>
                      </li>` 

    parentEle.innerHTML = parentEle.innerHTML + childEle               
    // childEle.textContent = 'Todo Name'+ user.todoName + '  ' + 'Description'+ user.description ;
    
}


function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/5c0c52e7436e47368f474d237892d264/todo/${userId}`)
    .then((response) =>{
        removeUserFromScreen(userId)
    })
    .catch((err)=> {
        console.log(err)
    })
}

function removeUserFromScreen(userId){
    const parentnode = document.getElementById('new_task')
    const childToBeDeleted = document.getElementById(userId)
    if(childToBeDeleted){
        parentnode.removeChild(childToBeDeleted)
    }
}

function CompletedTask(user){
    

    const parentEle = document.getElementById('completed');
    const childEle = `<li id='${user._id}'> Todo Name : ${user.todoName} / Description : ${user.description}  <button onclick= deleteCompleted('${user._id}') >❌ </button>
   
    </li>` 
    
    parentEle.innerHTML = parentEle.innerHTML + childEle   
    deleteUser(user)
             
    // childEle.textContent = 'Todo Name'+ user.todoName + '  ' + 'Description'+ user.description ;
    
}

 function deleteCompleted(user){
   const completed=document.getElementById('completed')
   const childToBeDeleted = document.getElementById(user)
   if(childToBeDeleted){
       completed.removeChild(childToBeDeleted)
   }

}
