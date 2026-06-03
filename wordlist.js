// Magyar szóellenőrzés
// A játékosra bízzuk a becsületes játékot — csak alapszabályok
function isValidWord(word) {
  const w = word.toUpperCase().trim();
  if (!w) return false;
  // Minimum 2 betű
  if (w.length < 2) return false;
  // Csak magyar betűk (ékezetekkel)
  if (!/^[A-ZÁÉÍÓÖŐÚÜŰ]+$/.test(w)) return false;
  // Nem lehet csak egyforma betű (pl. AAAA)
  if (w.split('').every(c => c === w[0])) return false;
  return true;
}
