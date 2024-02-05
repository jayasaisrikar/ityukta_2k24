document.addEventListener('DOMContentLoaded', function () {
  const select = (el, all = false) => (all ? [...document.querySelectorAll(el)] : document.querySelector(el));
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };
  const onscroll = (el, listener) => el.addEventListener('scroll', listener);

  const navbarlinks = select('#navbar .scrollto', true);
  const header = select('#header');
  const backtotop = select('.back-to-top');
  const mobileNavToggle = select('.mobile-nav-toggle');
  const navbar = select('#navbar');
  const navbarToggle = select('.mobile-nav-toggle');
  const portfolioContainer = select('.portfolio-container');
  const skillsContent = select('.skills-content');

  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (section && position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };

  const scrollto = (el) => {
    const offset = header.offsetHeight;
    const elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  const headerScrolled = () => {
    selectHeader.classList.toggle('header-scrolled', window.scrollY > 100);
  };

  const toggleBacktotop = () => {
    backtotop.classList.toggle('active', window.scrollY > 100);
  };

  const toggleMobileNav = (e) => {
    navbar.classList.toggle('navbar-mobile');
    navbarToggle.classList.toggle('bi-list');
    navbarToggle.classList.toggle('bi-x');
  };

  const toggleMobileDropdowns = (e) => {
    if (navbar.classList.contains('navbar-mobile')) {
      e.preventDefault();
      e.currentTarget.nextElementSibling.classList.toggle('dropdown-active');
    }
  };

  const handleScrolltoClick = (e) => {
    if (select(e.currentTarget.hash)) {
      e.preventDefault();
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(e.currentTarget.hash);
    }
  };

  const handlePortfolioFilterClick = (e) => {
    e.preventDefault();
    portfolioFilters.forEach(el => el.classList.remove('filter-active'));
    e.currentTarget.classList.add('filter-active');
    portfolioIsotope.arrange({
      filter: e.currentTarget.getAttribute('data-filter')
    });
    portfolioIsotope.on('arrangeComplete', () => AOS.refresh());
  };

  on('click', '.scrollto', handleScrolltoClick, true);

  window.addEventListener('load', () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  onscroll(document, () => {
    navbarlinksActive();
    headerScrolled();
    toggleBacktotop();
  });

  on('click', '.mobile-nav-toggle', toggleMobileNav);
  on('click', '.navbar .dropdown > a', toggleMobileDropdowns, true);

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });
});
