# Tanjidor — Website Brand Ambassador Telkom University

Website statis (HTML + CSS + JavaScript, tanpa instalasi apa pun) untuk komunitas Brand Ambassador Telkom University.

## Cara membuka
Klik dua kali `index.html`, atau jalankan server lokal:
```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

## Menaruh gambar kampus & logo Tanjidor
Simpan file di `assets/images/` dengan nama:
- `logo-tanjidor.png` — logo Tanjidor (navbar, hero, footer, favicon)
- `kampus.jpg` — foto kampus untuk latar belakang besar di bagian atas
- `galeri-1.jpg` … `galeri-6.jpg` — foto galeri kampus
- `ambassador-1.jpg` … `ambassador-8.jpg` — foto para ambassador

Selama file belum ada, website otomatis menampilkan placeholder.

## Mengubah isi
- **Data ambassador**: edit array `AMBASSADORS` di `js/main.js`.
- **Teks, program, agenda, kontak**: edit langsung di `index.html`.
- **Warna**: ubah variabel di bagian `:root` pada `css/style.css`.
- **Formulir pendaftaran**: saat ini hanya validasi di browser; hubungkan ke Google Form/Sheets atau backend pada bagian `TODO` di `js/main.js`.

## Struktur
```
index.html
css/style.css
js/main.js
assets/images/
```
