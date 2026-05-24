// ======= BOOK DATA =======
const books = [
  {
    id: 1, title: "El Quijote", author: "Miguel de Cervantes",
    genre: "Ficción", year: 1605, pages: 863, lang: "Español",
    coverClass: "cover-1", 
    image: "https://www.penguinlibros.com/co/1665201-large_default/don-quijote-de-la-mancha.webp",
    desc: "La historia de un hidalgo manchego que pierde la cordura leyendo libros de caballerías y decide convertirse en caballero andante para defender a los débiles y deshacer entuertos."
  },
  {
    id: 2, title: "Cien Años de Soledad", author: "Gabriel García Márquez",
    genre: "Ficción", year: 1967, pages: 471, lang: "Español",
    coverClass: "cover-2",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgKjzV2_qdY7mZeqG3PSEDEP6W-AeGtRrgnQ&s",
    desc: "La saga de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo, una obra cumbre del realismo mágico latinoamericano."
  },
  {
    id: 3, title: "Tintín en el Tíbet", author: "Hergé",
    genre: "Arte", year: 1960, pages: 62, lang: "Español",
    coverClass: "cover-3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBwFtBgIcPVKCcOS8TdWzTnZtw2Hs-Oa2XsQ&s",
    desc: "Tintín y el capitán Haddock emprenden una expedición al Himalaya en busca del amigo Chang, desaparecido tras un accidente de avión en las montañas."
  },
  {
    id: 4, title: "El Principito", author: "Antoine de Saint-Exupéry",
    genre: "Ficción", year: 1943, pages: 96, lang: "Español",
    coverClass: "cover-4",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaDJjGHKU5VN4dnHmFpi6dtb0G5aS485xrwg&s",
    desc: "Un piloto perdido en el desierto del Sahara conoce a un misterioso niño llamado el Principito, quien le relata sus viajes por diferentes planetas."
  },
  {
    id: 5, title: "Rayuela", author: "Julio Cortázar",
    genre: "Ficción", year: 1963, pages: 600, lang: "Español",
    coverClass: "cover-5",
    image: "https://images.cdn3.buscalibre.com/fit-in/360x360/90/53/905322d10841b36aa311dbd5c90d92ed.jpg",
    desc: "Una novela experimental que puede leerse de manera convencional o saltando entre capítulos. Sigue a Horacio Oliveira entre París y Buenos Aires en busca de la maga."
  },
  {
    id: 6, title: "Dune", author: "Frank Herbert",
    genre: "Ciencia", year: 1965, pages: 896, lang: "Español",
    coverClass: "cover-6",
    image: "https://images.cdn2.buscalibre.com/fit-in/360x360/0d/73/0d739e6e0e837d7637f97f9aad3639b4.jpg",
    desc: "En un futuro lejano, el joven Paul Atreides es enviado al planeta desértico Arrakis, único proveedor de la especia melange, la sustancia más valiosa del universo."
  },
  {
    id: 7, title: "Sapiens", author: "Yuval Noah Harari",
    genre: "Historia", year: 2011, pages: 443, lang: "Español",
    coverClass: "cover-1",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOAQYMrfI_73tEfPImE-dCq-hDcXNbjMMmEQ&s",
    desc: "Un recorrido por la historia de la humanidad desde los primeros homínidos hasta la era moderna, explorando cómo el Homo sapiens llegó a dominar el planeta."
  },
  {
    id: 8, title: "El Arte de la Guerra", author: "Sun Tzu",
    genre: "Historia", year: -500, pages: 128, lang: "Español",
    coverClass: "cover-2",
    image: "https://images.cdn2.buscalibre.com/fit-in/360x360/40/fa/40fa6a6657f79a3752fbf7a8501ccebd.jpg",
    desc: "Tratado militar chino escrito en el siglo V a.C. que trata sobre la estrategia militar y la táctica, aplicable también a los negocios y la vida cotidiana."
  }
];

// ======= APP STATE =======
let currentUser = null;
let selectedBook = null;
let activeNavBtn = null;
let currentCategory = "Todos";
let loans = [
  { bookId: 1, loanDate: "5 Mayo 2026", returnDate: "19 Mayo 2026", status: "overdue" },
  { bookId: 2, loanDate: "10 Mayo 2026", returnDate: "24 Mayo 2026", status: "active" },
  { bookId: 5, loanDate: "18 Mayo 2026", returnDate: "1 Junio 2026", status: "active" }
];

// ======= PAGE NAVIGATION =======
function showPage(pageId, navBtn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }

  // Update nav buttons for the active page
  if (navBtn) {
    const nav = target.querySelector('.bottom-nav');
    if (nav) {
      nav.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      navBtn.classList.add('active');
    }
  }

  // Refresh data when visiting specific pages
  if (pageId === 'page-loans') renderLoans();
  if (pageId === 'page-catalog') renderCatalog();
}

function goBack() {
  showPage('page-catalog');
}

