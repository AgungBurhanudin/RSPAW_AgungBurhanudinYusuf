<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AppMenuItem from './AppMenuItem.vue';
const router = useRoute();

const menu_header = ref(router.fullPath);

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'tester',
        items: [{ label: 'Tester', icon: 'pi pi-fw pi-home', to: '/tester' }]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        ]
    },
    {
        label: 'Prime Blocks',
        items: [
            { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
            { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-vue', target: '_blank' }
        ]
    },
    {
        label: 'Utilities',
        items: [
            { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
            { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://www.primefaces.org/primeflex/', target: '_blank' }
        ]
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                to: '/landing'
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/crud'
            },
            {
                label: 'Timeline',
                icon: 'pi pi-fw pi-calendar',
                to: '/pages/timeline'
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/pages/notfound'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/empty'
            }
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-question',
                to: '/documentation'
            },
            {
                label: 'Figma',
                url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
                icon: 'pi pi-fw pi-pencil',
                target: '_blank'
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-search',
                url: 'https://github.com/primefaces/sakai-vue',
                target: '_blank'
            },
            {
                label: 'Nuxt Version',
                url: 'https://github.com/primefaces/sakai-nuxt',
                icon: 'pi pi-fw pi-star'
            }
        ]
    }
]);

const shortcut = ref([
    {
        label: 'Shortcut Outlet',
        items: [
            { label: 'Purchase Request', icon: 'pi pi-fw pi-id-card', to: '/pembelian/purchase-request' },
            { label: 'Penjualan', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Pembayaran Piutang', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Kas Masuk', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Kas Keluar', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' }
        ]
    },
    {
        label: 'Shortcut Company',
        items: [
            { label: 'Purchase Request', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Pembayaran Hutang', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Kas Masuk', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Kas Keluar', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' }
        ]
    }
]);

