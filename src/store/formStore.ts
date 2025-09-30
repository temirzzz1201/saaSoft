import { defineStore } from "pinia";
import type { RowData } from "@/types";
import { ref } from "vue";
import { SelectType } from "@/types";

export const useFormStore = defineStore("form", () => {
  const theme = ref("light");

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  const rows = ref<RowData[]>([
    { labels: "", type: null, login: "", password: "" },
  ]);

  const addRow = () => {
    rows.value.push({ labels: "", type: null, login: "", password: "" });
  };

  const removeRow = (index: number) => {
    rows.value.splice(index, 1);
    syncStorage();
  };

  const load = () => {
    const saved = localStorage.getItem("formRows");
    console.log("saved ", saved);

    if (saved) {
      const parsed = JSON.parse(saved);
      rows.value = parsed.map((row: any) => ({
        ...row,
        labels: Array.isArray(row.labels)
          ? row.labels.map((l: any) => l.text).join("; ")
          : row.labels,
      }));
    }
  };

  const saveRecord = (row: RowData, index: number) => {
    const isValid =
      !!row.login &&
      row.login.length <= 100 &&
      (row.type === SelectType.local ? !!row.password : true);

    if (!isValid) {
      console.log("not valid");
      return;
    }

    const record = {
      labels: (row.labels || "")
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((text) => ({ text })),
      type: row.type,
      login: row.login,
      password: row.type === SelectType.local ? row.password : null,
    };

    const saved = localStorage.getItem("formRows");
    const recordsArray = saved ? JSON.parse(saved) : [];

    if (recordsArray[index]) {
      recordsArray[index] = record;
    } else {
      recordsArray.push(record);
    }

    localStorage.setItem("formRows", JSON.stringify(recordsArray));
  };

  const onTypeChange = (
    row: RowData,
    index: number,
    newType: SelectType | null
  ) => {
    if (newType === SelectType.ldap) {
      row.password = null as any;
    } else if (newType === SelectType.local) {
      row.password = "";
    }
    saveRecord(row, index);
  };

  const syncStorage = () => {
    const filtered = rows.value.filter(
      (row) => row.login || row.type || row.password || row.labels
    );
    localStorage.setItem("formRows", JSON.stringify(filtered));
  };

  return {
    toggleTheme,
    theme,
    rows,
    addRow,
    removeRow,
    load,
    saveRecord,
    onTypeChange,
  };
});
