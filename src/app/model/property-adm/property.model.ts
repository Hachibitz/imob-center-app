export interface RegisterPropertyRequest {
    title: string;
    description: string | null;
    type: string;
    isForSale: boolean;
    isForRent: boolean;
    bedroomNumber: number;
    restroomNumber: number;
    area: number;
    garageSpaces: number;
    condominiumFee: number | null;
    iptu: number | null;
    price: number;
    cep: string;
    createdBy: string | null;
    propertyAttributes: number[];
    condominiumAttributes: number[];
    images: string[];
  }
  