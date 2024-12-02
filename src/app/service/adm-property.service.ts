import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertyDetailsResponse, RegisterPropertyRequest } from '../model/property-adm/property.model';
import { Observable } from 'rxjs';
import { API_PROPERTY, API_SEARCH_PROPERTIES } from 'src/environments/environment';
import { Page } from '../model/common/common.model';

@Injectable({
  providedIn: 'root'
})
export class AdmPropertyService {

  constructor(private http: HttpClient) { }

  registerProperty(propertyData: FormData) {
    return this.http.post<RegisterPropertyRequest>(`${API_PROPERTY}`, propertyData);
  }

  searchProperties(
    propertyId?: number,
    title?: string,
    type?: string,
    minPrice?: number,
    maxPrice?: number,
    cep?: string,
    isForSale?: boolean,
    isForRent?: boolean,
    page: number = 0,
    size: number = 10
  ): Observable<Page<PropertyDetailsResponse>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (propertyId) params = params.set('propertyId', propertyId);
    if (title) params = params.set('title', title);
    if (type) params = params.set('type', type);
    if (minPrice) params = params.set('minPrice', minPrice.toString());
    if (maxPrice) params = params.set('maxPrice', maxPrice.toString());
    if (cep) params = params.set('cep', cep);
    if (isForSale !== undefined) params = params.set('isForSale', isForSale.toString());
    if (isForRent !== undefined) params = params.set('isForRent', isForRent.toString());

    return this.http.get<Page<PropertyDetailsResponse>>(`${API_SEARCH_PROPERTIES}`, { params });
  }

  getPropertyDetails(propertyId: number): Observable<PropertyDetailsResponse> {
    let params = new HttpParams()
    params = params.set('propertyId', propertyId);
    return this.http.get<PropertyDetailsResponse>(`${API_PROPERTY}`, { params })
  }
}
