// bilGanjil.js
function cariBilanganGanjil() {
    const bilanganGanjil = [];
    for (let i = 1; i <= 10; i++) {
      if (i % 2 !== 0) {
        bilanganGanjil.push(i);
      }
    }
    return bilanganGanjil;
  }
  
  module.exports = cariBilanganGanjil;
  