<script setup>
import { AxiosKey } from "@/service/symbols";
import { injectStrict } from "@/utils/injectTyped";
import { onBeforeMount, ref, watch } from "vue";
import AddDialog from "./add.vue";
import EditDialog from "./edit.vue";
import DeleteDialog from "@/components/DeleteDialog.vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const http = injectStrict(AxiosKey); // it's typed now
const router = useRouter();
const data_pasien = ref({});
const data_update_pasien = ref({});
const newData = ref({});
const paging = ref({
  page: 1,
  size: 10,
  totalElements: 0,
  totalPages: 0,
});
const filter = ref({ name: "" });
const addDialog = ref(false);
const editDialog = ref(false);
const editData = ref({});
const deleteDialog = ref(false);
const loading = ref(false);
const deleteTitle = ref("");
const deleteId = ref("");
const timer = ref(0);

const data = ref({});
const submitted = ref(false);
const submittedEdit = ref(false);

onBeforeMount(async () => {
  await getData();
});

const hideDialog = () => {
  addDialog.value = false;
};

const hideDialogEdit = () => {
  editDialog.value = false;
};

const eventDelaySearch = () => {
  clearTimeout(timer.value); //this timer 0 - set 0 atau clear jika ada input lagi
  timer.value = setTimeout(() => {
    getData();
  }, 1000);
};

const statuses = ref([
  { label: "BPJS", value: "BPJS" },
  { label: "UMUM", value: "UMUM" },
]);

