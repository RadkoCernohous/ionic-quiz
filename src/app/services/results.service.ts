import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { QuizResult } from '../models/types';

const RESULTS_KEY = 'quiz_results'; // klic pro ulozeni vysledku v Preferences

@Injectable({ providedIn: 'root' })
export class ResultsService {

  async getResults(): Promise<QuizResult[]> {
    const { value } = await Preferences.get({ key: RESULTS_KEY });
    if (!value) return [];
    try { 
      return JSON.parse(value) as QuizResult[]; 
    } catch { return []; }
  }

  async addResult(newResult: QuizResult): Promise<void> {
    const currentResults = await this.getResults();
    currentResults.unshift(newResult);
    await Preferences.set({ key: RESULTS_KEY, value: JSON.stringify(currentResults) });
  }

  async clearAll(): Promise<void> {
    await Preferences.remove({ key: RESULTS_KEY });
  }

  async removeById(id: string): Promise<void> {
    const all = await this.getResults();
    const next = all.filter(r => r.id !== id);
    await Preferences.set({
      key: RESULTS_KEY,
      value: JSON.stringify(next),
    });
  }
}
