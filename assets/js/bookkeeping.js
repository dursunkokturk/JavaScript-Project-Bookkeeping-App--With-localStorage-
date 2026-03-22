let transactions = [];

// Gelir Gider Bilgilerini Kullanicidan Aliyoruz
// Alinan Bilgileri localStorage Uzerinden Kullaniyoruz
transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ========================= Gelir Ekleme Fonksiyonu =========================
function addIncome() {
  let category = prompt("Gelir Kategorisi Giriniz (Maaş, Freelance vs):");
  let amount = Number(prompt("Gelir Miktarını Giriniz:"));
  let date = prompt("Tarih Giriniz (YYYY-MM-DD):");
  let description = prompt("Açıklama Giriniz:");

  // Kullanicidan Alinan Data'lara Data'nin Girildigi Tarihi Ekliyoruz
  // Eklenen Data'lar Ile Birlikte Olusturulan Objeyi 
  // Array'e Gondermek Icin Degiskene Atama Yapiyoruz
  let newIncome = {
    id: Date.now(),
    type: "gelir",
    category: category,
    amount: amount,
    date: date,
    description: description
  };

  // Kullacidan Alinan Data'lari 
  // Atandigi Degisken Uzerinden Array'e Gonderiyoruz
  transactions.push(newIncome);

  // Array Icindeki Data'lari String Tipine Cevirip JSON Dosyasi Yapiyoruz
  localStorage.setItem("transactions", JSON.stringify(transactions));

  alert("Gelir başarıyla eklendi!");
}

// transactions Array Icindeki Gelirleri Console Ekraninda Yazdiriyoruz
for (let i = 0; i < transactions.length; i++) {
  if (transactions[i].type === "gelir") {
    console.log(transactions[i]);
  }
}


// ========================= Gider Ekleme Fonksiyonu =========================
function addExpense() {
  let category = prompt("Gider Kategorisi Giriniz (Kira, Fatura vs):");
  let amount = Number(prompt("Gider Miktarını Giriniz:"));
  let date = prompt("Tarih Giriniz (YYYY-MM-DD):");
  let description = prompt("Açıklama Giriniz:");

  // Kullanicidan Alinan Data'lara Data'nin Girildigi Tarihi Ekliyoruz
  // Eklenen Data'lar Ile Birlikte Olusturulan Objeyi 
  // Array'e Gondermek Icin Degiskene Atama Yapiyoruz
  let newExpense = {
    id: Date.now(),
    type: "gider",
    category: category,
    amount: amount,
    date: date,
    description: description
  };

  // Kullacidan Alinan Data'lari 
  // Atandigi Degisken Uzerinden Array'e Gonderiyoruz
  transactions.push(newExpense);

  // Array Icindeki Data'lari String Tipine Cevirip JSON Dosyasi Yapiyoruz
  localStorage.setItem("transactions", JSON.stringify(transactions));

  alert("Gider Başarıyla Eklendi!");
}

for (let i = 0; i < transactions.length; i++) {
  if (transactions[i].type === "gider") {
    console.log(transactions[i]);
  }
}


function showBalance() {
  let totalIncome = 0;
  let totalExpense = 0;

  for (let i=0;i<transactions.length;i++){
    if (transactions[i].type === "gelir") {
      totalIncome += transactions[i].amount;
    } else if (transactions[i].type === "gider"){
      totalExpense += transactions[i].amount;
    }
  }

  alert(
    "Toplam Gelir: " + totalIncome + " TL\n" +
    "Toplam Gider: " + totalExpense + " TL\n" +
    "Bakiye: " + (totalIncome - totalExpense) + " TL"
  );
};

addIncome();
addExpense();
showBalance();