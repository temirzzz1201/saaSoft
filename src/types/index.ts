export interface RowData {
  labels: string;
  type: SelectType | null;
  login: string;
  password: string;
}

export enum SelectType {
  local = "Локальная",
  ldap = "LDAP",
}
