let name =document.getElementById('name');
let email=document.getElementById('email');
let number=document.getElementById('number');
let items=document.getElementById('items');

  myObj={
    name:name.value,
    email:email.value,
    number:number.value
  }

submit=()=>{
//  store data in local storage
let myObj_serialized =JSON.stringify(myObj);
localStorage.setItem(email.value,myObj_serialized);

// print data 
let li=document.createElement('li');
li.className='list-group-item';
li.innerText='name:'+name.value+' email:'+email.value+' Phone Number'+number.value
items.appendChild(li);

// delete btn create 
let deleteBtn=document.createElement('button');
deleteBtn.className='btn btn-danger btn-sm float-right delete';
deleteBtn.innerText='X';
li.appendChild(deleteBtn);

//edit btn create
let edit =document.createElement('button');
edit.className='btn btn-danger btn-sm float-right edit';
edit.innerText='Edit';
li.appendChild(edit);
}

items.addEventListener('click', removeItem);
// Remove item
function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement;
      items.removeChild(li);
      li.innerText=localStorage.removeItem(email.value);
    }
  }
}

items.addEventListener('click', editItem);
// Edit 
function editItem(e){
  if(e.target.classList.contains('edit')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement;
      items.removeChild(li);
      li.innerText=localStorage.removeItem(email.value);
      // name.value=Editname;
      // email.value=Editemail;
      // number.value=Editnumber;
    }
  }
}


