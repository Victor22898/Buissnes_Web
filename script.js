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
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMXrxCqzv7BCs__fRG-YqFynvrYHg4K8fhNw&s",
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


// Показать/скрыть плашку "Другие услуги"
const otherServicesBtn = document.querySelector('.nav a[href="#other-services"]');
const otherServicePopups = document.getElementById('otherServicePopups');

if (otherServicesBtn && otherServicePopups) {
    otherServicesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        otherServicePopups.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!otherServicesBtn.contains(e.target) && !otherServicePopups.contains(e.target)) {
            otherServicePopups.classList.remove('show');
        }
    });
}

// script.js — 100% работает
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    const toggle = item.querySelector('.faq-toggle');

    // Клик по всей шапке (и по кнопке тоже)
    header.addEventListener('click', function (e) {
      // Если клик по кнопке — не даём ей всплывать отдельно
      if (toggle && e.target.closest('.faq-toggle')) {
        e.preventDefault();
      }

      const isActive = item.classList.contains('active');

      // Закрываем все остальные
      items.forEach(i => {
        i.classList.remove('active');
        const btn = i.querySelector('.faq-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Если текущий был закрыт — открываем
      if (!isActive) {
        item.classList.add('active');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
});


// Mock API для тестирования (имитация сервера)
const mockServices = {
  1: {
    service_id: 1,
    service_name: "Банкротство для пенсионеров",
    description: "Полное сопровождение процедуры банкротства для пенсионеров по упрощённой схеме, включая сбор документов и представление в суде.",
    price: 0.00,
    duration_days: 180
  },
  2: {
    service_id: 2,
    service_name: "Бесплатное банкротство",
    description: "Банкротство без оплаты услуг юристов для определённых категорий граждан (пенсионеры, инвалиды и т.д.).",
    price: 0.00,
    duration_days: 240
  },
  3: {
    service_id: 3,
    service_name: "Психологическая помощь",
    description: "Бесплатные консультации и поддержка психолога на всех этапах процедуры банкротства.",
    price: 0.00,
    duration_days: 90
  }
  // Добавь остальные услуги по аналогии
};

// Имитация GET /api/services/{service_id}
async function fetchService(serviceId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {  // Имитация сетевой задержки 500 мс
      const service = mockServices[serviceId];
      if (service) {
        resolve({
          status: 200,
          json: () => Promise.resolve(service)
        });
      } else {
        reject({
          status: 404,
          json: () => Promise.resolve({ error: "Услуга не найдена" })
        });
      }
    }, 500);
  });
}

// Имитация POST /api/requests
async function submitRequest(requestData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Заявка отправлена:", requestData);
      resolve({
        status: 201,
        json: () => Promise.resolve({
          message: "Заявка успешно отправлена",
          request_id: Math.floor(Math.random() * 10000) + 1
        })
      });
    }, 800);
  });
}

// Пример использования в твоём коде (добавь в места, где нужна услуга)
async function loadServiceInForm(serviceId) {
  try {
    const response = await fetchService(serviceId);
    if (response.status === 200) {
      const data = await response.json();
      console.log("Услуга загружена:", data);
      // Здесь можно вставить данные в HTML-элементы страницы
      // Пример: document.querySelector('.service-name').textContent = data.service_name;
    } else {
      console.error("Ошибка:", response.status);
    }
  } catch (error) {
    console.error("Услуга не найдена или ошибка сети");
  }
}

// Тестовый вызов (можно вызвать при клике на услугу)
loadServiceInForm(1);  // Загрузит данные услуги с ID 1

// КАЛЬКУЛЯТОР СТОИМОСТИ
document.getElementById('calcForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const debt = parseInt(document.getElementById('debtAmount').value) || 0;
  const delay = document.getElementById('delay').value;
  const pledge = document.getElementById('pledge').value;
  const age = document.getElementById('age').value;
  const city = document.getElementById('city').value.trim() || 'не указан';

  let price = 120000;
  let time = '6–9 месяцев';
  let comment = 'Стандартная процедура';

  // Логика расчёта (примерные значения из практики банкротства)
  if (debt < 500000) price = 89000;
  else if (debt < 1500000) price = 120000;
  else price = 180000;

  if (delay === 'yes') time = '7–10 месяцев';
  if (pledge === 'yes') {
    comment = 'Возможна сложность с сохранением залогового имущества';
    price += 30000;
  }
  if (age === 'pension') {
    comment = 'Специальная программа для пенсионеров — без предоплаты';
    price = Math.max(69000, price - 30000);
  }

  // Региональная корректировка
  if (city.toLowerCase().includes('москва') || city.toLowerCase().includes('петербург')) price += 20000;

  // Вывод результата
  document.getElementById('resDebt').textContent = debt.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('resPrice').textContent = price.toLocaleString('ru-RU') + ' ₽';
  document.getElementById('resTime').textContent = time;
  document.getElementById('resComment').textContent = comment;

  document.getElementById('calcForm').style.display = 'none';
  document.getElementById('calcResult').style.display = 'block';
});

// Новый расчёт
function resetCalc() {
  document.getElementById('calcForm').reset();
  document.getElementById('calcForm').style.display = 'block';
  document.getElementById('calcResult').style.display = 'none';
}

// Прокрутка к форме заявки
document.querySelector('.calc-request')?.addEventListener('click', function() {
  document.querySelector('#request-form')?.scrollIntoView({ behavior: 'smooth' });
});