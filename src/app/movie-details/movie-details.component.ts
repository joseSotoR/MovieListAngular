import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private dataService: DataService, private dataBaseService: DatabaseService) { }


  movieData: any[];

  isInFavorites: boolean;

  isImageLoading: boolean;
  imageToShow: any;
  imageUrl: string;

  ngOnInit(): void {
    this.dataService.currentMovie.subscribe(movie => {
      this.checkIfFavorite(movie['imdbID']);
      this.movieData = movie;
      this.imageUrl = movie['Poster'];
      this.getImageFromService();
    });
  }

  public checkIfFavorite(id) {
    this.dataBaseService.getAllMovies().subscribe((data: any[]) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i]['imdbID'] == id) {
          this.isInFavorites = true;
          break;
        }
      }

    })
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService() {
    this.isImageLoading = true;
    this.dataService.getImage(this.imageUrl).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  addToFavorites() {
    this.dataBaseService.addMovie(this.movieData).subscribe((response) => {
      this.isInFavorites = true;
      console.log("movie added")
    })
  }

}
