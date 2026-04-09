import { collection, addDoc, getDocs, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { db } from "./firebase.js";

const PLAYER_NAME_STORAGE_KEY = "grammarticodePlayerName";
const HANGMAN_GAME_PREFIX = "hangman-";
const maxGuesses = 6;

const languageMeta = {
    html: { label: "HTML" },
    css: { label: "CSS" },
    java: { label: "Java" },
    javascript: { label: "JavaScript" }
};

let hangmanImage;
let wordDisplay;
let guessesText;
let keyboardDiv;
let gameModal;
let playAgainBtn;
let hintTextValue;

let currentWord = "";
let currentHint = "";
let wrongGuessCount = 0;
let revealedCount = 0;
let guessedLetters = new Set();
let roundCorrectGuesses = 0;
let roundWrongGuesses = 0;
let roundComplete = false;

let playerName = "";
let hangmanLanguage = "html";
let hangmanLangKey = `${HANGMAN_GAME_PREFIX}html`;
let hangmanLabel = languageMeta.html.label;

const sessionStats = {
    score: 0,
    correctGuesses: 0,
    wrongGuesses: 0,
    wins: 0,
    losses: 0
};

function getPageLanguage() {
    const fileName = window.location.pathname.split("/").pop().toLowerCase();

    if (fileName.startsWith("css")) return "css";
    if (fileName.startsWith("java")) return "java";
    if (fileName.startsWith("js")) return "javascript";
    return "html";
}

function getHangmanImageSource(wrongCount) {
    return wrongCount === 0
        ? "hangman0.svg"
        : `hangman-${wrongCount}.svg`;
}

function sanitizePlayerName(value) {
    return String(value || "").trim().slice(0, 40);
}

function loadStoredPlayerName() {
    const savedName = sanitizePlayerName(localStorage.getItem(PLAYER_NAME_STORAGE_KEY));
    playerName = savedName || "";
    updatePlayerNameUI();
}

function createDashboard() {
    const container = document.querySelector(".container");
    if (!container || document.getElementById("hangman-dashboard")) return;

    const dashboard = document.createElement("section");
    dashboard.id = "hangman-dashboard";
    dashboard.className = "hangman-dashboard";
    dashboard.innerHTML = `
        <section class="hangman-session-panel">
            <div class="hangman-panel-header">
                <h2>Hangman Stats</h2>
            </div>
            <p class="hangman-player-name">Player: <strong id="hangman-player-name">Not set</strong></p>
            <div class="hangman-stat-grid">
                <article class="hangman-stat-card">
                    <span class="hangman-stat-label">Session Points</span>
                    <strong id="hangman-session-score">0</strong>
                </article>
                <article class="hangman-stat-card">
                    <span class="hangman-stat-label">Correct Guesses</span>
                    <strong id="hangman-session-correct">0</strong>
                </article>
                <article class="hangman-stat-card">
                    <span class="hangman-stat-label">Wrong Guesses</span>
                    <strong id="hangman-session-wrong">0</strong>
                </article>
                <article class="hangman-stat-card">
                    <span class="hangman-stat-label">Wins / Losses</span>
                    <strong id="hangman-session-record">0 / 0</strong>
                </article>
            </div>
        </section>
        <section class="hangman-leaderboard-panel">
            <div class="hangman-panel-header">
                <h2 id="hangman-leaderboard-title">${hangmanLabel} Hangman Top 50</h2>
            </div>
            <p id="hangman-leaderboard-label" class="hangman-leaderboard-label">Points here also count in the shared Top 50.</p>
            <ul id="hangman-leaderboard-list" class="hangman-leaderboard-list"></ul>
        </section>
    `;

    container.insertAdjacentElement("afterend", dashboard);
}

function updatePlayerNameUI() {
    const playerNameNode = document.getElementById("hangman-player-name");
    if (playerNameNode) {
        playerNameNode.textContent = playerName || "Not set";
    }
}

function updateSessionStatsUI() {
    const scoreNode = document.getElementById("hangman-session-score");
    const correctNode = document.getElementById("hangman-session-correct");
    const wrongNode = document.getElementById("hangman-session-wrong");
    const recordNode = document.getElementById("hangman-session-record");

    if (scoreNode) scoreNode.textContent = String(sessionStats.score);
    if (correctNode) correctNode.textContent = String(sessionStats.correctGuesses);
    if (wrongNode) wrongNode.textContent = String(sessionStats.wrongGuesses);
    if (recordNode) recordNode.textContent = `${sessionStats.wins} / ${sessionStats.losses}`;
}

function resetRoundState() {
    guessedLetters = new Set();
    wrongGuessCount = 0;
    revealedCount = 0;
    roundCorrectGuesses = 0;
    roundWrongGuesses = 0;
    roundComplete = false;
}

function resetGame() {
    resetRoundState();
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    hangmanImage.src = getHangmanImageSource(wrongGuessCount);
    keyboardDiv.querySelectorAll("button").forEach((button) => {
        button.disabled = false;
    });
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

function getRandomWord() {
    const words = Array.isArray(globalThis.wordList) ? globalThis.wordList : [];
    if (!words.length) {
        throw new Error("Hangman word list is not available on this page.");
    }

    const { word, hint } = words[Math.floor(Math.random() * words.length)];
    currentWord = String(word || "").trim().toLowerCase();
    currentHint = String(hint || "").trim();
    hintTextValue.innerText = currentHint;
    resetGame();
}

function calculateRoundPoints(isVictory) {
    const accuracyBonus = Math.max(0, (maxGuesses - roundWrongGuesses) * 5);
    const correctGuessPoints = roundCorrectGuesses * 10;
    const victoryBonus = isVictory ? 25 : 0;
    const missPenalty = isVictory ? 0 : roundWrongGuesses * 2;
    return Math.max(0, correctGuessPoints + accuracyBonus + victoryBonus - missPenalty);
}

async function saveHangmanResult(roundData) {
    if (!playerName) {
        const leaderboardLabel = document.getElementById("hangman-leaderboard-label");
        if (leaderboardLabel) {
            leaderboardLabel.textContent = `Enter your name first so ${hangmanLabel} hangman scores can be saved to Firebase for your user.`;
        }
        return;
    }

    try {
        const usersRef = collection(db, "users");
        const existingResultQuery = query(
            usersRef,
            where("name", "==", playerName),
            where("lang", "==", hangmanLangKey),
            where("game", "==", "hangman")
        );
        const snapshot = await getDocs(existingResultQuery);

        if (!snapshot.empty) {
            const docRef = snapshot.docs[0].ref;
            const data = snapshot.docs[0].data();
            await updateDoc(docRef, {
                score: (data.score || 0) + roundData.points,
                correctGuesses: (data.correctGuesses || 0) + roundData.correctGuesses,
                wrongGuesses: (data.wrongGuesses || 0) + roundData.wrongGuesses,
                wins: (data.wins || 0) + roundData.wins,
                losses: (data.losses || 0) + roundData.losses,
                updatedAt: new Date()
            });
            return;
        }

        await addDoc(usersRef, {
            name: playerName,
            game: "hangman",
            lang: hangmanLangKey,
            baseLang: hangmanLanguage,
            score: roundData.points,
            correctGuesses: roundData.correctGuesses,
            wrongGuesses: roundData.wrongGuesses,
            wins: roundData.wins,
            losses: roundData.losses,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    } catch (error) {
        console.error("Error saving hangman result:", error);
    }
}

async function loadHangmanLeaderboard() {
    const leaderboardList = document.getElementById("hangman-leaderboard-list");
    const leaderboardTitle = document.getElementById("hangman-leaderboard-title");
    const leaderboardLabel = document.getElementById("hangman-leaderboard-label");

    if (!leaderboardList || !leaderboardTitle || !leaderboardLabel) {
        return;
    }

    leaderboardTitle.textContent = `${hangmanLabel} Hangman Top 50`;
    leaderboardList.innerHTML = `<li class="hangman-empty">Loading leaderboard...</li>`;

    try {
        const hangmanQuery = query(
            collection(db, "users"),
            where("lang", "==", hangmanLangKey),
            where("game", "==", "hangman")
        );
        const querySnapshot = await getDocs(hangmanQuery);
        const rows = querySnapshot.docs
            .map((docSnapshot) => docSnapshot.data())
            .sort((a, b) => {
                if ((b.score || 0) !== (a.score || 0)) return (b.score || 0) - (a.score || 0);
                if ((b.correctGuesses || 0) !== (a.correctGuesses || 0)) return (b.correctGuesses || 0) - (a.correctGuesses || 0);
                return (a.wrongGuesses || 0) - (b.wrongGuesses || 0);
            })
            .slice(0, 50);

        leaderboardLabel.textContent = `${hangmanLabel} hangman players ranked by total hangman points. These points also count in the shared Top 50.`;
        leaderboardList.innerHTML = "";

        if (!rows.length) {
            leaderboardList.innerHTML = `<li class="hangman-empty">No ${hangmanLabel} hangman scores yet.</li>`;
            return;
        }

        rows.forEach((entry, index) => {
            const item = document.createElement("li");
            item.className = "hangman-leaderboard-item";
            item.innerHTML = `
                <span class="hangman-rank">#${index + 1}</span>
                <span class="hangman-entry-name">${entry.name}</span>
                <span class="hangman-entry-meta">${entry.score || 0} pts</span>
                <span class="hangman-entry-meta">${entry.correctGuesses || 0} correct</span>
                <span class="hangman-entry-meta">${entry.wrongGuesses || 0} wrong</span>
            `;
            leaderboardList.appendChild(item);
        });
    } catch (error) {
        console.error("Error loading hangman leaderboard:", error);
        leaderboardList.innerHTML = `<li class="hangman-empty">Unable to load leaderboard right now.</li>`;
    }
}

async function finishRound(isVictory) {
    if (roundComplete) return;
    roundComplete = true;

    const roundPoints = calculateRoundPoints(isVictory);
    const roundData = {
        points: roundPoints,
        correctGuesses: roundCorrectGuesses,
        wrongGuesses: roundWrongGuesses,
        wins: isVictory ? 1 : 0,
        losses: isVictory ? 0 : 1
    };

    sessionStats.score += roundData.points;
    sessionStats.correctGuesses += roundData.correctGuesses;
    sessionStats.wrongGuesses += roundData.wrongGuesses;
    sessionStats.wins += roundData.wins;
    sessionStats.losses += roundData.losses;
    updateSessionStatsUI();

    const modalText = isVictory ? "You found the word:" : "The correct word was:";
    const resultText = isVictory
        ? `+${roundPoints} points`
        : `${roundPoints} points this round`;

    setTimeout(() => {
        gameModal.querySelector("img").src = isVictory ? "victory.gif" : "lost.gif";
        gameModal.querySelector("h4").innerText = isVictory ? "Congrats!" : "Game Over!";
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord.toUpperCase()}</b><br><span class="modal-score">${resultText}</span>`;
        gameModal.classList.add("show");
    }, 300);

    await saveHangmanResult(roundData);
    await loadHangmanLeaderboard();
}

function initGame(button, clickedLetter) {
    if (roundComplete || guessedLetters.has(clickedLetter)) {
        return;
    }

    guessedLetters.add(clickedLetter);
    let matchesFound = 0;

    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter && !wordDisplay.querySelectorAll("li")[index].innerText) {
                wordDisplay.querySelectorAll("li")[index].innerText = letter.toUpperCase();
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                matchesFound++;
            }
        });

        revealedCount += matchesFound;
        roundCorrectGuesses += matchesFound;
    } else {
        wrongGuessCount++;
        roundWrongGuesses++;
        hangmanImage.src = getHangmanImageSource(wrongGuessCount);
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount >= maxGuesses) {
        void finishRound(false);
        return;
    }

    if (revealedCount >= currentWord.length) {
        void finishRound(true);
    }
}

function createKeyboard() {
    keyboardDiv.innerHTML = "";
    for (let code = 97; code <= 122; code++) {
        const button = document.createElement("button");
        const letter = String.fromCharCode(code);
        button.innerText = letter;
        button.type = "button";
        button.addEventListener("click", () => initGame(button, letter));
        keyboardDiv.appendChild(button);
    }
}

function cacheDomReferences() {
    hangmanImage = document.querySelector(".hangman-box img");
    wordDisplay = document.querySelector(".word-display");
    guessesText = document.querySelector(".guesses-text b");
    keyboardDiv = document.querySelector(".keyboard");
    gameModal = document.querySelector(".game-modal");
    playAgainBtn = document.querySelector(".play-again");
    hintTextValue = document.querySelector(".hint-text b");
    if (gameModal?.querySelector("img")) {
        gameModal.querySelector("img").src = "lost.gif";
    }
}

function initializeHangmanPage() {
    cacheDomReferences();
    hangmanLanguage = getPageLanguage();
    hangmanLangKey = `${HANGMAN_GAME_PREFIX}${hangmanLanguage}`;
    hangmanLabel = languageMeta[hangmanLanguage]?.label || "HTML";

    createDashboard();
    loadStoredPlayerName();
    updateSessionStatsUI();
    createKeyboard();
    getRandomWord();
    void loadHangmanLeaderboard();

    playAgainBtn?.addEventListener("click", getRandomWord);
}

window.addEventListener("DOMContentLoaded", initializeHangmanPage);
