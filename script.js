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




//DASHBOARD:
const dashboardWorkspace = document.getElementById("dashboardWorkspace");
const progressTable = document.getElementById("progressTable");
const progressTableButtons = document.getElementById("progressTableButtons");
const newModuleBtn = document.getElementById("createNewModule");
const loginBtn = document.getElementById("loginButton");
const signupBtn = document.getElementById("signupButton");
const signupModal = document.getElementById("signupModal");
const loginModal = document.getElementById("loginModal");
const landingPageMain = document.getElementById("landingPageMain");
const overlayWrapper = document.getElementById("overlayWrapper");


//login modal box appears on click
loginBtn.addEventListener("click",()=>{
    overlayWrapper.style.display="flex";
    loginModal.style.display="flex";
    
})
signupBtn.addEventListener("click",()=>{
    overlayWrapper.style.display="flex";
    signupModal.style.display="flex";
    
})

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
        <td><button>Save</button></th>`;
    tbody.appendChild(newModuleRow);
    
        const saveEditToggle = document.createElement("button");
        saveEditToggle.textContent="Save";
    if(!saveEditToggle){
        progressTableButtons.appendChild(saveEditToggle);
    }


});
            
//Pikaday Calendar logic:
const picker = new Pikaday({
  field: document.getElementById('calendarInput'),
  format: 'D MMM YYYY',
  firstDay: 1, // Monday start (UK-friendly)
  theme: 'dark-theme', // optional custom class
});
    


