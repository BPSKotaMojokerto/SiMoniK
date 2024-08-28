const menu = document.getElementById('menu-label');
const sidebar = document.getElementsByClassName('sidebar')[0];

menu.addEventListener('click', function() {
    sidebar.classList.toggle('hide');
    console.log('ok');
});

//mengambil data dari server untuk diedit berdasarkan ID 
function fetchDataToEdit() {
    const urlParams = new URLSearchParams(window.location.search); //Membuat objek URLSearchParams yang akan mengurai parameter dari URL saat ini
    const id = urlParams.get('id'); //mengambil nilai parameter 'id' dari URL.

    // Jika ada ID, ambil data dari server dan isi kolom input
    if (id) {
        fetch(`https://be-simonik.vercel.app/rekap/${id}`) //permintaan fetch untuk mengambil data dari server berdasarkan ID yang diberikan.
        .then(response => response.json())
        .then(data => {
            //engakses data yang diterima dari server dan mempopulasi kolom input dengan data yang sesuai. 
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

window.onload = fetchDataToEdit;

//menyimpan atau memperbarui data
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
        fetch(`https://be-simonik.vercel.app/rekap/${id}`, {
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
        // menyimpan data baru
        fetch('https://be-simonik.vercel.app/submit', {
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