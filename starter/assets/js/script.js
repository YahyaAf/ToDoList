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
let data = [
    {title:"Valider la documentation",date:'15/06/2003',description:'testing yazg efiegf efyegf  geygfy ez ygfeg  geugf yueg',type:'feature',level:'low'},
    {title:"Valider la structure",date:'15/06/2014',description:'testing 2',type:'bug',level:'Mediuem'}
]

// fonction de affichage
ReadAll = () => {
    localStorage.setItem('object', JSON.stringify(data))
    var TodoTasks = document.getElementById('to-do-tasks');
    
    
    var Object = localStorage.getItem('object');
    var ObjectData = JSON.parse(Object);
    var elements = ""

    ObjectData.map(tasks => (
        elements+=`
        <div class="border d-flex p-2 text-start ">
                  <div class="me-2">
                    <i class="fas fa-question-circle text-success"></i>
                  </div>
                  <div class="">
                        <div class="fw-bold">
                        ${tasks.title}
                        </div>
                        <div class="mt-1">
                        <div class="text-muted">#1 created in ${tasks.date}</div>
                        <div
                            class=""
                            title="There is hardly anything more frustrating than having to look for current requirements in tens of comments under the actual description or having to decide which commenter is actually authorized to change the requirements. The goal here is to keep all the up-to-date requirements and details in the main/primary description of a task. Even though the information in comments may affect initial criteria, just update this primary description accordingly."
                        >
                            ${tasks.description}
                        </div>
                        </div>
                        <div class="mt-1 mb-2">
                        <span class="bg-primary p-1 rounded text-white">${tasks.level}</span>
                        <span class="bg-muted p-1 text-black rounded">${tasks.type}</span>
                        </div>
                        <div class="mt-2">
                            <button type='submit' class='bg-danger p-1 rounded text-white border-danger '>Delete</button>
                            <button type='submit' class='bg-warning p-1 rounded text-white border-warning '>update</button>
                        </div>
                  </div>
        </div>
        `
    ));
    TodoTasks.innerHTML= elements;

}

add = () => {
    var titleN = document.getElementById('title').value;
    var dateN = document.getElementById('date').value;
    var descriptionN = document.getElementById('description').value;
    var levelN = document.getElementById('level').value;
    var typeN = document.getElementById('type').checked;

    var newObj= {title: titleN,date:dateN,description:descriptionN,level:levelN,type:typeN}
    data.push(newObj);

    document.getElementById('form-div').classList.add('d-none');
    document.getElementById('app').style.filter = "";
    document.getElementById('app').style.backgroundColor = "";

    ReadAll();

    titleN = document.getElementById('title').value="";
    dateN = document.getElementById('date').value="";
    descriptionN = document.getElementById('description').value="";
    levelN = document.getElementById('level').value="";
    typeN = document.getElementById('type').checked=true;

}
