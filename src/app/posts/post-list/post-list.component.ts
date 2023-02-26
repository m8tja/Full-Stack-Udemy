import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs"
import { AuthService } from "src/app/auth/auth.service";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  isLoading = false
  userIsAuthenticated = false
  userId: string
  totalPosts = 0
  currentPage = 1
  postsPerPage = 2
  pageSizeOptions = [1, 2, 5, 10]

  private postsSub: Subscription
  private authStatusSub: Subscription

  constructor(public postsService: PostsService, private authService: AuthService) {}

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
    this.isLoading = true
    this.userId = this.authService.getUserId()
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false
        this.totalPosts = postData.postCount
        this.posts = postData.posts
      })

    this.userIsAuthenticated = this.authService.getIsAuth()

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
        this.userId = this.authService.getUserId()
      })
  }

  onDelete(postId: string) {
    this.isLoading = true
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage)
    }, () => {
      this.isLoading = false
    })
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true
    this.currentPage = pageData.pageIndex + 1
    this.postsPerPage = pageData.pageSize
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe()
    this.authStatusSub.unsubscribe()
  }
}
