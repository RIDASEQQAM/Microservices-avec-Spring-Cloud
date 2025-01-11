import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:9999/api/commandes';

  constructor(private http: HttpClient) {}

  getAllCommandes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCommande(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCommande(commande: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, commande);
  }

  updateCommande(id: number, commande: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, commande);
  }

  deleteCommande(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  addProductToCommande(commandeId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${commandeId}/products`, {
      productId,
      quantity
    });
  }

  removeProductFromCommande(commandeId: number, productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${commandeId}/products/${productId}`);
  }
}
