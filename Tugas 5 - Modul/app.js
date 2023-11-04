// app.js
const module1 = require('./name');
const module2 = require('./ipk');
const module3 = require('./bilGanjil');
const module4 = require('./umur');

// memanggil module1
module1.salam('Satria Dewanto Indraloka');

// memanggil module2
const ipk = module2.ipk(3.1, 3.2, 3.3, 3.4);
console.log(`IPK saya selama 4 semester ini adalah ${ipk}`);

// memanggil module3
const bilanganGanjilAntara1dan10 = module3();
console.log('Bilangan ganjil antara 1 dan 10:', bilanganGanjilAntara1dan10);

// memanggil module4
const thnLahir = new Date('2003');
const umur = module4.umur(thnLahir);
console.log(`Umur saya saat ini adalah ${umur}`);
