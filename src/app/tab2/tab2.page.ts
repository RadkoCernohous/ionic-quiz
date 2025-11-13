import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Question, QuizResult } from '../models/types';
import { SettingsService } from '../services/settings.service';
import { QuizService } from '../services/quiz.service';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  standalone: false,
})
export class Tab2Page {
  isLoading = false;
  error?: string;

  questions: Question[] = [];
  index = 0;
  correct = 0;

  get total() {
    return this.questions.length;
  }

  get current(): Question | null {
    if (this.index < 0 || this.index >= this.questions.length) {
      return null;
    }
    return this.questions[this.index];
  }


  constructor(
    private settings: SettingsService,
    private quiz: QuizService,
    private results: ResultsService,
    private router: Router
  ) { }

  async startQuiz() {
    this.isLoading = true; this.error = undefined;
    try {
      const s = this.settings.getSettings();
      this.questions = await this.quiz.fetchQuestions(s);
      this.index = 0;
      this.correct = 0;

      if (!this.questions.length) {
        this.error = 'Could not load questions. Please try different settings.';
      }
    } catch (e) {
      this.error = 'Failed to load questions.';
    } finally {
      this.isLoading = false;
    }
  }

  async choose(answer: string) {
    const q = this.current;
    if (q === null){
      return;
    }

    if (answer === q.correctAnswer) {
      this.correct++;
    }
    this.index++;

    if (this.index >= this.total) {
      await this.finish();
    }
  }

  private async finish() {
    const first = this.questions[0]; // pro ziskani kategorie a obtiznosti
    if (!first) return;

    const result: QuizResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      categoryText: first.categoryText,
      difficulty: first.difficulty,
      correct: this.correct,
      total: this.total,
      successPercent: Math.round((this.correct / this.total) * 100),
    };

    console.log('Quiz finished, result:', result);

    await this.results.addResult(result);
    this.router.navigate(['/tabs/tab3']);
  }
}
