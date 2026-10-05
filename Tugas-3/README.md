# Tugas 3 – Proses pada Sistem Terdistribusi (CAK3EAB3)

| File | Isi |
|---|---|
| `Jawaban_Tugas-3_Proses_pada_Sistem_Terdistribusi.docx` | Lembar soal + jawaban lengkap (source code, output, langkah instalasi) |
| `thread_penjumlahan.py` | Soal 1 – penjumlahan angka dengan thread (input dinamis, minimal 2 thread) |
| `Dockerfile` | Soal 2 – menjalankan program thread di dalam container Docker |
| `reticulum_identity.py` | Soal 3 – membuat & menampilkan identity dan destination Reticulum |
| `output/` | Hasil menjalankan program |

## Menjalankan
```bash
python3 thread_penjumlahan.py           # soal 1
docker run hello-world                  # soal 2 (cek instalasi)
docker build -t tugas3-thread . && docker run --rm -i tugas3-thread
pip install rns && python3 reticulum_identity.py   # soal 3
```
