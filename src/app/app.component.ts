import { RequestService } from './shared/services/request.service';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Champions } from './shared/models/champions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ultimate Champion Creator';

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.getVersion()
  }
}
