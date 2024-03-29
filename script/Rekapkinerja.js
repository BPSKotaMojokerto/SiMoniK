const menu = document.getElementById('menu-label');
const sidebar = document.getElementsByClassName('sidebar')[0];

menu.addEventListener('click', function() {
    sidebar.classList.toggle('hide');
    console.log('ok');
})

//INI AWAL REKAP PERBULAN DONE
// // Fungsi untuk mengonversi format bulan "YYYY-MM" menjadi bulan numerik
// function getNumericMonth(month) {
//     return parseInt(month.split("-")[1], 10);
// }

// // Fungsi untuk memproses data dan menampilkan di tabel
// function processData(data) {
//     const selectedName = document.getElementById('nama-pegawai').value;
//     const selectedDate = document.getElementById('tanggal-kegiatan').value;
//     const selectedMonth = document.getElementById('bulan-kegiatan').value;

//     let reportList = '';
//     data.forEach(report => {
//         // Filter data berdasarkan nama pegawai yang dipilih dan tanggal atau bulan kegiatan yang dipilih
//         const tanggalKegiatan = new Date(report.tanggal_kegiatan);
//         const bulanKegiatan = tanggalKegiatan.getMonth() + 1; // +1 karena bulan dimulai dari 0

//         if (report.nama_pegawai === selectedName && 
//             ((selectedDate && report.tanggal_kegiatan === selectedDate) || // Filter berdasarkan tanggal
//             (selectedMonth && bulanKegiatan === getNumericMonth(selectedMonth)))) { // Filter berdasarkan bulan
//             reportList += `<tr>
//                               <td>${report.nama_pegawai}</td>
//                               <td>${report.tanggal_kegiatan}</td>
//                               <td>${report.nama_kegiatan}</td>
//                               <td>${report.volume_kegiatan}</td>
//                               <td>${report.satuan_kegiatan}</td>
//                               <td>${report.waktu_mulai}</td>
//                               <td>${report.waktu_selesai}</td>
//                           </tr>`;
//         }
//     });

//     // Menampilkan data yang telah difilter
//     document.getElementById('report-list').innerHTML = reportList;

//     // Jika tidak ada data yang ditemukan, tampilkan pesan
//     if (reportList === '') {
//         if (selectedDate) {
//             document.getElementById('report-list').innerHTML = "<tr><td colspan='7'>Tidak ada data yang ditemukan untuk pegawai ini pada tanggal ini.</td></tr>";
//         } else if (selectedMonth) {
//             document.getElementById('report-list').innerHTML = "<tr><td colspan='7'>Tidak ada data yang ditemukan untuk pegawai ini pada bulan ini.</td></tr>";
//         }
//     }
// }

// // Fungsi untuk memuat data dari server berdasarkan filter yang dipilih
// function loadData() {
//     const selectedName = document.getElementById('nama-pegawai').value;
//     const selectedDate = document.getElementById('tanggal-kegiatan').value;
//     const selectedMonth = document.getElementById('bulan-kegiatan').value;

//     // Memeriksa apakah pengguna memilih tanggal atau bulan saja
//     if (selectedDate && !selectedMonth) {
//         // Jika pengguna memilih tanggal saja, ambil data untuk tanggal yang dipilih
//         fetch(`http://localhost:3000/rekap?tanggal=${selectedDate}`)
//             .then(response => response.json())
//             .then(data => {
//                 processData(data); // Memproses dan menampilkan data
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 document.getElementById('report-list').innerHTML = "<tr><td colspan='7'>Terjadi kesalahan saat mengambil data.</td></tr>";
//             });
//     } else if (!selectedDate && selectedMonth) {
//         // Jika pengguna memilih bulan saja, ambil data untuk bulan yang dipilih
//         fetch(`http://localhost:3000/rekap?bulan=${getNumericMonth(selectedMonth)}`)
//             .then(response => response.json())
//             .then(data => {
//                 processData(data); // Memproses dan menampilkan data
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 document.getElementById('report-list').innerHTML = "<tr><td colspan='7'>Terjadi kesalahan saat mengambil data.</td></tr>";
//             });
//     } else {
//         // Jika pengguna tidak memilih tanggal atau bulan, ambil semua data
//         fetch('http://localhost:3000/rekap')
//             .then(response => response.json())
//             .then(data => {
//                 processData(data); // Memproses dan menampilkan data
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 document.getElementById('report-list').innerHTML = "<tr><td colspan='7'>Terjadi kesalahan saat mengambil data.</td></tr>";
//             });
//     }
// }


