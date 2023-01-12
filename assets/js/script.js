const API_KEY = "KyTuOGg7FZW-UR_SdFl2kFyjPTo";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));
//das ist eine Form die, die im Hintergrundl liegende Webseite ausblendet. Man kann Buttons in der Form anklicken

document.getElementById("status").addEventListener("click", e => getStatus(e));
// wenn der Button geklickt wird, wird eine Funktion aufgerufen. Diese muss erst geschrieben werden.
//Die Funktion soll GET request to the API_URL mit dem Key ausführen und
// it needs to pass this data to a function that will display it (getStatus).

document.getElementById('submit').addEventListener('click', e => postForm(e));

////////////Mit dieser Funktion werden die Options in einer Liste dargestellt.
/// Die API braucht das
function processOptions(form) {
    let optArray = [];

    for (let e of form.entries()) {
        if (e[0] === "options") {
            optArray.push(e[1]);
        }
    }

    form.delete("options");

    form.append("options", optArray.join());

    return form;
}

async function postForm(e) {
    //aus der API Dokumentation (https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects)
    const form = processOptions(new FormData(document.getElementById("checksform")));
    // new FormData is eine js - Funktio um eine Form zu kreiren
    for (entry in form.entries()) {
        //eine Form hat viele Entries > entries-Methode nur um zu checken ob die Funktion funktioniert
        console.log(entry)
        }
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });

    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}

function displayErrors(data) {

    let results = "";

    let heading = `JSHint Results for ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    //Sets the heading in the modal
    document.getElementById("results-content").innerHTML = results;
    //Sets the contend in the Modal
    resultsModal.show();
    //Shows the Modal
}

async function getStatus(e) {
// async ist eine Alternative zu then.-Methode. Ein Promise wird abgewartet
// und das Programm läft nebenbei weiter.
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);
    // fezch ist die Standart API für API-Abfragen. Hier ist der Key schon dabei
    // jetzt muss die Response zu Json konvertiert werden.
    // das ist auch eine Abfrage (Promice) auf die gewartet werden muss.
    const data = await response.json();

    if (response.ok) {
        //console.log(data.expiry); // das gibt nur das Datum in der Comand-line
        // dadurch siehr man ob die API funktioniert und ob errors gefangen werden
        // wenn wir das gecheckt haben, können wir durch display funkt austauschen.
        displayStatus(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}
        // ok ist ein Status-Property der API Abfrage (if Status = ok is true)
        // wenn der HTTP Statuscode ist == 200 dann Status-Property = ok



function displayStatus(data) {

    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}


function displayException(data) {

    let heading = `An Exception Occurred`;

    results = `<div>The API returned status code ${data.status_code}</div>`;
    results += `<div>Error number: <strong>${data.error_no}</strong></div>`;
    results += `<div>Error text: <strong>${data.error}</strong></div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}

//https://ci-jshint.herokuapp.com/