document.getElementById('add-task').addEventListener('click', function() {
    document.getElementById('form-div').classList.remove('d-none');
    document.getElementById('app').style.filter = "blur(5px)";
    document.getElementById('app').style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  
});
document.getElementById('cancel').addEventListener('click',function(){
    document.getElementById('form-div').classList.add('d-none');
    document.getElementById('app').style.filter = "";
    document.getElementById('app').style.backgroundColor = "";
})


// data tasks
let data = []


// fonction de affichage
ReadAll = () => {
        localStorage.setItem('object', JSON.stringify(data));

        var TodoTasks = document.getElementById('to-do-tasks');
        var Doing = document.getElementById('in-progress-tasks');
        var Done = document.getElementById('done-tasks');
    
        // Retrieve tasks from localStorage
        var Object = localStorage.getItem('object');
        var ObjectData = JSON.parse(Object) || []; 
    
        // Clear current task displays
        var elementsTodo = "";
        var elementsDoing = "";
        var elementsDone = "";
    
        // Helper function to create task HTML
        ObjectData.map((tasks, index) => {
            if (tasks.action == "do") {
                elementsTodo +=`
                <div class="border d-flex p-2 text-start ">
                    <div class="fs-4 me-2">
                        <i class="fas fa-question-circle text-success"></i>
                    </div>
                    <div class="">
                        <div class="fw-bold fs-4">
                            ${tasks.title}
                        </div>
                        <div class="mt-1 mb-3">
                            <div class="text-muted fs-5">#${index + 1} created on ${tasks.date}</div>
                            <div
                                class='fs-5'
                                title="Keep all up-to-date requirements and details in the main description. Even if information in comments may affect initial criteria, just update this primary description accordingly."
                            >
                                ${tasks.description}
                            </div>
                        </div>
                        <div class="mt-1 mb-2">
                            <span class="bg-primary p-1 rounded text-white">${tasks.level}</span>
                            <span class="bg-muted p-1 text-black rounded">${tasks.type}</span>
                        </div>
                        <div class="mt-2">
                            <button onclick="deleteItem(${index})" type="button" class="bg-danger p-1 rounded text-white border-danger">Delete</button>
                            <button onclick="updateItem(${index})" type="button" class="bg-warning p-1 rounded text-white border-warning">Update</button>
                        </div>
                    </div>
                </div>
                `;
            }else if(tasks.action == "doing"){
                elementsDoing +=` 
                <div class="border d-flex p-2 text-start ">
                    <div class="fs-4 me-2">
                        <i class="fas fa-spinner fa-spin text-success"></i>
                    </div>
                    <div class="">
                        <div class="fw-bold fs-4">
                            ${tasks.title}
                        </div>
                        <div class="mt-1 mb-3">
                            <div class="text-muted fs-5">#${index + 1} created on ${tasks.date}</div>
                            <div
                                class='fs-5'
                                title="Keep all up-to-date requirements and details in the main description. Even if information in comments may affect initial criteria, just update this primary description accordingly."
                            >
                                ${tasks.description}
                            </div>
                        </div>
                        <div class="mt-1 mb-2">
                            <span class="bg-primary p-1 rounded text-white">${tasks.level}</span>
                            <span class="bg-muted p-1 text-black rounded">${tasks.type}</span>
                        </div>
                        <div class="mt-2">
                            <button onclick="deleteItem(${index})" type="button" class="bg-danger p-1 rounded text-white border-danger">Delete</button>
                            <button onclick="updateItem(${index})" type="button" class="bg-warning p-1 rounded text-white border-warning">Update</button>
                        </div>
                    </div>
                </div>
                `;
            }else if(tasks.action == "done"){
                elementsDone +=` 
                <div class="border d-flex p-2 text-start ">
                    <div class="fs-4 me-2">
                        <i class="fas fa-check-circle text-success"></i>
                    </div>
                    <div class="">
                        <div class="fw-bold fs-4 text-decoration-line-through">
                            ${tasks.title}
                        </div>
                        <div class="mt-1 mb-3">
                            <div class="text-muted fs-5 text-decoration-line-through">#${index + 1} created on ${tasks.date}</div>
                            <div
                                class='fs-5 text-decoration-line-through'
                                title="Keep all up-to-date requirements and details in the main description. Even if information in comments may affect initial criteria, just update this primary description accordingly."
                            >
                                ${tasks.description}
                            </div>
                        </div>
                        <div class="mt-1 mb-2">
                            <span class="bg-primary p-1 rounded text-white text-decoration-line-through">${tasks.level}</span>
                            <span class="bg-muted p-1 text-black rounded text-decoration-line-through">${tasks.type}</span>
                        </div>
                        <div class="mt-2">
                            <button onclick="deleteItem(${index})" type="button" class="bg-danger p-1 rounded text-white border-danger">Delete</button>
                            <button onclick="updateItem(${index})" type="button" class="bg-warning p-1 rounded text-white border-warning">Update</button>
                        </div>
                    </div>
                </div>
                `;
            }
        });
        
        TodoTasks.innerHTML = elementsTodo;
        Doing.innerHTML= elementsDoing;
        Done.innerHTML=elementsDone;
    
    }

    reset = () => {
        document.getElementById('title').value = "";
        document.getElementById('date').value = "";
        document.getElementById('description').value = "";
        document.getElementById('level').value = "";
        document.getElementById('action').value = ""; 
        // Resetting radio buttons
        var rateInputs = document.getElementsByName('rate');
        rateInputs.forEach((input) => {
            input.checked = false; 
        });
    }

