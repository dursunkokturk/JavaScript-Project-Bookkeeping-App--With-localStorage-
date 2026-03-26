// Gelir Gider Bilgilerini Kullanicidan Aliyoruz
// Alinan Bilgileri localStorage Uzerinden Kullaniyoruz
transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ========================= Ekran Gecisi =========================
// Tum Ekranlari Ilk Olarak Gizliyoruz, Sadece Istenen Ekrani Gosteriyoruz
function showScreen(screenId) {
  let screens = document.querySelectorAll(".screen");
  screens.forEach(function(screen) {
    screen.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
}

// ========================= Baslangic Ekrani =========================
function init() {
  let savePassword = localStorage.getItem("password");

  if (!savePassword) {
    alert("Hoş Geldiniz Uygulamayı Kullanmak İçin Lütfen Şifre Oluşturun");
  }
};

// ========================= Enter Tusu Ile Giris =========================
document.getElementById("passwordInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkPassword();
  }
});

// ========================= Password Kontrol =========================
function checkPassword() {

  // localStorage Icindeki Password'u Aliyoruz
  let savePassword = localStorage.getItem("password");

  // DOM Uzerinden HTML Dosyasinda Girilen Sifreyi Aliyoruz
  let passwordInput = document.getElementById("passwordInput").value;

  if (!passwordInput) {
    alert("Şifre Boş Bırakılamaz! Lüften Tekrar Deneyiniz");
    return;
  }

  if (!savePassword) {
    localStorage.setItem("password", passwordInput);
    alert("Şifre Boş Bırakılamaz! Lüften Tekrar Deneyiniz");
    showApp();
  } else {
    // let userPassword = prompt("Lütfen Şifrenizi Giriniz");

    // Kullanici Sifre Girme Islemini Iptal Ediyor Ise
    if (passwordInput === savePassword) {
      alert("Giriş Başarılı! Hoş Geldiniz");
      showApp();
    } else {
      alert("Hatalı Şifre! Tekrar Deneyiniz");
      document.getElementById("passwordInput").value = "";
    }
  }
}

// Giris Basarili Oldugunda Kullaniciya Gosterilecek Ekran
function showApp() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
}

function menu() {
  let choise = prompt(
    "Ön Muhasebe Uygulamasına Hoşgeldiniz!\n\n" +
    "1- Gelir Ekle\n" +
    "2- Gider Ekle\n" +
    "3- Bilanço Göster\n" +
    "0- Çıkış"
  );

  switch (choise) {
    case "1":
      addIncome();
      menu();
      break;
    case "2":
      addExpense();
      menu();
      break;
    case "3":
      showBalance();
      menu();
      break;
    case "0":
      alert("Çıkış Yapıldı");
      break;
    default:
      alert("Hatalı Seçim");
      menu();
      break;
  }
}

init();

// ========================= Gelir Ekleme Fonksiyonu =========================
function addIncome() {
  let category = document.getElementById("incomeCategory").value.trim();
  let userIncome = document.getElementById("incomeAmount").value;
  let date = document.getElementById("incomeDate").value;
  let description = document.getElementById("incomeDescription").value.trim();
  let descriptionDetail = document.getElementById("incomeDescriptionDetail").value.trim();

  // Kullanicidan Alinmasi Gereken Alanlari Kontrol Ediyoruz
  if(!category || !userIncome || !date){
    alert("Lütfen Zorunlu Alanları Doldurunuz");
    return;
  }

  // Sabit KDV
  const kdvRate = 20;

  // Hesaplanan KDV
  let kdvCalculated = ((userIncome / 100) * kdvRate);

  // KDV Dahil Tutar
  let totalAmount = userIncome + kdvCalculated;

  // Kullanicidan Alinan Data'lara Data'nin Girildigi Tarihi Ekliyoruz
  // Eklenen Data'lar Ile Birlikte Olusturulan Objeyi 
  // Array'e Gondermek Icin Degiskene Atama Yapiyoruz
  transactions.push = {
    id: Date.now(),
    type: "gelir",
    category,amount: userIncome,
    kdvRate,
    kdvCalculated,
    totalAmount,
    date,
    description,
    descriptionDetail
  };

  // Array Icindeki Data'lari String Tipine Cevirip JSON Dosyasi Yapiyoruz
  localStorage.setItem("transactions", JSON.stringify(transactions));

  alert("Gelir başarıyla eklendi!");
}

// ========================= Gider Ekleme Fonksiyonu =========================
function addExpense() {
  let category = prompt("Gider Kategorisi Giriniz (Kira, Fatura vs):");
  let userExpence = Number(prompt("Gider Miktarını Giriniz: (KDV Hariç)"));
  let kdvRate = Number(prompt("KDV Oranını Giriniz: (Örneğin: 10, 20, 30)"));
  let date = prompt("Tarih Giriniz (YYYY-MM-DD):");
  let description = prompt("Açıklama Giriniz:");
  let descriptionDetail = prompt("Giderin Detayını Giriniz:");

  // Hesaplanan KDV
  let kdvCalculated = ((userExpence / 100) * kdvRate);

  // KDV Dahil Tutar
  let totalAmount = userExpence + kdvCalculated;

  // Kullanicidan Alinan Data'lara Data'nin Girildigi Tarihi Ekliyoruz
  // Eklenen Data'lar Ile Birlikte Olusturulan Objeyi 
  // Array'e Gondermek Icin Degiskene Atama Yapiyoruz
  let newExpense = {
    id: Date.now(),
    type: "gider",
    category: category,
    amount: userExpence,
    kdvRate: kdvRate,
    kdvCalculated: kdvCalculated,
    totalAmount: totalAmount,
    date: date,
    description: description,
    descriptionDetail: descriptionDetail
  };

  // Kullacidan Alinan Data'lari 
  // Atandigi Degisken Uzerinden Array'e Gonderiyoruz
  transactions.push(newExpense);

  // Array Icindeki Data'lari String Tipine Cevirip JSON Dosyasi Yapiyoruz
  localStorage.setItem("transactions", JSON.stringify(transactions));

  alert("Gider Başarıyla Eklendi!");
}

