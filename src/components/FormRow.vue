<template>
  <v-row align="center" class="mb-2">
    <v-col cols="2.5">
      <v-text-field
        :rules="[rules.labels]"
        v-model="row.labels"
        label="Метки"
        density="compact"
        variant="outlined"
        :maxlength="50"
        @blur="store.saveRecord(row, index)"
        hint="Например: текст 1; текст 2"
      />
    </v-col>

    <v-col cols="2.5">
      <v-select
        v-model="row.type"
        variant="outlined"
        density="compact"
        clearable
        label="Тип записи"
        :items="[SelectType.local, SelectType.ldap]"
        @update:model-value="store.onTypeChange(row, index, $event)"
      />
    </v-col>

    <v-col cols="2.5">
      <v-text-field
        :rules="[rules.required, rules.login]"
        v-model="row.login"
        label="Логин"
        density="compact"
        variant="outlined"
        :maxlength="100"
        @blur="store.saveRecord(row, index)"
      />
    </v-col>

    <v-col cols="2.5">
      <v-text-field
        v-if="row.type === SelectType.local"
        :rules="[rules.required, rules.password]"
        v-model="row.password"
        label="Пароль"
        density="compact"
        variant="outlined"
        type="password"
        :maxlength="100"
        @blur="store.saveRecord(row, index)"
      />
    </v-col>

    <v-col cols="1" class="d-flex mb-5 justify-center">
      <v-btn
        color="error"
        icon="mdi-delete"
        variant="text"
        density="compact"
        @click="$emit('remove')"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { RowData } from "@/types";
import { SelectType } from "@/types";
import { useFormStore } from "@/store/formStore";

defineProps<{
  row: RowData;
  index: number;
}>();

const emit = defineEmits<{
  (e: "remove"): void;
}>();

const store = useFormStore();

const rules = {
  required: (value: string) => !!value || "Обязательное поле",
  labels: (value: string) =>
    (value?.length ?? 0) <= 50 || "Максимум 50 символов",
  login: (value: string) =>
    (value?.length ?? 0) <= 100 || "Максимум 100 символов",
  password: (value: string) =>
    (value?.length ?? 0) <= 100 || "Максимум 100 символов",
};
</script>