const getData = async () => {
  try {
    loading.value = true;
    let response = await http.get(`pasien`);
    data.value = response.data.items;
    paging.value = {
      page: response.data.page,
      size: response.data.size,
      totalElements: response.data.total,
      totalPages: response.data.pages,
    };
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const saveData = async () => {
  submitted.value = true;
  if (
    !data_pasien.value.name ||
    !data_pasien.value.nik ||
    !data_pasien.value.kota ||
    !data_pasien.value.status.value
  )
    return;
  let newData = {
    ...data_pasien.value,
    status: data_pasien.value.status.value,
  };
  delete newData.updated_at;
  delete newData.id;
  delete newData.created_at;
  delete newData.company_id;
  // return console.log(newData, 'savedata');
  try {
    if (data_pasien.value.id) {
      await http.put(`pasien/${data_pasien.value.id}`, newData);
    } else {
      await http.post(`pasien/`, newData);
    }
    addDialog.value = false;
    await getData();
  } catch (error) {}
};

const saveUpdateData = async () => {
  //   alert(data_update_pasien.value.id);
  submittedEdit.value = true;
  if (
    !data_update_pasien.value.name ||
    !data_update_pasien.value.nik ||
    !data_update_pasien.value.kota
  )
    return;
  let newData = {
    ...data_update_pasien.value,
    status: data_update_pasien.value.status.value,
  };
  delete newData.updated_at;
  delete newData.id;
  delete newData.created_at;
  delete newData.company_id;
  // return console.log(newData, 'savedata');
  try {
    // if (data_update_pasien.value.id != "") {
    // alert(123);
    await http.put(`pasien/${data_update_pasien.value.id}`, newData);
    // } else {
    //   await http.post(`pasien/`, newData);
    // }
    editDialog.value = false;
    await getData();
  } catch (error) {
    alert(error);
  }
};

const toggleNew = () => {
  //   data_pasien.value = null;
  addDialog.value = !addDialog.value;
};
const toggleEdit = (item = { title: "", id: "" }) => {
  data_update_pasien.value = item;
  editDialog.value = !editDialog.value;
};
const toggleDelete = (item = { title: "", id: "" }) => {
  deleteTitle.value = item.name;
  deleteId.value = item.id;
  deleteDialog.value = !deleteDialog.value;
};

const openPrintDialog = (id) => {
  // console.log(window.location);
  window.open(`${window.location.origin}/printLayout/${id}`);
};

const onPage = (e) => {
  console.log(e);
  paging.value.page = e.page + 1;
  paging.value.size = e.rows;
  getData();
};
const openSubcategory = (id) => {
  router.push(`/master-data/category-coa/${id}`);
};
</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h1>Data Pasien</h1>
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                label="New"
                icon="pi pi-plus"
                class="mr-2"
                severity="success"
                @click="toggleNew"
              />
              <!-- <Button label="Test Print" icon="pi pi-plus" class="mr-2" severity="info" @click="openPrintDialog('Tes_Print')" /> -->
            </div>
          </template>
          <template v-slot:end>
            <FileUpload
              mode="basic"
              accept="image/*"
              :maxFileSize="1000000"
              label="Import"
              chooseLabel="Import"
              class="mr-2 inline-block"
            />
            <Button
              label="Export"
              icon="pi pi-upload"
              severity="help"
              @click="exportCSV($event)"
            />
          </template>
        </Toolbar>
        <DataTable
          :loading="loading"
          :value="data"
          dataKey="id"
          tableStyle="min-width: 60rem"
          lazy
          :paginator="true"
          @page="onPage($event)"
          :rows="paging.size"
          :size="paging.size"
          :rowsPerPageOptions="[5, 10]"
          :totalRecords="paging.totalElements"
        >
          <Column
            field="no"
            header="No"
            headerStyle="width:4rem"
            :sortable="false"
          >
            <template #body="slotProps">
              {{ slotProps.index + 1 + paging.size * (paging.page - 1) }}
            </template>
          </Column>
          <Column field="name" header="Name" :sortable="false">
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column field="nik" header="NIK" :sortable="false">
            <template #body="slotProps">
              {{ slotProps.data.nik }}
            </template>
          </Column>
          <Column field="kota" header="Kota" :sortable="false">
            <template #body="slotProps">
              {{ slotProps.data.kota }}
            </template>
          </Column>
          <Column field="address" header="Alamat" :sortable="false">
            <template #body="slotProps">
              {{ slotProps.data.address }}
            </template>
          </Column>
          <Column field="status" header="Status" :sortable="false">
            <template #body="slotProps">
              {{ slotProps.data.status }}
            </template>
          </Column>
          <Column field="bpjs" header="No BPJS" :sortable="false">
            <template #body="slotProps">
              {{ slotProps.data.bpjs }}
            </template>
          </Column>
          <Column headerStyle="width:5rem" header="Action">
            <template #body="slotProps">
              <div class="flex gap-1">
                <!-- <Button severity="info" v-tooltip.left="'Sub Kategori'" icon="pi pi-list" @click="() => openSubcategory(slotProps.data.id)" /> -->
                <Button
                  severity="warning"
                  v-tooltip.left="'Edit'"
                  icon="pi pi-pencil"
                  @click="() => toggleEdit(slotProps.data)"
                />
                <Button
                  severity="danger"
                  v-tooltip.left="'Delete'"
                  icon="pi pi-trash"
                  @click="() => toggleDelete(slotProps.data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
        <Dialog
          v-model:visible="addDialog"
          :style="{ width: '450px' }"
          header="Tambah Pasien"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="name">Nama Pasien</label>
            <InputText
              id="name"
              v-model.trim="data_pasien.name"
              required="true"
              autofocus
              :invalid="submitted && !data_pasien.name"
            />
            <small class="p-invalid" v-if="submitted && !data_pasien.name"
              >Name is required.</small
            >
          </div>

          <div class="field">
            <label for="nik">NIK Pasien</label>
            <InputText
              id="nik"
              v-model.trim="data_pasien.nik"
              required="true"
              autofocus
              :invalid="submitted && !data_pasien.nik"
            />
            <small class="p-invalid" v-if="submitted && !data_pasien.nik"
              >NIK is required.</small
            >
          </div>

          <div class="field">
            <label for="kota">Kota</label>
            <InputText
              id="kota"
              v-model.trim="data_pasien.kota"
              required="true"
              autofocus
              :invalid="submitted && !data_pasien.kota"
            />
            <small class="p-invalid" v-if="submitted && !data_pasien.kota"
              >Kota is required.</small
            >
          </div>

          <div class="field">
            <label for="alamat">Alamat</label>
            <Textarea
              id="alamat"
              v-model="data_pasien.address"
              required="true"
              rows="3"
              cols="20"
            />
          </div>

          <div class="field">
            <label for="status" class="mb-3">Status Pasien</label>
            <Dropdown
              id="status"
              v-model="data_pasien.status"
              :options="statuses"
              optionLabel="label"
              placeholder="Select Status"
              :invalid="submitted && !data_pasien.status"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.value">
                  <span
                    :class="'product-badge status-' + slotProps.value.value"
                    >{{ slotProps.value.label }}</span
                  >
                </div>
                <div v-else-if="slotProps.value && !slotProps.value.value">
                  <span
                    :class="
                      'product-badge status-' + slotProps.value.toLowerCase()
                    "
                    >{{ slotProps.value }}</span
                  >
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </Dropdown>
            <small class="p-invalid" v-if="submitted && !data_pasien.status"
              >Status Pasien is required.</small
            >
          </div>

          <div class="formgrid grid">
            <div class="field col">
              <label for="bpjs">No BPJS</label>
              <InputNumber
                id="bpjs"
                v-model="data_pasien.bpjs"
                :invalid="
                  submitted &&
                  !data_pasien.bpjs &&
                  data_pasien.status.value == 'BPJS'
                "
                :required="true"
              />
              <small
                class="p-invalid"
                v-if="
                  submitted &&
                  !data_pasien.bpjs &&
                  data_pasien.status.value == 'BPJS'
                "
                >NO BPJS is required.</small
              >
            </div>
          </div>
          <template #footer>
            <Button
              label="Cancel"
              icon="pi pi-times"
              text=""
              @click="hideDialog"
            />
            <Button label="Save" icon="pi pi-check" text="" @click="saveData" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="editDialog"
          :style="{ width: '450px' }"
          header="Edit Pasien"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="name">Nama Pasien</label>
            <InputText
              id="name"
              v-model.trim="data_update_pasien.name"
              required="true"
              autofocus
              :invalid="submittedEdit && !data_update_pasien.name"
            />
            <small
              class="p-invalid"
              v-if="submittedEdit && !data_update_pasien.name"
              >Name is required.</small
            >
          </div>

          <div class="field">
            <label for="nik">NIK Pasien</label>
            <InputText
              id="nik"
              v-model.trim="data_update_pasien.nik"
              required="true"
              autofocus
              :invalid="submittedEdit && !data_update_pasien.nik"
            />
            <small
              class="p-invalid"
              v-if="submittedEdit && !data_update_pasien.nik"
              >NIK is required.</small
            >
          </div>

          <div class="field">
            <label for="kota">Kota</label>
            <InputText
              id="kota"
              v-model.trim="data_update_pasien.kota"
              required="true"
              autofocus
              :invalid="submittedEdit && !data_update_pasien.kota"
            />
            <small
              class="p-invalid"
              v-if="submittedEdit && !data_update_pasien.kota"
              >Kota is required.</small
            >
          </div>

          <div class="field">
            <label for="alamat">Alamat</label>
            <Textarea
              id="alamat"
              v-model="data_update_pasien.address"
              required="true"
              rows="3"
              cols="20"
            />
          </div>

          <div class="field">
            <label for="status" class="mb-3">Status Pasien</label>
            <Dropdown
              id="status"
              v-model="data_update_pasien.status"
              :options="statuses"
              optionLabel="label"
              placeholder="Select Status"
              :invalid="submittedEdit && !data_update_pasien.status"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.value">
                  <span
                    :class="'product-badge status-' + slotProps.value.value"
                    >{{ slotProps.value.label }}</span
                  >
                </div>
                <div v-else-if="slotProps.value && !slotProps.value.value">
                  <span
                    :class="
                      'product-badge status-' + slotProps.value.toLowerCase()
                    "
                    >{{ slotProps.value }}</span
                  >
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </Dropdown>
            <small
              class="p-invalid"
              v-if="submittedEdit && !data_update_pasien.status"
              >Status Pasien is required.</small
            >
          </div>

          <div class="formgrid grid">
            <div class="field col">
              <label for="bpjs">No BPJS</label>
              <InputNumber
                id="bpjs"
                v-model="data_update_pasien.bpjs"
                :invalid="submittedEdit && !data_update_pasien.bpjs"
                :required="true"
              />
              <small
                class="p-invalid"
                v-if="submittedEdit && !data_update_pasien.bpjs"
                >NO BPJS is required.</small
              >
            </div>
          </div>
          <template #footer>
            <Button
              label="Cancel"
              icon="pi pi-times"
              text=""
              @click="hideDialogEdit"
            />
            <Button
              label="Save"
              icon="pi pi-check"
              text=""
              @click="saveUpdateData"
            />
          </template>
        </Dialog>

        <!-- <Dialog
          v-model:visible="deleteDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i
              class="pi pi-exclamation-triangle mr-3"
              style="font-size: 2rem"
            />
            <span v-if="product"
              >Apakah anda yakin akan menghapus data ini?
            </span>
          </div>
          <template #footer>
            <Button
              label="No"
              icon="pi pi-times"
              text
              @click="deleteProductDialog = false"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              text
              @click="deleteProduct"
            />
          </template>
        </Dialog> -->
        <!-- <edit-dialog
          :key="`edit-${editDialog}`"
          :openDialog="editDialog"
          @closeDialog="toggleEdit"
          @refreshData="getData"
          :isFullscreen="false"
          :data="editData"
        ></edit-dialog>
        <add-dialog
          :key="`add-${addDialog}`"
          :openDialog="addDialog"
          @closeDialog="toggleNew"
          @refreshData="getData"
          :isFullscreen="false"
        ></add-dialog>-->
        <delete-dialog
          :key="`delete-${deleteDialog}`"
          :openDialog="deleteDialog"
          @closeDialog="toggleDelete"
          @refreshData="getData"
          :url="`pasien/${deleteId}`"
          :title="deleteTitle"
        ></delete-dialog>
      </div>
    </div>
  </div>
</template>
<style scoped></style>