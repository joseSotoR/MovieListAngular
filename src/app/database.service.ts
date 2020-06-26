import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private _http: HttpClient) { }


  addMovie(movie) {
    return this._http.post('http://localhost:3000/movies', movie);
  }

  removeMovie(movie) {
    return this._http.delete('http://localhost:3000/movies/'+ movie.id)
  }

  getAllMovies() {
    return this._http.get('http://localhost:3000/movies');
  }
}
