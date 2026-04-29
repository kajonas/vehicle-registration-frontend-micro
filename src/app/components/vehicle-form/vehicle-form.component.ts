import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { VehicleService } from '../../services/vehicle.service';
import { Make } from '../../models/make.model';
import { Model } from '../../models/model.model';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  form: FormGroup;
  makes: Make[] = [];
  models: Model[] = [];
  vehicles: Vehicle[] = [];
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private fb: FormBuilder, private service: VehicleService) {
    this.form = this.fb.group({
      owner: ['', Validators.required],
      vin: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900)]],
      make: [null, Validators.required],
      model: [null, Validators.required]
    });
  }

  ngOnInit(): void {

    // Load the make list
    this.service.getMakes().subscribe(data => this.makes = data);
    this.form.get('make')?.valueChanges.subscribe(make => {
      this.models = [];
      if (make?.id) {
        this.service.getModels(make.id).subscribe(models => this.models = models);
      }
    });

    // load the list of existing Vehicles on startup
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.service.getVehicles().subscribe(data => {
      this.vehicles = data;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.service.saveVehicle(this.form.value).subscribe(v => {
        alert(`Vehicle saved with ID ${v.id}`);
        this.form.reset();
        this.loadVehicles(); // 👈 Refresh list after saving
      });
    }
  }

  paginatedVehicles(): Vehicle[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.vehicles.slice(start, end);
  }

  totalPages(): number {
    return Math.ceil(this.vehicles.length / this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }
}
