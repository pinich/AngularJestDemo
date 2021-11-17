import { Component } from '@angular/core';
import { GitHubResponse } from './service/models';
import { MyServiceService } from './service/my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Jest App';

  username: string = '';

  repoNames: string[] = [];

  constructor(private service: MyServiceService) { }
  searchRepos() {

    this.service.getRemoteData(this.username).
      subscribe((results: GitHubResponse[]) => {
        this.repoNames = results.map(res=>res.name);
        console.log(results.length);
      });
  }
}
