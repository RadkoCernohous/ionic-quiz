import { Component } from '@angular/core';
import { CATEGORIES, CategoryOption, Difficulty } from '../models/types';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  standalone: false,
})
export class Tab1Page {
  categories: CategoryOption[] = CATEGORIES;

  amount = 10;
  categoryValue = 'any';
  difficulty: Difficulty = 'medium';

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
}
