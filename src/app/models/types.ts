// nasaveni kvizu, z ektereho se sklada query pro API
export type Difficulty = 'easy' | 'medium' | 'hard';
export interface QuizSettings {
  amount: number;        // 5–15
  categoryValue: string; // list viz nize
  difficulty: Difficulty;
  type: 'multiple';      // vzdy budou multiple choice otazky
}

// struktura otazky
export interface Question {
  question: string;
  answers: string[];       // promichane moznosti
  correctAnswer: string;
  categoryText: string;
  difficulty: Difficulty;
}

// vysledek kvizu pro ukladani do historie
export interface QuizResult {
  id: string;               // UUID
  date: string;            // ISO
  categoryText: string;     // nazev kategorie jako text, ne cislo
  difficulty: Difficulty;
  correct: number;         
  total: number;      
  successPercent: number;  // 0–100 - correct / total * 100
}



export interface CategoryOption {
  value: string;
  text: string;
}

export const CATEGORIES: CategoryOption[] = [
  { value: 'any', text: 'Any Category' },
  { value: '9', text: 'General Knowledge' },
  { value: '10', text: 'Entertainment: Books' },
  { value: '11', text: 'Entertainment: Film' },
  { value: '12', text: 'Entertainment: Music' },
  { value: '13', text: 'Entertainment: Musicals & Theatres' },
  { value: '14', text: 'Entertainment: Television' },
  { value: '15', text: 'Entertainment: Video Games' },
  { value: '16', text: 'Entertainment: Board Games' },
  { value: '17', text: 'Science & Nature' },
  { value: '18', text: 'Science: Computers' },
  { value: '19', text: 'Science: Mathematics' },
  { value: '20', text: 'Mythology' },
  { value: '21', text: 'Sports' },
  { value: '22', text: 'Geography' },
  { value: '23', text: 'History' },
  { value: '24', text: 'Politics' },
  { value: '25', text: 'Art' },
  { value: '26', text: 'Celebrities' },
  { value: '27', text: 'Animals' },
  { value: '28', text: 'Vehicles' },
  { value: '29', text: 'Entertainment: Comics' },
  { value: '30', text: 'Science: Gadgets' },
  { value: '31', text: 'Entertainment: Japanese Anime & Manga' },
  { value: '32', text: 'Entertainment: Cartoon & Animations' }
];
