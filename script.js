const dashboardToolsArray = Array.from(document.querySelectorAll(".dashboardTool"));
const dashboardToolKit = document.querySelector("#dashboardToolKit");
function updateDateTimeEachSecond(){
    const currentDateTime = new Date();
    readableDateTime= currentDateTime.toLocaleString("en-GB");
    const dateTime = document.querySelector(".currentDateTime");
    dateTime.textContent = readableDateTime;
}
updateDateTimeEachSecond();
setInterval(updateDateTimeEachSecond, 1000);


//LANDING PAGE & MODAL BUTTONS//
const modalBtns = Array.from(document.querySelectorAll(".modalButtonsDiv button"));
const loginBtn = document.getElementById("loginButton");
const signUpBtn = document.getElementById("signUpButton");
const landingPageMain = document.getElementById("landingPageMain");
const closeBtns = Array.from(document.querySelectorAll(".closeButton"));


//DASHBOARD:
const dashboardWorkspace = document.getElementById("dashboardWorkspace");
const progressTable = document.getElementById("progressTable");
const progressTableButtons = document.getElementById("progressTableButtons");
const newModuleBtn = document.getElementById("createNewModule");

//object for modalController//
const modalController ={
    overlay: document.getElementById("overlayWrapper"),
    modals: {
        signUpModal: document.getElementById("signUpModal"),
        loginModal:document.getElementById("loginModal"),
    },
    //a function within the modalController Object for managing opening behaviour://
    open(modalName){//modal name will refer to one of the names in modals key above i.e. signUpModal, loginModal, and called with related button click EL//
        //BEHAVIOUR: display the overlay for the modalController object//
        this.overlay.style.display="flex";
        this.overlay.style.justifyContent="center";
        //BEHAVIOUR: display the modal as defined in modals linking open("x") with this.modals[x].style....//
        this.modals[modalName].style.display="flex";
        this.modals[modalName].style.justifyContent="center";
        this.modals[modalName].style.alignContent="center";
    },
    close(){
        this.overlay.style.display="none";
        Object.values(this.modals).forEach(modal=>{
            modal.style.display="none";
    })

}}
//login modal box appears on click
if(loginBtn){
loginBtn.addEventListener("click",()=>{
    modalController.open("loginModal");      
})}
if(signUpBtn){
signUpBtn.addEventListener("click",()=>{
    modalController.open("signUpModal");    
})}
if(closeBtns){
closeBtns.forEach(button=>{
    button.addEventListener("click",()=>{
        modalController.close();
    })
})}


newModuleBtn.addEventListener("click",()=>{
    const tbody = document.getElementById("progressTableBody");
    const newModuleRow = document.createElement("tr");
    newModuleRow.innerHTML=`
  
        <td><input type="text" placeholder="Module name"></td>
        <td><input type="text" placeholder="Section"></td>
        <td><input type="text" placeholder="Course"></td>

        <td>
            <select name="progress">
            <option value="notStarted">Not Started</option>
            <option value="inProgress">In Progress</option>
            <option value="needsReview">Lesson Needs Review</option>
            <option value="confident">Lesson Complete: Confident</option>
            </select>
        </td>

        <td><input type="date" name="dateUpdate"></td>

        <td>
            <label for="noteCheckbox"></label><br>
            <input type="checkbox" class="dailyNoteChecked" id="tool3" name="check" value="dailyNotes">
            
        </td>
        <td><button class="saveRowBtn">Save</button></th>`;
    tbody.appendChild(newModuleRow);
    const saveRowBtn = newModuleRow.querySelector(".saveRowBtn");//create a variable to refer to the save row buttons created above//
    saveRowBtn.addEventListener("click", ()=>saveRow(newModuleRow)); //add EL to run saveRow fn on that row when that saverow button is clicked//
});
       
//Logic for saving progress table (dashboard) data rows to local Storage using Save button):
//create the function to be repeatedly used for Save row button//
function saveRow(row){
    //assign a variable to the data in each td for the row//
    const  moduleName = row.querySelector("td:nth-child(1) input").value;
    const section = row.querySelector("td:nth-child(2) input").value;
    const course = row.querySelector("td:nth-child(3) input").value;  
    const progress = row.querySelector("td:nth-child(4) select").value;          
    const dateUpdated = row.querySelector("td:nth-child(5) input").value;
    const dailyNoteChecked = row.querySelector("td:nth-child(6) input").checked;
    //create an object to store all the moduleData//
    const moduleData = {
        id: crypto.randomUUID(), //generates unique ID for each object helpful when editing/deleting specific rows//
        moduleName,
        section,
        course,
        progress,
        dateUpdated,
        dailyNoteChecked
    }
    //for the below, when the function saveRow runs, the browser looks in local storage and retrieves any
    //"modules" data. NB there wont be any the first save, so it will return null or [] as per below. We
    //add "modules" when saving. localStorage will always return strings, so JSON.parse is used to convert those to 
    //readable arrays so we have an array of module objects eventually. 
    const stored = JSON.parse(localStorage.getItem("modules")) || [];//The [] are empty array brackets returned so we can push
    //the new moduleData into them://
    stored.push(moduleData);
    localStorage.setItem("modules", JSON.stringify(stored));
    row.dataset.id = moduleData.id;
    console.log("Saved: ", moduleData);
}

//FUNCTION TO RETRIEVE SAVED DATA FROM LOCAL STORAGE UPON PAGE LOAD//
const tbody = document.getElementById("progressTableBody");
const stored = JSON.parse(localStorage.getItem("modules")) ||[];

    stored.forEach(module => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${module.moduleName}</td>
            <td>${module.section}</td>
            <td>${module.course}</td>
            <td>${module.progress}</td>
            <td>${module.dateUpdated}</td>
            <td>${module.dailyNoteChecked ? "✓" : ""}</td>
            <td><button class="editRowBtn">Edit</button></td>
            <td><button class="deleteRowBtn">Delete</button></td>
        `;
        row.dataset.id = module.id;

        tbody.appendChild(row);
        const deleteRowBtn = row.querySelector(".deleteRowBtn");
        deleteRowBtn.addEventListener("click", ()=>deleteRow(row));
    });

    function deleteRow(row){
        const id = row.dataset.id;
        const stored = JSON.parse(localStorage.getItem("modules"));//retrieve existing module data//
        const updated = stored.filter(item => item.id === id);//makes a new array WITHOUT the row matching this id//
        localStorage.setItem("modules", JSON.stringify(updated));//save updated to local storage. 
        row.remove();//UI removal
    }


// //Pikaday Calendar logic:
// const picker = new Pikaday({
//   field: document.getElementById('calendarInput'),
//   format: 'D MMM YYYY',
//   firstDay: 1, // Monday start (UK-friendly)
//   theme: 'dark-theme', // optional custom class
// });
    
// //DASHBOARD LOGIC//

// dashboardToolsArray.forEach(dashboardTool=>{
//     dashboardTool.addEventListener("change",()=>{
//         let checkedDashboardTool = dashboardTool.checked;
//     })
// })

