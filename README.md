# Aplikasi Kode Pos Indonesia

Aplikasi yang berisi daftar kode pos di Indonesia. Pencarian kode pos di dalam aplikasi ini menggunakan pilihan provinsi, kota atau kabupaten di provinsi yang dipilih, dan kotak pencarian untuk mencari kode pos berdasarkan nama kelurahan atau kecamatan. Pengguna dapat juga mencari kode pos dengan memasukkan potongan baris angka kode pos.

Hasil pencarian ditampilkan dalam bentuk baris-baris kolom yang berisi keterangan kode pos seperti nama kecamatan, nama kelurahan, dan baris angka kode pos.

Aplikasi ini adalah hasil dari mengikuti ujian kelas online [Dicoding](https://www.dicoding.com/academies/163), yang telah selesai diikuti dan lulus. Dengan demikian aplikasi ini dapat dipakai sebagai bahan belajar dan juga dapat digunakan oleh orang banyak untuk pencarian kode pos dengan mudah.

## Demo Aplikasi

Demo aplikasi kode pos ini dapat dilihat pada halaman berikut.

[https://gulajavaministudio.github.io/kode-pos-indonesias/](https://gulajavaministudio.github.io/kode-pos-indonesias/)

## Jalankan Aplikasi di Komputer Sendiri

Pastikan di perangkat komputer telah terpasang Node JS versi 12.x ke atas. Kemudian lakukan proses Git Clone atau mengunduh kode sumber aplikasi ini dari dari repository Github ini. Lanjutkan dengan membuka folder project yang telah diunduh tadi, dan jalankan perintah ini pada Terminal di dalam folder project.

```sh
npm install

npm run start-dev
```

atau menggunakan Yarn

```sh
yarn install

yarn run start-dev
```

## Sumber Data Aplikasi

Sumber data kode pos yang dipakai oleh aplikasi ini berasal dari repository Github [https://github.com/farizdotid/DAFTAR-API-LOKAL-INDONESIA](https://github.com/farizdotid/DAFTAR-API-LOKAL-INDONESIA) . Di dalam repository Github tersebut, terdapat API publik yang dapat dipakai secara gratis oleh pengembang aplikasi.

## Perihal Lain

Beberapa rules dan ESLint parser dapat diubah setelannya pada file  **eslintrc.json**. Untuk referensi ESLint lebih lengkap dan dokumentasinya, kalian dapat melihat pada halaman berikut ini  [https://eslint.org/docs/rules/](https://eslint.org/docs/rules/). Dan jangan lupa, pemrograman dengan VS Code semakin seru dengan  menggunakan [Mayukai Theme](https://marketplace.visualstudio.com/items?itemName=GulajavaMinistudio.mayukaithemevsc) dan [Iosevka Mayukai Font](https://github.com/Iosevka-Mayukai/Iosevka-Mayukai). Selamat mencoba.
