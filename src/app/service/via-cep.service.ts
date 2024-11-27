import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViaCepFindByCepResponse } from '../model/property-adm/via-cep.model';
import { ViaCepHost } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private http: HttpClient) {

  }

  findAddressInfoByCep(cep: String): Promise<ViaCepFindByCepResponse> {
    const path = `/${cep}/json/`;
    return new Promise<ViaCepFindByCepResponse> ((resolve, reject) => {
      this.http.get<ViaCepFindByCepResponse>(`${ViaCepHost}${path}`).subscribe({
        next: (result: ViaCepFindByCepResponse) => {
          resolve(result);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        }
      })
    })
  } 
}
