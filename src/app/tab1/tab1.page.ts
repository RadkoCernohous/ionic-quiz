import { Component, OnInit } from '@angular/core';
import { CATEGORIES, CategoryOption, Difficulty } from '../models/types';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  categories: CategoryOption[] = CATEGORIES;
  amount = 10;
  categoryValue = 'any';
  difficulty: Difficulty = 'medium';

  isDarkMode = false;

  constructor(private settings: SettingsService) {
    const s = this.settings.getSettings();
    this.amount = s.amount;
    this.categoryValue = s.categoryValue;
    this.difficulty = s.difficulty;
  }

  onAmountChange() {
    this.settings.updateSettings({ amount: this.amount });
  }

  onCategoryChange() {
    this.settings.updateSettings({ categoryValue: this.categoryValue });
  }

  onDifficultyChange() {
    this.settings.updateSettings({ difficulty: this.difficulty });
  }


  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    this.isDarkMode = prefersDark.matches;
    this.setBodyDarkClass(this.isDarkMode);
  }

  toggleDarkTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.setBodyDarkClass(this.isDarkMode);
  }

  setBodyDarkClass(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}
