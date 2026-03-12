// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
getFirestore,
collection,
getDocs,
addDoc,
deleteDoc,
updateDoc,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyAP0Wo9ThNlCuYf3p-QpXheQef35JpSxmw",
  authDomain: "insancemerlang-afa84.firebaseapp.com",
  projectId: "insancemerlang-afa84",
  storageBucket: "insancemerlang-afa84.firebasestorage.app",
  messagingSenderId: "1023394217783",
  appId: "1:1023394217783:web:2e5a5d0957d8ec35b5a4b2"
};


// INISIALISASI FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const guruCollection = collection(db, "dataguru");


// =============================
// MENAMPILKAN DATA GURU
// =============================
export async function ambildataguru(){

const snapshot = await getDocs(guruCollection)

const tabel = document.getElementById("tabeldata")
tabel.innerHTML = ""

snapshot.forEach((docSnap)=>{

const data = docSnap.data()
const id = docSnap.id

const baris = document.createElement("tr")

// NIP
const nip = document.createElement("td")
nip.textContent = data.nip

// Nama
const nama = document.createElement("td")
nama.textContent = data.nama

// Jenis Kelamin
const jeniskelamin = document.createElement("td")

if(data.jeniskelamin === "L"){
jeniskelamin.textContent = "Laki-laki"
}else if(data.jeniskelamin === "P"){
jeniskelamin.textContent = "Perempuan"
}else{
jeniskelamin.textContent = data.jeniskelamin
}

// Tanggal lahir
const tgllahir = document.createElement("td")
tgllahir.textContent = data.tgllahir

// Mapel
const mapel = document.createElement("td")
mapel.textContent = data.mapel

// Alamat
const alamat = document.createElement("td")
alamat.textContent = data.alamat

// Telepon
const notlpn = document.createElement("td")
notlpn.textContent = data.notlpn

// Email
const email = document.createElement("td")
email.textContent = data.email

// Pendidikan
const pendidikan = document.createElement("td")
pendidikan.textContent = data.pendidikan_terakhir


// KOLOM AKSI
const aksi = document.createElement("td")

// tombol edit
const tombolEdit = document.createElement("a")
tombolEdit.textContent = "Edit"
tombolEdit.href = "edit.html?id="+id
tombolEdit.className = "button edit"

// tombol hapus
const tombolHapus = document.createElement("button")
tombolHapus.textContent = "Hapus"
tombolHapus.className = "button delete"

tombolHapus.onclick = async ()=>{
await hapusdataguru(id)
}

aksi.appendChild(tombolEdit)
aksi.appendChild(tombolHapus)


// masukkan ke baris
baris.appendChild(nip)
baris.appendChild(nama)
baris.appendChild(jeniskelamin)
baris.appendChild(tgllahir)
baris.appendChild(mapel)
baris.appendChild(alamat)
baris.appendChild(notlpn)
baris.appendChild(email)
baris.appendChild(pendidikan)
baris.appendChild(aksi)

tabel.appendChild(baris)

})

}



// =============================
// TAMBAH DATA GURU
// =============================
export async function tambahdataguru(){

const nip = document.getElementById("nip").value
const nama = document.getElementById("nama").value
const jeniskelamin = document.getElementById("jeniskelamin").value
const tgllahir = document.getElementById("tgllahir").value
const mapel = document.getElementById("mapel").value
const alamat = document.getElementById("alamat").value
const notlpn = document.getElementById("notlpn").value
const email = document.getElementById("email").value
const pendidikan_terakhir = document.getElementById("pendidikan_terakhir").value

await addDoc(guruCollection,{
nip:nip,
nama:nama,
jeniskelamin:jeniskelamin,
tgllahir:tgllahir,
mapel:mapel,
alamat:alamat,
notlpn:notlpn,
email:email,
pendidikan_terakhir:pendidikan_terakhir
})

window.location.href="daftar.html"

}



// =============================
// AMBIL DATA UNTUK EDIT
// =============================
export async function ambilDataGuru(id){

const docRef = doc(db,"dataguru",id)
const docSnap = await getDoc(docRef)

return docSnap.data()

}



// =============================
// UPDATE DATA GURU
// =============================
export async function ubahdataguru(id){

const nip = document.getElementById("nip").value
const nama = document.getElementById("nama").value
const jeniskelamin = document.getElementById("jeniskelamin").value
const tgllahir = document.getElementById("tgllahir").value
const mapel = document.getElementById("mapel").value
const alamat = document.getElementById("alamat").value
const notlpn = document.getElementById("notlpn").value
const email = document.getElementById("email").value
const pendidikan_terakhir = document.getElementById("pendidikan_terakhir").value

await updateDoc(doc(db,"dataguru",id),{
nip:nip,
nama:nama,
jeniskelamin:jeniskelamin,
tgllahir:tgllahir,
mapel:mapel,
alamat:alamat,
notlpn:notlpn,
email:email,
pendidikan_terakhir:pendidikan_terakhir
})

window.location.href="daftar.html"

}



// =============================
// HAPUS DATA GURU
// =============================
export async function hapusdataguru(id){

if(!confirm("Yakin ingin menghapus data ini?")) return

await deleteDoc(doc(db,"dataguru",id))

await ambildataguru()

}