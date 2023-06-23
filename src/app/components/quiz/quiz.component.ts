import { Component } from '@angular/core';
import quizz_questions from 'src/assets/data/quizz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  title             : string = '';
  questions         : any;
  questionSelected  : any;
  answers           : string[] = [];
  answerSelected    : string = '';
  questionIndex     : number = 0;
  questionMaxIndex  : number = 0;
  finished          : boolean = false;

  constructor(){}

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  choose(value:string){
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex += 1;

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex];
    }else{
      const finalAnswer : string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, index, array)=>{
      if(array.filter(item => item === previous).length > array.filter(item => item === current).length){
        return previous;
      }else{
        return current;
      }
    })

    return result;
  }

}
