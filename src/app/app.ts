import { Component, inject, signal } from '@angular/core';
import { Building } from './building';

@Component({
  selector: 'app-root',
  imports: [Building],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
