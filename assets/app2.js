
var studentApi = "http://localhost:3000/students";

function start(){
    getStudents(renderStudents);

    handleCreateForm()
}

start();

// Functions

function getStudents(callback){
    fetch(studentApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function createStudent(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    };
    fetch(studentApi, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var address = document.querySelector('input[name="address"]').value;
        var email = document.querySelector('input[name="email"]').value;
        
        var formData = {
            fullName: name,
            address: address,
            email: email
        }

        createStudent(formData, function(){
             getStudents(renderStudents);
        });

    }
}

function handleDeleteStudent(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(studentApi + '/' + id, options)
        .then(function(response){
            response.json();
        })
        .then(function(){
            var studentItem = document.querySelector('.list-students-form-item-' + id);
            var title = document.querySelector('.list-students-form-heading-' + id);
            if(studentItem){
                title.remove();
                studentItem.remove();
            }
        });


}

function renderStudents(students){
    var listStudentsBlock = document.querySelector('.list-students-form-table-heading');
    var htmls = students.map(function(student){
        return`
        <tr class="list-students-form-heading-${student.id}" style="background-color: #007bff; color: #fff; font-weight: bold; text-align: center;">
            <td class="list-students-form-heading-item">#</td>
            <td class="list-students-form-heading-item">Họ tên học viên</td>
            <td class="list-students-form-heading-item">Địa chỉ</td>
            <td class="list-students-form-heading-item">Email</td>
            <td colspan="2"></td>
            
        </tr>
            
        <tr class="list-students-form-item-${student.id}">
            <td class="list-students-form-item">${student.id}</td>
            <td class="list-students-form-item">${student.fullName}</td>
            <td class="list-students-form-item">${student.address}</td>
            <td class="list-students-form-item">${student.email}</td>
            <td class="list-students-form_Edit">
                <button class="btn-Edit">Edit</button>
            </td>
            <td class="list-students-form_Delete">
                <button class="btn-Delete" onclick="handleDeleteStudent(${student.id})">Delete</button>
            </td>
        </tr>
        `
    });

    listStudentsBlock.innerHTML = htmls.join('');
}













/*fetch(studentApi)
    .then(function(response){
        return response.json();
    })
    .then(function(students){
        var htmls = students.map(function(student){
            return`
            <tr class="list-students-form-heading">
                    <td class="list-students-form-heading-item">#</td>
                    <td class="list-students-form-heading-item">Họ tên học viên</td>
                    <td class="list-students-form-heading-item">Địa chỉ</td>
                    <td class="list-students-form-heading-item">Email</td>
                </tr>
                
            <tr class="list-students-form-item">
                <td class="list-students-form-item">${student.id}</td>
                <td class="list-students-form-item">${student.fullName}</td>
                <td class="list-students-form-item">${student.address}</td>
                <td class="list-students-form-item">${student.email}</td>
            </tr>
            `
        })

        var html = htmls.join('');
        document.querySelector('.list-students-form-table-heading').innerHTML = html;
    })*/