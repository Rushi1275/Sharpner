document.getElementById('btn').addEventListener('click', addTodo);
document.getElementById('fetchDataBtn').addEventListener('click', getTodos);

function addTodo() {
    const name = document.getElementById('name').value;    
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;    

    const myObj = {
        name: name,
        email: email,
        number: number
    };

    axios.post('https://crudcrud.com/api/15baff758d6f4ced990a18ee4e1f86a2/BookingDeta', myObj)
        .then((response) => {
            console.log('Data successfully sent:', response.data);
        })
        .catch((err) => {
            console.error('Error sending data:', err);
        });
}

function getTodos() {
    axios.get('https://crudcrud.com/api/15baff758d6f4ced990a18ee4e1f86a2/BookingDeta')
        .then((response) => { 
            const data = response.data;
            displayData(data);
        })
        .catch((err) => {
            console.error('Error fetching data:', err);
        });
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/15baff758d6f4ced990a18ee4e1f86a2/BookingDeta')
    .then((response) => { 
        const data = response.data;
        displayData(data);
    })
    .catch((err) => {
        console.error('Error fetching data:', err);
    });
})

function displayData(data) {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = ''; // Clear previous data

    data.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.style.marginBottom="10px"

        //delete btn 
        const delBtn=document.createElement('button');
        delBtn.textContent="Delete";
        delBtn.style.height="25px";
        delBtn.style.width="100px";
        delBtn.style.marginLeft="10px"
        delBtn.style.marginRight="10px"

        //edit btn
        const editBtn=document.createElement('button');
        editBtn.textContent="Edit";
        editBtn.style.height="25px";
        editBtn.style.width="100px";
          
        listItem.textContent = `Name: ${item.name}, Email: ${item.email}, Number: ${item.number}`;
        dataList.appendChild(listItem);
       listItem.appendChild(delBtn);
       listItem.appendChild(editBtn);
    });
}

 
    