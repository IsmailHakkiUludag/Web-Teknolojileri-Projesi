<?php
// login.php

// Başlangıç oturumu
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = filter_var($_POST['username'], FILTER_SANITIZE_EMAIL);
    $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);
    
    // E-posta formatını kontrol et
    if (!filter_var($username, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Geçerli bir e-posta adresi giriniz.'); window.history.back();</script>";
        exit();
    }

    $firstLetter = strtolower($username[0]);
    $validFirstLetters = ['e', 'u', 'g', 'b'];
    $numbersBeforeAt = preg_replace('/[^0-9]/', '', substr($username, 0, strpos($username, '@')));

    // İlk harf kontrolü
    if (!in_array($firstLetter, $validFirstLetters)) {
        echo "<script>alert('E-posta ve şifre ilk harfi \"e, u, g, b\" harflerinden biri olmalıdır.'); window.history.back();</script>";
        exit();
    }

    // Rakam sayısı kontrolü
    if (strlen($numbersBeforeAt) !== 9) {
        echo "<script>alert('E-posta adresinde @ işaretine kadar tam olarak 9 adet sayı bulunmalıdır.'); window.history.back();</script>";
        exit();
    }

    // Şifre kontrolü
    $studentId = substr($username, 0, strpos($username, '@'));
    if ($password !== $studentId) {
        echo "<script>alert('Giriş başarısız. Lütfen tekrar deneyiniz.'); window.history.back();</script>";
        exit();
    }

    // Giriş başarılı, oturum değişkeni oluştur
    $_SESSION['username'] = $username;

    // Hoşgeldiniz mesajı için JavaScript ile yönlendir
    $message = "Hoşgeldiniz " . $firstLetter . $numbersBeforeAt;
    echo "<script>
            sessionStorage.setItem('welcomeMessage', '$message');
            window.location.href = 'index.html#hakkinda';
          </script>";
    exit();
} else {
    echo "<script>alert('Geçersiz istek.'); window.history.back();</script>";
}
?>
