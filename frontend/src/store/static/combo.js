export const COMBO_JENIS_VENDOR = [
    {
        value: 'OUTLET',
        label: 'Cabang'
    },
    {
        value: 'COMPANY_GROUP',
        label: 'Company Group'
    },
    {
        value: 'EXTERNAL',
        label: 'External'
    }
];

export const COMBO_METODE_BAYAR = [
    {
        value: 'TEMPO',
        label: 'Tempo'
    },
    {
        value: 'CASH',
        label: 'Cash'
    },
    {
        value: 'BANK_TRANSFER',
        label: 'Transfer'
    }
];

export const COMBO_TAX_TYPE = [
    {
        label: 'Include',
        value: 'INCLUDE'
    },
    {
        label: 'Exclude',
        value: 'EXCLUDE'
    },
    {
        label: 'Tanpa Pajak',
        value: 'TANPA PAJAK'
    }
];

export const COMBO_LEVEL = [
    {
        label: 0,
        value: 0
    },
    {
        label: 2,
        value: 2
    },
    {
        label: 3,
        value: 3
    }
];

export const COMBO_LIST_MENU = [
    { value: 'JURNAL_UMUM', label: 'JURNAL UMUM' },
    { value: 'KAS_BANK', label: 'KAS BANK' },
    { value: 'KAS_MASUK', label: 'KAS MASUK' },
    { value: 'KAS_KELUAR', label: 'KAS KELUAR' },
    { value: 'ADJ_STOCK', label: 'ADJ STOCK' },
    { value: 'HARGA_POKOK', label: 'HARGA POKOK' },
    { value: 'PERSEDIAAN', label: 'PERSEDIAAN' },
    { value: 'PENJUALAN', label: 'PENJUALAN' },
    { value: 'TUNAI', label: 'TUNAI' },
    { value: 'TRANSFER', label: 'TRANSFER' },
    { value: 'EDC_DIGITAL', label: 'EDC DIGITAL' }
];

export const COMBO_TYPE = [
    { value: 'AKTIVA', label: 'AKTIVA' },
    { value: 'PASIVA', label: 'PASIVA' }
];

export default { COMBO_JENIS_VENDOR, COMBO_METODE_BAYAR, COMBO_TAX_TYPE, COMBO_LEVEL, COMBO_LIST_MENU, COMBO_TYPE };
