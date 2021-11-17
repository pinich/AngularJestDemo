import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitHubResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }

  getRemoteData(username: string): Observable<GitHubResponse[]> {
    return this.http.get<[GitHubResponse]>(`https://api.github.com/users/${username}/repos`);
  }
}
