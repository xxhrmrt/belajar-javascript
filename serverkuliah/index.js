// METHOD PUT

const mahasiswaNim = "119"; // Ganti dengan NIM yang akan di edit
const updatedData = {
  nama: "Ronaldo",
  gender: "L",
  prodi: "TE",
  alamat: "Jl. Cibolang Kaler",
};

fetch(`http://localhost:3000/mahasiswa/${mahasiswaNim}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(updatedData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// METHOD POST

const newData = {
  nim: "121",
  nama: "Callie",
  gender: "P",
  prodi: "TE",
  alamat: "Serpong",
};

fetch("http://localhost:3000/mahasiswa", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// METHOD DELETE
const nimToDelete = "116";

fetch(`http://localhost:3000/mahasiswa/${nimToDelete}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
