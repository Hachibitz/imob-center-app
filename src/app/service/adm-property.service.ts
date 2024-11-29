import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPropertyRequest } from '../model/property-adm/property.model';
import { Observable } from 'rxjs';
import { API_REGISTER_PROPERTY } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmPropertyService {

  constructor(private http: HttpClient) { }

  registerProperty(propertyData: FormData) {
    return this.http.post<RegisterPropertyRequest>(`${API_REGISTER_PROPERTY}`, propertyData);
  }  
}
