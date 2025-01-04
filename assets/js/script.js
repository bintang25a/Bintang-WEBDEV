const navArea = document.querySelector('nav');
const navReguler = navArea.querySelector('.nav-reguler');
const navAside = navArea.querySelector('.nav-aside');
const navbar = navArea.querySelector('.navbar');
const navMenuButton = document.querySelector('.aside-button');
const navProfil = navArea.querySelector('.profil');

//fungsi untuk berpindah section ketika elemen navbar diklik
function scrollSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        targetElement.scrollIntoView({behavior: 'smooth'});
        if (navOverflow() == true) toggle = 1;
    }
}

//fungsi untuk mengecek navbar keluar dari max width agar bisa responsive ke width device
function navOverflow() {
    const isOverflow = navArea.scrollWidth > navArea.clientWidth;

    if (isOverflow == true) {
        navMenuButton.style.display = "block";
        while (navReguler.firstChild) {
            navAside.appendChild(navReguler.lastChild);
        }
        if (toggle == 0) toggleNavAside();
    }
    else if (isOverflow == false) {
        navMenuButton.style.display = "none";
        while (navAside.firstChild) {
            navReguler.appendChild(navAside.lastChild);
        }
    }

    return isOverflow;
}

//fungsi untuk toggle sidebar
let toggle = 0;
function toggleNavAside() {
    toggle++;
    if (toggle > 1) {
        toggle = 0;
    }

    const offset = -toggle * 100;
    navAside.style.transform = `translateX(${offset}%)`;
}

//fungsi klik untuk close sidebar ketika elemen diluarnya diklik
document.addEventListener('click', function(e) {
    const isInsideNavAside = navAside.contains(e.target);
    if (!isInsideNavAside && toggle == 0) toggleNavAside();
});

//fungsi klik untuk toggle sidebar
navMenuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleNavAside();
});

// toggleNavAside();
navOverflow();
window.addEventListener("resize", navOverflow);