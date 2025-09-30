<template>
  <v-app :theme="theme">
    <v-main>
      <v-container>
        <v-card-text class="text-h4 text-center" color="primary"
          >Генератор учетных записей</v-card-text
        >
        <v-container>
          <v-row class="mb-5">
            <v-card-text text-body-1 color="primary" class="text-center">
              <v-btn
                :prepend-icon="
                  store.theme === 'light'
                    ? 'mdi-weather-sunny'
                    : 'mdi-weather-night'
                "
                slim
                @click="store.toggleTheme"
                variant="text"
                density="compact"
              ></v-btn>
              {{ theme === "light" ? "Светлая тема" : "Темная тема" }}
            </v-card-text>

            <v-card-text text-body-1 color="primary" class="text-center">
              Добавить запись
              <v-btn icon="mdi-plus" density="compact" @click="store.addRow" />
            </v-card-text>
          </v-row>

          <v-container class="mb-5">
            <v-row>
              <v-card-text text-body-1 color="primary">
                <v-icon icon="mdi-help-circle" />
                Для указания нескольких <b>меток</b> для одной пары логин/пароль
                используйте разделитель ;
              </v-card-text>
            </v-row>
          </v-container>

          <v-card>
            <v-form>
              <v-container>
                <v-card-text v-if="!rows.length" text-body-1 color="primary">
                  Записей пока нет!
                </v-card-text>
                <FormRow
                  v-for="(row, index) in rows"
                  :key="index"
                  :row="row"
                  @remove="store.removeRow(index)"
                  :index="index"
                />
              </v-container>
            </v-form>
          </v-card>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import FormRow from "@/components/FormRow.vue";
import { onMounted } from "vue";
import { useFormStore } from "./store/formStore";
import { storeToRefs } from "pinia";

const store = useFormStore();

const { theme, rows } = storeToRefs(store);

onMounted(() => {
  store.load();
});
</script>
