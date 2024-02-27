const menu = document.getElementById('menu-label');
const sidebar = document.getElementsByClassName('sidebar')[0];

menu.addEventListener('click', function() {
    sidebar.classList.toggle('hide');
    console.log('ok');
})


function loadData() {
  const selectedName = document.getElementById('nama-pegawai').value;
  const selectedDate = document.getElementById('tanggal-kegiatan').value;

  fetch('https://be-bps-ochas-projects.vercel.app/rekap')
      .then(response => response.json())
      .then(data => {
          let reportList = '';
          data.forEach(report => {
              // Filter data berdasarkan nama pegawai yang dipilih dan tanggal kegiatan yang dipilih
              if (report.nama_pegawai === selectedName && report.tanggal_kegiatan === selectedDate) {
                  reportList += `<tr>
                                  <td>${report.nama_pegawai}</td>
                                  <td>${report.tanggal_kegiatan}</td>
                                  <td>${report.nama_kegiatan}</td>
                                  <td>${report.volume_kegiatan}</td>
                                  <td>${report.satuan_kegiatan}</td>
                                  <td>${report.lama_kegiatan_jam}</td>
                                  <td>${report.lama_kegiatan_menit}</td>
                              </tr>`;
              }
          });
          document.getElementById('report-list').innerHTML = reportList;

          // Jika tidak ada data yang ditemukan, tampilkan pesan
          if (reportList === '') {
              document.getElementById('report-list').innerHTML = "<tr><td colspan='7'>Tidak ada data yang ditemukan untuk pegawai ini pada tanggal ini.</td></tr>";
          }
      });
}


// function loadData() {
//   // Ambil nilai nama pegawai yang dipilih dari dropdown
//   const selectedName = document.getElementById('nama-pegawai').value;
  
//   fetch('http://localhost:3000/rekap')
//       .then(response => response.json())
//       .then(data => {
//           let reportList = '';
//           data.forEach(report => {
//               // Filter data berdasarkan nama pegawai yang dipilih
//               if (report.nama_pegawai === selectedName || selectedName === "") {
//                   reportList += `<tr>
//                                   <td>${report.nama_pegawai}</td>
//                                   <td>${report.tanggal_kegiatan}</td>
//                                   <td>${report.nama_kegiatan}</td>
//                                   <td>${report.volume_kegiatan}</td>
//                                   <td>${report.satuan_kegiatan}</td>
//                                   <td>${report.lama_kegiatan_jam}</td>
//                                   <td>${report.lama_kegiatan_menit}</td>
//                               </tr>`;
//               }
//           });
//           document.getElementById('report-list').innerHTML = reportList;
//       });
// }


// function loadData() {
//     fetch('http://localhost:3000/rekap')
//       .then(response => response.json())
//       .then(data => {
//         let reportList = '';
//         data.forEach(report => {
//           reportList += `<tr>
//                           <td>${report.nama_pegawai}</td>
//                           <td>${report.tanggal_kegiatan}</td>
//                           <td>${report.nama_kegiatan}</td>
//                           <td>${report.volume_kegiatan}</td>
//                           <td>${report.satuan_kegiatan}</td>
//                           <td>${report.lama_kegiatan_jam}</td>
//                           <td>${report.lama_kegiatan_menit}</td>
//                        </tr>`;
//         });
//         document.getElementById('report-list').innerHTML = reportList;
//       });
// }

//   loadData();