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
    }

}
//login modal box appears on click
loginBtn.addEventListener("click",()=>{
    modalController.open("loginModal");      
})
signUpBtn.addEventListener("click",()=>{
    modalController.open("signUpModal"); 
    
})


// newModuleBtn.addEventListener("click",()=>{
//     const tbody = document.getElementById("progressTableBody");
//     const newModuleRow = document.createElement("tr");
//     newModuleRow.innerHTML=`
  
//         <td><input type="text" placeholder="Module name"></td>
//         <td><input type="text" placeholder="Section"></td>
//         <td><input type="text" placeholder="Course"></td>

//         <td>
//             <select name="progress">
//             <option value="notStarted">Not Started</option>
//             <option value="inProgress">In Progress</option>
//             <option value="needsReview">Lesson Needs Review</option>
//             <option value="confident">Lesson Complete: Confident</option>
//             </select>
//         </td>

//         <td><input type="date" name="dateUpdate"></td>

//         <td>
//             <label for="noteCheckbox"></label><br>
//             <input type="checkbox" class="dailyNoteChecked" id="tool3" name="check" value="dailyNotes">
            
//         </td>
//         <td><button>Save</button></th>`;
//     tbody.appendChild(newModuleRow);
    
//         const saveEditToggle = document.createElement("button");
//         saveEditToggle.textContent="Save";
//     if(!saveEditToggle){
//         progressTableButtons.appendChild(saveEditToggle);
//     }


// });
            
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

