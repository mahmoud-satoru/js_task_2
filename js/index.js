let register_form = document.querySelector("#register"),
inbuts = document.querySelectorAll("#register input"),
my_students=[],
id=0,
table_body = document.querySelector("tbody"),
input_valid = document.querySelector("input.is-invalid"),
edit_id = null;
let search_input = document.querySelector('input[name="Search"]');

if(localStorage.getItem("my_students") === null) {
    update_localStorage();
}
else {
    my_students = JSON.parse(localStorage.getItem("my_students"));
    id = my_students[my_students.length - 1]?.id ?? 0;
    my_students.forEach(function(student){
        showstd(student);
    });
}

check_Students();

register_form.addEventListener("submit", function(e){
    e.preventDefault();

    if (edit_id !== null) {

        let student = my_students.find(function(student) {
            return student.id === edit_id;
    });

        inbuts.forEach(function(input) {
            student[input.name] = input.value;
    });

    update_localStorage();

    table_body.innerHTML = "";
    my_students.forEach(function(student) {
        showstd(student);
    });

    this.reset();
    inbuts.forEach(function(input) {
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
    });
    let submit_btn = document.querySelector("#register button");
    submit_btn.textContent = "Add";
    edit_id = null;
    validation_std(new_std);
    return;

    }

    let student = get_std(++id);

    inbuts.forEach(function(input){
        checkinput(input);
    });

    let input_valid = document.querySelector("input.is-invalid");

    if(!input_valid){

        showstd(student);

        my_students.push(student);
        update_localStorage();

        inbuts.forEach(function(input){
            input.classList.remove("is-invalid");
            input.classList.remove("is-valid");
        });

        let error_elements = document.querySelectorAll("[data-error-name]");

        error_elements.forEach(function(error_element){
            error_element.classList.remove("d-flex");
            error_element.classList.add("d-none");
            
        });

        let register_form = document.querySelector("#register"),
        id=0,
        table_body = document.querySelector("tbody"),
        input_valid = document.querySelector("input.is-invalid");

        if(localStorage.getItem("my_students") === null) {
            update_localStorage();
        }
        else {
            my_students = JSON.parse(localStorage.getItem("my_students"));
        }


        register_form.addEventListener("submit", function(e){
            e.preventDefault();

            let student = get_std(++id);

            let input_valid = document.querySelector("input.is-invalid");

            inbuts.forEach(function(input){
                if (checkinput(input)){

                    if(!input_valid){
                        showstd(student);

                        inbuts.forEach(function(input){
                            input.classList.remove("is-invalid");
                            input.classList.remove("is-valid");
                        });

                        let error_elements = document.querySelectorAll("[data-error-name]");

                        error_elements.forEach(function(error_element){
                            error_element.classList.remove("d-flex");
                            error_element.classList.add("d-none");
                        });

                    }
                    
                }
            });

            console.log(my_students);
            this.reset();
        });
    }
    
    check_Students();
    
    
    console.log(my_students);
    this.reset();
});

search_input.addEventListener("input", search);
