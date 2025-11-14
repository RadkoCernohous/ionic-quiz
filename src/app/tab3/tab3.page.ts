import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { QuizResult } from '../models/types';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  results: QuizResult[] = [];

  constructor(
    private resultsService: ResultsService,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    this.results = await this.resultsService.getResults();
  }

  async deleteAll() {
    const alert = await this.alertCtrl.create({
      header: 'Delete all results?',
      message: 'This action cannot be undone.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete All',
          role: 'destructive',
          handler: async () => {
            await this.resultsService.clearAll();
            this.results = [];
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteOne(result: QuizResult) {
    const alert = await this.alertCtrl.create({
      header: 'Delete this result?',
      message: `${result.categoryText} • ${result.difficulty.toUpperCase()} • ${result.successPercent}%`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            await this.resultsService.removeById(result.id);
            this.results = this.results.filter(r => r.id !== result.id);
          }
        }
      ],
      cssClass: 'my-alert'
    });

    await alert.present();
  }

  async filterResults(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.results = await this.resultsService.getResults();
    if (searchTerm && searchTerm.trim() !== '') {
      this.results = this.results.filter(result =>
        result.categoryText.toLowerCase().includes(searchTerm)
      );
    }
  }
}
