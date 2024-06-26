<script setup>
import { useToast } from 'primevue/usetoast';
import { onBeforeMount, ref, watch } from 'vue';
import { injectStrict } from '@/utils/injectTyped';
import { AxiosKey } from '@/service/symbols';

const http = injectStrict(AxiosKey); // it's typed now
const toast = useToast();
const props = defineProps({
    openDialog: {
        type: Boolean,
        default: false
    },
    url: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    }
});
const emits = defineEmits(['refreshData', 'closeDialog']);
const open = ref(props.openDialog);
const data = ref({});

const hideDialog = () => {
    console.log('close');
    emits('closeDialog');
};

const deleteData = async () => {
    try {
        await http.delete(props.url);
        emits('refreshData');
        emits('closeDialog');
    } catch (error) {}
};

onBeforeMount(async () => {
    console.log('delete modal');
});
</script>

<template>
    <Dialog v-model:visible="open" :closable="false" header="Konfirmasi Hapus" modal :style="{ width: '70vw' }" class="p-fluid">
        <div>
            <h5>
                Apakah anda yakin akan menghapus <b>{{ title }}</b
                >?
            </h5>
        </div>
        <template #footer>
            <Button label="Cancel" severity="warning" icon="pi pi-times" text="" @click="hideDialog" />
            <Button label="Delete" severity="danger" icon="pi pi-check" text="" @click="deleteData" />
        </template>
    </Dialog>
</template>
