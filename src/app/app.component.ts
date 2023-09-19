import { Component, OnInit } from '@angular/core';
import { RequestService } from './shared/services/request.service';
import { CacheService } from './shared/services/cache-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ultimate Champion Creator';

  constructor(private requestService: RequestService,
    private cacheService: CacheService) { }

  ngOnInit(): void {
    const storage_api_version = this.cacheService.get('api_version')
    if (!storage_api_version) {
      this.requestService.getVersion();
    }
  }
}