// ======= LOGIN =======
document.getElementById('btn-login').addEventListener('click', () => {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value.trim();
  const err = document.getElementById('login-error');

  if (!email || !pass) {
    err.classList.remove('hidden');
    err.textContent = 'Por favor completa todos los campos.';
    return;
  }
  if (email.length < 4 || pass.length < 3) {
    err.classList.remove('hidden');
    err.textContent = 'Correo o contraseña incorrectos.';
    return;
  }

  err.classList.add('hidden');

  // Derive name from email
  const namePart = email.split('@')[0];
  const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
  currentUser = { name, email };

  // Set profile info
  document.getElementById('user-name-home').textContent = name;
  document.getElementById('profile-name').textContent = name;
  document.getElementById('profile-email').textContent = email;
  const initials = name.slice(0, 2).toUpperCase();
  document.getElementById('avatar-initials').textContent = initials;

  showPage('page-home');
});

// Allow Enter key on login
document.getElementById('login-password').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn-login').click();
});

// ======= LOGOUT =======
function logout() {
  currentUser = null;
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  showPage('page-login');
}

// ======= CATALOG =======
function renderCatalog(filter = currentCategory, search = '') {
  const grid = document.getElementById('catalog-grid');
  grid.innerHTML = '';

  const query = search.toLowerCase();
  const filtered = books.filter(b => {
    const matchCat = filter === 'Todos' || b.genre === filter;
    const matchSearch = b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-light);padding:30px 0;">No se encontraron libros.</p>';
    return;
  }

  filtered.forEach(book => {
    const item = document.createElement('div');
    item.className = 'catalog-item';
    item.onclick = () => goToBook(book.title);
    item.innerHTML = `
      <div class="catalog-cover ${book.coverClass}"></div>
      <p class="catalog-item-title">${book.title}</p>
    `;
    grid.appendChild(item);
  });
}

function filterCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCatalog(cat, document.getElementById('search-input').value);
}

function filterBooks() {
  renderCatalog(currentCategory, document.getElementById('search-input').value);
}

// ======= BOOK DETAIL =======
function goToBook(title) {
  const book = books.find(b => b.title === title);
  if (!book) return;
  selectedBook = book;

  document.getElementById('detail-title').textContent = book.title;
  document.getElementById('detail-author').textContent = book.author;
  document.getElementById('detail-genre').textContent = book.genre;
  document.getElementById('detail-year').textContent = book.year < 0
    ? `${Math.abs(book.year)} a.C.` : book.year;
  document.getElementById('detail-pages').textContent = book.pages;
  document.getElementById('detail-lang').textContent = book.lang;
  document.getElementById('detail-desc').textContent = book.desc;

  const cover = document.getElementById('detail-cover');
  cover.className = 'detail-book-cover ' + book.coverClass;

  showPage('page-book-detail');
}

// ======= LOAN REQUEST =======
function requestLoan() {
  if (!selectedBook) return;

  const today = new Date();
  const returnDate = new Date(today);
  returnDate.setDate(today.getDate() + 14);

  const fmt = d => d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  document.getElementById('confirm-title').textContent = selectedBook.title;
  document.getElementById('confirm-author').textContent = selectedBook.author;
  document.getElementById('confirm-date').textContent = fmt(today);
  document.getElementById('confirm-return').textContent = fmt(returnDate);

  // Add to loans if not already there
  const exists = loans.find(l => l.bookId === selectedBook.id);
  if (!exists) {
    loans.unshift({
      bookId: selectedBook.id,
      loanDate: fmt(today),
      returnDate: fmt(returnDate),
      status: 'active'
    });
    // Update stats
    document.getElementById('profile-loans').textContent = loans.length;
    document.getElementById('profile-read').textContent = Math.max(12, loans.length);
  }

  showPage('page-loan-confirm');
}

// ======= LOANS LIST =======
function renderLoans() {
  const list = document.getElementById('loans-list');
  list.innerHTML = '';

  if (loans.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:30px 0;">No tienes préstamos activos.</p>';
    return;
  }

  loans.forEach(loan => {
    const book = books.find(b => b.id === loan.bookId);
    if (!book) return;
    const card = document.createElement('div');
    card.className = 'loan-card';
    const badgeClass = loan.status === 'overdue' ? 'loan-badge overdue' : 'loan-badge';
    const badgeText = loan.status === 'overdue' ? 'Vencido' : 'Activo';
    card.innerHTML = `
      <div class="loan-card-cover ${book.coverClass}"></div>
      <div class="loan-card-info">
        <p class="loan-card-title">${book.title}</p>
        <p class="loan-card-author">${book.author}</p>
        <p class="loan-card-dates">📅 Devolución: ${loan.returnDate}</p>
      </div>
      <span class="${badgeClass}">${badgeText}</span>
    `;
    list.appendChild(card);
  });
}

// ======= INIT =======
renderCatalog();
