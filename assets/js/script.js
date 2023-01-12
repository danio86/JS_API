const API_KEY = "KyTuOGg7FZW-UR_SdFl2kFyjPTo";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));
//das ist eine Form die, die im Hintergrundl liegende Webseite ausblendet. Man kann Buttons in der Form anklicken

document.getElementById("status").addEventListener("click", e => getStatus(e));
// wenn der Button geklickt wird, wird eine Funktion aufgerufen. Diese muss erst geschrieben werden.
//Die Funktion soll GET request to the API_URL mit dem Key ausführen und
// it needs to pass this data to a function that will display it.

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