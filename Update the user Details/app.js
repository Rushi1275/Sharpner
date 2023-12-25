        function saveToLocalStorage(event){
            event.preventDefault();
            const name = event.target.userName.value;
            const email = event.target.emailId.value;
            const phoneNumber = event.target.phoneNumber.value;
            let user = {
                name: name,
                email: email,
                phoneNumber: phoneNumber
            }

            axios
             .post("https://crudcrud.com/api/543526658e3a459eae65b36628af81b9/appointments", user)
             .then((response) => {
                 showUserOnScreen(response.data)
             })
             .catch((err) => {
                 console.log(err)
             }) 

             user.innerHTML= "";
             

        }
//  to avoid disappearing ele after refresh
        window.addEventListener("DOMContentLoaded" , () => {
            axios.get("https://crudcrud.com/api/543526658e3a459eae65b36628af81b9/appointments")
            .then( (response) =>{

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
                              <button onclick= editUser('${user.name}','${user.email}','${user.phoneNumber}','${user._id}') > Edit </button> 
                              </li>` 

            parentEle.innerHTML = parentEle.innerHTML + childEle                  
            childEle.textContent = user.name + '-' + user.email + '-' + user.phoneNumber;
            
        }

        function deleteUser(userId){
            axios.delete(`https://crudcrud.com/api/543526658e3a459eae65b36628af81b9/appointments/${userId}`)
            .then((response) =>{
                removeUserFromScreen(userId)
            })
            .catch((err)=> {
                console.log(err)
            })
        }

        function editUser(name,email,phoneNumber,userId){
        
         document.getElementById('userNametag').value = name;
         document.getElementById('emailIdtag').value = email;
         document.getElementById('phoneNumbertag').value = phoneNumber ;

          deleteUser(userId)

        }

        function removeUserFromScreen(userId){
            const parentnode = document.getElementById('listOfItems')
            const childToBeDeleted = document.getElementById(userId)
            if(childToBeDeleted){
                parentnode.removeChild(childToBeDeleted)
            }
        }

       
