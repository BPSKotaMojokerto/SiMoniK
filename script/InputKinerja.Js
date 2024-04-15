const menu = document.getElementById('menu-label');
const sidebar = document.getElementsByClassName('sidebar')[0];

menu.addEventListener('click', function() {
    sidebar.classList.toggle('hide');
    console.log('ok');
});



var submit = document.querySelectorAll(".btn1");
var okThx = document.getElementById("ok")
var popupThx = document.getElementById("popup1")

okThx.onclick = function(){
    popupThx.style.display = "none";
};

submit.forEach(btn => {
    btn.onclick = function(){
        popupThx.style.display = "block";
    };
});




// var nama_pegawai = document.getElementById("pilihnama")
// var tanggal_kegiatan = document.getElementById("tanggal")
// var nama_kegiatan = document.getElementById("namakegiatan")
// var volume_kegiatan = document.getElementById("volume")
// var satuan_kegiatan = document.getElementById("satuankegiatan")
// var lama_kegiatan_jam = document.getElementById("kegiatanjam")
// var lama_kegiatan_menit = document.getElementById("kegiatanmenit")
// var submitBtn = document.getElementById("btn1")
// var form = document.getElementById("myForm")

// submitBtn.addEventListener("click", dataForm);

// function dataForm(e){
//     e.preventDefault();

//     fetch('https://be-bps-ochas-projects.vercel.app/submit',{
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             nama_pegawai: nama_pegawai.value,
//             tanggal_kegiatan: tanggal_kegiatan.value,
//             nama_kegiatan: nama_kegiatan.value,
//             volume_kegiatan: volume_kegiatan.value,
//             satuan_kegiatan: satuan_kegiatan.value,
//             lama_kegiatan_jam: lama_kegiatan_jam.value,
//             lama_kegiatan_menit: lama_kegiatan_menit.value
//         })
//     })

//     .then(function(response){
//         if (response.ok){
//             return response.json();
//         }
//         return Promise.reject(response);
        
//     })

//     .then(function(data){
//         popupThx.style.display = "block";
//         form.reset();
//     })
//     .catch(function(error){
//         console.log(error);
//     });
// };

//DONE ALL CHECK DI DEPLOY
// function dataForm(e) {
//     e.preventDefault();

//     var nama_pegawai = document.getElementById("pilihnama").value;
//     var tanggal_kegiatan = document.getElementById("tanggal").value;
//     var nama_kegiatan = document.getElementById("namakegiatan").value;
//     var volume_kegiatan = document.getElementById("volume").value;
//     var satuan_kegiatan = document.getElementById("satuankegiatan").value;
//     var waktu_mulai = document.getElementById("waktu-mulai").value; // Ambil nilai waktu mulai
//     var waktu_selesai = document.getElementById("waktu-selesai").value; // Ambil nilai waktu selesai

//     // untuk bulan
//     var selectedDate = new Date (tanggal_kegiatan);
//     var bulan_kegiatan = selectedDate.getMonth() + 1;

//     fetch('https://be-simonik-p3ka5r70p-ochas-projects.vercel.app/submit', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             nama_pegawai: nama_pegawai,
//             tanggal_kegiatan: tanggal_kegiatan,
//             nama_kegiatan: nama_kegiatan,
//             volume_kegiatan: volume_kegiatan,
//             satuan_kegiatan: satuan_kegiatan,
//             waktu_mulai: waktu_mulai, // Kirim nilai waktu mulai
//             waktu_selesai: waktu_selesai, // Kirim nilai waktu selesai
//             bulan_kegiatan: bulan_kegiatan //untuk bulan
//         })
//     })
//     .then(function(response) {
//         if (response.ok) {
//             return response.json();
//         }
//         return Promise.reject(response);
//     })
//     .then(function(data) {
//         // Tampilkan pop-up
//         document.getElementById("popup1").style.display = "block";
//         // Tambahkan logika untuk menampilkan pesan sukses atau melakukan tindakan lain yang diperlukan
//         console.log("Data berhasil dikirim:", data);
//     })
//     .catch(function(error) {
//         console.log("Error:", error);
//     });
// }


function fetchDataToEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Jika ada ID, ambil data dari server dan isi kolom input
    if (id) {
        fetch(`http://be-simonik-3wdwlyyqs-ochas-projects.vercel.app/rekap/${id}`)
        .then(response => response.json())
        .then(data => {
            // Populate input fields with data
            document.getElementById('pilihnama').value = data.nama_pegawai;
            document.getElementById('tanggal').value = data.tanggal_kegiatan;
            document.getElementById('namakegiatan').value = data.nama_kegiatan;
            document.getElementById('volume').value = data.volume_kegiatan;
            document.getElementById('satuankegiatan').value = data.satuan_kegiatan;
            document.getElementById('waktu-mulai').value = data.waktu_mulai;
            document.getElementById('waktu-selesai').value = data.waktu_selesai;
            // Populate other input fields similarly
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error fetching data
        });
    } else {
        // Jika tidak ada ID, kosongkan kolom input
        document.getElementById('pilihnama').value = '';
        document.getElementById('tanggal').value = '';
        document.getElementById('namakegiatan').value = '';
        document.getElementById('volume').value = '';
        document.getElementById('satuankegiatan').value = '';
        document.getElementById('waktu-mulai').value = '';
        document.getElementById('waktu-selesai').value = '';
        // Kosongkan input fields lainnya jika ada
    }
}


function saveData() {
    // Mendapatkan ID data yang sedang diedit dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Mendapatkan data yang diedit dari input fields
    const editedData = {
        nama_pegawai: document.getElementById("pilihnama").value,
        tanggal_kegiatan: document.getElementById("tanggal").value,
        nama_kegiatan: document.getElementById("namakegiatan").value,
        volume_kegiatan: document.getElementById("volume").value,
        satuan_kegiatan: document.getElementById("satuankegiatan").value,
        waktu_mulai: document.getElementById("waktu-mulai").value,
        waktu_selesai: document.getElementById("waktu-selesai").value
    };

    // Mengirim data yang diedit ke server untuk diperbarui
    fetch(`http://be-simonik-3wdwlyyqs-ochas-projects.vercel.app/rekap/${id}`, {
        method: 'PUT', // Menggunakan metode PUT untuk pembaruan data
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData)
    })
    .then(response => {
        console.error('Error updating data:', response.statusText);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

window.onload = fetchDataToEdit;

// function saveOrUpdateData() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const id = urlParams.get('id');

//     const editedData = {
//         nama_pegawai: document.getElementById("pilihnama").value,
//         tanggal_kegiatan: document.getElementById("tanggal").value,
//         nama_kegiatan: document.getElementById("namakegiatan").value,
//         volume_kegiatan: document.getElementById("volume").value,
//         satuan_kegiatan: document.getElementById("satuankegiatan").value,
//         waktu_mulai: document.getElementById("waktu-mulai").value,
//         waktu_selesai: document.getElementById("waktu-selesai").value
//     };

//     if (id) {
//         // Update data
//         fetch(`https://be-simonik-p3ka5r70p-ochas-projects.vercel.app/rekap/${id}`, {
//             method: 'PUT',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(editedData)
//         })
//         .then(response => {
//             if (response.ok) {
//                 window.location.href = 'RekapKinerja.html';
//             } else {
//                 console.error('Error updating data:', response.statusText);
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     } else {
//         // Save new data
//         fetch('https://be-simonik-p3ka5r70p-ochas-projects.vercel.app/submit', {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(editedData)
//         })
//         .then(response => {
//             if (response.ok) {
//                 window.location.href = 'RekapKinerja.html';
//             } else {
//                 console.error('Error saving data:', response.statusText);
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     }
// }

function saveOrUpdateData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const editedData = {
        nama_pegawai: document.getElementById("pilihnama").value,
        tanggal_kegiatan: document.getElementById("tanggal").value,
        nama_kegiatan: document.getElementById("namakegiatan").value,
        volume_kegiatan: document.getElementById("volume").value,
        satuan_kegiatan: document.getElementById("satuankegiatan").value,
        waktu_mulai: document.getElementById("waktu-mulai").value,
        waktu_selesai: document.getElementById("waktu-selesai").value
    };

    if (id) {
        // Update data
        fetch(`http://be-simonik-3wdwlyyqs-ochas-projects.vercel.app/rekap/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Anda perlu mengembalikan response JSON
            } else {
                throw new Error('Error updating data:', response.statusText); // Anda perlu melakukan throw error di sini
            }
        })
        .then(data => {
            window.location.href = 'RekapKinerja.html'; // Pindahkan redirect ke sini
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        // Save new data
        fetch('http://be-simonik-3wdwlyyqs-ochas-projects.vercel.app/submit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Anda perlu mengembalikan response JSON
            } else {
                throw new Error('Error saving data:', response.statusText); // Anda perlu melakukan throw error di sini
            }
        })
        .then(data => {
            window.location.href = 'RekapKinerja.html'; // Pindahkan redirect ke sini
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

var submitBtn = document.getElementById("btn1");
submitBtn.addEventListener("click", saveOrUpdateData);

// // Fungsi untuk menutup pop-up saat tombol OK ditekan
// document.getElementById("ok").addEventListener("click", function() {
//     document.getElementById("popup1").style.display = "none";
// });