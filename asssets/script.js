if (sessionStorage.getItem('session_login')) {
  document.location.href = 'home.html';    
}

$('#btn_masuk').on('click', function () {
    // ambil nip
    let nip = $("#nip").val();
    //cek nip kosong atau tidak
    if (nip == '') {
        Swal.fire({
            title: "Ops!",
            text: 'Silahkan Masukkan NIP!',
            icon: "error"
          });  
          return;
    }
    // Request ke API absen siang via ajax
    $.ajax({
        type: "GET",
        url: "https://develop.pta-manado.go.id/api-absen/pegawai",
        data: {
            nip : nip //data yang dikirimkan adalah nip
        },
        dataType: "JSON",
        statusCode: {
            404: function () {
                Swal.fire({
                    title: "Ops!",
                    text: 'Nip Tidak Terdaftar, Silahkan hubungi admin!',
                    icon: "error"
                  });
                  document.location.href = 'index.html';
              
            }
        },
        success: function (data, status, xhr) {
            Swal.fire({
                title: "Welcome Back!!",
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "OK",
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let session_login = JSON.stringify(data)
                    window.sessionStorage.setItem("session_login", session_login);
                    document.location.href = 'home.html';
                } 
              });
        }
    });


});