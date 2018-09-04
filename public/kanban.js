// global array/object för lagring av todos...
var todoObj = {};

window.addEventListener("DOMContentLoaded", initContent);

function initContent(){
    let todo = localStorage.getItem("todo");

    todoObj = JSON.parse(todo);

    //const kanban = _classArr("kanban");

    for(let i in todoObj)
    {
        console.log(todoObj[i].className);

        let initTemplate = _classArr("taskTemplate")[0];
        let newTemplate = initTemplate.cloneNode(true);
        newTemplate.className =  todoObj[i].className;
        newTemplate.innerHTML =  todoObj[i].content;
        newTemplate.id =  i;
        let kanban = _classArr("kanban");
        kanban[todoObj[i].kanban].appendChild(newTemplate);
        newTemplate.addEventListener("click", toNext);
        newTemplate.children[2].addEventListener("click", deleteParent);
        newTemplate.children[3].addEventListener("click", goBack);
        console.log(newTemplate);
    }
}

// inläsning av viktiga element
const newTaskButton = document.getElementById("newTaskButton");

// Lägg till lyssnare till element
newTaskButton.addEventListener("click", saveNewTask);
var date = new Date();

function saveNewTask(){

    const id = "_" + new Date().getTime();

    let newTask = document.getElementById("newTask").value;
// om texten är större än 0

    if(newTask.length > 0)
    {

        const taskTemplate = document.getElementsByClassName("taskTemplate")[0];

        // meka med templaten...
        let newTemplate = taskTemplate.cloneNode(true);
 
        newTemplate.className = "clonedTaskTemplate";
        newTemplate.children[0].innerHTML = date.toDateString();
        newTemplate.children[1].innerHTML = newTask;

            newTemplate.addEventListener("click", toNext);
            newTemplate.children[2].addEventListener("click",deleteParent);
            newTemplate.children[3].addEventListener("click",goBack);
            newTemplate.id = id;

            var todo = document.getElementsByClassName("kanban")[0];
        todo.appendChild(newTemplate);

        let todoInfo = {};
        todoInfo.kanban = 0;
        todoInfo.content = newTemplate.innerHTML;
        todoInfo.className = newTemplate.className;
        todoObj[id] = todoInfo;
        sparaNu();
        console.log(todoObj);
    }
    
}

function toNext(){


    // hämta kanban klassen och gör om den till en array
    const kanban = Array.from(document.getElementsByClassName("kanban"));

    let kanbanIndex = kanban.indexOf(this.parentElement);
    if(kanbanIndex+1<kanban.length)
        { 
            kanban[kanbanIndex+1].appendChild(this);
    //Det vi klickade på finns i this
    //Det har ett id som låter oss komma åt todoObj
    const id = this.id;
    todoObj[id].kanban += 1;
    console.log(todoObj);
    sparaNu();
    
        }
        
}

function deleteParent(ev)
{


    ev.stopPropagation();
    const parent = this.parentElement;
    const id = parent.id;
    const gp = parent.parentElement;
    gp.removeChild(parent);
    delete todoObj[id];
    console.log(todoObj);
    sparaNu();
}

function goBack(ev){

    
    ev.stopPropagation();
    const kanban = Array.from(document.getElementsByClassName("kanban"));
    let kanbanIndex = kanban.indexOf(this.parentElement.parentElement);
    if(kanbanIndex>0)
        { 
            kanban[kanbanIndex-1].appendChild(this.parentElement);
                    //Det vi klickade på finns i this.parentElement
    //Det har ett id som låter oss komma åt todoObj
    const id = this.parentElement.id;

    todoObj[id].kanban -= 1;
    console.log(todoObj);
     sparaNu();
  
        }
       
}

//helpers

function _classArr(cName){
    return Array.from(document.getElementsByClassName(cName));
}

function sparaNu(){ 
    var todoString = JSON.stringify(todoObj);
    localStorage.setItem("todo", todoString);
}