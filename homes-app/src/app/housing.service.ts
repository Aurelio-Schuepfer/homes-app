import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HousingService {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  url = "http://localhost:3000/locations"
 
  constructor() { }

  async getAllHousingLocations() : Promise<HousingLocation[]>
  {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined>
  {
    const data = await fetch(`${this.url}/${id}`);
    if (!data.ok) return undefined;
    const location = await data.json();
    if (!location || location.id === undefined) return undefined;
    return location;
  }

  submitApplication(firstName: string, lastName:string, email:string)
  {
    console.log(firstName, lastName, email);
  }
}
