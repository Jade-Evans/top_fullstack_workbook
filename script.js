/* =========================================================
   TABLE OF CONTENTS
   =========================================================
   1. GLOBAL — DOM REFERENCES
   2. GLOBAL — DATE/TIME WIDGET

   3. INDEX (Landing Page)
      3.1 DOM REFERENCES
      3.2 Modal Controller
      3.3 Event Listeners

   4. DASHBOARD
      4.1 DOM REFERENCES
      4.2 Add New Module Row
      4.3 Save Row to Local Storage
      4.4 Load Saved Modules on Page Load
      4.5 Edit / Save Changes / Delete

   5. OPTIONAL / COMMENTED FEATURES
      5.1 Pikaday Calendar
      5.2 Dashboard Tool Checkbox Logic
========================================================= */

/* =========================================================
   GLOBAL — DOM REFERENCES
   ========================================================= */
const dashboardToolsArray = Array.from(document.querySelectorAll(".dashboardTool"));
const dashboardToolKit = document.querySelector("#dashboardToolKit");


/* =========================================================
   GLOBAL — DATE/TIME WIDGET
   ========================================================= */
function updateDateTimeEachSecond() {
    const currentDateTime = new Date();
    readableDateTime = currentDateTime.toLocaleString("en-GB");
    const dateTime = document.querySelector(".currentDateTime");
    dateTime.textContent = readableDateTime;
}

updateDateTimeEachSecond();
setInterval(updateDateTimeEachSecond, 1000);


/* =========================================================
   INDEX — DOM REFERENCES (Landing Page + Modals)
   ========================================================= */
const modalBtns = Array.from(document.querySelectorAll(".modalButtonsDiv button"));
const loginBtn = document.getElementById("loginButton");
const signUpBtn = document.getElementById("signUpButton");
const landingPageMain = document.getElementById("landingPageMain");
const closeBtns = Array.from(document.querySelectorAll(".closeButton"));
const createAccountSubmitBtn = document.getElementById("createAccountSubmitBtn");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
const proceedToDashboardBtn = document.getElementById("proceedToDashboardBtn");


/* =========================================================
   INDEX — MODAL CONTROLLER
   ========================================================= */
const modalController = {
    overlay: document.getElementById("overlayWrapper"),
    modals: {
        signUpModal: document.getElementById("signUpModal"),
        loginModal: document.getElementById("loginModal"),
        actionCompleteModal: document.getElementById("actionCompleteModal"),
    },

    open(modalName) {
        this.overlay.style.display = "flex";
        this.overlay.style.justifyContent = "center";

        this.modals[modalName].style.display = "flex";
        this.modals[modalName].style.flexDirection = "column";
        this.modals[modalName].style.justifyContent = "center";
        this.modals[modalName].style.alignContent = "center";
    },

    close() {
        this.overlay.style.display = "none";
        Object.values(this.modals).forEach(modal => {
            modal.style.display = "none";
        });
    }
};


/* =========================================================
   INDEX — EVENT LISTENERS
   ========================================================= */
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        modalController.open("loginModal");
    });
}

if (signUpBtn) {
    signUpBtn.addEventListener("click", () => {
        modalController.open("signUpModal");
    });
}

if (createAccountSubmitBtn) {
    createAccountSubmitBtn.addEventListener("click", () => {
        modalController.close("signUpModal");
        modalController.open("actionCompleteModal");
    });
}

if (closeBtns) {
    closeBtns.forEach(button => {
        button.addEventListener("click", () => {
            modalController.close();
        });

        if (proceedToDashboardBtn) {
            proceedToDashboardBtn.addEventListener("click", () => {
                modalController.close();
            });
        }
    });
}


/* =========================================================
   DASHBOARD — DOM REFERENCES
   ========================================================= */
const dashboardWorkspace = document.getElementById("dashboardWorkspace");
const progressTrackerTable = document.getElementById("progressTrackerTable");
const progressTrackerTableButtons = document.getElementById("progressTrackerButtons");
const newModuleBtn = document.getElementById("createNewModule");


/* =========================================================
   DASHBOARD — ADD NEW MODULE ROW
   ========================================================= */