// ========================= Bilanco Hesaplama Fonksiyonu =========================
function showBalance() {

  if (transactions.length === 0) {
    alert("Henüz Hiç Kayıt Bulunmamaktadır.");
    return;
  }

  let totalIncomeWithKDV = 0;
  let totalExpenseWithKDV = 0;
  let totalIncomeNotKDV = 0;
  let totalExpenseNotKDV = 0;

  let output = "===== GELİR & GİDER LİSTESİ =====\n\n";

  for (let i = 0; i < transactions.length; i++) {

    let transaction = transactions[i];

    if (transaction.type === "gelir") {

      totalIncomeWithKDV += transaction.totalAmount;
      totalIncomeNotKDV += transaction.amount;

      output += `
        Gelir Detayları : 
        Gelir Kategorisi : ${transaction.category}
        Gelir Miktarı (KDV Hariç) : ${transaction.amount.toFixed(2)}
        KDV Oranı : ${transaction.kdvRate}
        KDV Tutarı : ${transaction.kdvCalculated.toFixed(2)}
        Gelir Miktarı (KDV Dahil) : ${transaction.totalAmount.toFixed(2)}
        Gelir Tarihi : ${transaction.date}
        Gelir Açıklaması : ${transaction.description}
        Gelir Detayları : ${transaction.descriptionDetail}
      `;
    } else if (transaction.type === "gider") {
      totalExpenseWithKDV += transaction.totalAmount;
      totalExpenseNotKDV += transaction.amount;
      output += `
        Gider Detayları : 
        Gider Kategorisi : ${transaction.category}
        Gider Miktarı (KDV Hariç) : ${transaction.amount.toFixed(2)}
        KDV Oranı : ${transaction.kdvRate}
        Gider Miktarı (KDV Dahil) : ${transaction.totalAmount.toFixed(2)}
        KDV Tutarı : ${transaction.kdvCalculated.toFixed(2)}
        Gider Tarihi : ${transaction.date}
        Gider Açıklaması : ${transaction.description}
        Gider Detayları : ${transaction.descriptionDetail}
      `;
    }
  }

  // =================== Vergi Hesaplama (KDV'siz net tutar üzerinden) =================
  // Vergi Matrahini Hesapliyoruz
  let netProfit = totalIncomeNotKDV - totalExpenseNotKDV;

  let taxAmount = 0;
  let taxMessage = "";

  if (netProfit > 0) {
    // Odenecek Vergiyi Hesapliyoruz
    // Kâr Var Ise → Vergi Hesapla
    taxAmount = netProfit * 0.2;
    taxMessage = `${taxAmount.toFixed(2)} TL`;
  } else {
    taxAmount = 0;

    // Zarar Var Ise → Vergi Cikmaz
    taxMessage = `VERGİ ÇIKMADI (Zarar/Sıfır)`;
  }

  let totalIncomeKDV = 0;
  let totalExpenseKDV = 0;

  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];

    if (transaction.type === "gelir") {
      totalIncomeKDV += transaction.kdvCalculated;
    } else if (transaction.type === "gider") {
      totalExpenseKDV += transaction.kdvCalculated;
    }
  }

  let kdvMessage = "";
  let payableKDV = totalIncomeKDV - totalExpenseKDV;

  if (payableKDV > 0) {
    kdvMessage = `${payableKDV.toFixed(2)} TL`;
  } else {
    kdvMessage = "DEVREDEN KDV (Ödenecek KDV Yok)";
  }

  output += `
    ═════════════════════════════════════
      TOPLAM GELİR (KDV Dahil)  : ${totalIncomeWithKDV.toFixed(2)} TL
      TOPLAM GİDER (KDV Dahil)  : ${totalExpenseWithKDV.toFixed(2)} TL
      BAKİYE (KDV Dahil)        : ${(totalIncomeWithKDV - totalExpenseWithKDV).toFixed(2)} TL
    ─────────────────────────────────────
      NET GELİR (KDV Hariç)     : ${totalIncomeNotKDV.toFixed(2)} TL
      NET GİDER (KDV Hariç)     : ${totalExpenseNotKDV.toFixed(2)} TL
      VERGİ MATRAHı             : ${netProfit.toFixed(2)} TL
      ÖDENECEk VERGİ (%20)      : ${taxMessage}
    ═════════════════════════════════════
      GELİR KDV TOPLAMI       : ${totalIncomeKDV.toFixed(2)} TL
      GİDER KDV TOPLAMI       : ${totalExpenseKDV.toFixed(2)} TL
      ÖDENECEK KDV            : ${kdvMessage}
  `;

  console.log(output);
};