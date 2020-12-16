import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  APIEndpoint = environment.apiEndpoint + "url";
  constructor(private http: HttpClient) { }

  postRegister(register:Register) : Promise<number> {

    return this.http.post<number>(this.APIEndpoint,register).toPromise();

  }
}
