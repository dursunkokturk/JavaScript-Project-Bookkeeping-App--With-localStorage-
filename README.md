# TR
# Ön Muhasebe Uygulaması
Küçük işletmeler ve serbest çalışanlar için geliştirilmiş, şifre korumalı, tarayıcı tabanlı bir ön muhasebe uygulaması. Gelir ve gider kayıtlarını KDV hesaplamasıyla birlikte tutar; bilanço ekranında vergi matrahı ve ödenecek KDV'yi otomatik olarak hesaplar.

## Canlı Önizleme

[Proje Önizleme.]()
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
