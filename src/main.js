import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeflex/primeflex.css";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";

import Dialog from "primevue/dialog";

const app = createApp(App);

app.use(PrimeVue);

app
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("MultiSelect", MultiSelect)
  .component("InputText", InputText)
  .component("Button", Button);

app.mount("#app");
