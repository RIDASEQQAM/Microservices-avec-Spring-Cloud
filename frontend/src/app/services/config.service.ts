import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl = 'http://localhost:9999/microservice-commandes/api';

  constructor(private http: HttpClient) { }

  getHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/actuator/health`);
  }

  getConfig(): Observable<any> {
    return this.http.get(`${this.apiUrl}/actuator/env/mes-config-ms.commandes-last`);
  }

  updateConfig(value: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/actuator/refresh`, {
      'mes-config-ms.commandes-last': value
    });
  }
}