//INI DELETE DONE
// Fungsi untuk memproses data dan menampilkan di tabel
function processData(data) {
    const selectedName = document.getElementById('nama-pegawai').value;
    const selectedDate = document.getElementById('tanggal-kegiatan').value;
    const selectedMonth = document.getElementById('bulan-kegiatan').value;

    let reportList = '';
    data.forEach(report => {
        // Filter data berdasarkan nama pegawai yang dipilih dan tanggal atau bulan kegiatan yang dipilih
        const tanggalKegiatan = new Date(report.tanggal_kegiatan);
        const bulanKegiatan = tanggalKegiatan.getMonth() + 1; // +1 karena bulan dimulai dari 0

        if (report.nama_pegawai === selectedName && 
            ((selectedDate && report.tanggal_kegiatan === selectedDate) || // Filter berdasarkan tanggal
            (selectedMonth && bulanKegiatan === getNumericMonth(selectedMonth)))) { // Filter berdasarkan bulan
            reportList += `<tr>
                              <td>${report.nama_pegawai}</td>
                              <td>${report.tanggal_kegiatan}</td>
                              <td>${report.nama_kegiatan}</td>
                              <td>${report.volume_kegiatan}</td>
                              <td>${report.satuan_kegiatan}</td>
                              <td>${report.waktu_mulai}</td>
                              <td>${report.waktu_selesai}</td>
                              <td>
                                  <button class="edit-btn" onclick="editData(${report.id})">Edit</button>
                                  <button class="delete-btn" onclick="deleteData(${report.id})">Hapus</button>
                              </td>
                          </tr>`;
        }
    });

    // Menampilkan data yang telah difilter
    document.getElementById('report-list').innerHTML = reportList;

    // Mengatur tampilan tombol edit dan hapus berdasarkan jumlah data yang dimuat
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    if (data.length === 0) {
        // Tidak ada data yang dimuat, sembunyikan semua tombol edit dan hapus
        editButtons.forEach(button => button.style.display = 'none');
        deleteButtons.forEach(button => button.style.display = 'none');
    } else {
        // Ada data yang dimuat, tampilkan semua tombol edit dan hapus
        editButtons.forEach(button => button.style.display = 'inline-block');
        deleteButtons.forEach(button => button.style.display = 'inline-block');
    }
}

// Fungsi untuk mengirim permintaan penghapusan data ke server
function deleteData(id) {
    fetch(`https://bebps-ochas-projects.vercel.app/rekap/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Gagal menghapus data.');
    })
    .then(data => {
        console.log(data.message); // Tampilkan pesan dari server jika penghapusan berhasil
        // Lanjutkan dengan memuat ulang data atau melakukan tindakan lain setelah penghapusan berhasil
        loadData(); // Contoh: Memuat ulang data setelah penghapusan berhasil
    })
    .catch(error => {
        console.error('Error:', error);
        // Tampilkan pesan kesalahan jika penghapusan gagal
    });
}

// Fungsi untuk mendapatkan nilai numerik dari bulan yang dipilih
function getNumericMonth(month) {
    return parseInt(month.split("-")[1], 10);
}

// Fungsi untuk memuat data dari server berdasarkan filter yang dipilih
function loadData() {
    const selectedName = document.getElementById('nama-pegawai').value;
    const selectedDate = document.getElementById('tanggal-kegiatan').value;
    const selectedMonth = document.getElementById('bulan-kegiatan').value;

    let url = 'https://bebps-ochas-projects.vercel.app/rekap';

    if (selectedName || selectedDate || selectedMonth) {
        url += '?';
        if (selectedName) url += `nama=${selectedName}&`;
        if (selectedDate) url += `tanggal=${selectedDate}&`;
        if (selectedMonth) url += `bulan=${getNumericMonth(selectedMonth)}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            processData(data); // Memproses dan menampilkan data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Tampilkan pesan kesalahan jika terjadi kesalahan saat mengambil data
        });
}




function editData(id) {
    // Redirect user to InputKinerja.html with the ID of the data to be edited
    window.location.href = `InputKinerja.html?id=${id}`;
}
