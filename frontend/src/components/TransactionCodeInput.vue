<script setup>
import { useToast } from 'primevue/usetoast';
import { onBeforeMount, ref, watch } from 'vue';
import { injectStrict } from '@/utils/injectTyped';
import { AxiosKey } from '@/service/symbols';
import { getRole } from '../utils/utils';
import { useAuthStore } from '@/store/auth';
const { userLogin } = useAuthStore();

const http = injectStrict(AxiosKey); // it's typed now
const toast = useToast();
const props = defineProps({
    invalid: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: ''
    },
    branchId: {
        type: String,
        default: ''
    },
    transaction: {
        type: String,
        default: ''
    },
    transactionCode: {
        type: String,
        default: ''
    },
    isPersist: {
        type: Boolean,
        default: false
    }
});
const emits = defineEmits(['setTransactionCode']);
const transactionCode = ref(props.transactionCode);
const loading = ref(false);
const getTransactionCode = async () => {
    console.log(getRole());
    let branchId = props.branchId;
    if (getRole() == 'branch') branchId = userLogin.branch_id;
    else if (getRole() == 'company' && !props.branchId) return;
    let query = [];
    query.push(`branch_id=${branchId}`);
    query.push(`transaction=${props.transaction}`);

    try {
        loading.value = true;
        let response = await http.get(`${getRole()}/setting/transaction_code?${query.join('&')}`);
        // console.log(response);
        transactionCode.value = response.data.data;
        emits('setTransactionCode', transactionCode.value);
    } catch (error) {
    } finally {
        loading.value = false;
    }
};

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

onBeforeMount(async () => {
    if (!props.isPersist) getTransactionCode();
});
</script>

<template>
    <InputText :id="id" disabled v-model="transactionCode" required="true" :invalid="invalid" />
</template>
