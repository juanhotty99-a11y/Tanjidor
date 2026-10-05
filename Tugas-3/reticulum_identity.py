import RNS                                              # import library Reticulum Network Stack (RNS)

APP_NAME = "tugas3"                                     # nama aplikasi yang menjadi bagian dari nama destination
ASPECT = "kelompok"                                     # aspek (sub-nama) destination

reticulum = RNS.Reticulum()                             # menginisialisasi instance Reticulum (memuat/membuat konfigurasi ~/.reticulum)

identity = RNS.Identity()                               # membuat identity baru (pasangan kunci publik/privat X25519 + Ed25519)

destination = RNS.Destination(                          # membuat destination (alamat tujuan) di jaringan Reticulum
    identity,                                           # identity pemilik destination
    RNS.Destination.IN,                                 # arah IN: destination ini menerima paket masuk
    RNS.Destination.SINGLE,                             # tipe SINGLE: terenkripsi untuk satu identity saja
    APP_NAME,                                           # nama aplikasi
    ASPECT                                              # aspek destination
)

print("=== IDENTITY ===")                               # judul bagian identity
print("Identity              :", identity)              # menampilkan identity (hash identity dalam format <...>)
print("Identity hash         :", RNS.prettyhexrep(identity.hash))       # menampilkan hash identity dalam bentuk hex
print("Public key            :", identity.get_public_key().hex())       # menampilkan kunci publik identity dalam hex
print()                                                 # baris kosong sebagai pemisah
print("=== DESTINATION ===")                            # judul bagian destination
print("Destination           :", destination)           # menampilkan objek destination (nama lengkap + hash)
print("Nama destination      :", destination.name)      # menampilkan nama lengkap destination (app.aspect)
print("Destination hash      :", RNS.prettyhexrep(destination.hash))    # menampilkan hash destination (alamat di jaringan)
print("Arah (direction)      :", "IN" if destination.direction == RNS.Destination.IN else "OUT")  # menampilkan arah destination
print("Tipe                  :", "SINGLE" if destination.type == RNS.Destination.SINGLE else destination.type)  # menampilkan tipe destination
