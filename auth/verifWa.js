$(document).on("click", "#wa", function (event) {
  event.preventDefault(); // Menghentikan perilaku default tombol submit

  // Menampilkan loading atau popup
  Swal.fire({
    title: "Mohon Tunggu Sedang Mengirimkan OTP...",
    allowOutsideClick: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  // Mendapatkan nilai dari elemen formulir
  const phone = $("#phone").val();

  // Memastikan semua kolom diisi
  if (!phone) {
    Swal.showValidationMessage("Harap isi whatsapp");
    return false;
  }

  // Membuat objek data yang akan dikirim ke server
  const data = {
    phone: phone,
  };

  // Mengirim data ke server menggunakan AJAX
  $.ajax({
    url: "auth/verifWa.php", // Ganti dengan path ke file PHP Anda
    method: "POST",
    data: data,
    success: function (response) {
      console.log("Respon dari server:", response);

      if (response.status === "success") {
        // Jika nomor WhatsApp terdaftar, tampilkan Sweet Alert untuk memasukkan OTP
        Swal.fire({
          title: "Masukkan Kode OTP",
          text: response.message,
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Verifikasi",
          allowOutsideClick: false,
          preConfirm: (otp) => {
            // Kirim permintaan AJAX untuk memverifikasi OTP
            return new Promise((resolve, reject) => {
              // Mengirim data ke server menggunakan AJAX
              $.ajax({
                url: "auth/otp.php", // Ganti dengan path ke file PHP Anda
                method: "POST",
                data: { otp: otp }, // Mengirim data OTP sebagai objek
                success: function (response) {
                  if (response.status === "success") {
                    Swal.fire({
                      icon: "success",
                      title: "Success",
                      text: response.message,
                      allowOutsideClick: false,
                    }).then(function () {
                      window.location.href = "index.php";
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: response.message,
                      allowOutsideClick: false,
                    });
                  }
                },
                error: function (xhr, status, error) {
                  // Jika terjadi kesalahan AJAX, tampilkan pesan kesalahan
                  console.error("Error:", xhr.responseText);
                  Swal.fire({
                    icon: "error",
                    title: "Terjadi kesalahan!",
                    text: "Terjadi kesalahan saat mengirim data.",
                    allowOutsideClick: false,
                  });
                },
              });
            });
          },
        });
      } else {
        // Jika nomor WhatsApp tidak terdaftar, tampilkan pesan kesalahan
        Swal.fire({
          icon: "error",
          title: "Nomor tidak terdaftar!",
          text: response.message,
          allowOutsideClick: false,
        });
      }
    },
    error: function (xhr, status, error) {
      // Jika terjadi kesalahan AJAX, tampilkan pesan kesalahan
      console.error("Error:", xhr.responseText);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan!",
        text: "Terjadi kesalahan saat mengirim data.",
        allowOutsideClick: false,
      });
    },
  });
});
