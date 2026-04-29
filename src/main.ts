import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { VehicleFormComponent } from './app/components/vehicle-form/vehicle-form.component';

bootstrapApplication(VehicleFormComponent, {
  providers: [
    provideHttpClient(withFetch())
  ]
}).catch(err => console.error(err));
