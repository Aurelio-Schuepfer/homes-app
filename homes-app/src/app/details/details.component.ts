import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
    <img
  *ngIf="housingLocation?.photo"
  class="listing-photo"
  [src]="housingLocation?.photo"
  (error)="handleImageError()"
  alt="Exterior photo of {{housingLocation?.name}}"
  
/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2> 
        <p class="listing-location">{{housingLocation?.city}} {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this location</h2>
        <ul> 
          <li>Units Available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this Location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article> 
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl("")
  });

  housingLocation?: HousingLocation;
  route = inject(ActivatedRoute);
  housingService = inject(HousingService);

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
      console.log('photo url:', this.housingLocation?.photo); // Jetzt wird es im Promise-Block ausgeführt
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? "",
    );
  }

  handleImageError() {
    if (this.housingLocation) {
      this.housingLocation.photo = 'assets/fallback.jpg';
    }
  }
}

