import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface ServiceConfig {
  timeoutEnabled: boolean;
  timeoutDuration: number;
  retryAttempts: number;
  metricsEnabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private baseUrl = 'http://localhost:8085/api';

  constructor(private http: HttpClient) {}

  async getConfig(): Promise<ServiceConfig> {
    try {
      return await firstValueFrom(
        this.http.get<ServiceConfig>(`${this.baseUrl}/config`)
      );
    } catch (error) {
      console.error('Error fetching config:', error);
      throw error;
    }
  }

  async updateConfig(config: ServiceConfig): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post<void>(`${this.baseUrl}/config`, config)
      );
    } catch (error) {
      console.error('Error updating config:', error);
      throw error;
    }
  }
}