if (newModuleBtn) {
    newModuleBtn.addEventListener("click", () => {
        const tbody = document.getElementById("progressTrackerTableBody");
        const newModuleRow = document.createElement("tr");

        newModuleRow.innerHTML = `
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
            <td><button class="saveRowBtn">Save</button></td>
        `;

        tbody.appendChild(newModuleRow);

        const saveRowBtn = newModuleRow.querySelector(".saveRowBtn");
        saveRowBtn.addEventListener("click", () => saveRow(newModuleRow));
    });
}


/* =========================================================
   DASHBOARD — SAVE ROW TO LOCAL STORAGE
   ========================================================= */
function saveRow(row) {
    const moduleName = row.querySelector("td:nth-child(1) input").value;
    const section = row.querySelector("td:nth-child(2) input").value;
    const course = row.querySelector("td:nth-child(3) input").value;
    const progress = row.querySelector("td:nth-child(4) select").value;
    const dateUpdated = row.querySelector("td:nth-child(5) input").value;
    const dailyNoteChecked = row.querySelector("td:nth-child(6) input").checked;

    const moduleData = {
        id: crypto.randomUUID(),
        moduleName,
        section,
        course,
        progress,
        dateUpdated,
        dailyNoteChecked
    };

    const stored = JSON.parse(localStorage.getItem("modules")) || [];
    stored.push(moduleData);
    localStorage.setItem("modules", JSON.stringify(stored));

    row.dataset.id = moduleData.id;

    row.innerHTML = `
        <td><a href="modules_template.html?moduleId=${moduleData.id}">${moduleName}<</td>
        <td>${section}</td>
        <td>${course}</td>
        <td>${progress}</td>
        <td>${dateUpdated}</td>
        <td>${dailyNoteChecked ? "✓" : ""}</td>
        <td><button class="editRowBtn">Edit</button></td>
        <td><button class="saveChangesBtn">Save Changes</button></td>
        <td><button class="deleteRowBtn">Delete</button></td>
    `;

    row.querySelector(".editRowBtn").addEventListener("click", () => editRow(row));
    row.querySelector(".saveChangesBtn").addEventListener("click", () => saveChanges(row));
    row.querySelector(".deleteRowBtn").addEventListener("click", () => deleteRow(row));
}


/* =========================================================
   DASHBOARD — LOAD SAVED MODULES ON PAGE LOAD
   ========================================================= */
const tbody = document.getElementById("progressTrackerTableBody");
const stored = JSON.parse(localStorage.getItem("modules")) || [];

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
        <td><button class="saveChangesBtn">Save Changes</button></td>
        <td><button class="deleteRowBtn">Delete</button></td>
    `;

    row.dataset.id = module.id;

    if (tbody) {
        tbody.appendChild(row);
    }

    const deleteRowBtn = row.querySelector(".deleteRowBtn");
    deleteRowBtn.addEventListener("click", () => deleteRow(row));
});


/* =========================================================
   DASHBOARD — EDIT / SAVE CHANGES / DELETE
   ========================================================= */
function editRow(row) {
    const rowCells = row.querySelectorAll("td");
    rowCells[3].innerHTML = `<input value=${rowCells[3].textContent}>`;
    rowCells[4].innerHTML = `<input value=${rowCells[4].textContent}>`;
    rowCells[5].innerHTML = `<input value=${rowCells[5].textContent}>`;
}

function saveChanges(row) {}

function deleteRow(row) {
    const id = row.dataset.id;
    const stored = JSON.parse(localStorage.getItem("modules"));
    const updated = stored.filter(item => item.id !== id);
    localStorage.setItem("modules", JSON.stringify(updated));
    row.remove();
}


/* =========================================================
   (OPTIONAL) DASHBOARD — PIKADAY CALENDAR (COMMENTED OUT)
   ========================================================= */
// const picker = new Pikaday({
//   field: document.getElementById('calendarInput'),
//   format: 'D MMM YYYY',
//   firstDay: 1,
//   theme: 'dark-theme',
// });


/* =========================================================
   (OPTIONAL) DASHBOARD — TOOL CHECKBOX LOGIC (COMMENTED OUT)
   ========================================================= */
// dashboardToolsArray.forEach(dashboardTool => {
//     dashboardTool.addEventListener("change", () => {
//         let checkedDashboardTool = dashboardTool.checked;
//     });
// });