function showValue() {
    var selectedRate = document.querySelector('input[name="rate"]:checked');
    if (selectedRate) {
        return selectedRate.value;
    }
}

validation = () => {
    var titleN = document.getElementById('title');
    var dateN = document.getElementById('date');
    var descriptionN = document.getElementById('description');
    var levelN = document.getElementById('level');
    var actionN = document.getElementById('action');
    var typeN = showValue();

    if(titleN.value.trim() == ""){
        alert("Veuillez entrer le titre ! ");
        return false;
    }

    if(dateN.value.trim() == ""){
        alert("Veuillez entrer une date ! ");
        return false;
    }

    if(descriptionN.value.trim() == ""){
        alert("Veuillez entrer une description ! ");
        return false;
    }

    if(levelN.value.trim() == ""){
        alert("Veuillez selectionnez level  ! ");
        return false;
    }

    if(actionN.value.trim() == ""){
        alert("Veuillez selectionnez l'action ! ");
        return false;
    }

    if(!typeN){
        alert("Veuillez selectionnez le type ! ");
        return false;
    }

    return true;
}

add = () => {
    if(validation() == true){
        var titleN = document.getElementById('title').value;
        var dateN = document.getElementById('date').value;
        var descriptionN = document.getElementById('description').value;
        var levelN = document.getElementById('level').value;
        var actionN = document.getElementById('action').value;
        var typeN = showValue();

        var newObj= {title: titleN,date:dateN,description:descriptionN,level:levelN,action:actionN,type:typeN}
        data.push(newObj);

        document.getElementById('form-div').classList.add('d-none');
        document.getElementById('app').style.filter = "";
        document.getElementById('app').style.backgroundColor = "";

        // localStorage.setItem('object', JSON.stringify(data));
        reset();
    }
    ReadAll();

}

deleteItem = (index) => {
    data.splice(index, 1); 
    ReadAll(); 
};

updateItem = (index) => {
    document.getElementById('form-div').classList.remove('d-none');
    document.getElementById('app').style.filter = "blur(5px)";
    document.getElementById('app').style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    document.getElementById('update').classList.remove('d-none');
    document.getElementById('submit').classList.add('d-none');

    // Set form values with existing task data
    document.getElementById('title').value = data[index].title;
    document.getElementById('date').value = data[index].date;
    document.getElementById('description').value = data[index].description;
    document.getElementById('level').value = data[index].level;
    document.getElementById('action').value = data[index].action;

    // Check the corresponding radio button for type
    var typeInputs = document.getElementsByName('rate');
    typeInputs.forEach((input) => {
        if (input.value === data[index].type) {
            input.checked = true; 
        } else {
            input.checked = false; 
        }
    });

    document.getElementById('update').onclick = () => {
        // Update the existing task with new values
        data[index].title = document.getElementById('title').value;
        data[index].date = document.getElementById('date').value;
        data[index].description = document.getElementById('description').value;
        data[index].level = document.getElementById('level').value;
        data[index].action = document.getElementById('action').value;

        // Update the type based on selected radio button
        data[index].type = document.querySelector('input[name="rate"]:checked').value;

        // Save updated data to local storage
        localStorage.setItem('object', JSON.stringify(data));
        ReadAll();

        // Reset the form and hide it again
        document.getElementById('form-div').classList.add('d-none');
        document.getElementById('app').style.filter = "";
        document.getElementById('app').style.backgroundColor = "";
        document.getElementById('update').classList.add('d-none');
        document.getElementById('submit').classList.remove('d-none');
        reset();
    };
}