const master_data = ref([
    {
        label: 'Cabang/Outlet',
        items: [
            { label: 'Data Cabang/Outlet', icon: 'pi pi-fw pi-id-card', to: '/master-data/branch' }
            // { label: 'Data COA', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            // { label: 'Data Bank', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' }
        ]
    },
    {
        label: 'User',
        items: [{ label: 'Data User', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' }]
    },

    {
        label: 'Keuangan',
        items: [
            { label: 'Kategori COA', icon: 'pi pi-fw pi-id-card', to: '/master-data/category-coa' },
            { label: 'Data COA', icon: 'pi pi-fw pi-check-square', to: '/master-data/coa' },
            { label: 'Data Bank', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' }
        ]
    },
    {
        label: 'Produk',
        items: [
            { label: 'Merk Produk', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Kategori Produk', icon: 'pi pi-fw pi-check-square', to: '/master-data/category' }
        ]
    },
    {
        label: 'Transaksi',
        items: [
            { label: 'Data Suplier', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Data Pelanggan', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' }
        ]
    }
]);

const pembelian = ref([
    {
        label: 'Outlet',
        items: [
            { label: 'Purchase Request', icon: 'pi pi-fw pi-id-card', to: '/pembelian/purchase-request' },
            { label: 'Penerimaan Produk', icon: 'pi pi-fw pi-id-card', to: '/penerimaan/penerimaan' }
        ]
    },

    {
        label: 'Company',
        items: [
            { label: 'Purchase Request', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Produk Request', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Pembelian', icon: 'pi pi-fw pi-check-square', to: '/pembelian/pembelian' },
            { label: 'Hutang Usaha', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Pembayaran Hutang', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Penerimaan Produk', icon: 'pi pi-fw pi-id-card', to: '/penerimaan/penerimaan' }
        ]
    }
]);

const stok = ref([
    {
        label: 'Stok',
        items: [
            { label: 'Setting Harga', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Stok Masuk', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Stok Keluar', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Mutasi Stok', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Stok Opname', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Stok Produk', icon: 'pi pi-fw pi-id-card', to: '/stok/stok-produk' }
            // { label: 'Stok Opname', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' }
        ]
    },

    {
        label: 'BOM',
        items: [
            { label: 'Resep BOM', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Rakit BOM', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Urai BOM', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' }
            // { label: 'Hutang Usaha', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            // { label: 'Pembayaran Hutang', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            // { label: 'Penerimaan Produk', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' }
        ]
    }
]);

const penjualan = ref([
    {
        label: 'Data',
        items: [{ label: 'Data Pelanggan ', icon: 'pi pi-fw pi-user', to: '/pages/crud' }]
    },
    {
        label: 'Request',
        items: [{ label: 'Produk Request ', icon: 'pi pi-fw pi-id-card', to: '/penjualan/product-request' }]
    },

    {
        label: 'Transaksi',
        items: [
            { label: 'Customer Request', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Penjualan', icon: 'pi pi-fw pi-check-square', to: '/penjualan/penjualan' },
            { label: 'Piutang Usaha', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Pembayaran Piutang', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' }
        ]
    }
]);

const keuangan = ref([
    {
        label: 'Data',
        items: [{ label: 'Data Coa ', icon: 'pi pi-fw pi-user', to: '/pages/crud' }]
    },

    {
        label: 'Transaksi',
        items: [
            { label: 'Kas Masuk', icon: 'pi pi-fw pi-id-card', to: '/keuangan/kas-masuk' },
            { label: 'Kas Keluar', icon: 'pi pi-fw pi-check-square', to: '/keuangan/kas-keluar' },
            { label: 'Jurnal Umum', icon: 'pi pi-fw pi-check-square', to: '/keuangan/jurnal' }
        ]
    },

    {
        label: 'Report',
        items: [
            { label: 'Saldo COA', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Buku Besar', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Jurnal', icon: 'pi pi-fw pi-check-square', to: '/keuangan/jurnal-umum' }
        ]
    }
]);

const service = ref([
    {
        label: 'Data',
        items: [{ label: 'Data Pelanggan ', icon: 'pi pi-fw pi-user', to: '/pages/crud' }]
    },

    {
        label: 'Service',
        items: [
            { label: 'Data Service', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Service Masuk', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Service Proses', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Service Keluar', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' }
        ]
    }
]);

const laporan = ref([
    {
        label: 'Pembelian',
        items: [
            { label: 'Rekap Pembelian', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Detail Pembelian', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Hutang Usaha', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' }
        ]
    },
    {
        label: 'Penjualan',
        items: [
            { label: 'Rekap Penjualan', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Detail Penjualan', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
            { label: 'Piutang Usaha', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' }
            // { label: 'Detail Penjualan', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' },
        ]
    },
    {
        label: 'Keuangan',
        items: [
            { label: 'Neraca', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Laba Rugi', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' }
        ]
    },
    {
        label: 'Service',
        items: [
            { label: 'Rekap Service', icon: 'pi pi-fw pi-check-square', to: '/pages/crud' },
            { label: 'Detail Service', icon: 'pi pi-fw pi-id-card', to: '/pages/crud' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-if="menu_header.includes('master-data')">
            <template v-for="(item, i) in master_data" :key="item">
                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
                <li v-if="item.separator" class="menu-separator"></li>
            </template>
        </template>
        <template v-else-if="menu_header.includes('pembelian')">
            <template v-for="(item, i) in pembelian" :key="item">
                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
                <li v-if="item.separator" class="menu-separator"></li>
            </template>
        </template>
        <template v-else-if="menu_header.includes('penjualan')">
            <template v-for="(item, i) in penjualan" :key="item">
                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
                <li v-if="item.separator" class="menu-separator"></li>
            </template>
        </template>
        <template v-else-if="menu_header.includes('service')">
            <template v-for="(item, i) in service" :key="item">
                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
                <li v-if="item.separator" class="menu-separator"></li>
            </template>
        </template>
        <template v-else-if="menu_header.includes('keuangan')">
            <template v-for="(item, i) in keuangan" :key="item">
                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
                <li v-if="item.separator" class="menu-separator"></li>
            </template>
        </template>
        <template v-else-if="menu_header.includes('laporan')">
            <template v-for="(item, i) in laporan" :key="item">
                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
                <li v-if="item.separator" class="menu-separator"></li>
            </template>
        </template>
        <template v-else-if="menu_header.includes('stok')">
            <template v-for="(item, i) in stok" :key="item">
                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
                <li v-if="item.separator" class="menu-separator"></li>
            </template>
        </template>
        <template v-else>
            <template v-for="(item, i) in shortcut" :key="item">
                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
                <li v-if="item.separator" class="menu-separator"></li>
            </template>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
