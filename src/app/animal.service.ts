import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiUrl = 'https://your-api.com/animals'; 

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<{ ownedAnimals: string[]; animalWishlist: string[] }> {
    return this.http.get<{ ownedAnimals: string[]; animalWishlist: string[] }>(this.apiUrl);
  }
}
