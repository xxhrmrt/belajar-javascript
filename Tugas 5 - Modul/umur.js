// module4

function umur(thnLahir) {
        const thnNow = new Date().getFullYear();
        const thnBorn = thnLahir.getFullYear();
        return thnNow - thnBorn;
    }
  
    module.exports = {
        umur
    };
  