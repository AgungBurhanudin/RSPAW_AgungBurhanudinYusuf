<template>
    <div class="bg-white text-black">
        <table width="100%" id="tss">
            <tbody>
                <tr>
                    <td colSpan="3" width="60%" class="bdr_btm" valign="top">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <b>{{ company.name }}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>{{ company.address }}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b>{{ company.phone }}</b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td class="bdr_btm" align="right">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td colSpan="4" class="bdr_btm">
                                        <b class="uppercase">{{ title }}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="35%">ID</td>
                                    <td>: {{ trxId }}</td>
                                </tr>
                                <tr>
                                    <td>Tanggal</td>
                                    <td>: {{ formatDate(trxDate, 'id-ID', 'DD MMMM YYYY') }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4" class="bdr_btm">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td width="15%">Kas / Bank</td>
                                    <td width="35%">: {{ type }}</td>
                                    <td width="15%"></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Keterangan</td>
                                    <td rowSpan="2" valign="top">: {{ note }}</td>
                                    <td valign="top"></td>
                                    <td rowSpan="2" valign="top"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4" class="bdr_btm">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td width="5%" align="center">No</td>
                                    <td v-for="tableOpt in tableOptions[dataType].columns" :key="tableOpt?.value" class="uppercase">
                                        {{ tableOpt?.label }}
                                    </td>
                                </tr>
                                <tr v-for="(item, index) in datas" :key="`data-${index}`" style="height: '25px'">
                                    <td align="center">{{ index + 1 }}</td>
                                    <td :class="`${tableOpt?.type !== 'currency' && 'uppercase'}`" :align="tableOpt?.align" :width="tableOpt?.width || '25%'">
                                        {{ handleDataPrint(item, tableOpt?.key, tableOpt?.type) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td colSpan="3" align="right" width="80%">
                                        <b>Biaya Administrasi bank</b>
                                    </td>
                                    <td align="right">
                                        <b>{{ formatCurrencyPrint(amountPpn) }}</b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td colSpan="3" align="right" width="80%">
                                        <b>Total</b>
                                    </td>
                                    <td align="right">
                                        <b>{{ formatCurrencyPrint(amountTotalWithPpn) }}</b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4" align="center">
                        <table width="90%" align="center">
                            <tbody>
                                <tr>
                                    <td width="33%" align="center">
                                        Di buat oleh, <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        {{ creator }}
                                    </td>
                                    <td width="33%" align="center">
                                        Mengetahui,
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        (.....................)
                                    </td>
                                    <td width="33%" align="center">
                                        Diterima oleh, <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        {{ client }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <div id="man" style="border: 1px solid red; background-color: silver; padding: 5px; width: 80%">
            Pengaturan Printer Epson LX 310:
            <hr />
            <ul>
                <li>Ukuran kertas 21 cm * 14.8 cm / A4 tanpa header dan footer</li>
                <li>DPI 120 * 144</li>
                <li>Cetak menggunakan browser Mozilla</li>
            </ul>
            <hr />
            <button class="p-1 mt-1 text-gray-700 text-sm bg-white hover:bg-gray-50" type="button" @click="print">Cetak Nota Penjualan</button>
        </div>
    </div>
</template>

<script setup>
// import AppConfig from '@/layout/AppConfig.vue';
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import { tableOption } from '@/components/tableOptions';
import { injectStrict } from '@/utils/injectTyped';
import { AxiosKey } from '@/service/symbols';
import { useAuthStore } from '@/store/auth';
import moment from 'moment';
import { formatDate, handleDataPrint, formatCurrencyPrint } from '@/utils/utils';

const http = injectStrict(AxiosKey); // it's typed now

const { userLogin, setToken, setUserLogin } = useAuthStore();
const props = defineProps({
    id: {
        type: String,
        default: ''
    },
    dataType: {
        type: String,
        default: 'sell'
    }
});
const emits = defineEmits(['refreshData', 'closeDialog']);

const datas = ref([
    {
        accountNumber: '61028',
        accountName: 'Biaya Bensin Transportasi Pemasaran',
        total: '10000'
    }
]);
const company = ref({
    name: 'ASTON PRINTER AMBARAWA',
    address: 'JL. JENDRAL SUDIRMAN 115 AMBARAWA',
    phone: '0298-594464'
});

const title = ref('BUKTI KAS KELUAR');
const trxId = ref('121204240001');
const trxDate = ref('2024-04-17');
const creator = ref('administrator');
const client = ref('Saiful Auhri');
const note = ref('Oke OKe');
const type = ref('Kas Kecil');
const amountPpn = ref(0);
const amountTotalWithPpn = ref(0);
const tableOptions = { ...tableOption };
const getData = async () => {
    try {
        // const response = await http.get(props.url);
        // trxId.value(response.data.data.transactionId);
        // trxDate.value(response.data.data.transactionDate);
        // datas.value(response.data.data.productList);
        // amountPpn.value(response.data.data.amountPpn);
        // amountTotalWithPpn.value(response.data.data.amountTotalWithPpn);
        // client.value(response.data.data.customerName);
    } catch (error) {}
};

const print = () => {
    window.print();
};
onMounted(() => {
    window.addEventListener('beforeprint', () => {});
    window.addEventListener('afterprint', () => {
        window.close();
    });
});

onBeforeUnmount(() => {
    window.removeEventListener('beforeprint', () => {});
    window.removeEventListener('afterprint', () => {});
});

onBeforeMount(async () => {
    console.log($route.params.name);
    let user = {};
    creator.value = user.name;
    await getData();
});
</script>

<style scoped>
#tss {
    font-size: 12px;
    font-family: Courier New;
}

#tss tr td {
    font-size: 12px;
    font-family: Courier New;
}

.bdr_btm {
    border-bottom: 1px dashed #000;
    font-size: 12px;
    font-family: Courier New;
}

@media print {
    #man {
        visibility: hidden;
    }
}

@font-face {
    font-weight: 400;
    font-style: normal;
    font-family: circular;

    src: url('chrome-extension://liecbddmkiiihnedobmlmillhodjkdmb/fonts/CircularXXWeb-Book.woff2') format('woff2');
}

@font-face {
    font-weight: 700;
    font-style: normal;
    font-family: circular;

    src: url('chrome-extension://liecbddmkiiihnedobmlmillhodjkdmb/fonts/CircularXXWeb-Bold.woff2') format('woff2');
}
</style>
