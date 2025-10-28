// script.js

// Плавное появление секций при скролле
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => observer.observe(section));

// Всплывающее меню услуг из шапки
const servicesToggle = document.getElementById('servicesToggle');
const servicesPopup = document.getElementById('servicesPopup');
const arrow = servicesToggle.querySelector('.arrow');

servicesToggle.addEventListener('click', e => {
  e.preventDefault();
  const showed = servicesPopup.classList.toggle('show');
  arrow.classList.toggle('rotate', showed);
  servicesToggle.setAttribute('aria-expanded', showed ? 'true' : 'false');
});

// Закрыть меню, если клик вне
document.addEventListener('click', (e) => {
  if (!servicesToggle.contains(e.target) && !servicesPopup.contains(e.target)) {
    servicesPopup.classList.remove('show');
    arrow.classList.remove('rotate');
    servicesToggle.setAttribute('aria-expanded', 'false');
  }
});


// Модальное окно контактов
const contactModal = document.getElementById('contactModal');
const contactOpenButtons = document.querySelectorAll('#contactOpen, #contactOpenBtn');
const contactClose = document.getElementById('contactClose');

contactOpenButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    contactModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

contactClose.addEventListener('click', () => {
  contactModal.classList.add('hidden');
  document.body.style.overflow = '';
});

// Закрытие модального окна по клику на подложку
contactModal.addEventListener('click', e => {
  if (e.target === contactModal) {
    contactModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// Отправка формы с валидацией
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const service = form.service.value;
  const message = form.message.value.trim();

  if (!name || !email || !service || !message) {
    alert('Пожалуйста, заполните все поля формы.');
    return;
  }

  alert(`Спасибо, ${name}! Ваша заявка на услугу "${service}" принята.`);
  form.reset();
  contactModal.classList.add('hidden');
  document.body.style.overflow = '';
});

// Данные о сотрудниках
const teamMembers = {
  elena: {
    name: "Елена Смирнова",
    position: "Главный юрист",
    photo: "https://p0.zoon.ru/0/4/57c945d34bf7df1c5a8b456e_5febec2037960.jpg",
    desc: "Опыт более 15 лет в сфере гражданского права. Специализируется на сопровождении крупных сделок и судебной практике."
  },
  aleksey: {
    name: "Алексей Петров",
    position: "Адвокат",
    photo: "https://bipulse.ru/edu/assets/img/team/team-apetrov.jpg",
    desc: "Эксперт по уголовному и административному праву. Более 200 выигранных дел."
  },
  marina: {
    name: "Марина Кузнецова",
    position: "Юрист по семейным делам",
    photo: "https://kapachinskaya.ru/images/35hnz0.jpg",
    desc: "Специализация — бракоразводные процессы, раздел имущества, наследственные дела."
  }
};





// Элементы модалки сотрудника
const memberModal = document.getElementById('memberModal');
const memberPhoto = document.getElementById('memberPhoto');
const memberName = document.getElementById('memberName');
const memberPosition = document.getElementById('memberPosition');
const memberDesc = document.getElementById('memberDesc');
const memberClose = document.getElementById('memberClose');

// Навешиваем события на карточки
document.querySelectorAll('.member').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.member;
    const data = teamMembers[key];

    if (data) {
      memberPhoto.src = data.photo;
      memberPhoto.alt = data.name;
      memberName.textContent = data.name;
      memberPosition.textContent = data.position;
      memberDesc.textContent = data.desc;

      memberModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Закрытие модалки сотрудника
memberClose.addEventListener('click', () => {
  memberModal.classList.add('hidden');
  document.body.style.overflow = '';
});

memberModal.addEventListener('click', e => {
  if (e.target === memberModal) {
    memberModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});





