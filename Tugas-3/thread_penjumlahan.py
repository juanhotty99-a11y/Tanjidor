from threading import Thread, Lock                      # import kelas Thread (membuat thread) dan Lock (pengunci data bersama)
from time import gmtime                                 # import gmtime untuk mencatat waktu (seperti contoh pada slide)

total = 0                                               # variabel global yang dipakai bersama (shared) oleh semua thread
kunci = Lock()                                          # lock agar hanya satu thread yang mengubah 'total' pada satu waktu

def jumlahkan(nama, awal, akhir):                       # fungsi yang dijalankan oleh setiap thread
    global total                                        # menyatakan bahwa 'total' yang dipakai adalah variabel global
    hasil_parsial = sum(range(awal, akhir + 1))         # menjumlahkan bagian angka milik thread ini (awal s.d. akhir)
    t = gmtime()                                        # mengambil waktu saat thread selesai menghitung
    with kunci:                                         # mengunci agar tidak terjadi race condition saat menulis 'total'
        total += hasil_parsial                          # menambahkan hasil parsial ke total bersama
        print(f"{t.tm_min}:{t.tm_sec} {nama} menjumlahkan {awal} s.d. {akhir} = {hasil_parsial}")  # menampilkan hasil parsial thread

if __name__ == '__main__':                              # blok utama hanya dijalankan bila file dieksekusi langsung
    angka_awal = int(input("Input angka awal: "))       # meminta input angka awal dari pengguna
    angka_akhir = int(input("Input angka akhir: "))     # meminta input angka akhir dari pengguna
    jumlah_thread = int(input("Thread yang digunakan: "))  # meminta input jumlah thread yang akan digunakan
    if jumlah_thread < 2:                               # memeriksa syarat minimal thread
        jumlah_thread = 2                               # jika kurang dari 2, dipaksa menjadi 2 thread
        print("Jumlah thread minimal 2, dipakai 2 thread")  # memberi tahu pengguna bahwa thread diubah menjadi 2
    if angka_awal > angka_akhir:                        # memeriksa apakah urutan input terbalik
        angka_awal, angka_akhir = angka_akhir, angka_awal  # menukar nilai agar angka awal <= angka akhir

    banyak_angka = angka_akhir - angka_awal + 1         # menghitung banyaknya angka yang akan dijumlahkan
    ukuran = banyak_angka // jumlah_thread              # banyak angka dasar yang dikerjakan setiap thread
    sisa = banyak_angka % jumlah_thread                 # sisa angka yang dibagikan ke thread-thread pertama
    daftar_thread = []                                  # list untuk menyimpan semua objek thread
    mulai = angka_awal                                  # batas awal bagian untuk thread pertama

    for i in range(jumlah_thread):                      # perulangan untuk membuat setiap thread
        panjang = ukuran + (1 if i < sisa else 0)       # thread ke-i mendapat 1 angka tambahan jika masih ada sisa
        selesai = mulai + panjang - 1                   # batas akhir bagian untuk thread ke-i
        th = Thread(target=jumlahkan, args=(f"Thread-{i+1}", mulai, selesai))  # membuat thread dengan fungsi dan argumennya
        daftar_thread.append(th)                        # menyimpan thread ke dalam list
        th.start()                                      # menjalankan thread
        mulai = selesai + 1                             # batas awal untuk thread berikutnya

    for th in daftar_thread:                            # perulangan untuk menunggu semua thread
        th.join()                                       # menunggu thread selesai sebelum lanjut

    print(f"\nHasil penjumlahan: {total}")              # menampilkan hasil akhir penjumlahan
