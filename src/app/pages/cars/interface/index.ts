export interface Cars {
  _id: string;
  brand: string;
  make: string;
  year: number;
  price: number;
  km: number;
  cm3?: number;
  picture?: string | null | undefined;
  owner?: null;
}
