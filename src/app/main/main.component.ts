import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private dataService: DataService, private dataBaseService: DatabaseService) { }

  movieName: string;
  movieData: any[];

  isInFavorites: boolean;

  imageToShow: any;
  isImageLoading: boolean;
  imageUrl: string;

  ngOnInit(): void {
  }



  addToFavorites() {
    this.dataBaseService.addMovie(this.movieData).subscribe((response) => {
      this.isInFavorites = true;
      console.log("movie added")
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


  public sendGetRequest() {
    this.isInFavorites = false;
    this.dataService.sendGetRequest(this.movieName).subscribe((data: any[]) => {
      if (data.hasOwnProperty('Title')) {
        this.movieData = data;
        this.imageUrl = data['Poster']
        this.getImageFromService();
        console.log("asasasaasasa");
        this.checkIfFavorite(data['imdbID']);
      }
      else {
        this.movieData = null;
      }
    })
  }

  public getName() {

    this.movieName = ((document.getElementById("nameBox") as HTMLInputElement).value);
    this.sendGetRequest();
  }

  public sendMovie() {
    this.dataService.currentMovie.subscribe(movie => {
      movie = this.movieData;
      this.dataService.changeMovie(movie);
      console.log(movie)
    });

  }

}
