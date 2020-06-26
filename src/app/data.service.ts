import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API_SERVER = 'http://www.omdbapi.com/?'
  private API_KEY = 'f12ba140'

  private movieSource = new BehaviorSubject([]);
  currentMovie = this.movieSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  public changeMovie(movie: any[]) {
    this.movieSource.next(movie);
  }

  public sendGetRequest(name) {
    return this.httpClient.get(this.API_SERVER + 't=' + name + '&apikey=' + this.API_KEY);
  }

  public getImage(urlImage: string): Observable<Blob> {
    return this.httpClient.get(urlImage, { responseType: 'blob' });
  }
}
