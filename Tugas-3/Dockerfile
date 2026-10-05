# Image dasar Python versi ringan
FROM python:3.11-slim
# Direktori kerja di dalam container
WORKDIR /app
# Menyalin program thread ke dalam container
COPY thread_penjumlahan.py .
# Perintah yang dijalankan saat container start
CMD ["python", "thread_penjumlahan.py"]
