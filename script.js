const questions = [
  {
    title: 'When did I fall in love with you?',
    options: [
      'After our cute chess game.',
      'When we met for the first time in the judo hall.',
      'When you tried to kill me with your books.'
    ],
    correctIndex: 2
  },
  {
    title: 'What was the date?',
    options: ['26th January 2023', 'Mid December 2022', 'Mid January 2023'],
    correctIndex: 1
  }
];

let currentQuestion = 0;
let answeredCurrent = false;

const quizSection = document.getElementById('quiz-section');
const timelineSection = document.getElementById('timeline-section');
const questionTitle = document.getElementById('question-title');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');

function renderQuestion() {
  const question = questions[currentQuestion];
  answeredCurrent = false;
  feedbackEl.textContent = '';
  nextBtn.classList.add('hidden');
  questionTitle.textContent = `Q${currentQuestion + 1}. ${question.title}`;

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

  const question = questions[currentQuestion];
  const optionButtons = [...document.querySelectorAll('.option-btn')];

  optionButtons.forEach((button, idx) => {
    if (idx === question.correctIndex) {
      button.classList.add('correct');
    } else if (idx === selectedIndex) {
      button.classList.add('wrong');
    }
    button.disabled = true;
  });

  if (selectedIndex === question.correctIndex) {
    feedbackEl.textContent = 'Perfect! 💜 You got it right.';
  } else {
    feedbackEl.textContent = 'Cute try 😄 But that memory says otherwise.';
  }

  nextBtn.classList.remove('hidden');
}

function switchToTimeline() {
  quizSection.classList.remove('active');
  timelineSection.setAttribute('aria-hidden', 'false');

  setTimeout(() => {
    timelineSection.classList.add('active');
    revealTimelineCards();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, 420);
}

function revealTimelineCards() {
  const cards = [...document.querySelectorAll('.timeline-card')];
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('show');
    }, 350 * index + 150);
  });
}

nextBtn.addEventListener('click', () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    return;
  }

  switchToTimeline();
});

renderQuestion();
