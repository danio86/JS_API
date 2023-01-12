const API_KEY = 'KyTuOGg7FZW-UR_SdFl2kFyjPTo';
const API_URL = 'https://ci-jshint.herokuapp.com/api';
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));
//das ist eine Form die, die im Hintergrundl liegende Webseite ausblendet. Man kann Buttons in der Form anklicken

document.getElementById('status').addEventListener('click', e=> getStatus(e));
// wenn der Button geklickt wird, wird eine Funktion aufgerufen. Diese muss erst geschrieben werden.
//Die Funktion soll GET request to the API_URL mit dem Key ausführen und
// it needs to pass this data to a function that will display it.

async function getStatus(e) {
// async ist eine Alternative zu then.-Methode. Ein Promise wird abgewartet
// und das Programm läft nebenbei weiter.
    const queryString = `${API_URL}?api_key={API_KEY}`;
    //const queryString = ${API_URL}?API_KEY={API_KEY};
    const response = await fetch(queryString);
    // fezch ist die Standart API für API-Abfragen. Hier ist der Key schon dabei
    // jetzt muss die Response zu Json konvertiert werden.
    // das ist auch eine Abfrage (Promice) auf die gewartet werden muss.
    const data = await response.json();

    if(response.ok) {
        // ok ist ein Status-Property der API Abfrage (if Status = ok is true)
        // wenn der HTTP Statuscode ist == 200 dann Status-Property = ok
        console.log(data)
    }
}




