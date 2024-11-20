document.getElementById('add-task').addEventListener('click', function() {
    document.getElementById('form-div').classList.remove('d-none');
    document.getElementById('app').style.filter = "blur(5px)";
    document.getElementById('app').style.backgroundColor = "rgba(255, 255, 255, 0.5)";
});

document.getElementById('cancel').addEventListener('click', function() {
    document.getElementById('form-div').classList.add('d-none');
    document.getElementById('app').style.filter = "";
    document.getElementById('app').style.backgroundColor = "";
    reset();
});

// disable le button 



let data = JSON.parse(localStorage.getItem('object')) || [];


// Display tasks
const ReadAll = () => {
    data = JSON.parse(localStorage.getItem('object')) || []; // Refresh from localStorage

    const TodoTasks = document.getElementById('to-do-tasks');
    const Doing = document.getElementById('in-progress-tasks');
    const Done = document.getElementById('done-tasks');
    
    // Clear current task displays
    let elementsTodo = "", elementsDoing = "", elementsDone = "";
    
    data.forEach((tasks, index) => {
        let taskHTML = `
            <div class="card mb-3 shadow-sm border-0">
                <div class="card-body d-flex align-items-start">
                    <!-- Icon Section -->
                    <div class="me-3">
                        <i class="fas ${tasks.action === 'do' ? 'fa-question-circle text-secondary' : tasks.action === 'doing' ? 'fa-spinner fa-spin text-warning' : 'fa-check-circle text-success'} fs-3"></i>
                    </div>

                    <!-- Task Details Section -->
                    <div class="w-100">
                        <h5 class="card-title fw-bold ${tasks.action === 'done' ? 'text-decoration-line-through text-muted' : ''}">
                            ${tasks.title}
                        </h5>
                        <p class="card-text mb-1 ${tasks.action === 'done' ? 'text-decoration-line-through text-muted' : ''}">
                            <small class="text-muted">#${index + 1} created on ${tasks.date}</small>
                        </p>
                        <p class="card-text ${tasks.action === 'done' ? 'text-decoration-line-through text-muted' : ''}">
                            ${tasks.description}
                        </p>

                        <!-- Labels Section -->
                        <div class="mb-3">
                            <span class="badge bg-primary me-1 ${tasks.action === 'done' ? 'bg-secondary' : ''}">${tasks.level}</span>
                            <span class="badge bg-secondary ${tasks.action === 'done' ? 'bg-light text-dark' : ''}">${tasks.type}</span>
                        </div>

                        <!-- Action Buttons -->
                        <div>
                            <button onclick="deleteItem(${index})" type="button" class="btn btn-danger btn-sm me-2">
                                <i class="fas fa-trash-alt"></i> Delete
                            </button>
                            <button onclick="updateItem(${index})" type="button" class="btn btn-warning btn-sm me-2">
                                <i class="fas fa-edit"></i> Update
                            </button>
                            <button onclick="showById(${index})" type="button" class="btn btn-primary btn-sm">
                                <i class="fas fa-info-circle"></i> Detail
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        // Append task HTML to the appropriate column
        if (tasks.action === "do") {
            elementsTodo += taskHTML;
        } else if (tasks.action === "doing") {
            elementsDoing += taskHTML;
        } else if (tasks.action === "done") {
            elementsDone += taskHTML;
        }

        // add counter of chaque task
        let countTodo = 0;
        let countDoing = 0;
        let countDone = 0;

        for (let i = 0; i < data.length; i++) {
            if (data[i].action === "do") {
                countTodo += 1;
            }
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].action === "doing") {
                countDoing += 1;
            }
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].action === "done") {
                countDone += 1;
            }
        }

        // affiche counter of tasks
        let counterOfTodo = document.getElementById('to-do-tasks-count');
        let counterOfDoing = document.getElementById('in-progress-tasks-count');
        let counterOfDone = document.getElementById('done-tasks-count');
        counterOfTodo.innerHTML= countTodo;
        counterOfDoing.innerHTML= countDoing;
        counterOfDone.innerHTML= countDone;
    });
    
    // affiche les tasks
    TodoTasks.innerHTML = elementsTodo;
    Doing.innerHTML = elementsDoing;
    Done.innerHTML = elementsDone;

    
};

const reset = () => {
    document.getElementById('title').value = "";
    document.getElementById('date').value = "";
    document.getElementById('description').value = "";
    document.getElementById('level').value = "Please select";
    document.getElementById('action').value = "Please select"; 
    document.querySelectorAll('input[name="rate"]').forEach(input => input.checked = false);
}

// Affichage de l'alerte de succès 
const showSuccessAlert = () => {
    let succes = document.getElementById('succes')
    succes.innerHTML = `<b>The Task add succes !! </b>`;
    succes.classList.remove('d-none');
    setTimeout(() => {
        succes.classList.add('d-none');
    }, 1000);
}

// Affichage de l'alerte danger
const showDangerAlert = () => {
    let danger = document.getElementById('danger')
    danger.innerHTML = `<b>Votre Task a été supprimer !! </b>`;
    danger.classList.remove('d-none');
    setTimeout(() => {
        danger.classList.add('d-none');
    }, 1000);
}

// Affichage de l'alerte Warning
const showWarningAlert = () => {
    let warning = document.getElementById('warning')
    warning.innerHTML = `<b>Votre Task a été modifier !! </b>`;
    warning.classList.remove('d-none');
    setTimeout(() => {
        warning.classList.add('d-none');
    }, 1000);
} 



const showValue = () => {
    var selectedRate = document.querySelector('input[name="rate"]:checked');
    return selectedRate ? selectedRate.value : null;
}

const validation = () => {
    var titleN = document.getElementById('title');
    var dateN = document.getElementById('date');
    var descriptionN = document.getElementById('description');
    var levelN = document.getElementById('level');
    var actionN = document.getElementById('action');
    var typeN = showValue();

    if (titleN.value.trim() === "") {
        alert("Veuillez entrer le titre !");
        return false;
    }

    if (dateN.value.trim() === "") {
        alert("Veuillez entrer une date !");
        return false;
    }

    if (descriptionN.value.trim() === "") {
        alert("Veuillez entrer une description !");
        return false;
    }

    if (levelN.selectedIndex === 0) { 
        alert("Veuillez sélectionner un niveau !");
        return false;
    }

    if (actionN.selectedIndex === 0) { 
        alert("Veuillez sélectionner une action !");
        return false;
    }

    if (!typeN) {
        alert("Veuillez selectionnez le type !");
        return false;
    }
    return true;
};

const add = () => {
    if (validation() === true) {
        var titleN = document.getElementById('title').value;
        var dateN = document.getElementById('date').value;
        var descriptionN = document.getElementById('description').value;
        var levelN = document.getElementById('level').value;
        var actionN = document.getElementById('action').value;
        var typeN = showValue();

        var newObj = {
            title: titleN,
            date: dateN,
            description: descriptionN,
            level: levelN,
            action: actionN,
            type: typeN
        };

        data.push(newObj);

        // Save updated data to local storage
        localStorage.setItem('object', JSON.stringify(data));

        // Update the display and reset the form
        reset();
        ReadAll();

        document.getElementById('form-div').classList.add('d-none');
        document.getElementById('app').style.filter = "";
        document.getElementById('app').style.backgroundColor = "";

        showSuccessAlert();
        
    } else {
        document.getElementById('form-div').classList.remove('d-none');
        document.getElementById('app').style.filter = "blur(5px)";
        document.getElementById('app').style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    }

    
};

const deleteItem = (index) => {
    if(confirm("Are u sure u need to delete this task ! ")){
        data.splice(index, 1); 
        localStorage.setItem('object', JSON.stringify(data));
        ReadAll();
        showDangerAlert(); 
    }
    
};

const updateItem = (index) => {
    document.getElementById('form-div').classList.remove('d-none');
    document.getElementById('app').style.filter = "blur(5px)";
    document.getElementById('app').style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    document.getElementById('update').classList.remove('d-none');
    document.getElementById('submit').classList.add('d-none');

    document.getElementById('title').value = data[index].title;
    document.getElementById('date').value = data[index].date;
    document.getElementById('description').value = data[index].description;
    document.getElementById('level').value = data[index].level;
    document.getElementById('action').value = data[index].action;
    document.querySelectorAll('input[name="rate"]').forEach(input => input.checked = (input.value === data[index].type));

    document.getElementById('cancel').addEventListener('click', function() {
        document.getElementById('form-div').classList.add('d-none');
        document.getElementById('app').style.filter = "";
        document.getElementById('app').style.backgroundColor = "";
        document.getElementById('update').classList.add('d-none');
        document.getElementById('submit').classList.remove('d-none');
        reset();
    });

    document.getElementById('update').onclick = () => {
        if (validation()) {
            data[index].title = document.getElementById('title').value;
            data[index].date = document.getElementById('date').value;
            data[index].description = document.getElementById('description').value;
            data[index].level = document.getElementById('level').value;
            data[index].action = document.getElementById('action').value;
            data[index].type = showValue();

            localStorage.setItem('object', JSON.stringify(data));

            document.getElementById('form-div').classList.add('d-none');
            document.getElementById('app').style.filter = "";
            document.getElementById('app').style.backgroundColor = "";
            document.getElementById('update').classList.add('d-none');
            document.getElementById('submit').classList.remove('d-none');

            reset();
            ReadAll();
            showWarningAlert();
        }
    };
}

const showById = (index) => {
    document.getElementById('app').style.filter = "blur(5px)";
    document.getElementById('app').style.backgroundColor = "rgba(255, 255, 255, 0.5)";

    const task = data[index]; 
    if (!task) return; 
    document.getElementById('detail').innerHTML = `
            <div class="card mx-auto bg-white p-4 rounded position-absolute top-50 start-50 translate-middle" style="max-width: 600px; width: 100%; word-wrap: break-word; overflow-wrap: break-word;">
                <div class="align-items-center">
                    <i class="fas ${task.action === 'do' ? 'fa-question-circle text-secondary' : task.action === 'doing' ? 'fa-spinner fa-spin text-warning' : 'fa-check-circle text-success'} fs-3 me-3"></i>
                    <h4 class="fw-bold mb-0 ${task.action === 'done' ? 'text-decoration-line-through text-muted' : ''}" style="word-wrap: break-word; overflow-wrap: break-word;">
                        ${task.title}
                    </h4>
                </div>
                <div class="card-body">
                    <!-- Date Section -->
                    <div class="mb-3">
                        <h5 class="text-primary">Date:</h5>
                        <p class="text-muted fs-6 ${task.action === 'done' ? 'text-decoration-line-through' : ''}" style="word-wrap: break-word; overflow-wrap: break-word;">
                            #${index + 1} created on ${task.date}
                        </p>
                    </div>

                    <!-- Description Section -->
                    <div class="mb-3">
                        <h5 class="text-primary">Description:</h5>
                        <p class="fs-6 ${task.action === 'done' ? 'text-decoration-line-through' : ''}" style="word-wrap: break-word; overflow-wrap: break-word;">
                            ${task.description}
                        </p>
                    </div>

                    <!-- Level Section -->
                    <div class="mb-3">
                        <h5 class="text-primary">Level of Task:</h5>
                        <span class="badge bg-primary ${task.action === 'done' ? 'bg-secondary' : ''}">${task.level}</span>
                    </div>

                    <!-- Type Section -->
                    <div class="mb-3">
                        <h5 class="text-primary">Type of Task:</h5>
                        <span class="badge bg-secondary ${task.action === 'done' ? 'bg-light text-dark' : ''}">${task.type}</span>
                    </div>

                    <!-- Cancel Button -->
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-outline-danger btn-sm mt-3" id="cancelDetail">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    </div>
                </div>
            </div>
    `;

    document.getElementById('cancelDetail').addEventListener('click', () => {
        document.getElementById('detail').innerHTML = ''; 
        document.getElementById('app').style.filter = "";
        document.getElementById('app').style.backgroundColor = "";
    });
};

verifierSubmit = () => {
    // Keyup event listeners for text inputs
    document.getElementById('title').addEventListener('keyup', isEmpty);
    document.getElementById('date').addEventListener('keyup', isEmpty);
    document.getElementById('description').addEventListener('keyup', isEmpty);
    document.getElementById('level').addEventListener('keyup', isEmpty);
    document.getElementById('action').addEventListener('keyup', isEmpty);

    // Change event listener for radio buttons
    const radioButtons = document.querySelectorAll('input[name="rate"]');
    radioButtons.forEach(radio => radio.addEventListener('change', isEmpty));

    // Function to enable/disable submit button
    function isEmpty() {
        var titleN = document.getElementById('title').value.trim();
        var dateN = document.getElementById('date').value.trim();
        var descriptionN = document.getElementById('description').value.trim();
        var levelN = document.getElementById('level').value.trim();
        var actionN = document.getElementById('action').value.trim();
        var typeN = showValue();

        if (titleN !== '' && dateN !== '' && descriptionN !== '' && levelN !== '' && actionN !== '' && typeN !== null) {
            document.getElementById('submit').removeAttribute('disabled');
        } else {
            document.getElementById('submit').setAttribute('disabled', 'true');
        }
    }

}
verifierSubmit();



 

ReadAll(); 
