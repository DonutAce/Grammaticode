let choice = "";

function selectGame(gameName) {
    choice = gameName;

    // Remove selection highlight from all cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selection highlight to the clicked card
    if (gameName === 'hangman') {
        document.getElementById('card-hangman').classList.add('selected');
    } else if (gameName === 'picker') {
        document.getElementById('card-picker').classList.add('selected');
    }
}

function confirmSelection() {
    if (choice === "hangman") {
        window.location.href = "hangman.html";
    } 
    else if (choice === "picker") {
        // This will now take you to your Name Picker page
        window.location.href = "name_picker.html"; 
    } 
    else {
        alert("Please select a game first!");
    }
}

function goBack() {
    // Redirection for the back button to home
    window.location.href = "home.html";
}