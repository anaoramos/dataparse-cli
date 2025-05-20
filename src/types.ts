export interface Types {
  name: string;
  address: string;
  postcode: string;
  phone: string;
  creditLimit: string;
  birthday: string;
}

export type InputFormat = "csv" | "prn";
export type OutputFormat = "json" | "html";
