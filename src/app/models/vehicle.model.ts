import { Make } from './make.model';
import { Model } from './model.model';

export interface Vehicle {
  id?: number;
  owner: string;
  vin: string;
  year: number;
  make: Make;
  model: Model;
}
