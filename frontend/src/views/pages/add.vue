<script setup>
import { AxiosKey } from "@/service/symbols";
import { useAuthStore } from "@/store/auth";
import { injectStrict } from "@/utils/injectTyped";
import { getRole } from "@/utils/utils";
import _ from "lodash";
import { useToast } from "primevue/usetoast";
import { onBeforeMount, ref } from "vue";
import { COMBO_LIST_MENU, COMBO_TYPE } from "../../store/static/combo";
const { userLogin } = useAuthStore();
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
});
const emits = defineEmits(["refreshData", "closeDialog"]);
const open = ref(props.openDialog);
const data = ref({});
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
    !data.value.shareTo?.length ||
    !data.value.listMenu?.length ||
    !categoryId.value ||
    !subcategoryId.value
  )
    return;
  try {
    let newData = {
      ...data.value,
      company_id: userLogin.company_id,
      type: "string",
      category_id: categoryId.value,
      sub_category_id: subcategoryId.value,
    };
    await http.post("company/coa", newData);
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
</script>

<template>
  <Dialog
    v-model:visible="open"
    :style="{ width: '450px' }"
    header="Pasien Details"
    :modal="true"
    class="p-fluid"
  >
    <img
      :src="'/demo/images/product/' + product.image"
      :alt="product.image"
      v-if="product.image"
      width="150"
      class="mt-0 mx-auto mb-5 block shadow-2"
    />
    <div class="field">
      <label for="name">Nama Pasien</label>
      <InputText
        id="name"
        v-model.trim="product.name"
        required="true"
        autofocus
        :invalid="submitted && !product.name"
      />
      <small class="p-invalid" v-if="submitted && !product.name"
        >Name is required.</small
      >
    </div>

    <div class="field">
      <label for="nik">NIK Pasien</label>
      <InputText
        id="nik"
        v-model.trim="product.nik"
        required="true"
        autofocus
        :invalid="submitted && !product.nik"
      />
      <small class="p-invalid" v-if="submitted && !product.nik"
        >NIK is required.</small
      >
    </div>

    <div class="field">
      <label for="kota">Kota</label>
      <InputText
        id="kota"
        v-model.trim="product.kota"
        required="true"
        autofocus
        :invalid="submitted && !product.kota"
      />
      <small class="p-invalid" v-if="submitted && !product.kota"
        >Kota is required.</small
      >
    </div>

    <div class="field">
      <label for="alamat">Alamat</label>
      <Textarea
        id="alamat"
        v-model="product.alamat"
        required="true"
        rows="3"
        cols="20"
      />
    </div>

    <div class="field">
      <label for="status" class="mb-3">Status Pasien</label>
      <Dropdown
        id="status"
        v-model="product.status"
        :options="statuses"
        optionLabel="label"
        placeholder="Select Status"
        :invalid="submitted && !product.status"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value && slotProps.value.value">
            <span :class="'product-badge status-' + slotProps.value.value">{{
              slotProps.value.label
            }}</span>
          </div>
          <div v-else-if="slotProps.value && !slotProps.value.value">
            <span
              :class="'product-badge status-' + slotProps.value.toLowerCase()"
              >{{ slotProps.value }}</span
            >
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
      </Dropdown>
      <small class="p-invalid" v-if="submitted && !product.status"
        >Status Pasien is required.</small
      >
    </div>

    <div class="formgrid grid">
      <div class="field col">
        <label for="bpjs">No BPJS</label>
        <InputNumber
          id="bpjs"
          v-model="product.bpjs"
          :invalid="submitted && !product.bpjs && product.status == 'BPJS'"
          :required="true"
        />
        <small
          class="p-invalid"
          v-if="submitted && !product.bpjs && product.status == 'BPJS'"
          >NO BPJS is required.</small
        >
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" text="" @click="saveProduct" />
    </template>
  </Dialog>
</template>