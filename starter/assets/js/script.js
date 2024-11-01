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
    var ObjectData = JSON.parse(Object);
    var elementsTodo = "";
    var elementsDoing = "";
    var elementsDone = "";
    

    ObjectData.map((tasks, index) => {
        if (tasks.action == "do") {
            elementsTodo += `
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
            elementsDoing += `
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
        }else if(tasks.action == "done"){
            elementsDone += `
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
        }
    });
    
    TodoTasks.innerHTML = elementsTodo;
    console.log(ObjectData);
    Doing.innerHTML= elementsDoing;
    Done.innerHTML=elementsDone;

}

reset = () => {
    titleN = document.getElementById('title').value="";
    dateN = document.getElementById('date').value="";
    descriptionN = document.getElementById('description').value="";
    levelN = document.getElementById('level').value="";
    actionN = document.getElementById('action').value="";
    typeN = document.getElementById('type').checked=true;
}

add = () => {
    var titleN = document.getElementById('title').value;
    var dateN = document.getElementById('date').value;
    var descriptionN = document.getElementById('description').value;
    var levelN = document.getElementById('level').value;
    var actionN = document.getElementById('action').value;
    var typeN = document.getElementById('type').checked;

    var newObj= {title: titleN,date:dateN,description:descriptionN,level:levelN,action:actionN,type:typeN}
    data.push(newObj);

    document.getElementById('form-div').classList.add('d-none');
    document.getElementById('app').style.filter = "";
    document.getElementById('app').style.backgroundColor = "";

    localStorage.setItem('object', JSON.stringify(data));
    ReadAll();

    reset();

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
    


    document.getElementById('title').value = data[index].title;
    document.getElementById('date').value = data[index].date;
    document.getElementById('description').value = data[index].description;
    document.getElementById('level').value = data[index].level;
    document.getElementById('action').value = data[index].action;
    document.getElementById('type').checked = data[index].type;


    document.getElementById('update').onclick = () => {
        data[index].title = document.getElementById('title').value;
        data[index].date = document.getElementById('date').value;
        data[index].description = document.getElementById('description').value;
        data[index].level = document.getElementById('level').value;
        data[index].action = document.getElementById('action').value;
        data[index].type = document.getElementById('type').checked;
  
        localStorage.setItem('object', JSON.stringify(data));

        ReadAll();

 
        document.getElementById('form-div').classList.add('d-none');
        document.getElementById('app').style.filter = "";
        document.getElementById('app').style.backgroundColor = "";
        document.getElementById('update').classList.add('d-none');
        document.getElementById('submit').classList.remove('d-none');
        reset();
    };
}

