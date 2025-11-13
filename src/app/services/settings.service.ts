import { Injectable } from '@angular/core';
import { CATEGORIES, Difficulty, QuizSettings } from '../models/types';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private settings: QuizSettings = {
    amount: 10,
    categoryValue: 'any',
    difficulty: 'medium',
    type: 'multiple',
  };

  getSettings(): QuizSettings {
    return this.settings;
  }

  updateSettings(newSettings: Partial<QuizSettings>) {
    this.settings = { ...this.settings, ...newSettings };
  }

  printSettings() {
    console.log(this.settings);
  }

  getCategoryText(): string {
    const category = this.settings.categoryValue;

    if (category === 'any') {
      return 'Mixed Categories';
    }

    const categoryOption = CATEGORIES.find(cat => cat.value === category);
    if (categoryOption) {
      return categoryOption.text;
    } 

    return 'Unknown Category';
  }
}
