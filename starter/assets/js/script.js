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
            <div class="border d-flex p-2 text-start">
                <div class="fs-4 me-2">
                    <i class="fas ${tasks.action === 'do' ? 'fa-question-circle' : tasks.action === 'doing' ? 'fa-spinner fa-spin' : 'fa-check-circle'} text-success"></i>
                </div>
                <div>
                    <div class="fw-bold fs-4 ${tasks.action === 'done' ? 'text-decoration-line-through' : ''}">
                        ${tasks.title}
                    </div>
                    <div class="mt-1 mb-3">
                        <div class="text-muted fs-5 ${tasks.action === 'done' ? 'text-decoration-line-through' : ''}">#${index + 1} created on ${tasks.date}</div>
                        <div class="fs-5 ${tasks.action === 'done' ? 'text-decoration-line-through' : ''}">
                            ${tasks.description}
                        </div>
                    </div>
                    <div class="mt-1 mb-2">
                        <span class="bg-primary p-1 rounded text-white ${tasks.action === 'done' ? 'text-decoration-line-through' : ''}">${tasks.level}</span>
                        <span class="bg-muted p-1 text-black rounded ${tasks.action === 'done' ? 'text-decoration-line-through' : ''}">${tasks.type}</span>
                    </div>
                    <div class="mt-2">
                        <button onclick="deleteItem(${index})" type="button" class="bg-danger p-1 rounded text-white border-danger">Delete</button>
                        <button onclick="updateItem(${index})" type="button" class="bg-warning p-1 rounded text-white border-warning">Update</button>
                        <button onclick="showById(${index})" type="button" class="bg-primary p-1 rounded text-white border-primary">Detail</button>
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
    });
    
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

    } else {
        document.getElementById('form-div').classList.remove('d-none');
        document.getElementById('app').style.filter = "blur(5px)";
        document.getElementById('app').style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    }
};

const deleteItem = (index) => {
    data.splice(index, 1); 
    localStorage.setItem('object', JSON.stringify(data));
    ReadAll(); 
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
        }
    };
}

const showById = (index) => {
    const task = data[index]; 
    if (!task) return; 
    document.getElementById('detail').innerHTML = `
        <div style="width: 50%; max-width: 600px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;" class="mx-auto bg-white p-3 rounded position-absolute top-50 start-50 translate-middle">
            <div class="fs-4 me-2">
                <i class="fas ${task.action === 'do' ? 'fa-question-circle' : task.action === 'doing' ? 'fa-spinner fa-spin' : 'fa-check-circle'} text-success"></i>
            </div>
            <div>
                <h4 class="mb-2">
                    <div class="fw-bold fs-4 ${task.action === 'done' ? 'text-decoration-line-through' : ''}">
                        ${task.title}
                    </div>
                </h4>
                <div class="mt-3 mb-3">
                    <h4 class="text-blue mb-2">Date :</h4>
                    <div class="text-muted fs-5 ${task.action === 'done' ? 'text-decoration-line-through' : ''}">#${index + 1} created on ${task.date}</div>
                    <h4 class="text-blue mb-2 mt-3">Description :</h4>
                    <div class="fs-5 ${task.action === 'done' ? 'text-decoration-line-through' : ''}">
                        ${task.description}
                    </div>
                </div>
                <div class="mt-1 mb-2">
                    <h4 class="text-blue mb-3">Level of task :</h4>
                    <span class="bg-primary p-1 rounded text-white ${task.action === 'done' ? 'text-decoration-line-through' : ''} mb-5">${task.level}</span>
                    <h4 class="text-blue mb-3 mt-3">Type of task :</h4>
                    <span class="bg-muted p-1 text-black rounded ${task.action === 'done' ? 'text-decoration-line-through' : ''} mb-3">${task.type}</span>
                </div>
                <div class="mt-2">
                    <button type="button" class="btn btn-secondary mt-4" id="cancelDetail">Cancel</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('cancelDetail').addEventListener('click', () => {
        document.getElementById('detail').innerHTML = ''; 
    });
};

ReadAll(); 
