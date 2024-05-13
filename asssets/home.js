let session_login = sessionStorage.getItem('session_login');
let dataUser = JSON.parse(session_login);

$("#nama").text(dataUser.nama);
$("#nip").text(`NIP. ${dataUser.nip}`);

//menjalankan fungsi jam
window.setTimeout("waktu()", 1000);
//menampilkan tanggal
tampilTanggal();
//menampilkan jam absen
jamaAbsen();
//menonaktifkan tombol absen siang
nonaktiftombol()



//on click bsen siang
$('#absensiang').on('click', function () {
    $.ajax({
        type: "GET",
        url: "https://10.12.12.232/api-absen/checkin",
        dataType: "JSON",
        statusCode: {
            404: function () {
                Swal.fire({
                    title: "Ops!",
                    text: 'Anda Tidak Terhubung dengan WIFI PTA',
                    icon: "error"
                  });
            }
        },
        success: function (response) {
            $.ajax({
                type: "POST",
                url: "https://develop.pta-manado.go.id/api-absen/absensiang",
                data: {
                    finger : dataUser.finger
                },
                dataType: "JSON",
                success: function (res) {
                    Swal.fire({
                        title: "Success!",
                        text: "data Absen berhasil direkam",
                        icon: "success"
                      });
                      jamaAbsen();
                      
                }
            });
        }
    });
});



function nonaktiftombol()
{
    let jam = new Date().getHours();
    let menit = new Date().getMinutes();
    if (jam >=12 && menit >=30) {
        $('button').toggle();
    }
}




function jamaAbsen() {
    $.ajax({
        type: "GET",
        url: "https://develop.pta-manado.go.id/api-absen/absensiang",
        data: {
            finger : dataUser.finger
        },
        dataType: "JSON",
        success: function (x) {
            let jam = new Date(x.jam_istirahat * 1000);

            $('#jamabsen').text(`${jam.getHours()}:${jam.getMinutes()}:${jam.getSeconds()} WITA`);
        }
    });
    
}


//function untik menampilkan tanggal
function tampilTanggal() {

//mengambil lhari tanggal bulan untuk ditampilkan 
let date = new Date()
let tahun = date.getFullYear();
let bulan = date.getMonth();
let tanggal = date.getDate ();
let hari = date.getDay();

//mengganti hari ke indonesia
switch (hari) {
    case 0: hari = "Minggu"; break;
    case 1: hari = "Senin"; break;
    case 2: hari = "Selasa"; break;
    case 3: hari = "Rabu"; break;
    case 4: hari = "Kamis"; break;
    case 5: hari = "Jumat"; break;
    case 6: hari = "Sabtu"; break;
}
//mengganti bulan ke indonesia
switch(bulan) {
    case 0: bulan = "Januari"; break;
    case 1: bulan = "Februari"; break;
    case 2: bulan = "Maret"; break;
    case 3: bulan = "April"; break;
    case 4: bulan = "Mei"; break;
    case 5: bulan = "Juni"; break;
    case 6: bulan = "Juli"; break;
    case 7: bulan = "Agustus"; break;
    case 8: bulan = "September"; break;
    case 9: bulan = "Oktober"; break;
    case 10: bulan = "November"; break;
    case 11: bulan = "Desember"; break;
   }

   //tampilkan hari tanggal bulan dan waktu
   $("#hari").text(hari);
   $("#tanggal").text(tanggal);
   $("#bulan").text(bulan);
   $("#tahun").text(tahun);
    
}
   //function untuk menampilkan jam
function waktu() {
    var waktu = new Date();
    setTimeout("waktu()", 1000);
    document.getElementById("jam").innerHTML = waktu.getHours();
    document.getElementById("menit").innerHTML = waktu.getMinutes();
    document.getElementById("detik").innerHTML = waktu.getSeconds();
}

