const vocabForm = document.getElementById('vocab-form');
const list = document.getElementById('list');

// Lokale Speicherung
const vocabStorageKey = 'vocabList';
let vocabList = JSON.parse(localStorage.getItem(vocabStorageKey)) || [];

// Vokabel hinzufügen
vocabForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const word = document.getElementById('word').value;
  const translation = document.getElementById('translation').value;

  const newVocab = { word, translation };
  vocabList.push(newVocab);
  localStorage.setItem(vocabStorageKey, JSON.stringify(vocabList));
  updateList();
  vocabForm.reset();
});

// Liste aktualisieren
function updateList() {
  list.innerHTML = '';
  vocabList.forEach((vocab, index) => {
    const li = document.createElement('li');
    li.textContent = `${vocab.word} - ${vocab.translation}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Löschen';
    deleteBtn.addEventListener('click', () => {
      vocabList.splice(index, 1);
      localStorage.setItem(vocabStorageKey, JSON.stringify(vocabList));
      updateList();
    });
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// App starten
updateList();
// Quiz-Elemente
const startQuizButton = document.getElementById('start-quiz');
const checkAnswerButton = document.getElementById('check-answer');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const feedbackElement = document.getElementById('feedback');

// Quiz-Zustand
let currentWordIndex = null;

// Abfrage starten
startQuizButton.addEventListener('click', () => {
  if (vocabList.length === 0) {
    questionElement.textContent = 'Keine Vokabeln in der Liste!';
    return;
  }
  feedbackElement.textContent = '';
  answerInput.value = '';
  answerInput.disabled = false;
  checkAnswerButton.disabled = false;

  currentWordIndex = Math.floor(Math.random() * vocabList.length);
  questionElement.textContent = `Übersetze: ${vocabList[currentWordIndex].word}`;
});

// Antwort überprüfen
checkAnswerButton.addEventListener('click', () => {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = vocabList[currentWordIndex].translation.toLowerCase();

  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = 'Richtig! 🎉';
    feedbackElement.style.color = 'green';
  } else {
    feedbackElement.textContent = `Falsch! Die richtige Antwort ist: ${vocabList[currentWordIndex].translation}`;
    feedbackElement.style.color = 'red';
  }

  answerInput.disabled = true;
  checkAnswerButton.disabled = true;
});
// Elemente für das Umschalten der Sichtbarkeit
const vocabListSection = document.getElementById('vocab-list');
const addVocabSection = document.getElementById('add-vocab');

// Sichtbarkeit steuern
function toggleVisibility(isQuizActive) {
  if (isQuizActive) {
    vocabListSection.classList.add('hidden');
    addVocabSection.classList.add('hidden');
  } else {
    vocabListSection.classList.remove('hidden');
    addVocabSection.classList.remove('hidden');
  }
}

// Abfrage starten
startQuizButton.addEventListener('click', () => {
  if (vocabList.length === 0) {
    questionElement.textContent = 'Keine Vokabeln in der Liste!';
    return;
  }
  toggleVisibility(true); // Liste ausblenden
  feedbackElement.textContent = '';
  answerInput.value = '';
  answerInput.disabled = false;
  checkAnswerButton.disabled = false;

  currentWordIndex = Math.floor(Math.random() * vocabList.length);
  questionElement.textContent = `Übersetze: ${vocabList[currentWordIndex].word}`;
});

// Antwort überprüfen
checkAnswerButton.addEventListener('click', () => {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = vocabList[currentWordIndex].translation.toLowerCase();

  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = 'Richtig! 🎉';
    feedbackElement.style.color = 'green';
  } else {
    feedbackElement.textContent = `Falsch! Die richtige Antwort ist: ${vocabList[currentWordIndex].translation}`;
    feedbackElement.style.color = 'red';
  }

  answerInput.disabled = true;
  checkAnswerButton.disabled = true;
  toggleVisibility(false); // Liste wieder anzeigen
});
// Elemente für die Seiten
const vocabListPage = document.getElementById('vocab-list-page');
const quizPage = document.getElementById('quiz-page');

// Navigations-Buttons
const showListButton = document.getElementById('show-list');
const showQuizButton = document.getElementById('show-quiz');

// Funktion zum Umschalten der Seiten
function showPage(page) {
  // Alle Seiten verstecken
  document.querySelectorAll('.page').forEach((section) => {
    section.classList.add('hidden');
  });

  // Gewählte Seite anzeigen
  page.classList.remove('hidden');
}

// Event Listener für Navigation
showListButton.addEventListener('click', () => showPage(vocabListPage));
showQuizButton.addEventListener('click', () => showPage(quizPage));

// Bestehende Logik für die Vokabelliste und Abfrage bleibt gleich
