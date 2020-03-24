const submitButton = document.getElementById('submitButton');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotOutput = document.getElementById('chatbotOutput');
var taskLen;


submitButton.onclick = userSubmitEventHandler;
chatbotInput.onkeyup = userSubmitEventHandler;



function userSubmitEventHandler(event) {
    if ((event.keyCode && event.keyCode === 13) ||
        event.type === 'click') {
        
        event.stopPropagation();
        var task = chatbotInput.value;
        chatbotInput.value = ''; 
        createTask(task);

    }
}

function getName(task) {
    const myRequest = new Request('/', {
        method: 'POST',
        body: 'getName',
    });
    fetch(myRequest).then(function(response) {  //
        if (!response.ok) {
            console.log("err")
            throw new Error('HTTP error, status = ' + response.status);
        } else {
            console.log("name");
            return response;
        }
    }).then(response => response.text())
    .then(function(name) {
        var introMsg = "Hey, " + name + "! What would you like to do?"
        document.getElementById("introText").innerHTML = introMsg;

    }).catch((err) => {
        console.error(err);
    });
}


function createTask(task) {
    const myRequest = new Request('/', {
        method: 'POST',
        body: task,
        
    });
    fetch(myRequest).then(function(response) {  //
        if (!response.ok) {
            console.log("err")
            throw new Error('HTTP error, status = ' + response.status);
        } else {
            console.log("G");
            // getTasks();
            if(task != ''){
                var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
                var newRow = tableRef.insertRow(0);
                var newCell = newRow.insertCell(0);
                var newButton = document.createElement("button");
                newButton.setAttribute("id", taskLen.toString(10));
                addEvent(newButton, taskLen);
                var newText = document.createTextNode(task);
                var newSpan = document.createElement("span");
                newSpan.append(newButton)
                newCell.append(newSpan);
                newButton.append(newText);
            }
            
            
            return response;

        }
    }).catch((err) => {
        console.error(err);
    });
}

function deleteTask(task) {
    const myRequest = new Request('/', {
        method: 'POST',
        body: task,
    });
    fetch(myRequest).then(function(response) {  //
        if (!response.ok) {
            console.log("err")
            throw new Error('HTTP error, status = ' + response.status);
        } else {
            console.log("G");
            taskLen = taskLen - 1;
            getTasks();
        }
    }).catch((err) => {
        console.error(err);
    });
}


function getTasks() {
    const myRequest = new Request('/', {
        method: 'POST',
        body: '',
        
    });
    fetch(myRequest).then(function(response) {  //
        if (!response.ok) {
            console.log("err")
            throw new Error('HTTP error, status = ' + response.status);
        } else {
            console.log("G");
            return response;
        }
    }).then(response => response.json())
    .then(function(json_string) {
        // chatbotInput.value = '';
        // chatbotOutput.innerText = '';
        console.log(typeof(json_string));
        console.log(json_string);
        console.log(json_string[0]);
        var i;
        // var old_body = document.getElementById('myTable').getElementsByTagName('tbody');
        var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];

        for(i = 0; i < tableRef.rows.length; i++) {
            tableRef.textContent = '';
        }
        taskLen = json_string.length;
        for(i = 0; i < json_string.length; i++) {
            var newRow = tableRef.insertRow(0);
            var newCell = newRow.insertCell(0);
            var newButton = document.createElement("button");
            newButton.setAttribute("id", i.toString(10));

            addEvent(newButton, i);

            var newText = document.createTextNode(json_string[i].content);
            var newSpan = document.createElement("span");
            newSpan.append(newButton)
            newCell.append(newSpan);
            newButton.append(newText);
            
        }
        getName();


    }).catch((err) => {
        console.error(err);
    });
}

function addEvent(newButton, i){
    
    if (typeof window.addEventListener === 'function'){
        (function (_newButton) {
            newButton.addEventListener("click", function(){
                newButton.innerText = "Task Deleted";
                newButton.style.setProperty("color", "#c45e5e");
                newButton.style.setProperty("font-weight", "bolder");
                deleteTask(i);
                console.log(i);
            });
        }) (newButton);
    }

}


