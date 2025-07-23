/* -------------------------------------------------
 *  script.js  —  “Та хэр Монгол хүн бэ?” тест
 *  Vanilla JS, мобайл ээлтэй
 * ------------------------------------------------- */

/* ---------- Тестийн асуултууд ба оноо ---------- */
const questions = [
  {
    question: 'Өглөө юу уудаг вэ?',
    answers: [
      { text: 'Сүүтэй цай', score: 3 },
      { text: 'Кофе', score: 2 },
      { text: 'Жүүс эсвэл ус', score: 1 },
      { text: 'Уух юмгүй', score: 0 }
    ]
  },
  {
    question: 'Наадам танд юу санагдуулдаг вэ?',
    answers: [
      { text: 'Морь, бөх, сур!', score: 3 },
      { text: 'Амралтын өдөр', score: 2 },
      { text: 'Халуун, шороо', score: 1 },
      { text: 'Юу юм?', score: 0 }
    ]
  },
  {
    question: 'Та хамгийн сүүлд хөдөө хэзээ явсан бэ?',
    answers: [
      { text: 'Өнгөрсөн 7 хоногт', score: 3 },
      { text: 'Сүүлийн сард', score: 2 },
      { text: 'Хэдэн жил болсон', score: 1 },
      { text: 'Огт явж байгаагүй', score: 0 }
    ]
  },
  {
    question: 'Таны дуртай хоол аль нь вэ?',
    answers: [
      { text: 'Бууз, хуушуур', score: 3 },
      { text: 'Гурилтай шөл', score: 2 },
      { text: 'Пицца', score: 1 },
      { text: 'Салад', score: 0 }
    ]
  },
  {
    question: 'Таны сонсох дуртай хөгжим?',
    answers: [
      { text: 'Морин хуур', score: 3 },
      { text: 'Ардын дуу', score: 2 },
      { text: 'Поп, рок', score: 1 },
      { text: 'Гадаад дуу', score: 0 }
    ]
  },
  {
    question: 'Өвөл хэрхэн дулаацдаг вэ?',
    answers: [
      { text: 'Дээл өмсдөг', score: 3 },
      { text: 'Нимгэн куртка', score: 2 },
      { text: 'Зөвхөн халаалт', score: 1 },
      { text: 'Хүйтнийг үздэггүй', score: 0 }
    ]
  },
  {
    question: 'Та хэдэн малтай вэ?',
    answers: [
      { text: '50‑аас дээш', score: 3 },
      { text: 'Цөөхөн хэдэн ямаа/хонь', score: 2 },
      { text: 'Гэрийн тэжээвэр амьтан', score: 1 },
      { text: 'Огт байхгүй', score: 0 }
    ]
  },
  {
    question: 'Ямар унаа таны дуртай вэ?',
    answers: [
      { text: 'Морь', score: 3 },
      { text: 'Мотоцикл', score: 2 },
      { text: 'Машин', score: 1 },
      { text: 'Алхаа', score: 0 }
    ]
  },
  {
    question: 'Монгол бичгийг мэдэх үү?',
    answers: [
      { text: 'Уншиж бичиж чадна', score: 3 },
      { text: 'Уншиж чадна', score: 2 },
      { text: 'Сонсож байсан', score: 1 },
      { text: 'Мэдэхгүй', score: 0 }
    ]
  }
];

/* ---------- Тестийн хувьсагчууд ---------- */
let currentIndex   = 0;
let totalScore     = 0;
const maxScore     = questions.length * 3;

/* ---------- DOM элементүүд ---------- */
const quizBox      = document.getElementById('quiz');
const qText        = document.getElementById('question');
const answersBox   = document.getElementById('answers');
const resultBox    = document.getElementById('result');
const shareBox     = document.getElementById('share');
const fbShareLink  = document.getElementById('fb-share');

// ...existing code...

/* ---------- Асуултыг харуулах ---------- */
function showQuestion () {
  const q = questions[currentIndex];
  qText.textContent = q.question;
  answersBox.innerHTML = '';
  answersBox.classList.add('fade-in');

  q.answers.forEach(({ text, score }) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = 'answer-btn';
    btn.addEventListener('click', () => handleAnswer(score));
    answersBox.appendChild(btn);
  });

  // анимэйшн remove (дараагийн асуулт ороход дахин ажиллах)
  setTimeout(() => answersBox.classList.remove('fade-in'), 600);
}

// ...existing code...

/* ---------- Эхлэх ---------- */
document.addEventListener('DOMContentLoaded', showQuestion);

/* ---------- Үр дүн тооцоолж харуулах ---------- */
function showResult () {
  quizBox.style.display  = 'none';
  shareBox.style.display = 'block';
  resultBox.style.display = 'block';

  const percent = Math.round((totalScore / maxScore) * 100);
  let message;

  if (percent >= 80) {
    message = '🏆 Та 100% монгол хүн байна!';
  } else if (percent >= 50) {
    message = '😊 Та хагас монгол хүн байна!';
  } else {
    message = '🌍 Та гадаад хүн байна. Монголд нэг зочлоорой!';
  }

  resultBox.innerHTML = `
    <h2>Таны оноо: ${percent}%</h2>
    <p>${message}</p>
  `;

  /* Facebook share холбоос үүсгэх
     🔗  өөрийн домэйнийг   replace  хийнэ (https://myquiz.mn гэх мэт) */
  const shareURL  = encodeURIComponent('https://example.com'); // <-- соль
  const shareText = encodeURIComponent(`Би ${percent}% авч, "${message}" гэж гарлаа! Та хэдэн хувь монгол хүн бэ?`);
  fbShareLink.href = `https://www.facebook.com/sharer/sharer.php?u=${shareURL}&quote=${shareText}`;
}

/* ---------- Эхлэх ---------- */
document.addEventListener('DOMContentLoaded', showQuestion);
/*-------------- Facebook share холбоосыг тохируулах--------------*/
function showQuestion() {
  const q = questions[currentIndex];
  qText.textContent = q.question;
  answersBox.innerHTML = '';
  answersBox.classList.add('fade-in');

  q.answers.forEach(({ text, score }) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.addEventListener('click', () => handleAnswer(score));
    answersBox.appendChild(btn);
  });

  // анимэйшн remove (дараагийн асуулт ороход дахин ажиллах)
  setTimeout(() => answersBox.classList.remove('fade-in'), 600);
}
