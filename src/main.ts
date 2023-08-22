import { Component, OnInit } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  customOperator = pipe(
    tap((data) => console.log('tap ' + data)),
    filter((data) => data > 2),
    tap((data) => console.log('filter ' + data)),
    map((val) => {
      return (val as number) * 2;
    }),
    tap((data) => console.log('final ' + data))
  );

  obs = new Observable((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
    observer.complete();
  }).pipe(
    this.customOperator,
    tap((data) => console.log('final ' + data))
  );

  data = [];

  ngOnInit() {
    this.obs.subscribe((val) => {
      this.data.push(val);
      console.log(this.data);
    });
  }
}
