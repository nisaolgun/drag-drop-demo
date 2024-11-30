import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DragDropModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  newAnimal: string = '';
  ownedAnimals = [
    "Dog",
    "Cat",
    "Fish",
    "Turtle"
  ];

  animalWishlist = [
    "Rabbit",
    "Parrot",
    "Hamster",
    "Lizard"
  ];

  favorites: string[] = [];
  showModal: boolean = false;
  modalAnimal: any = {};
  searchOwned: string = '';
  searchWishlist: string = '';

  getAnimalEmoji(animal: string): string {
    const emojis: { [key: string]: string } = {
      'Dog': '🐶',
      'Cat': '🐱',
      'Fish': '🐟',
      'Turtle': '🐢',
      'Rabbit': '🐰',
      'Parrot': '🦜',
      'Hamster': '🐹',
      'Lizard': '🦎'
    };
    return emojis[animal] || '🐾';
  }

  getAnimalDetails(animal: string) {
    const animalDetails: { [key: string]: { name: string, details: string } } = {
      'Dog': { name: 'Dog', details: 'Dogs are loyal and friendly animals.' },
      'Cat': { name: 'Cat', details: 'Cats are independent and love to be pampered.' },
      'Fish': { name: 'Fish', details: 'Fish live in water and have scales.' },
      'Turtle': { name: 'Turtle', details: 'Turtles are reptiles known for their shells.' },
      'Rabbit': { name: 'Rabbit', details: 'Rabbits are small mammals and are often kept as pets.' },
      'Parrot': { name: 'Parrot', details: 'Parrots are known for their ability to mimic human speech.' },
      'Hamster': { name: 'Hamster', details: 'Hamsters are small, nocturnal rodents.' },
      'Lizard': { name: 'Lizard', details: 'Lizards are cold-blooded reptiles with long tails.' }
    };
    return animalDetails[animal] || { name: animal, details: 'No details available.' };
  }

  ngOnInit() {
    const storedOwnedAnimals = localStorage.getItem('ownedAnimals');
    const storedAnimalWishlist = localStorage.getItem('animalWishlist');
    const storedFavorites = localStorage.getItem('favorites');

    if (storedOwnedAnimals) {
      this.ownedAnimals = JSON.parse(storedOwnedAnimals);
    }
    if (storedAnimalWishlist) {
      this.animalWishlist = JSON.parse(storedAnimalWishlist);
    }
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  ngOnChanges() {
    localStorage.setItem('ownedAnimals', JSON.stringify(this.ownedAnimals));
    localStorage.setItem('animalWishlist', JSON.stringify(this.animalWishlist));
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  get filteredOwnedAnimals() {
    return this.ownedAnimals.filter(animal =>
      animal.toLowerCase().includes(this.searchOwned.toLowerCase())
    );
  }

  get filteredAnimalWishList() {
    return this.animalWishlist.filter(animal =>
      animal.toLowerCase().includes(this.searchWishlist.toLowerCase())
    );
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  addToOwned(animal: string) {
    this.animalWishlist = this.animalWishlist.filter(item => item !== animal);
    this.ownedAnimals.push(animal);
  }

  removeFromOwned(animal: string) {
    this.ownedAnimals = this.ownedAnimals.filter(item => item !== animal);
    this.animalWishlist.push(animal);
  }

  addAnimal() {
    if (this.newAnimal.trim() && !this.animalWishlist.includes(this.newAnimal.trim())) {
      this.animalWishlist.push(this.newAnimal.trim());
      this.newAnimal = '';
    } else {
      alert('Lütfen geçerli bir hayvan adı girin ve aynı hayvanı birden fazla kez eklemeyin!');
    }
  }

  toggleFavorite(animal: string) {
    if (this.favorites.includes(animal)) {
      this.removeFromFavorites(animal);
    } else {
      this.addToFavorites(animal);
    }
  }

  openModal(animal: string) {
    this.modalAnimal = this.getAnimalDetails(animal);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addToFavorites(animal: string) {
    if (!this.favorites.includes(animal)) {
      this.favorites.push(animal);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  removeFromFavorites(animal: string) {
    this.favorites = this.favorites.filter(item => item !== animal);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  searchByCategory(category: string) {
    return this.ownedAnimals.filter(animal =>
      animal.toLowerCase().includes(category.toLowerCase())
    );
  }
}
