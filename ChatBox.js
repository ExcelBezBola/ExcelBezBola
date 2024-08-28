window.onload = function() {
    // Provjeri je li sesija već započeta
    if (!sessionStorage.getItem('welcomeMessageShown')) {
        sendWelcomeMessage(); // Prikaži poruku dobrodošlice ako nije prikazana
        sessionStorage.setItem('welcomeMessageShown', 'true'); // Označi da je poruka prikazana
    }
    // Učitaj prethodne poruke iz Local Storage-a prilikom učitavanja stranice
    loadPreviousMessages();
};

document.getElementById('send-button').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('minimize-button').addEventListener('click', function() {
    const chatboxContainer = document.getElementById('chatbox-container');
    const minimizeButton = document.getElementById('minimize-button');
    if (chatboxContainer.style.height === '40px') {
        chatboxContainer.style.height = '400px';
        minimizeButton.textContent = '−';
    } else {
        chatboxContainer.style.height = '40px';
        minimizeButton.textContent = '+';
    }
});

function sendWelcomeMessage() {
    const welcomeMessage = 'Dobrodošli u Capitaliu! Kako Vam možemo pomoći?';
    addMessageToChat('<b>Capitalia: </b>' + welcomeMessage, 'capitalia-message');
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    addMessageToChat('<b>Vi: </b>' + userInput, 'user-message');

    const responses = getResponse(userInput);
    responses.forEach(response => addMessageToChat('<b>Capitalia: </b>' + response, 'capitalia-message'));

    document.getElementById('user-input').value = '';
}

function addMessageToChat(message, messageType) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message; // Use innerHTML to render HTML content
    messageElement.className = messageType; // Add a class for styling
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the bottom

    // Save the current chat messages to Local Storage
    saveMessages();
}

function saveMessages() {
    const chatbox = document.getElementById('chatbox');
    // Get all messages in the chatbox
    const messages = chatbox.innerHTML;
    // Save messages to Local Storage
    localStorage.setItem('chatMessages', messages);
}

function loadPreviousMessages() {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
        const chatbox = document.getElementById('chatbox');
        chatbox.innerHTML = savedMessages; // Load saved messages
    }
}

function getResponse(userInput) {
    // Convert user input to lowercase for case-insensitive matching
    userInput = userInput.toLowerCase();

    // Define keyword-response pairs with flexible regex patterns
    const responses = [
        {
            pattern: /.*porez.*|.*odbit.*|.*pore.*|.*povrat.*|.*dvostruk.*|.*prijav.*|.*izbjeg.*|.*izbjeć.*/i,
            response: 'Naše usluge uključuju: Paket usluga za PDV sistem, Paket usluga za direktne poreze, Paket usluga za izbjegavanje dvostrukog oporezivanja, Paket usluga za godišnje porezne prijave, Porezno savjetovanje, Zastupanje u kontrolama i pomoć u žalbenom postupku, Transferne cijene i drugo. ' +
                      '<a href="https://www.capitalia.ba/porezi" target="_porezi">Detaljnije</a>'
        },
        {
            pattern: /.*nadzor.*|.*reviz.*|.*ispit.*/i,
            response: 'Nudimo sveobuhvatne usluge revizije. Molimo kontaktirajte nas za više detalja. ' +
                       '<a href="https://capitalia.ba/zakazi-konsultacije" target="_blank">Kontaktirajte nas.</a>'
        },

        {
            pattern: /.*cijen.*|.*košta.*|.*cjen.*|.*tarif.*/i,
            response: 'Cijene za sve naše usluge su definisane cjenovnikom koji polazi od minimalne cijene za pojedinu djelatnost, a kasnije se u zavisnosti od broja zaposlenika i rizika poslovanja definiše konačna cijena. Na upit vam možemo specificirati i ponuditi cijenu. ' +
                       '<a href="https://capitalia.ba/zakazi-konsultacije" target="_blank">Kontaktirajte nas.</a>'
        },


        {
            pattern: /.*slobodnj.*|.*freelanc.*|.*frilen.*/i,
            response: 'Nudimo pažljivo skrojene usluge za freelancere u BiH, prepustite svu dokumentaciju, poreze i brigu nama!. ' +
                       '<a href="https://capitalia.ba/zakazi-konsultacije" target="_blank">Kontaktirajte nas.</a>'
        },


        {
            pattern: /.*uslug.*|.*djelatnost.*|.*posa.*|.*bavimo.*|.*bavite.*|.*bavi.*|.*poslov.*/i,
            response: 'Naš posao je da evidentiramo sve poslovne promjene koje se dogode u preduzeću i načinimo različite porezne i računovodstvene izvještaje. Najkraće, to su sljedeće mjesečne aktivnosti: knjigovodstvena obrada dokumenata, kontiranje i knjiženje, vođenje KUF-a i KIF-a, izrada PDV-prijave, predaja prijave Upravi za indirektno oporezivanje, obračun plaće sa propisanim obrascima i nalozima za plaćanje, predaja prijava uz isplatu plaća Poreznoj upravi, izrada finansijskih izvještaja, poslovno i porezno savjetovanje. ' +
                       '<a href="https://capitalia.ba/zakazi-konsultacije" target="_blank">Kontaktirajte nas.</a>'
        },


        {
            pattern: /.*direktor.*|.*menadžer.*|.*vlasnik.*|.*šef.*|.*menađer.*|.*gazda.*|.*glavni.*/i,
            response: 'Nedim Haverić. ' +
                      '<a href="https://www.linkedin.com/in/nedim-haveric-b5317656/" target="_blank">Detaljnije o njemu</a>'
        },
        {
            pattern: /.*račun.*|.*knjig.*|.*izvješ.*/i,
            response: 'Naše računovodstvene usluge uključuju vođenje knjiga, finansijske izvještaje itd. . ' +
                      '<a href="https://www.capitalia.ba/racunovodstvo" target="_racunovodstvo">Detaljnije</a>'
        }
    ];

    // Initialize an array to collect responses
    const responsesToReturn = [];

    // Check user input against defined regex patterns
    responses.forEach(item => {
        if (item.pattern.test(userInput)) {
            responsesToReturn.push(item.response);
        }
    });

    // Return collected responses or a default response if no matches are found
    return responsesToReturn.length > 0 ? responsesToReturn : ['Žao mi je, ali ne razumijem pitanje.'];
}
