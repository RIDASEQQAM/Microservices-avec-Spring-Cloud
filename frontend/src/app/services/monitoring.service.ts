import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface HealthResponse {
  status: string;
  details?: {
    [key: string]: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private baseUrl = 'http://localhost:8085/api';

  constructor(private http: HttpClient) {}

  async checkServiceHealth(serviceName: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.get<HealthResponse>(`${this.baseUrl}/${serviceName}/actuator/health`)
      );
      return response?.status === 'UP';
    } catch {
      return false;
    }
  }

  simulateTimeout() {
    return firstValueFrom(
      this.http.get<any>(`${this.baseUrl}/simulate-timeout`)
    );
  }

  getServiceMetrics(serviceName: string) {
    return firstValueFrom(
      this.http.get<any>(`${this.baseUrl}/${serviceName}/actuator/metrics`)
    );
  }
}
