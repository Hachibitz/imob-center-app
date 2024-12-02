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

export interface PropertyDetailsResponse {
  propertyId: number;
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
  createdAt: string;
  updatedAt: string;
  images: PropertyImageResponse[];
  propertyAttributes: PropertyAttributeResponse[];
  condominiumAttributes: CondominiumAttributeResponse[];
}

export interface PropertyImageResponse {
  imageId: number;
  imageData: string;
  imageType: string;
}

export interface PropertyAttributeResponse {
  attributeId: number;
  attributeName: string;
  attributeValue: boolean;
}

export interface CondominiumAttributeResponse {
  attributeId: number;
  attributeName: string;
  attributeValue: boolean;
}