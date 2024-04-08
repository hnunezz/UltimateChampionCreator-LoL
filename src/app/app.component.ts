import { Component, OnInit, inject } from '@angular/core';
import { RequestService } from './shared/services/request.service';
import { CacheService } from './shared/services/cache-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private requestService = inject(RequestService);
  private cacheService = inject(CacheService);

  title = 'Ultimate Champion Creator';

  ngOnInit() {
    const storage_api_version = this.cacheService.get('api_version')
    if (!storage_api_version) {
      this.requestService.getVersion();
    }
  }
}
