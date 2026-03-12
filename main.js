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
import { initializeApp } from "firebase/app";
  apiKey: "AIzaSyAP0Wo9ThNlCuYf3p-QpXheQef35JpSxmw",
  authDomain: "insancemerlang-afa84.firebaseapp.com",
  projectId: "insancemerlang-afa84",
  storageBucket: "insancemerlang-afa84.firebasestorage.app",
  messagingSenderId: "1023394217783",
  appId: "1:1023394217783:web:2e5a5d0957d8ec35b5a4b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref("dataguru");


// TAMBAH DATA
const form = document.getElementById("formGuru");

if (form) {
  form.addEventListener("submit", function(e) {
    
    e.preventDefault();
    
    let data = {
      nip: nip.value,
      nama: nama.value,
      jk: jk.value,
      tgl: tgl.value,
      mapel: mapel.value,
      alamat: alamat.value,
      notlp: notlp.value,
      email: email.value,
      pendidikan: pendidikan.value
    };
    
    db.push(data);
    
    alert("Data berhasil disimpan");
    
  });
}


// TAMPIL DATA
const table = document.getElementById("dataGuru");

if (table) {
  
  db.on("value", function(snapshot) {
    
    table.innerHTML = "";
    
    snapshot.forEach(function(data) {
      
      let d = data.val();
      let key = data.key;
      
      table.innerHTML += `
<tr>
<td>${d.nip}</td>
<td>${d.nama}</td>
<td>${d.jk}</td>
<td>${d.tgl}</td>
<td>${d.mapel}</td>
<td>${d.alamat}</td>
<td>${d.notlp}</td>
<td>${d.email}</td>
<td>${d.pendidikan}</td>
<td>
<button onclick="edit('${key}')">Edit</button>
<button onclick="hapus('${key}')">Hapus</button>
</td>
</tr>
`;
      
    });
    
  });
  
}


// HAPUS
function hapus(id) {
  
  if (confirm("Yakin hapus data?")) {
    db.child(id).remove();
  }
  
}


// EDIT
function edit(id) {
  
  window.location = "edit.html?id=" + id;
  
}