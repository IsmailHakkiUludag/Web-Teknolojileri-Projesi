function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        const slides = document.querySelectorAll(".slides img");
        slides.forEach((slide, index) => {
            slide.style.display = "none";
            slide.classList.remove("active");
        });
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].classList.add("active");
        setTimeout(showSlides, 3000); // 3 saniyede bir değiştir
    }
});

function showImageContent(contentId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(contentId).classList.add('active');
}

function clearForm() {
    document.getElementById("contactForm").reset();
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstLetter = username.charAt(0).toLowerCase();
    const validFirstLetters = ['e', 'u', 'g', 'b'];
    const numbersBeforeAt = username.substring(0, username.indexOf('@')).replace(/[^0-9]/g, '');

    if (!validFirstLetters.includes(firstLetter)) {
        alert('E-posta ve şifre ilk harfi "e, u, g, b" harflerinden biri olmalıdır.');
        event.preventDefault();
        return;
    }

    if (numbersBeforeAt.length !== 9) {
        alert('E-posta adresinde @ işaretine kadar tam olarak 9 adet sayı bulunmalıdır.');
        event.preventDefault();
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
        alert('Geçerli bir e-posta adresi giriniz.');
        event.preventDefault();
        return;
    }

    const studentId = username.substring(0, username.indexOf('@'));

    if (password !== studentId) {
        alert('Giriş başarısız. Lütfen tekrar deneyiniz.');
        event.preventDefault();
    }
});
