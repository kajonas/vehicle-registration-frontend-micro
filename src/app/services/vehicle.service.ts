import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Make } from '../models/make.model';
import { Model } from '../models/model.model';
import { Vehicle } from '../models/vehicle.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private baseUrlCatalog = `${environment.apiBaseUrl}/catalog`;
  private baseUrlVehicle = `${environment.apiBaseUrl}/vehicle`;

  constructor(private http: HttpClient) {}

  getMakes(): Observable<Make[]> {
    return this.http.get<Make[]>(`${this.baseUrlCatalog}/makes`);
  }

  getModels(makeId: number): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.baseUrlCatalog}/models/${makeId}`);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrlVehicle}/vehicles`);
  }

  saveVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrlVehicle}/save`, vehicle);
  }
}
