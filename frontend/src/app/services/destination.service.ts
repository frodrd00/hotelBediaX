import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { destination } from '../models/destination';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private apiUrl = 'http://localhost:5000/api/destination';

  constructor(private http: HttpClient) {}

  createDestination(destination: destination): Observable<destination> {
    return this.http.post<destination>(this.apiUrl, destination);
  }

  editDestination(destination: destination): Observable<destination> {
    return this.http.patch<destination>(
      `${this.apiUrl}/${destination._id}`,
      destination
    );
  }

  deleteDestination(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDestinations(): Observable<destination[]> {
    return this.http.get<destination[]>(this.apiUrl);
  }
}
