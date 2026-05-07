// Vefk (İslami Sihirli Kare) — Siamese / De la Loubère Algoritması
// Sadece tek boyutlar (3, 5, 7, ...) desteklenir
// Merkez hücre = verilen Ebced değeri; sihirli toplam = merkez × boyut

function siameseBoy(n) {
  const grid = Array.from({ length: n }, () => Array(n).fill(0))
  let row = 0
  let col = Math.floor(n / 2)

  for (let v = 1; v <= n * n; v++) {
    grid[row][col] = v
    const sr = (row - 1 + n) % n
    const sc = (col + 1) % n
    if (grid[sr][sc] !== 0) {
      row = (row + 1) % n
    } else {
      row = sr
      col = sc
    }
  }
  return grid
}

/**
 * @param {number} boyut — Kare boyutu (tek sayı: 3, 5, 7, ...)
 * @param {number} merkez — Ebced değeri (merkez hücreye yerleşir)
 * @returns {{ grid: number[][], buyuBu: number, boyut: number, merkez: number }}
 */
export function vefk(boyut, merkez) {
  if (boyut % 2 === 0 || boyut < 3) {
    throw new Error('Vefk boyutu 3 veya daha büyük tek sayı olmalıdır')
  }

  const baz = siameseBoy(boyut)
  // 1..n² → merkez-⌊n²/2⌋ ... merkez+⌊n²/2⌋
  const offset = merkez - Math.floor((boyut * boyut) / 2) - 1
  const grid = baz.map(satir => satir.map(v => v + offset))
  const buyuBu = merkez * boyut

  return { grid, buyuBu, boyut, merkez }
}
