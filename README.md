# TR
# Ön Muhasebe Uygulaması
Küçük işletmeler ve serbest çalışanlar için geliştirilmiş, şifre korumalı, tarayıcı tabanlı bir ön muhasebe uygulaması. Gelir ve gider kayıtlarını KDV hesaplamasıyla birlikte tutar; bilanço ekranında vergi matrahı ve ödenecek KDV'yi otomatik olarak hesaplar.

## Canlı Önizleme

[Proje Önizleme.](https://dursunkokturk.github.io/JavaScript-Project-Bookkeeping-App--With-localStorage-)
![Proje Görseli]()

## Özellikler

- Şifre Koruması — localStorage tabanlı şifre oluşturma ve doğrulama; Enter tuşuyla hızlı giriş
- Gelir Kaydı — Kategori, tutar, tarih, açıklama ve iş detayıyla gelir ekleme; %20 KDV otomatik hesaplanır
- Gider Kaydı — Kategori, tutar, özelleştirilebilir KDV oranı, tarih ve gider detayıyla gider ekleme
- Bilanço Ekranı — Tüm kayıtları ayrı tablolarda listeler; KDV dahil/hariç toplam, vergi matrahı, ödenecek vergi (%20) ve ödenecek/devreden KDV otomatik hesaplanır
- Kalıcı Veri — Tüm işlemler localStorage'da saklanır; sayfa yenilenmesinde veriler korunur
- Ekran Geçiş Sistemi — CSS active sınıfıyla tek sayfa uygulama (SPA) davranışı; her geçişte fadeUp animasyonu
- Duyarlı Tasarım — 600px ve 400px breakpoint'leriyle mobil uyumlu düzen

## Bilanço Hesaplama Mantığı

| Hesaplama       | Açıklama                                                     |
| --------------- |--------------------------------------------------------------|
| KDV Tutarı      | (Tutar / 100) × KDV Oranı                                    |
| KDV Dahil Tutar | Tutar + KDV Tutarı                                           |
| Vergi Matrahı   | Net Gelir (KDV Hariç) − Net Gider (KDV Hariç)                |
| Ödenecek Vergi  | Vergi Matrahı × %20 (Zarar varsa vergi çıkmaz)               |
| Ödenecek KDV    | Toplam Gelir KDV − Toplam Gider KDV (Negatifse devreden KDV) |

## Teknolojiler

| Teknoloji    | Açıklama                                                     |
| ------------ |--------------------------------------------------------------|
| HTML5        | Semantik sayfa yapısı, defer ile script yükleme              |
| CSS3         | CSS değişkenleri, Grid, Flexbox, animasyonlar                |
| JavaScript   | DOM manipülasyonu, localStorage, ekran yönetimi              |
| Google Fonts | Playfair Display (başlıklar) + DM Sans (gövde)               |
| Ödenecek KDV | Toplam Gelir KDV − Toplam Gider KDV (Negatifse devreden KDV) |

## Proje Yapısı
on-muhasebe/ <br>
├── index.html <br>
└── assets/ <br>
    ├── css/ <br>
    │   └── style.css <br>
    └── js/ <br>
        └── bookkeeping.js <br>

## Kurulum
Proje herhangi bir bağımlılık gerektirmez. Klonladıktan sonra doğrudan tarayıcıda açabilirsiniz.
bash# Repoyu klonlayın
git clone https://github.com/kullanici-adi/on-muhasebe.git

### Proje klasörüne girin
cd on-muhasebe

### index.html dosyasını tarayıcıda açın
open index.html

#### Not: 
localStorage kullanıldığından uygulamanın file:// protokolü yerine bir yerel sunucu üzerinden çalıştırılması önerilir. Live Server VS Code eklentisi tercih edilebilir.


## Kullanım

- Uygulamayı ilk açışta bir şifre oluşturun — şifre localStorage'a kaydedilir
- Gelir Ekle ile kategori, tutar ve tarih girerek gelir kaydedin (KDV otomatik %20 uygulanır)
- Gider Ekle ile kategori, tutar, KDV oranı ve tarih girerek gider kaydedin
- Bilanço Göster ile gelir/gider tablolarını ve genel bilanço özetini görüntüleyin

## Tasarım Detayları

- Renk Paleti:

    - #4F7EFF — Mavi vurgu (butonlar, odak gölgesi)
    - #2BB673 — Yeşil (gelir etiketi)
    - #E05252 — Kırmızı (gider etiketi)
    - #F5F7FB — Açık gri arka plan
    - #2A2F45 — Koyu lacivert (birincil metin)

- Animasyonlar: fadeUp (ekran geçişleri), pulse (giriş ekranı ikonu)
- CSS Değişkenleri: :root üzerinde tanımlı token sistemi

## Önemli Notlar

- Veriler yalnızca tarayıcının localStorage'ında saklanır; tarayıcı verisi silinirse kayıtlar kaybolur
- Şifre sıfırlama için localStorage.removeItem("password") konsol komutu kullanılabilir
- Gelir KDV oranı sabit %20 olup gider KDV oranı kullanıcı tarafından belirlenir




# EN
# Bookkeeping App
A browser-based bookkeeping application with password protection, developed for small businesses and freelancers. It keeps income and expense records with VAT calculations and automatically computes the tax base and VAT payable on the balance sheet screen.

## Live Preview
Project Preview.

## Features

- Password Protection — localStorage-based password creation and validation; quick login with Enter key
- Income Entry — Add income with category, amount, date, description, and job details; 20% VAT calculated automatically
- Expense Entry — Add expenses with category, amount, customizable VAT rate, date, and expense details
- Balance Sheet Screen — Lists all records in separate tables; automatically calculates VAT-inclusive/exclusive totals, tax base, - tax payable (20%), and VAT payable/carried forward
- Persistent Data — All transactions stored in localStorage; data retained on page refresh
- Screen Transition System — Single-page application (SPA) behavior with CSS active class; fadeUp animation on every transition
- Responsive Design — Mobile-friendly layout with 600px and 400px breakpoints

## Balance Sheet Calculation Logic

| Calculation          | Description                                                             |
| -------------------- |-------------------------------------------------------------------------|
| VAT Amount           | (Amount / 100) × VAT Rate                                               |
| VAT-Inclusive Amount | Amount + VAT Amount                                                     |
| Tax Base             | Net Income (Excl. VAT) − Net Expense (Excl. VAT)                        |
| Tax Payable          | Tax Base × 20% (no tax if there is a loss)                              |
| VAT Payable          | Total Income VAT − Total Expense VAT (if negative, carried-forward VAT) |

## Technologies

| Technology   | Description                                        |
| ------------ |----------------------------------------------------|
| HTML5        | Semantic page structure, script loading with defer |
| CSS3         | CSS variables, Grid, Flexbox, animations           |
| JavaScript   | DOM manipulation, localStorage, screen management  |
| Google Fonts | Playfair Display (headings) + DM Sans (body)       |

## Project Structure
bookkeeping/ <br>
├── index.html <br>
└── assets/ <br>
    ├── css/ <br>
    │   └── style.css <br>
    └── js/ <br>
        └── bookkeeping.js <br>

## Installation
The project requires no dependencies. After cloning, you can open it directly in the browser.
bash# Clone the repo
git clone https://github.com/username/bookkeeping.git

### Navigate to the project folder
cd bookkeeping

### Open index.html in the browser
open index.html

#### Note: 
Since localStorage is used, it is recommended to run the application through a local server rather than the file:// protocol. The Live Server VS Code extension is a good option.

## Usage

- On first launch, create a password — it will be saved to localStorage
- Use Add Income to save income by entering category, amount, and date (VAT is automatically applied at 20%)
- Use Add Expense to save expenses by entering category, amount, VAT rate, and date
- Use Show Balance Sheet to view income/expense tables and the overall balance summary

## Design Details
- Color Palette:

    - #4F7EFF — Blue accent (buttons, focus shadow)
    - #2BB673 — Green (income label)
    - #E05252 — Red (expense label)
    - #F5F7FB — Light grey background
    - #2A2F45 — Dark navy (primary text)

- Animations: fadeUp (screen transitions), pulse (login screen icon)
- CSS Variables: Token system defined on :root

## Important Notes

- Data is stored only in the browser's localStorage; records will be lost if browser data is cleared
- To reset the password, use the console command localStorage.removeItem("password")
- Income VAT rate is fixed at 20%; expense VAT rate is set by the user
