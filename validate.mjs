// Pemeriksa paket konten harian. Jalankan: node validate.mjs   (keluar dengan kode 1 jika ada yang salah)
import { readFileSync, readdirSync } from 'node:fs';
const LV = ['Dasar', 'Menengah', 'Menengah atas', 'Menuju lancar'];
const s = (x, m = 400) => typeof x === 'string' && x.trim() && x.length <= m;
const o3 = (o) => Array.isArray(o) && o.length === 3 && o.every((x) => s(x, 120)) && new Set(o).size === 3;
const idx = JSON.parse(readFileSync('index.json', 'utf8')); let bad = 0; const seen = new Set();
const err = (f, id, m) => { bad++; console.log(`${f} ${id}: ${m}`); };
for (const f of idx.packs) {
  const p = JSON.parse(readFileSync(f, 'utf8'));
  for (const x of p.bank ?? []) {
    if (!/^r[\w-]{2,40}$/.test(x.id)) err(f, x.id, 'id harus mulai r');
    if (seen.has(x.id)) err(f, x.id, 'id ganda'); seen.add(x.id);
    if (!s(x.topic, 60) || !LV.includes(x.level)) err(f, x.id, 'topic/level salah');
    if (!s(x.q) || !o3(x.opts) || !(x.a >= 0 && x.a <= 2) || !s(x.why, 500)) err(f, x.id, 'q/opts/a/why salah');
  }
  for (const x of p.articles ?? []) {
    if (!/^r[\w-]{2,40}$/.test(x.id)) err(f, x.id, 'id harus mulai r'); if (seen.has(x.id)) err(f, x.id, 'id ganda'); seen.add(x.id);
    if (!s(x.title, 120) || !s(x.level, 30) || !Number.isInteger(x.min) || !(x.body?.length >= 2) || !x.body.every((b) => s(b, 1500))) err(f, x.id, 'artikel salah');
    if (!x.gloss || !Object.values(x.gloss).every((v) => s(v, 120))) err(f, x.id, 'gloss salah');
    if (!(x.qs?.length >= 2) || !x.qs.every((q) => s(q.q) && o3(q.opts) && q.a >= 0 && q.a <= 2)) err(f, x.id, 'soal artikel salah');
  }
}
console.log(bad ? `${bad} masalah` : `OK (${seen.size} item)`); process.exit(bad ? 1 : 0);
