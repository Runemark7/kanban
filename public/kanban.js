
// inläsning av viktiga element
const newTaskButton = document.getElementById("newTaskButton");

// Lägg till lyssnare till element
newTaskButton.addEventListener("click", saveNewTask);
var date = new Date();

function saveNewTask(){
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
            var todo = document.getElementsByClassName("kanban")[0];
        todo.appendChild(newTemplate);
    }

}

function toNext(){
    // hämta kanban klassen och gör om den till en array
    const kanban = Array.from(document.getElementsByClassName("kanban"));
    let kanbanIndex = kanban.indexOf(this.parentElement);
    if(kanbanIndex+1<kanban.length)
        { 
            kanban[kanbanIndex+1].appendChild(this);
        }
}

function deleteParent(ev)
{

    ev.stopPropagation();
    const parent = this.parentElement;
    const gp = parent.parentElement;
    gp.removeChild(parent);

}

function goBack(ev){
    ev.stopPropagation();
    const kanban = Array.from(document.getElementsByClassName("kanban"));
    let kanbanIndex = kanban.indexOf(this.parentElement.parentElement);
    if(kanbanIndex>0)
        { 
            kanban[kanbanIndex-1].appendChild(this.parentElement);
        }
}

//helpers

function _classArr(cName){
    
    return Array.from(document.getElementsByClassName(cName));


}