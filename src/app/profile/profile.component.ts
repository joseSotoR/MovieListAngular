import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { DataService } from '../data.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private dataService: DataService, private dataBaseService: DatabaseService) { }

  allMovies: any[];
  

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies() {
    this.dataBaseService.getAllMovies().subscribe((response: any[]) => {
      this.allMovies = response;
    })
  }

  removeMovie(movie) {
    this.dataBaseService.removeMovie(movie).subscribe(() => {
      this.getAllMovies();
    })
  }

  public sendMovie(movieData) {
    this.dataService.currentMovie.subscribe((movie: any[]) => {
      movie = movieData;
      this.dataService.changeMovie(movie);
      console.log(movie)
    });

  }

}
