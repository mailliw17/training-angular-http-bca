import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  endPointURL:string = 'https://angular-training-bli-default-rtdb.asia-southeast1.firebasedatabase.app/'
  postURL: string = this.endPointURL+'post.json'

  constructor(private http: HttpClient) { } 

  createAndPost(postData : Post) {
    this.http.post<{name:string}>(this.postURL, postData)
      .subscribe(
        (data) => {
          console.log(data);
        }
      )
  }

  updatePost(updatedData) {
    this.http.patch(this.postURL, updatedData).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  fetchPosts() {
    // [key:string] utk inisialisasi key index : tipeData key (index signature typescript)
    return this.http.get<{[key:string] : Post}>(this.postURL)
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
                }
              )
            }
          }
          return  postArray
        }
      )
    )
  }

  deletePosts() {
    return this.http.delete(this.postURL)
  }
}
