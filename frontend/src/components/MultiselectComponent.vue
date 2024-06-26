<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue';
import { injectStrict } from '@/utils/injectTyped';
import { AxiosKey } from '@/service/symbols';
import { mappingCombo } from '@/utils/arrays';

const props = defineProps({
    url: {
        type: String,
        default: ''
    },
    customStyle: {
        type: String,
        default: 'width: 100%'
    },
    customClass: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: 'name'
    },
    placeholder: {
        type: String,
        default: 'select'
    },
    isSingle: {
        type: Boolean,
        default: false
    },
    isFilter: {
        type: Boolean,
        default: true
    },
    isInvalid: {
        type: Boolean,
        default: false
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    listOptions: {
        type: Array,
        default: []
    },
    modelValue: {
        type: String,
        default: ''
    }
});

const emits = defineEmits(['change']);
const http = injectStrict(AxiosKey); // it's typed now
const options = ref([]);
const selected = ref(props.modelValue);
const loading = ref(false);
onBeforeMount(async () => {
    if (props.listOptions.length > 0) options.value = props.listOptions;
    else if (props.url != '') {
        try {
            loading.value = true;
            let response = await http.get(props.url);
            options.value = response.data.data || response.data.items || response.data;
        } catch (error) {
        } finally {
            loading.value = false;
        }
    }
    if (props.modelValue == '') return;
    if (props.isSingle) selected.value = options.value.find((el) => el.id == props.modelValue.replace('\n', '') || el.value == props.modelValue.replace('\n', ''));
    else {
        selected.value = options.value.filter((el) => props.modelValue.includes(el.id) || props.modelValue.includes(el.value));
    }
});
const changeOptions = (event) => {
    emits('change', event.value);
};
</script>

<template>
    <MultiSelect
        :style="customStyle"
        :class="customClass"
        v-if="!isSingle"
        v-model="selected"
        maxSelectedLabels="5"
        @change="changeOptions"
        :options="options"
        :optionLabel="label"
        :placeholder="placeholder"
        :filter="props.url ? true : isFilter"
        :disabled="isDisabled"
        :loading="loading"
        :invalid="isInvalid"
    >
    </MultiSelect>
    <Dropdown
        :style="customStyle"
        :class="customClass"
        v-if="isSingle"
        v-model="selected"
        :options="options"
        @change="changeOptions"
        :optionLabel="label"
        :placeholder="placeholder"
        :filter="props.url ? true : isFilter"
        :disabled="isDisabled"
        :loading="loading"
        :invalid="isInvalid"
    />
</template>

<style scoped lang="scss"></style>
