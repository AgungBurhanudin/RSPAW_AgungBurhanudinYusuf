import { checkErrorResponse } from '@/utils/utils';

export const ValidateSuccess = (respon) => {
    console.log(respon);
    if (respon.data.message === 'SUCCESS_LOGOUT') {
        return 'Logout Berhasil';
    } else if (respon.data.message === 'SUCCESS_LOGIN') {
        return 'Login Berhasil';
    } else if (respon.data.message === 'SUCCESS_REQUEST_OTP') {
        return 'Permintaan OTP Berhasil';
    } else if (respon.data.message === 'SUCCESS_VALIDATE_OTP') {
        return 'Validasi OTP Berhasil';
    } else if (respon.data.message === 'SUCCESS_VALIDATE_SECURITY_CODE') {
        return 'Validasi Kode Keamanan Berhasil';
    } else if (respon.data.message === 'SUCCESS_VALIDATE_SECURITY_CODE_TOKEN') {
        return 'Validasi Kode Keamanan Token Berhasil';
    } else if (respon.data.message === 'SUCCESS_GET_OTP_CONFIG') {
        return 'Konfigurasi OTP Berhasil Didapatkan';
    } else if (respon.data.message === 'SUCCESS_UPDATE_OTP_CONFIG') {
        return 'Konfigurasi OTP Berhasil Dirubah';
    } else if (respon.data.message === 'SUCCESS_CREATED') {
        return 'Berhasil Dibuat';
    } else if (respon.data.message === 'SUCCESS_UPDATED') {
        return 'Berhasil Dirubah';
    } else if (respon.data.message === 'SUCCESS_DELETED') {
        return 'Berhasil Dihapus';
    } else if (respon.data.message === 'OK') {
        return 'Berhasil';
    } else if (respon.data.message === '') {
        return 'Berhasil';
    } else {
        return respon.data.message;
    }
};

