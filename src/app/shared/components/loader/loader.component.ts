import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  show = false;
  private subscription: Subscription | undefined;

  constructor(
    private loaderService: LoaderService
  ){}
  
  ngOnInit() {
    this.loaderSubscribe();
  }
  loaderSubscribe() {
    this.subscription = this.loaderService.loaderStateObservable.subscribe({
      next: (state: LoaderState) => {
        this.show = state.show;
      }
    });
  }
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
