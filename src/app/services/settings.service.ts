import { Injectable } from '@angular/core';
import { Difficulty, QuizSettings } from '../models/types';

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
}