export const ValidateError = (respon, config) => {
    console.log(respon, 'interceptor');
    console.log(respon.response.data.detail.toUpperCase() === 'NOT FOUND', 'interceptor');
    console.log(parseInt(respon.response.status));
    if (respon.response.status) {
        switch (parseInt(respon.response.status)) {
            case 400:
                if (respon.response.data?.detail.toUpperCase() === 'INVALID_COMPANY') {
                    return 'Company Tidak Sah';
                } else if (respon.response.data?.detail.toUpperCase() === 'NOT FOUND') {
                    return 'Data Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'USER_NOT_FOUND') {
                    return 'Username/Email Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'USER_INACTIVE') {
                    return 'Akun Terblokir, Silahkan Hubungi Admin';
                } else if (respon.response.data?.detail.toUpperCase() === 'WRONG_PASSWORD_COUNT_EXCEEDED') {
                    return 'Percobaan Melebihi Batas, Silahkan Reset Password Anda';
                } else if (respon.response.data?.detail.toUpperCase() === 'AUTHENTICATION_FAILED') {
                    return 'Otentikasi Gagal';
                } else if (respon.response.data?.detail.toUpperCase() === 'OTP_NOT_FOUND') {
                    return 'OTP Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'SECURITY_CODE_NOT_MATCH') {
                    return 'PIN Salah';
                } else if (respon.response.data?.detail.toUpperCase() === 'WRONG_SECURITY_CODE_COUNT_EXCEEDED') {
                    return 'Pin Terblokir . Silakan Klik Lupa Pin';
                } else if (respon.response.data?.detail.toUpperCase() === 'USER_DO_NOT_HAVE_SECURITY_CODE') {
                    return 'Pengguna Tidak Memiliki Kode Keamanan';
                } else if (respon.response.data?.detail.toUpperCase() === 'SECURITY_CODE_TOKEN_NOT_FOUND') {
                    return 'Token Kode Keamanan Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVALID_DATE_FORMAT') {
                    return 'Format Tanggal Tidak Valid';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVALID_PHONE_NUMBER') {
                    return 'Nomor Telepon Tidak Valid';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVALID_EMAIL') {
                    return 'Email Tidak Valid';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVALID_OBJECT_ID') {
                    return 'ID Obyek Tidak Valid';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVALID_PASSWORD_LENGTH') {
                    return 'Panjang Password Tidak Valid';
                } else if (respon.response.data?.detail.toUpperCase() === 'FAILED_TO_REQUEST') {
                    return 'Gagal Meminta';
                } else if (respon.response.data?.detail.toUpperCase() === 'COMPANY_INITIAL_OR_NAME_EXIST') {
                    return 'Inisial atau Nama Perusahaan Ada';
                } else if (respon.response.data?.detail.toUpperCase() === 'TOKEN_EXPIRED') {
                    return 'Token Kadaluwarsa';
                } else if (respon.response.data?.detail.toUpperCase() === 'TOKEN_ALREADY_USED') {
                    return 'Token Sudah Digunakan';
                } else if (respon.response.data?.detail.toUpperCase() === 'WRONG_CONFIRMATION_PASSWORD') {
                    return 'Password Konfirmasi Salah';
                } else if (respon.response.data?.detail.toUpperCase() === 'WRONG_PASSWORD') {
                    return 'Username atau Password Salah';
                } else if (respon.response.data?.detail.toUpperCase() === 'OLD_PASSWORD_IS_WRONG') {
                    return 'Gagal mengganti password. Password lama tidak sesuai';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVALID_PASSWORD_CRITERIA') {
                    return 'Password harus mengandung huruf (kapital dan kecil), angka, karakter spesial dan harus 6-30 karakter ';
                } else if (respon.response.data?.detail.toUpperCase() === 'MEMBER_RECEIVER_AND_MEMBER_SENDER_MUST_BELONG_TO_THE_SAME_COMPANY') {
                    return 'Member tidak ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'AMOUNT_MINUS_TOTAL_CHARGES_MUST_BE_BIGGER_THAN_ZERO' && respon.detail.path === '/balance/member/transfer/inquiry_payment') {
                    return `Total potongan adalah Rp${respon.detail?.message.totalCharges}. Nominal harus lebih dari total potongan`;
                } else if (respon.response.data?.detail.toUpperCase() === 'DISCOUNT_CANNOT_BE_LESS_THAN_ZERO') {
                    return 'Diskon Harus lebih besar Dari Nol';
                } else if (respon.response.data?.detail.toUpperCase() === 'TOTAL_TRANSFER_LESS_THAN_MIN_AMOUNT') {
                    return `Total transfer Harus lebih besar Dari Rp${respon.detail?.message.minAmount}`;
                } else if (respon.response.data?.detail.toUpperCase() === 'AMOUNT_IN_DETAIL_ITEM_INVOICE_MUST_BE_BIGGER_THAN_ZERO') {
                    return 'Nominal di Detail Invoice Harus lebih besar Dari Nol';
                } else if (respon.response.data?.detail.toUpperCase() === 'EXPIRED_DATE_MUST_BE_LATER_OR_EQUAL_TO_INVOICE_DATE') {
                    return 'Tanggal Jatuh Tempo Harus lebih dari atau sama dengan Tanggal Invoice';
                } else if (respon.response.data?.detail.toUpperCase() === 'EXPIRED_DATE_MUST_BE_LATER_THAN_OR_EQUAL_TO_THE_CURRENT_DATE') {
                    return 'Tanggal Jatuh Tempo Harus lebih dari atau sama dengan Tanggal Saat ini';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_DATE_MUST_BE_LATER_OR_THE_SAME_AS_THE_CURRENT_DATE') {
                    return 'Tanggal Invoice Harus lebih dari atau sama dengan Tanggal Saat ini';
                } else if (respon.response.data?.detail.toUpperCase() === 'AMOUNT_MINUS_DISCOUNT_CANNOT_BE_LESS_THAN_ZERO') {
                    return 'Nominal Dikurangi Diskon Harus lebih besar Dari Nol';
                } else if (respon.response.data?.detail.toUpperCase() === 'TOTAL_AMOUNT_INVOICE_CANNOT_BE_ZERO_OR_LESS_THAN_ZERO') {
                    return 'Total Invoice harus lebih besar Dari Nol';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_DATE_CANNOT_BE_NULL_IF_IS_REPEATING_IS_FALSE') {
                    return 'Tanggal Invoice Harus Diisi Apabila Fitur Berulang Tidak Aktif';
                } else if (respon.response.data?.detail.toUpperCase() === 'EXPIRED_DATE_CANNOT_BE_NULL_IF_IS_REPEATING_IS_FALSE') {
                    return 'Tanggal Jatuh Tempo Harus Diisi Apabila Fitur Berulang Tidak Aktif';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_UNLIMITED_CANNOT_BE_TRUE_AND_REPEATING_METHOD_MAKE_ALL_AT_THE_SAME_TIME') {
                    return 'Fitur Berulang Tak Terbatas dan Metode Kemunculan Invoice Tidak Bisa Diaktifkan Bersamaan';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_RANGE_MUST_BE_BIGGER_THAN_ZERO') {
                    return 'Durasi Perulangan Harus lebih Dari Nol';
                } else if (respon.response.data?.detail.toUpperCase() === 'RANGE_BETWEEN_INVOICE_DATE_AND_EXPIRED_DATE_MUST_BE_BIGGER_OR_EQUAL_TO_ZERO') {
                    return 'Rentang Tanggal Invoice dan Tanggal Jatuh Tempo harus lebih besar Dari Nol';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_START_DATE_CANNOT_BE_NULL') {
                    return 'Tanggal Mulai Perulangan Tidak Boleh Kosong';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_END_DATE_CANNOT_BE_NULL') {
                    return 'Tanggal Selesai Perulangan Tidak Boleh Kosong';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_START_DATE_MUST_BE_LATER_THAN_CURRENT_DATE') {
                    return 'Tanggal Mulai Perulangan Harus lebih Dari Tanggal Saat ini';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_END_DATE_MUST_BE_LATER_OR_EQUAL_TO_REPEATING_START_DATE') {
                    return 'Tanggal Selesai Perulangan Harus lebih Dari Tanggal Saat ini';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_RANGE_MUST_BE_BIGGER_THAN_RANGE_BETWEEN_INVOICE_DATE_AND_EXPIRED_DATE') {
                    return 'Durasi Perulangan Harus lebih besar Dari Rentang Tanggal Invoice dan Tanggal Jatuh Tempo';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_START_MONTH_CANNOT_BE_NULL') {
                    return 'Bulan Mulai Perulangan Tidak Boleh Kosong';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_END_MONTH_CANNOT_BE_NULL') {
                    return 'Bulan Selesai Perulangan Tidak Boleh Kosong';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_START_YEAR_CANNOT_BE_NULL') {
                    return 'Tahun Mulai Perulangan Tidak Boleh Kosong';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_END_YEAR_CANNOT_BE_NULL') {
                    return 'Tahun Selesai Perulangan Tidak Boleh Kosong';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_DATE_OF_MONTH_CANNOT_BE_NULL') {
                    return 'Tanggal Perulangan Tidak Boleh Kosong';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_START_MONTH_YEAR_MUST_BE_LESS_OR_EQUAL_TO_REPEATING_END_MONTH_YEAR') {
                    return 'Bulan Tahun Mulai Perulangan Harus kurang dari atau sama dengan Bulan Tahun Selesai Perulangan';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_START_MONTH_YEAR_MUST_BE_LATER_THAN_CURRENT_MONTH_YEAR') {
                    return 'Bulan Tahun Mulai Perulangan Harus lebih dari Bulan Tahun Saat ini';
                } else if (respon.response.data?.detail.toUpperCase() === 'REPEATING_DATE_OF_MONTH_MUST_BE_BETWEEN_1_AND_28') {
                    return 'Tanggal Perulangan Harus Diantara 1 dan 28';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_ALREADY_CREATED_FROM_MASTER') {
                    return 'Invoice Sudah Terbuat dari Master';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_MUST_BE_UNPAID') {
                    return 'Invoice Harus Belum Terbayar';
                } else if (respon.response.data?.detail.toUpperCase() === 'USER_CANNOT_CREATE_INVOICE_FOR_SELF') {
                    return 'User Tidak Bisa Membuat Invoice Untuk Dirinya Sendiri';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_CUSTOMER_IS_NOT_CURRENT_USER') {
                    return 'User Tertagih Bukan User Saat Ini';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_CREATOR_IS_NOT_CURRENT_USER') {
                    return 'User Pembuat Invoice Bukan User Saat Ini';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_COMPANY_IS_NOT_THE_SAME_AS_CURRENT_USER_COMPANY') {
                    return 'Invoice Perusahaan Tidak Sama Dengan Perusahaan User Saat ini';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_MUST_BE_PAID') {
                    return 'Invoice Harus Terbayar';
                } else if (respon.response.data?.detail.toUpperCase() === 'INPUT_AMOUNT_MUST_BE_SMALLER_OR_EQUAL_TO_INVOICE_FINAL') {
                    return 'Nominal Harus lebih kecil atau sama dengan Total Invoice';
                } else if (respon.response.data?.detail.toUpperCase() === 'AMOUNT_MUST_BE_BIGGER_THAN_ZERO') {
                    return 'Nominal Harus lebih besar dari Nol';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_ALREADY_PAID') {
                    return 'Invoice Telah Terbayar';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_IS_UNPAID') {
                    return 'Invoice Belum Terbayar';
                } else if (respon.response.data?.detail.toUpperCase() === 'MASTER_INVOICE_MUST_BE_ACTIVE') {
                    return 'Invoice Master Harus Aktif';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_LINK_USER_ID_MUST_BE_THE_SAME_AS_INVOICE_USER_ID') {
                    return 'Link Id Harus sama dengan User Id Tertagih';
                } else if (respon.response.data?.detail.toUpperCase() === 'FIELD_NOT_EXIST') {
                    return 'Field Tidak Tersedia';
                } else if (respon.response.data?.detail.toUpperCase() === 'START_DATE_END_DATE_DIFFERENCE_MUST_BE_LESS_OR_EQUAL_TO_THIRTY_DAYS') {
                    return 'Perbedaan Rentang Tanggal Mulai Dan Tanggal Selesai Harus lebih sedikit atau sama dengan 30 hari';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVALID_COLUMN') {
                    return 'Kolom Tidak Valid';
                } else if (respon.response.data?.detail.toUpperCase() === 'UPLOADED_EXCEL_HAVE_INVALID_COLUMNS') {
                    return 'Berkas Excel yang Diunggah memiliki Kolom Tidak Valid';
                } else if (respon.response.data?.detail.toUpperCase() === 'TOPIC_MUST_CONFORM_TO_AGREED_FORMAT') {
                    return 'Topik Harus Menyesuaikan Format Kesepakatan';
                } else if (respon.response.data?.detail.toUpperCase() === 'DESTINATION_BALANCE_NOT_ALLOWED') {
                    return 'Saldo Tujuan Tidak Diperbolehkan';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_IS_NOT_CREATED_BY_GATEWAY') {
                    return 'Invoice Tidak Terbuat oleh Gateway';
                } else if (respon.response.data?.detail.toUpperCase() === 'PHONE_NUMBER_FORMAT_MUST_08') {
                    return 'Nomor Telepon Tidak Valid';
                } else if (respon.response.data?.detail.toUpperCase() === 'PHONE_NUMBER_MIN_8') {
                    return 'Nomor Telepon Minimal 8 Angka';
                } else if (respon.response.data?.detail.toUpperCase() === 'FAILED_SEND_OTP_ACTIVATION') {
                    return 'Data akun Bank DKI Anda tidak sesuai';
                } else if (respon.response.data?.detail.toUpperCase() === 'FAILED_CONFIRM_REGISTRATION') {
                    return 'Konfirmasi pendaftaran gagal';
                } else if (respon.response.data?.detail.toUpperCase() === 'PHONE_NUMBER_ALREADY_REGISTERED') {
                    return 'Nomor Telepon Telah Terdaftar';
                } else if (respon.response.data?.detail.toUpperCase() === 'FAILED_CHECK_ACCOUNT') {
                    return 'Data Akun Bank DKI Anda Tidak Sesuai';
                } else if (respon.response.data?.detail.toUpperCase() === 'EMAIL_ALREADY_REGISTERED') {
                    return 'Email Telah Terdaftar';
                } else if (respon.response.data?.detail.toUpperCase() === 'USERNAME_ALREADY_REGISTERED') {
                    return 'Username Telah Terdaftar';
                } else if (respon.response.data?.detail.toUpperCase() === 'ACTIVATION_FAILED') {
                    return 'Aktivasi Gagal';
                } else if (respon.response.data?.detail.toUpperCase() === 'DUPLICATE_EMAIL') {
                    return 'Email Sudah Terdaftar';
                } else if (respon.response.data?.detail.toUpperCase() === 'DUPLICATE_PHONE_NUMBER') {
                    return 'Nomor Telepon Sudah Terdaftar';
                } else if (respon.response.data?.detail.toUpperCase() === 'USERNAME_ALREADY_EXIST') {
                    return 'Username Sudah Terdaftar';
                } else if (respon.response.data?.detail.toUpperCase() === 'NOID_ALREADY_EXISTS') {
                    return 'No ID Sudah Terdaftar';
                } else if (respon.response.data?.detail.toUpperCase() === 'CONFIG_CHECKOUT_NOT_FOUND') {
                    return 'Config pembayaran checkout belum diatur, silahkan hubungi admin';
                } else if (respon.response.data?.detail.toUpperCase() === 'MERCHANT_NOT_ENABLED') {
                    return 'Merchant belum melakukan aktivasi, silahkan hubungi merchant';
                } else if (respon.response.data?.detail.toUpperCase() === 'FAILED_CREATE_CHECKOUT') {
                    return 'Metode pembayaran instansi belum diatur, silahkan hubungi admin';
                } else if (respon.response.data?.detail.toUpperCase() === 'MERCHANT_CHARGE_NOT_FULFILLED') {
                    return `Ada masalah pada harga produk ini, silahkan hubungi ${respon.detail?.message}`;
                } else if (respon.response.data?.detail.toUpperCase() === 'AMOUNT_MINUS_TOTAL_CHARGES_MUST_BE_BIGGER_THAN_ZERO') {
                    return `Minimal nominal transaksi di atas ${respon.detail?.message.totalCharges}`;
                } else if (respon.response.data?.detail.toUpperCase() === 'BALANCE_NOT_FOUND') {
                    return `Saldo PPOB Company tidak tersedia`;
                } else if (respon.response.data?.detail.toUpperCase() === 'BALANCE_NOT_ENOUGH') {
                    return `Saldo Instansi Anda tidak cukup`;
                } else if (respon.response.data?.detail.toUpperCase() === 'MAX_BANK_ACCOUNT_COUNTS_REACHED') {
                    return `Anda sudah memiliki 10 akun bank`;
                } else if (respon.response.data?.detail.toUpperCase() === 'FAILED_INQUIRY') {
                    return `Permintaan gagal, silahkan coba kembali.`;
                } else if (respon.response.data?.detail.toUpperCase() === 'PROVIDER_TROUBLE') {
                    return `Provider sedang dalam gangguan`;
                } else if (respon.response.data?.detail.toUpperCase() === 'FAILED_PAYMENT') {
                    return `Akun Rekening tidak ditemukan`;
                } else if (respon.response.data?.detail.toUpperCase() === 'TOTAL_TRANSFER_LESS_THAN_MIN_AMOUNT') {
                    return `Total transfer kurang dari minimal transfer bank`;
                } else if (respon.response.data?.detail.toUpperCase() === 'TOTAL_TRANSFER_BIGGER_THAN_MAX_AMOUNT') {
                    return `Total transfer melebihi dari maksimal transfer bank`;
                } else if (respon.response.data?.detail.toUpperCase() === 'MEMBER_SENDER_AND_MEMBER_RECEIVER_MUST_NOT_BE_THE_SAME') {
                    return `User penerima tidak boleh sama dengan user pengirim`;
                } else if (respon.response.data?.detail.toUpperCase() === 'FAILED_CREATE_VA') {
                    return `Gagal Membuat VA`;
                } else if (respon.response.data?.detail.toUpperCase() === 'FAILED_TO_CREATE_VA') {
                    return `Gagal Membuat VA`;
                } else if (respon.response.data?.detail.toUpperCase() === 'PROVIDER_TROUBLE') {
                    return 'Terjadi masalah penyedia layanan, silahkan coba beberapa saat lagi';
                } else if (respon.response.data?.detail.toUpperCase() === 'BANK_NOT_FOUND') {
                    return 'Bank tidak ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'PASSWORD_MUST_NUMERIC') {
                    return 'Password harus berupa angka';
                } else if (respon.response.data?.detail.toUpperCase() === 'PASSWORD_MUST_6_DIGIT') {
                    return 'Password harus 6 digit';
                } else if (respon.response.data?.detail.toUpperCase() === 'MERCHANT_NOT_EXIST') {
                    return 'Merchant Tidak Aktif';
                } else if (respon.response.data?.detail.toUpperCase() === 'FAILED_GET_TOKEN') {
                    return 'Mohon periksa nomor handphone';
                } else if (respon.response.data?.detail.toUpperCase() === 'TRANSFER_BALANCE_NOT_ENOUGH') {
                    return 'Saldo transfer tidak mencukupi, silahkan hubungi admin';
                } else if (respon.response.data?.detail.toUpperCase() === 'MEMBER_SENDER_AND_MEMBER_RECEIVER_MUST_NOT_BE_THE_SAME') {
                    return `User Penerima tidak boleh sama dengan User Pengirim`;
                } else if (respon.response.data?.detail.toUpperCase() === 'INVALID_DATE_RANGE') {
                    return `Rentang tanggal maksimal 31 hari`;
                } else if (respon.response.data?.detail.toUpperCase() === 'USER_BALANCE_NOT_ENOUGH') {
                    return `Saldo Tidak Cukup`;
                } else if (respon.response.data?.detail.toUpperCase() === 'AMOUNT_MUST_BE_SMALLER_OR_THE_SAME_AS_MAX_AMOUNT') {
                    return `Maksimal nominal top up adalah ${respon.detail?.message.maxAmount}`;
                } else if (respon.response.data?.detail.toUpperCase() === 'AMOUNT_MUST_BE_BIGGER_OR_THE_SAME_AS_MIN_AMOUNT') {
                    return `Minimal nominal top up adalah ${respon.detail?.message.minAmount}`;
                } else if (respon.response.data?.detail.toUpperCase() === 'MAIN_BALANCE_MUST_BE_CLOSEPAY') {
                    return `Transaksi tidak diizinkan untuk saldo selain Closepay, silahkan hubungi admin instansi Anda`;
                } else if (respon.response.data?.detail.toUpperCase() === 'STATUS_NOT_VALID') {
                    return `Order tidak dapat di tolak karena sudah di bayar`;
                } else if (respon.response.data?.detail.toUpperCase() === 'FAILED_CREATE_CHECKOUT') {
                    return `Checkout gagal`;
                } else {
                    return respon.response.data?.detail.toUpperCase();
                }
            case 401:
                if (respon.response.data?.detail.toUpperCase() === 'WRONG_PASSWORD') {
                    return 'Username atau Password Salah';
                } else if (respon.response.data?.detail.toUpperCase() === 'AUTHENTICATION_FAILED') {
                    return 'Otentikasi Gagal';
                } else if (['UNAUTHORIZED', 'UNATHORIZED'].includes(respon.response.data?.detail.toUpperCase())) {
                    return 'Tidak Diizinkan';
                } else {
                    return respon.response.data?.detail.toUpperCase();
                }
            case 403:
                if (respon.response.data?.detail.toUpperCase() === 'UNAUTHORIZED_ROLE') {
                    return 'Akses Tidak Diizinkan';
                } else if (respon.response.data?.detail.toUpperCase() === 'ACCESS_FORBIDDEN') {
                    return 'Sesi login telah berakhir, silakan melakukan login';
                } else if (respon.response.data?.detail.toUpperCase() === 'OTP_REQUIRED') {
                    return 'Masukkan OTP';
                } else if (respon.response.data?.detail.toUpperCase() === 'OTP_NOT_FOUND') {
                    return 'masukkan OTP untuk melanjutkan transaksi';
                } else if (respon.response.data?.detail.toUpperCase() === 'SUPERADMIN_MUST_CHANGE_COMPANY') {
                    return;
                } else {
                    return respon.response.data?.detail.toUpperCase();
                }
            case 404:
                if (respon.response.data?.detail.toUpperCase() === 'COMPANY_NOT_FOUND') {
                    return 'Instansi/Perusahaan tidak ditemukan, huruf besar/kecil berpengaruh';
                } else if (respon.response.data?.detail.toUpperCase() === 'QR_CODE_NOT_FOUND') {
                    return 'Barcode tidak ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'NOT FOUND') {
                    return 'Data Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'ADMIN_NOT_FOUND') {
                    return 'Admin Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'MEMBER_NOT_FOUND') {
                    return 'Member Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'MERCHANT_NOT_FOUND') {
                    return 'Merchant Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'USER_NOT_FOUND') {
                    return 'User Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_TRANSACTION_NOT_FOUND') {
                    return 'Transksi Invoice Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_LINK_NOT_FOUND') {
                    return 'Link Invoice Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'MASTER_INVOICE_NOT_FOUND') {
                    return 'Invoice Master Tidak Ditemukan';
                } else if (respon.response.data?.detail.toUpperCase() === 'INVOICE_NOT_FOUND') {
                    return 'Invoice Tidak Ditemukan';
                } else {
                    return respon.detail?.message || respon.response.data?.detail.toUpperCase();
                }
            case 500:
                if (respon.response.data?.detail.toUpperCase() === 'INTERNAL_SERVER_ERROR') {
                    return 'Terjadi Kesalahan Sistem';
                } else {
                    return respon.response.data?.detail.toUpperCase();
                }
            default:
                return respon.response.data?.detail.toUpperCase();
        }
    } else {
        return 'Gagal, Terjadi Kesalahan';
    }
};
