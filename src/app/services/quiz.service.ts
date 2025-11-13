import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Difficulty, Question, QuizSettings } from '../models/types';
import shuffle from 'shuffle-array';


// format Open Trivia DB API odpovedi
interface OpenTriviaResponse {
  response_code: number;
  results: Array<{
    category: string;
    type: 'multiple' | 'boolean';
    difficulty: Difficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }>;
}


@Injectable({ providedIn: 'root' })
export class QuizService {
  private readonly BASE_URL = 'https://opentdb.com/api.php'; // Open Trivia DB API

  constructor(private http: HttpClient) { }


  private buildUrl(settings: QuizSettings): string {
    const query = new URLSearchParams();
    query.set('amount', String(settings.amount));
    query.set('type', 'multiple');
    if (settings.categoryValue !== 'any') {
      query.set('category', settings.categoryValue);
    }
    query.set('difficulty', settings.difficulty);
    return `${this.BASE_URL}?${query.toString()}`; // parametry v URL
  }



  async fetchQuestions(settings: QuizSettings): Promise<Question[]> {
    const url = this.buildUrl(settings);
    const response = await fetch(url);
    const data: OpenTriviaResponse = await response.json();

    if (!data.results) {
      return [];
    }

    return data.results.map(result => {
      const question = this.decode(result.question);
      const correctAnswer = this.decode(result.correct_answer);
      const incorrectAnswers = result.incorrect_answers.map(a => this.decode(a));

      const answers = shuffle([...incorrectAnswers, correctAnswer]);

      return {
        question,
        answers,
        correctAnswer,
        categoryText: result.category,
        difficulty: result.difficulty
      };
    });
  }

  // Dekodovani HTML entit v otazkach a odpovedich (napr. &amp; -> &)
  private decode(text: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }
}
