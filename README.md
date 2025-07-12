# WormGPT Telegram Bot

Bot Telegram ini adalah adaptasi dari bot WhatsApp WormGPT yang memiliki kemampuan untuk:
- Menerjemahkan kode ke berbagai bahasa pemrograman.
- Memperbaiki bug dalam kode.
- Menjawab pertanyaan umum menggunakan model bahasa AI.
- Mengaktifkan/menonaktifkan mode Jailbreak untuk respons AI yang tidak terbatas.

## Fitur
- **Terjemahan Kode**: `.wormgpt translate to <lang> <code>`
- **Perbaikan Bug**: `.wormgpt fix <code>`
- **Tanya Jawab**: `.wormgpt ask <prompt>`
- **Mode Jailbreak**: `.wormgpt jailbreak <on/off>`
- **Endpoint Ping**: Bot sekarang memiliki endpoint HTTP `/ping` yang dapat digunakan untuk menjaga bot tetap aktif di platform hosting yang cenderung menidurkan aplikasi.

## Persyaratan
- Node.js (versi 16 atau lebih baru)
- Akun OpenAI (untuk mendapatkan API Key)
- Bot Telegram (untuk mendapatkan Bot Token)

## Instalasi
1. Clone repository ini atau unduh file ZIP.
2. Ekstrak file ke folder pilihan Anda.
3. Buka terminal di dalam folder project dan jalankan `npm install` untuk menginstal dependensi.

## Konfigurasi
1. Buat file `config.js` di root folder project (sejajar dengan `index.js`).
2. Isi `config.js` dengan informasi berikut:

   ```javascript
   module.exports = {
     BOT_TOKEN: 'YOUR_TELEGRAM_BOT_TOKEN', // Ganti dengan token bot Telegram Anda
     OPENAI_API_KEY: 'YOUR_OPENAI_API_KEY', // Ganti dengan API Key OpenAI Anda
     OWNER_IDS: [YOUR_TELEGRAM_USER_ID], // Ganti dengan ID pengguna Telegram Anda (contoh: [123456789])
     PREMIUM_USERS: [], // Opsional: Daftar ID pengguna Telegram premium (contoh: [987654321])
   };
   ```

   - **Cara mendapatkan BOT_TOKEN**: Buka Telegram, cari `@BotFather`, dan ikuti instruksi untuk membuat bot baru. BotFather akan memberikan Anda token.
   - **Cara mendapatkan OPENAI_API_KEY**: Kunjungi [platform.openai.com](https://platform.openai.com/) dan buat API Key baru.
   - **Cara mendapatkan TELEGRAM_USER_ID**: Kirim pesan ke bot `@userinfobot` di Telegram, bot akan membalas dengan ID pengguna Anda.

## Menjalankan Bot
Setelah konfigurasi selesai, jalankan bot dengan perintah:

```bash
node index.js
```

Bot akan mulai berjalan dan siap menerima perintah di Telegram. Selain itu, bot juga akan menjalankan server HTTP di port yang ditentukan (default 3000) dengan endpoint `/ping`.

## Menjaga Bot Tetap Aktif (Uptime Monitoring)

Jika Anda mendeploy bot di platform hosting gratis seperti Glitch atau Replit yang cenderung menidurkan aplikasi setelah periode tidak aktif, Anda bisa menggunakan layanan *uptime monitor* eksternal untuk secara berkala memicu endpoint `/ping` bot Anda. Ini akan mensimulasikan aktivitas dan mencegah bot *sleep*.

Berikut adalah beberapa layanan gratis yang bisa Anda gunakan untuk mengatur *cron job* atau *uptime monitor*:

### Opsi 1: Cron-job.org

[Cron-job.org](https://cron-job.org/) adalah layanan *cron job* online gratis yang mudah digunakan.

1.  **Daftar atau Login**: Kunjungi [cron-job.org](https://cron-job.org/) dan daftar akun baru atau login jika sudah punya.
2.  **Buat Cronjob Baru**: Setelah login, klik "Create cronjob" atau "Add cronjob".
3.  **Konfigurasi Cronjob**:
    *   **Title**: Berikan nama yang deskriptif (misalnya, `WormGPT Bot Uptime`).
    *   **Address (URL)**: Masukkan URL bot Anda diikuti dengan `/ping` (contoh: `https://nama-proyek-glitch-anda.glitch.me/ping`).
    *   **Schedule**: Atur jadwal pemicuan. Disarankan untuk memicu setiap 5-10 menit. Anda bisa memilih opsi yang tersedia atau menggunakan ekspresi cron kustom (misalnya, `*/5 * * * *` untuk setiap 5 menit).
    *   **HTTP Method**: Pilih `GET`.
    *   Biarkan pengaturan lainnya sebagai *default*.
4.  **Simpan**: Klik "Create" atau "Save" untuk menyimpan *cron job* Anda.

### Opsi 2: UptimeRobot

[UptimeRobot](https://uptimerobot.com/) adalah layanan *monitoring* yang juga bisa digunakan untuk mem-ping URL secara berkala.

1.  **Daftar atau Login**: Kunjungi [uptimerobot.com](https://uptimerobot.com/) dan daftar akun baru atau login.
2.  **Add New Monitor**: Klik "Add New Monitor".
3.  **Konfigurasi Monitor**:
    *   **Monitor Type**: Pilih `HTTP(s)`.
    *   **Friendly Name**: Berikan nama yang deskriptif (misalnya, `WormGPT Bot Ping`).
    *   **URL (or IP)**: Masukkan URL bot Anda diikuti dengan `/ping` (contoh: `https://nama-proyek-glitch-anda.glitch.me/ping`).
    *   **Monitoring Interval**: Atur interval. 5 menit sudah cukup baik.
    *   Biarkan pengaturan lainnya sebagai *default*.
4.  **Create Monitor**: Klik "Create Monitor".

### Opsi 3: GitHub Actions (Jika Anda menggunakan GitHub)

Jika proyek bot Anda terhubung ke GitHub, Anda bisa menggunakan GitHub Actions untuk menjadwalkan pemicuan endpoint `/ping`.

1.  **Buat Workflow File**: Di repositori GitHub Anda, buat file baru di `.github/workflows/` (misalnya, `ping-bot.yml`).
2.  **Isi File Workflow**: Tambahkan konten berikut ke file `ping-bot.yml`:

    ```yaml
    name: Ping WormGPT Bot

on:
  schedule:
    # Runs every 5 minutes
    - cron: \'*/5 * * * *\'

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Bot Endpoint
        run: curl -s ${{ secrets.BOT_URL_WITH_PING_ENDPOINT }}
    ```

3.  **Tambahkan Secret**: Di repositori GitHub Anda, pergi ke **Settings** > **Secrets and variables** > **Actions**.
    *   Klik "New repository secret".
    *   **Name**: `BOT_URL_WITH_PING_ENDPOINT`
    *   **Value**: URL bot Anda diikuti dengan `/ping` (contoh: `https://nama-proyek-glitch-anda.glitch.me/ping`).
4.  **Commit dan Push**: Commit file `ping-bot.yml` dan push ke repositori Anda. GitHub Actions akan secara otomatis mulai berjalan sesuai jadwal.

Dengan salah satu opsi di atas, bot Telegram WormGPT Anda akan dipicu secara berkala, mencegahnya *sleep* di platform hosting gratis.

