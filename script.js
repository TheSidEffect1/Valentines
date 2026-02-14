const questionPool = [
  {
    id: 'q1',
    title: 'When did I fall in love with you?',
    options: [
      'After our cute chess game.',
      'When we met for the first time in the judo hall.',
      'When you tried to kill me with your books.'
    ],
    correctIndex: 2
  },
  {
    id: 'q2',
    title: 'What was the date?',
    options: ['26th January 2023', 'Mid December 2022', 'Mid January 2023'],
    correctIndex: 1
  },
  {
    id: 'q3',
    title: 'When did I pity you and finally decide to propose you?',
    options: ['26th Jan', 'I never pitied you', 'The day I realised I couldn’t lose you'],
    correctIndex: 0
  }
];

let currentRound = 'intro';
let currentQuestionIndex = 0;
let answeredCurrent = false;
const chosenAnswers = {};

const quizSection = document.getElementById('quiz-section');
const timelineSection = document.getElementById('timeline-section');
const questionTitle = document.getElementById('question-title');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');

const timelineQ1Answer = document.getElementById('timeline-q1-answer');
const timelineQ2Answer = document.getElementById('timeline-q2-answer');
const timelineQ3 = document.getElementById('timeline-q3');
const timelineQ3Answer = document.getElementById('timeline-q3-answer');

function showPanel(panelToShow) {
  [quizSection, timelineSection].forEach((panel) => panel.classList.remove('active'));
  panelToShow.classList.add('active');
}

function setQuestionByIds(ids, index = 0) {
  currentQuestionIndex = index;
  currentQuestionSet = ids.map((id) => questionPool.find((q) => q.id === id));
  renderQuestion();
}

let currentQuestionSet = [];

function renderQuestion() {
  const question = currentQuestionSet[currentQuestionIndex];
  answeredCurrent = false;
  feedbackEl.textContent = '';
  nextBtn.classList.add('hidden');
  questionTitle.textContent = question.title;

  optionsEl.innerHTML = '';
  question.options.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = `${idx + 1}. ${option}`;
    btn.addEventListener('click', () => handleAnswer(idx));
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(selectedIndex) {
  if (answeredCurrent) return;
  answeredCurrent = true;

  const question = currentQuestionSet[currentQuestionIndex];
  const optionButtons = [...document.querySelectorAll('.option-btn')];

  optionButtons.forEach((button, idx) => {
    if (idx === question.correctIndex) {
      button.classList.add('correct');
    } else if (idx === selectedIndex) {
      button.classList.add('wrong');
    }
    button.disabled = true;
  });

  const correctText = question.options[question.correctIndex];
  chosenAnswers[question.id] = correctText;

  if (selectedIndex === question.correctIndex) {
    feedbackEl.textContent = 'Perfect! 💜 You got it right.';
  } else {
    feedbackEl.textContent = `Cute try 😄 Saving the true memory: ${correctText}`;
  }

  nextBtn.classList.remove('hidden');
}

function revealCards(cards) {
  cards.forEach((card, index) => {
    setTimeout(() => card.classList.add('show'), 320 * index + 120);
  });
}

function renderTimeline(includeQ3 = false) {
  timelineQ1Answer.textContent = chosenAnswers.q1 || '';
  timelineQ2Answer.textContent = chosenAnswers.q2 || '';

  if (includeQ3) {
    timelineQ3.classList.remove('hidden');
    timelineQ3Answer.textContent = chosenAnswers.q3 || '';
  } else {
    timelineQ3.classList.add('hidden');
    timelineQ3.classList.remove('show');
  }

  document.body.classList.remove('quiz-mode');
  showPanel(timelineSection);

  const cardsToReveal = includeQ3
    ? [document.getElementById('timeline-q1'), document.getElementById('timeline-q2'), document.getElementById('timeline-q3')]
    : [document.getElementById('timeline-q1'), document.getElementById('timeline-q2')];

  cardsToReveal.forEach((card) => card.classList.remove('show'));
  revealCards(cardsToReveal);
}

function beginQ3Round() {
  currentRound = 'q3';
  document.body.classList.add('quiz-mode');
  showPanel(quizSection);
  setQuestionByIds(['q3']);
  nextBtn.textContent = 'Show Final Timeline 💜';
}

nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < currentQuestionSet.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
    return;
  }

  if (currentRound === 'intro') {
    renderTimeline(false);
    setTimeout(() => {
      beginQ3Round();
    }, 3500);
    return;
  }

  if (currentRound === 'q3') {
    renderTimeline(true);
  }
});

function init() {
  currentRound = 'intro';
  nextBtn.textContent = 'Next ➜';
  document.body.classList.add('quiz-mode');
  showPanel(quizSection);
  setQuestionByIds(['q1', 'q2']);
}

init();
