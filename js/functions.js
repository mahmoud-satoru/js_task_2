let regex = {

    age: /^[1-9][0-9]$/,

    email: /^[A-Za-z_][A-Za-z_0-9.]*@(gmail|yahoo)\.(com|org)$/,

    firstName: /^[A-Za-z]+$/,

    phone: /^01[0-5][0-9]{8}$/,

    secondName: /^[A-Za-z]+$/

};

function get_std(){
    let new_std={ id: id};

    inbuts.forEach(function (input){
        let key = input.name,
        value = input.value
        ;

        new_std[key]=value; 

    })

    addstd(new_std);

    return new_std;

};

function addstd(new_std){
    validation_std(new_std);
};

function validation_std(new_std){
    for (let felid in new_std) {

        if (felid === "id") {
            continue;
        }


        let input_name = felid,
            input_value = new_std[felid];

        console.log(regex[input_name].test(input_value));
    }
};

function showstd(student){
    table_body.innerHTML += `
    
        <tr>
        <th scope="row">${student.id}</th>
        <td>${student.firstName}</td>
        <td>${student.secondName}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.phone}</td>
        <td>
            <button class="btn btn-info text-light me-2" onclick="editStudent(${student.id})">
                Edit
            </button>

            <button class="btn btn-danger text-light" onclick="deleteStudent(${student.id})">
                Delete
            </button>
        </td>
        </tr>
    
    `
};

function checkinput(input){

    let input_name = input.name,
        input_value = input.value,
        is_empty = input_value === "",
        error_element = document.querySelector(`[data-error-name="${input_name}"]`),
        isvalid = regex[input_name].test(input_value)
        ;

    if (is_empty)
    {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        error_element.classList.add("d-flex");
        error_element.classList.remove("d-none");
        error_element.textContent = "This Field Is Required !";
        return false;
    }

    else if (!isvalid)
    {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        error_element.classList.add("d-flex");
        error_element.classList.remove("d-none");
        error_element.textContent = "Wrong!";
        return false;
    }

    else
    {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        error_element.classList.remove("d-flex");
        error_element.classList.add("d-none");
        return true;
    }
}

function update_localStorage(){
    localStorage.setItem('my_students' , JSON.stringify(my_students));
}

function deleteStudent(id) {
    console.log(id);
    let index = my_students.findIndex(function(student) {
        return student.id === id;
    });
    console.log(index);
    my_students.splice(index, 1);
    update_localStorage();
    table_body.innerHTML = "";
    my_students.forEach(function(student) {
        showstd(student);
    });
    check_Students();
}

function check_Students() {

    let no_data = document.querySelector(".alert-danger");

    if (my_students.length === 0) {
        no_data.classList.remove("d-none");
    }
    else {
        no_data.classList.add("d-none");
    }

    

}

function editStudent(id) {

    let student = my_students.find(function(student) {
        return student.id === id;
    });

    if (!student) {
        return;
    }

    edit_id = id;

    inbuts.forEach(function(input) {
        input.value = student[input.name];
    });

    let submit_btn = document.querySelector("#register button");
    submit_btn.textContent = "Update";
}