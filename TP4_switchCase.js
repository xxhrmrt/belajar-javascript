//Satria Dewanto Indraloka - 211011401081

let hasilSalesman = 400000
let uangJasa = 0
let komisi = 0

switch (true) {
    case (hasilSalesman <= 200000):
        uangJasa = 10000
        komisi = hasilSalesman * 0.1
        break;
    case (hasilSalesman > 200000 && hasilSalesman <= 500000):
        uangJasa = 20000
        komisi = hasilSalesman * 0.15
        break;
    case (hasilSalesman > 500000):
        uangJasa = 30000
        komisi = hasilSalesman * 0.2
        break;
}

let totalKomisi = uangJasa + komisi

console.log(`Hasil Salesman sebesar Rp.${hasilSalesman}`)
console.log(`Uang Jasa sebesar Rp.${uangJasa} dan Komisi sebesar Rp.${komisi}`)
console.log(`Selamat anda mendapatkan Total Komisi sebesar Rp.${totalKomisi}`)