# lancar-content

Konten tambahan (bank soal dan artikel) untuk aplikasi Lancar. Isinya hanya materi belajar buatan sendiri, tanpa kunci atau data pribadi.

- `index.json` daftar paket. Aplikasi membaca file ini dulu.
- `packs/YYYY-MM-DD.json` satu paket per hari: `{ "bank": [...], "articles": [...] }`.
- `node validate.mjs` memeriksa semua paket sebelum di-push.

Materi belum diperiksa guru bahasa. Id selalu diawali huruf r dan tidak boleh ganda.
