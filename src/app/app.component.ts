import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { Post } from './post.model';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  loadedPosts = [];
  id: string =''
  title: string =''
  content:string =''
  showLoading = false
  error = null

  constructor(private http: HttpClient, private postService : PostService) {}

  ngOnInit() {
    this.onFetchPosts()
  }

  onCreatePost(postData: Post) {
    this.postService.createAndPost(postData)
  }

  onUpdatePost() {
    const updatedData = {
      [this.id!]: {
        title: this.title,
        content : this.content
      }
    }
    this.postService.updatePost(updatedData)
  }


  onFetchPosts() {
    this.showLoading = true
    this.postService.fetchPosts()
      .subscribe(
        (data) => {
          this.showLoading = false
          this.loadedPosts = data
        },
        (err) => {
          console.log(err);
          this.error = err
        }
      )
  }

  onClearPosts() {
    this.showLoading = true
    this.postService.deletePosts()
    .subscribe(
      (data) => {
        this.showLoading = false
        this.loadedPosts = []
      }
    )
  }

  getDataById(id) {
    this.fetchPostById(id)
  }

  fetchPostById(post) {
    this.id = post.id
    this.content = post.content
    this.title = post.title
  }


}
