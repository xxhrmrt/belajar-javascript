//Satria Dewanto Indraloka - 211011401081

let hasilSalesman = 300000
let uangJasa = 0
let komisi = 0

if (hasilSalesman <= 200000){
    uangJasa = 10000
    komisi = hasilSalesman * 0.1
} else if (hasilSalesman > 200000 && hasilSalesman <= 500000) {
    uangJasa = 20000
    komisi = hasilSalesman * 0.15
} else if (hasilSalesman > 500000){
    uangJasa = 30000
    komisi = hasilSalesman * 0.2
}

let totalKomisi = uangJasa + komisi

console.log(`Hasil Salesman sebesar ${hasilSalesman}`)
console.log(`Uang Jasa sebesar ${uangJasa} dan Komisi sebesar ${komisi}`)
console.log(`Selamat anda mendapatkan Total Komisi sebesar ${totalKomisi}`)