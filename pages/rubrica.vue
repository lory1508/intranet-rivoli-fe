<template>
  <div class="flex flex-col w-full gap-4">
    <LoaderComponent v-if="loading" />
    <div v-else>
      <div class="flex flex-col mb-2">
        <HeaderComponent title="Rubrica" :breadcrumb="breadcrumb" />

        <NRadioGroup v-model:value="chosenLayout" name="layout" class="mt-2">
          <NRadioButton value="cards" label="Vista a schede" />
          <NRadioButton value="table" label="Vista a tabella" />
        </NRadioGroup>
      </div>
      <div class="flex flex-row justify-between w-full gap-4">
        <NEmpty
          v-if="employeesData.length === 0"
          description="Nessun risultato trovato"
          class="p-4 bg-white border w-fit h-fit rounded-xl"
        />
        <div v-else class="w-9/12">
          <div v-if="chosenLayout === 'cards'" class="flex flex-wrap gap-4">
            <div v-for="employee in employeesData" :key="employee.id">
              <EmployeeCard :employee="employee" />
            </div>
          </div>
          <div v-else class="flex flex-col w-full gap-1">
            <NDataTable
              :columns="columns"
              :data="employeesData"
              :bordered="true"
              :loading="loadingData"
              class="w-full"
              striped
              remote
            />
            <PaginationComponent
              :total="total"
              :per-page="perPage"
              :current-page="currentPage"
              :per-page-options="[10, 20, 30]"
              @page-change="handlePageChange"
            />
          </div>
        </div>
        <RubricaCard
          :title="homeStaticData.rubrica.title"
          :icon="homeStaticData.rubrica.icon"
          :current-search="rubricaSearch"
          compact
          @search="runSearch"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEmployeeStore } from "~/stores/employees";
import { NEmpty, NButton } from "naive-ui";
import { homeStaticData } from "~/utils/staticData/home";
import { formatArrayOfEmployees, capitalizeSentence, decodeHtmlEntities } from "~/utils";

import RubricaCard from "~/components/home/RubricaCard.vue";
import EmployeeCard from "~/components/common/EmployeeCard.vue";
import HeaderComponent from "~/components/common/HeaderComponent.vue";
import LoaderComponent from "~/components/common/LoaderComponent.vue";
import PaginationComponent from "~/components/common/PaginationComponent.vue";

const accessibilityStore = useAccessibilityStore();
const isLargeFont = computed(() => accessibilityStore.isLargeFont);
const isHighContrast = computed(() => accessibilityStore.isHighContrast);

const route = useRoute();

const loading = ref(false);
const loadingData = ref(false);
const employeeStore = useEmployeeStore();
const employees = ref(() => {});
const employeesData = ref([]);
const chosenLayout = ref("cards");

const currentPage = ref(1);
const perPage = ref(20);
const total = ref(0);

const pagination = ref({
  page: 1,
  itemCount: 0,
  perPage: perPage.value,
  "show-size-picker": true,
});
const rubricaSearch = ref({
  query: null,
  department: null,
  offices: null,
  service: null,
});

const breadcrumb = ref([
  {
    title: "Home",
    slug: "/",
  },
  {
    title: "Rubrica",
    slug: "/rubrica",
  },
]);

const accessibilityClasses = computed(() => {
  const classes = ref("transition-all duration-300 ");
  if (isLargeFont.value) {
    classes.value += "text-xl ";
  }
  if (!isLargeFont.value) {
    classes.value += "text-base ";
  }
  if (isHighContrast.value) {
    classes.value += "bg-black text-white ";
  }
  return classes.value;
});

const columns = [
  {
    title: "Nome",
    key: "name",
    resizable: true,
    minWidth: 200,
    render(row) {
      return h(
        "div",
        { class: `${accessibilityClasses.value}` },
        capitalizeSentence(decodeHtmlEntities(row.name))
      );
    },
  },
  {
    title: "Tel.",
    key: "phone",
    resizable: true,
    minWidth: 200,
    render(row) {
      return h("div", { class: `${accessibilityClasses.value}` }, row.phone);
    },
  },
  {
    title: "Email",
    key: "email",
    resizable: true,
    minWidth: 200,
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          secondary: true,
          type: "info",
          size: isLargeFont.value ? "large" : "small",
          onClick: async () =>
            await navigateTo(`mailto:${row.email}`, { external: true }),
        },
        { default: () => row.email }
      );
    },
  },
  {
    title: "Stanza",
    key: "room",
    resizable: true,
    minWidth: 200,
    render(row) {
      return h("div", { class: `${accessibilityClasses.value}` }, row.room);
    },
  },
  {
    title: "Dir.",
    key: "department",
    minWidth: 300,
    render(row) {
      return h("div", { class: `${accessibilityClasses.value}` }, row.department);
    },
  },
  {
    title: "Serv.",
    key: "service",
    minWidth: 300,
    render(row) {
      return h("div", { class: `${accessibilityClasses.value}` }, row.service);
    },
  },
  {
    title: "Uff.",
    key: "offices",
    minWidth: 300,
    render(row) {
      return h(
        "div",
        { class: `${accessibilityClasses.value}` },
        row.offices.map((office) => office.title).join(", ")
      );
    },
  },
];

const runSearch = async (query) => {
  rubricaSearch.value = query;
  await searchEmployees();
};
const searchEmployees = async () => {
  try {
    loading.value = true;
    pagination.value = `pagination[page]=${currentPage.value}&pagination[pageSize]=${perPage.value}`;
    employees.value = await employeeStore.searchEmployees(
      rubricaSearch.value,
      pagination.value
    );
    total.value = employees.value.meta.pagination.total;
    employeesData.value = formatArrayOfEmployees(employees.value.data);
    if (employeesData.value.length >= 10) {
      chosenLayout.value = "table";
    }
    pagination.value = {
      ...employees.value.meta.pagination,
    };
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handlePageChange = async (page, itemsPerPage) => {
  currentPage.value = page;
  perPage.value = itemsPerPage;
  employees.value = [];
  chosenLayout.value = "table";
  await searchEmployees();
};

onMounted(async () => {
  if (route.query) {
    rubricaSearch.value = route.query;
    await searchEmployees();
  }
});
</script>
