let transactions = [];

// Gelir Gider Bilgilerini Kullanicidan Aliyoruz
// Alinan Bilgileri localStorage Uzerinden Kullaniyoruz
transactions = JSON.parse(localStorage.getItem("transactions")) || [];

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

menu();

// ========================= Gelir Ekleme Fonksiyonu =========================
function addIncome() {
  let category = prompt("Gelir Kategorisi Giriniz (Maaş, Freelance vs):");
  let amount = Number(prompt("Gelir Miktarını Giriniz:"));
  let date = prompt("Tarih Giriniz (YYYY-MM-DD):");
  let description = prompt("Açıklama Giriniz:");
  let descriptionDetail = prompt("Yaptığınız İşi Giriniz:");

  // Kullanicidan Alinan Data'lara Data'nin Girildigi Tarihi Ekliyoruz
  // Eklenen Data'lar Ile Birlikte Olusturulan Objeyi 
  // Array'e Gondermek Icin Degiskene Atama Yapiyoruz
  let newIncome = {
    id: Date.now(),
    type: "gelir",
    category: category,
    amount: amount,
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
  let amount = Number(prompt("Gider Miktarını Giriniz:"));
  let date = prompt("Tarih Giriniz (YYYY-MM-DD):");
  let description = prompt("Açıklama Giriniz:");
  let descriptionDetail = prompt("Giderin Detayını Giriniz:");

  // Kullanicidan Alinan Data'lara Data'nin Girildigi Tarihi Ekliyoruz
  // Eklenen Data'lar Ile Birlikte Olusturulan Objeyi 
  // Array'e Gondermek Icin Degiskene Atama Yapiyoruz
  let newExpense = {
    id: Date.now(),
    type: "gider",
    category: category,
    amount: amount,
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
  let totalIncome = 0;
  let totalExpense = 0;

  let output = "===== GELİR & GİDER LİSTESİ =====\n\n";

  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    if (transaction.type === "gelir") {
      totalIncome += transaction.amount;
      output += `
        Gelir Detayları : 
        Gelir Kategorisi : ${transactions[i].category}
        Gelir Miktarı : ${transactions[i].amount}
        Gelir Tarihi : ${transactions[i].date}
        Gelir Açıklaması : ${transactions[i].description}
        Gelir Detayları : ${transactions[i].descriptionDetail}
      `;
    } else if (transaction.type === "gider") {
      totalExpense += transaction.amount;
      output += `
        Gider Detayları : 
        Gider Kategorisi : ${transactions[i].category}
        Gider Miktarı : ${transactions[i].amount}
        Gider Tarihi : ${transactions[i].date}
        Gider Açıklaması : ${transactions[i].description}
        Gider Detayları : ${transactions[i].descriptionDetail}
      `;
    }
  }

  output += `
    Toplam Gelir: ${totalIncome} TL \n +
    Toplam Gider: ${totalExpense} TL\n +
    Bakiye: (${totalIncome - totalExpense}) TL"
  `;
  console.log(output);
};