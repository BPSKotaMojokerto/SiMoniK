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




var nama_pegawai = document.getElementById("pilihnama")
var tanggal_kegiatan = document.getElementById("tanggal")
var nama_kegiatan = document.getElementById("namakegiatan")
var volume_kegiatan = document.getElementById("volume")
var satuan_kegiatan = document.getElementById("satuankegiatan")
var lama_kegiatan_jam = document.getElementById("kegiatanjam")
var lama_kegiatan_menit = document.getElementById("kegiatanmenit")
var submitBtn = document.getElementById("btn1")
var form = document.getElementById("myForm")

submitBtn.addEventListener("click", dataForm);

function dataForm(e){
    e.preventDefault();

    fetch('https://be-bps-ochas-projects.vercel.app/submit',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nama_pegawai: nama_pegawai.value,
            tanggal_kegiatan: tanggal_kegiatan.value,
            nama_kegiatan: nama_kegiatan.value,
            volume_kegiatan: volume_kegiatan.value,
            satuan_kegiatan: satuan_kegiatan.value,
            lama_kegiatan_jam: lama_kegiatan_jam.value,
            lama_kegiatan_menit: lama_kegiatan_menit.value
        })
    })

    .then(function(response){
        if (response.ok){
            return response.json();
        }
        return Promise.reject(response);
        
    })

    .then(function(data){
        popupThx.style.display = "block";
        form.reset();
    })
    .catch(function(error){
        console.log(error);
    });
};