import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Question, QuizResult } from '../models/types';
import { SettingsService } from '../services/settings.service';
import { QuizService } from '../services/quiz.service';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  isLoading = false;
  error?: string;

  questions: Question[] = [];
  index = 0;
  correct = 0;

  selectedAnswer: string | null = null;

  get total() { return this.questions.length; }
  get current(): Question | null { return this.questions[this.index] ?? null; }

  constructor(
    private settings: SettingsService,
    private quiz: QuizService,
    private results: ResultsService,
    private router: Router
  ) {}

  async startQuiz() {
    this.isLoading = true; this.error = undefined;
    try {
      const s = this.settings.getSettings();
      this.questions = await this.quiz.fetchQuestions(s);
      this.index = 0;
      this.correct = 0;
      this.selectedAnswer = null;

      if (!this.questions.length) {
        this.error = 'No questions returned for this configuration.';
      }
    } catch {
      this.error = 'Failed to load questions.';
    } finally {
      this.isLoading = false;
    }
  }

  choose(answer: string) {
    if (!this.current || this.selectedAnswer) return; 

    this.selectedAnswer = answer;

    if (answer === this.current.correctAnswer) {
      this.correct++;
    }
  }

  async next() {
    if (!this.current || this.selectedAnswer === null) return;

    this.index++;
    this.selectedAnswer = null;

    if (this.index >= this.total) {
      await this.finish();
    }
  }

  getAnswerColor(answer: string): string {
    if (this.selectedAnswer === null) {
      return 'primary';
    }

    const correctAnswer = this.current?.correctAnswer;

    if (answer === correctAnswer) {
      return 'success';
    }
    if ((answer === this.selectedAnswer) && (answer !== correctAnswer)) {
      return 'danger';
    }
    return 'medium';
  }

  private async finish() {
    const result: QuizResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      categoryText: this.settings.getCategoryText(),
      difficulty: this.settings.getSettings().difficulty,
      correct: this.correct,
      total: this.total,
      successPercent: Math.round((this.correct / this.total) * 100),
    };

    await this.results.addResult(result);
    this.router.navigate(['/tabs/tab3']);
  }
}