<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const { layoutConfig, onMenuToggle } = useLayout();
const { userLogin, setToken, setUserLogin } = useAuthStore();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();
const displayConfirmation = ref(false);
const profile = ref(null);
const menuHeaderItems = ref([
    {
        label: 'Master Data',
        icon: 'pi pi-fw pi-table',
        url: '/master-data'
    },
    {
        label: 'Pembelian',
        icon: 'pi pi-fw pi-cart-plus',
        url: '/pembelian'
    },
    {
        label: 'Penjualan',
        icon: 'pi pi-fw pi-shopping-cart',
        url: '/penjualan'
    },
    {
        label: 'Stok',
        icon: 'pi pi-fw pi-box',
        url: '/stok'
    },
    {
        label: 'Service',
        icon: 'pi pi-fw pi-megaphone',
        url: '/service'
    },
    {
        label: 'Keuangan',
        icon: 'pi pi-fw pi-dollar',
        url: '/keuangan'
    },
    {
        label: 'Laporan',
        icon: 'pi pi-fw pi-book',
        url: '/laporan'
    }
]);

const itemsProfile = ref([
    {
        label: 'Profile',
        icon: 'pi pi-user'
    },
    {
        label: 'Change Password',
        icon: 'pi pi-refresh'
    },
    {
        separator: true
    },
    {
        label: 'Logout',
        icon: 'pi pi-lock',
        command: () => {
            // console.log('logout');
            openConfirmation();
        }
    }
]);

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};
const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/config');
};
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

const openConfirmation = () => {
    displayConfirmation.value = true;
};

const closeConfirmation = () => {
    displayConfirmation.value = false;
};

const logout = () => {
    displayConfirmation.value = false;
    setToken('');
    setUserLogin({});
    router.replace('/auth/login');
};

const clickProfile = (event) => {
    console.log(event);
    profile.value.toggle(event);
};
</script>

<template>
    <div class="layout-topbar bg-gray-200">
        <!-- <button class="" @click="onMenuToggle()"> -->
        <i class="pi pi-bars" @click="onMenuToggle()"></i>
        <!-- </button> -->
        <router-link to="/" class="layout-topbar-logo" style="margin-left: 20px">
            <img :src="logoUrl" alt="logo" />
            <!-- <span>ASIS</span> -->
        </router-link>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu bg-gray-200">
            <Menubar class="bg-gray-200" :model="menuHeaderItems" style="border: 0px">
                <template #item="{ item, props, hasSubmenu }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </router-link>
                    <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
                    </a>
                </template>
            </Menubar>
        </div>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-bell"></i>
                <span>Notification</span>
            </button>
            <a href="/config">
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-cog"></i>
                    <span>Settings</span>
                </button>
            </a>
            <SplitButton class="ml-3" :model="itemsProfile" severity="info" @click="onTopBarMenuButton()">
                <i class="pi pi-user"></i> &nbsp; &nbsp;
                <span class="ml-15">{{ userLogin.nama }}</span>
            </SplitButton>
        </div>
        <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
            <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Are you sure you want to sign out?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="logout" class="p-button-text" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped></style>
