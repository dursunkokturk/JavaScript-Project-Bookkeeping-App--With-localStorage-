// Gelir Gider Bilgilerini Kullanicidan Aliyoruz
// Alinan Bilgileri localStorage Uzerinden Kullaniyoruz
transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function checkPassword() {

  // localStorage Icindeki Password'u Aliyoruz
  let savePassword = localStorage.getItem("password");

  if (!savePassword) {
    let newPassword = prompt("Lütfen Bir Şifre Oluşturunuz");

    if (!newPassword || newPassword.trim() === "") {
      alert("Şifre Boş Bırakılamaz! Lüften Tekrar Deneyiniz");
      checkPassword();
      return;
    }
    localStorage.setItem("password", newPassword.trim());
    alert("Şifre Oluşturuldu. Artık Sistemi Giriş Yapabilirsiniz");
    menu();
  } else {
    let userPassword = prompt("Lütfen Şifrenizi Giriniz");

    // Kullanici Sifre Girme Islemini Iptal Ediyor Ise
    if (userPassword === null) {
      alert("Uygulama Kapatıldı");
      return;
    }

    if (userPassword.trim() === savePassword) {
      alert("Giriş Başarılı Hoş Geldiniz");
      menu();
    } else {
      alert("Hatalı Şifre! Tekrar Deneyiniz");
      checkPassword();
    }
  }
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

checkPassword();

// ========================= Gelir Ekleme Fonksiyonu =========================
function addIncome() {
  let category = prompt("Gelir Kategorisi Giriniz (Maaş, Freelance vs):");
  let userIncome = Number(prompt("Gelir Miktarını Giriniz:"));
  let date = prompt("Tarih Giriniz (YYYY-MM-DD):");
  let description = prompt("Açıklama Giriniz:");
  let descriptionDetail = prompt("Yaptığınız İşi Giriniz:");

  // Sabit KDV
  const kdvRate = 20;

  // Hesaplanan KDV
  let kdvCalculated = ((userIncome / 100) * kdvRate);

  // KDV Dahil Tutar
  let totalAmount = userIncome + kdvCalculated;

  // Kullanicidan Alinan Data'lara Data'nin Girildigi Tarihi Ekliyoruz
  // Eklenen Data'lar Ile Birlikte Olusturulan Objeyi 
  // Array'e Gondermek Icin Degiskene Atama Yapiyoruz
  let newIncome = {
    id: Date.now(),
    type: "gelir",
    category: category,
    amount: userIncome,
    kdvRate: kdvRate,
    kdvCalculated: kdvCalculated,
    totalAmount: totalAmount,
    date: date,
    description: description,
    descriptionDetail: descriptionDetail
  };

  // Kullacidan Alinan Data'lari 
  // Atandigi Degisken Uzerinden Array'e Gonderiyoruz
  transactions.push(newIncome);

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
  `;

  console.log(output);
};