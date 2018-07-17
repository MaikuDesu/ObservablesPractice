import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, observable, interval, Observer, Subscription} from 'rxjs';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = interval(1000);
    this.numberObsSubscription =
    myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

  //making the observable
   const myObservable = Observable.create((observer: Observer<string>)  => {
      setTimeout(() => {
        observer.next('first package');
   }, 2000); 
      setTimeout(() => {
        observer.next('second package');
   }, 4000); 
      setTimeout(() => {
      //  observer.next('this does not work');
      observer.complete();
   }, 5000); 
      setTimeout(() => {
      //  observer.next('this does not work');
      observer.next('third package');
   }, 6000); 

   });
  this.customObsSubscription = myObservable.subscribe(
    (data:string) => { console.log(data)},
    (error:string) => { console.log(error)},
    () => { console.log('completed')},
  );
  }

  ngOnDestroy(){
    this.numberObsSubscription.unsubscribe();
    this.numberObsSubscription.unsubscribe();
  }

}
