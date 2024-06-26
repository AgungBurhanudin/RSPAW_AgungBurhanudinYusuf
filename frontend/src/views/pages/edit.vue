<script setup>
import { AxiosKey } from "@/service/symbols";
import { useAuthStore } from "@/store/auth";
import { injectStrict } from "@/utils/injectTyped";
import { getRole } from "@/utils/utils";
import _ from "lodash";
import { useToast } from "primevue/usetoast";
import { onBeforeMount, ref, watch } from "vue";
import { COMBO_LIST_MENU, COMBO_TYPE } from "../../store/static/combo";
const http = injectStrict(AxiosKey); // it's typed now

const toast = useToast();
const props = defineProps({
  openDialog: {
    type: Boolean,
    default: false,
  },
  isFullscreen: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: {},
  },
});
const emits = defineEmits(["refreshData", "closeDialog"]);
const open = ref(props.openDialog);
const data = ref({ ...props.data });
const submitted = ref(false);
const loadingCategory = ref(false);
const loadingSubCategory = ref(false);
const ListListMenu = ref([...COMBO_LIST_MENU]);
const ListType = ref([...COMBO_TYPE]);
const ListCategory = ref([]);
const ListSubCategory = ref([]);
const categoryName = ref("");
const categoryId = ref("");
const categoryCode = ref("");
const subcategoryName = ref("");
const subcategoryId = ref("");
const subcategoryCode = ref("");
const shareTo = ref([]);

const hideDialog = () => {
  console.log("close");
  emits("closeDialog");
};
const saveData = async () => {
  submitted.value = true;
  if (
    !data.value.name ||
    !data.value.code ||
    !data.value.type ||
    !data.value.shareTo.length ||
    !data.value.listMenu.length ||
    !categoryId.value ||
    !subcategoryId.value
  )
    return;
  let newData = { ...data.value };
  delete newData.updated_at;
  delete newData.id;
  delete newData.created_at;
  delete newData.company_id;
  // return console.log(newData, 'savedata');
  try {
    await http.put(`company/coa/${data.value.id}`, newData);
    emits("refreshData");
    emits("closeDialog");
  } catch (error) {}
};

const getCoaCategory = async () => {
  try {
    loadingCategory.value = true;
    let response = await http.get(`company/coa_category/dropdown`);
    ListCategory.value = response.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loadingCategory.value = false;
  }
};
const getCoaSubCategory = async (id) => {
  try {
    loadingSubCategory.value = true;
    let response = await http.get(
      `company/coa_sub_category/dropdown/${categoryId.value}`
    );
    ListSubCategory.value = response.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loadingSubCategory.value = false;
  }
};

// onBeforeMount(async () => {
//   getCoaCategory();
// });

const changeCategory = (event) => {
  categoryCode.value = event.code;
  categoryName.value = event.name;
  categoryId.value = event.id;
  getCoaSubCategory(event.id);
};

const changeSubCategory = (event) => {
  subcategoryCode.value = event.code;
  subcategoryName.value = event.name;
  subcategoryId.value = event.id;
  // data.value.code = event.code;
};

const changeShareTo = (event) => {
  data.value.shareTo = _.map(event, (el) => el.id);
};

const changeListMenu = (event) => {
  data.value.listMenu = _.map(event, (el) => el.value);
};

const changeType = (event) => {
  data.value.type = event.value;
};

if (open.value) {
  console.log(props.data);
  categoryCode.value = props.data.coa_category.code;
  categoryName.value = props.data.coa_category.name;
  categoryId.value = props.data.category_id;
  subcategoryId.value = props.data.sub_category_id;
  if (categoryId.value) getCoaSubCategory(categoryId.value);
}
</script>

<template>
  <Dialog
    v-model:visible="open"
    :closable="false"
    header="Edit Coa"
    modal
    :style="{ minWidth: '700px' }"
    :class="`${isFullscreen && 'p-dialog-maximized'} p-fluid`"
  >
    <div class="flex flex-column gap-2 w-full">
      <div class="field">
        <label for="shareTo">Share To</label>
        <select-component
          customClass="xs"
          @change="changeShareTo"
          :modelValue="props.data.shareTo"
          placeholder="pilih Share To"
          is-filter
          :url="`${getRole()}/branch/dropdown`"
          :is-invalid="submitted && !data.shareTo"
        ></select-component>
        <small class="p-invalid text-danger" v-if="submitted && !data.shareTo"
          >Kategori is required.</small
        >
      </div>
      <div class="field">
        <label for="type">Tipe</label>
        <!-- :key="`${JSON.stringify(ListType).length}`" -->
        <select-component
          :modelValue="props.data.type"
          is-single
          customClass="xs"
          @change="changeType"
          placeholder="pilih tipe"
          :listOptions="ListType"
          label="label"
          :is-invalid="submitted && !data.type"
        ></select-component>
        <small class="p-invalid" v-if="submitted && !data.type"
          >Tipe is required.</small
        >
      </div>
      <div class="field">
        <label for="menu">Menu</label>
        <!-- :key="`${JSON.stringify(ListListMenu).length}`" -->
        <select-component
          :modelValue="props.data.listMenu"
          customClass="xs"
          @change="changeListMenu"
          placeholder="pilih menu"
          :listOptions="ListListMenu"
          label="label"
          :is-invalid="submitted && !data.listMenu"
        ></select-component>
        <small class="p-invalid" v-if="submitted && !data.listMenu"
          >Menu is required.</small
        >
      </div>
      <div class="field">
        <label for="category">Kategori</label>
        <select-component
          :modelValue="props.data.category_id"
          :key="`${JSON.stringify(ListCategory).length}`"
          customClass="xs"
          is-single
          is-filter
          @change="changeCategory"
          placeholder="pilih kategori"
          :listOptions="ListCategory"
          :is-invalid="submitted && !categoryId"
        ></select-component>
        <small class="p-invalid" v-if="submitted && !categoryCode"
          >Kategori is required.</small
        >
      </div>
      <div class="field">
        <label for="subCategory">Sub Kategori</label>
        <select-component
          :key="`${JSON.stringify(ListSubCategory).length}`"
          customClass="xs"
          :is-disabled="!categoryName"
          is-single
          @change="changeSubCategory"
          placeholder="pilih sub kategori"
          :modelValue="props.data.sub_category_id"
          :listOptions="ListSubCategory"
          :is-invalid="submitted && !subcategoryId"
        ></select-component>
        <small class="p-invalid" v-if="submitted && !subcategoryId"
          >Sub Kategori is required.</small
        >
      </div>
      <div class="field">
        <label for="name">Nama</label>
        <InputText
          id="name"
          v-model.trim="data.name"
          required="true"
          autofocus
          :invalid="submitted && !data.name"
        />
        <small class="p-invalid" v-if="submitted && !data.name"
          >Nama is required.</small
        >
      </div>
      <div class="field">
        <label for="code">Code</label>
        <InputText
          id="code"
          v-model.trim="data.code"
          required="true"
          autofocus
          :invalid="submitted && !data.code"
        />
        <small class="p-invalid" v-if="submitted && !data.code"
          >Code is required.</small
        >
      </div>
      <div class="field">
        <label for="description">Catatan</label>
        <Textarea
          id="description"
          v-model="data.description"
          required="true"
          rows="3"
          cols="20"
        />
      </div>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        severity="danger"
        icon="pi pi-times"
        text=""
        @click="hideDialog"
      />
      <Button
        label="Save"
        severity="success"
        icon="pi pi-check"
        text=""
        @click="saveData"
      />
    </template>
  </Dialog>
</template>