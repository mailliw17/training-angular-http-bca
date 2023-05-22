import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { Post } from './post.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  endPointURL:string = 'https://angular-training-bli-default-rtdb.asia-southeast1.firebasedatabase.app/'
  postURL: string = this.endPointURL+'post.json'
  loadedPosts = [];
  id: string =''
  title: string =''
  content:string =''
  showLoading = false

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);

    this.http.post(this.postURL, postData).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  onUpdatePost() {
    const updatedData = {
      [this.id!]: {
        title: this.title,
        content : this.content
      }
    }

    console.log(updatedData);

    this.http.patch(this.postURL, updatedData).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }


  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  getDataById(id) {
    this.fetchPostById(id)
  }

  private fetchPosts() {
    // [key:string] utk inisialisasi key index : tipeData key (index signature typescript)
    this.showLoading = true
    this.http.get<{[key:string] : Post}>(this.postURL)
    .pipe(
      map(
        (data) => {
          const postArray = []
          for(const key in data) {
            if(data.hasOwnProperty(key)) {
              postArray.push(
                {
                  // ... itu artinya semua data dijadikan sebuah object
                  ...data[key], 
                  id:key,
                  // owner: 'William'
                }
              )
            }
          }
          return  postArray
        }
      )
    )
    .subscribe(
      (data) => {
        this.showLoading = false
        this.loadedPosts = data
        console.log(data);
      }
    )
  }

  private fetchPostById(post) {
    this.id = post.id
    this.content = post.content
    this.title = post.title
  }


}
