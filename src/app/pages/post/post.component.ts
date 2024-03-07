import { Component, inject, signal } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post, ResListAllPosts } from '../../interfaces/res-list-all-posts';
import { FormatFechaPipe } from '../../pipe/format-fecha.pipe';
import { Mensaje } from '../../interfaces/mensaje';
import { UserClass } from '../../interfaces/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormatFechaPipe, ReactiveFormsModule, CommonModule, FormsModule, InfiniteScrollModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  form: FormGroup = new FormGroup({});
  editarForm: FormGroup = new FormGroup({});
  private fb: FormBuilder = new FormBuilder();
  private _post: PostService = inject(PostService);
  _services: ServiceService = inject(ServiceService);

  arrayPosts:Post[] = [];
  dataUsuario: UserClass | undefined;
  filtro:string = '';
  private actualPage: number = 1;
  private finishPage: number = 10;
  private totalPase: number = 1;

  ngOnInit() {
    const dataUser = localStorage.getItem('dataUser') || '';
    if (dataUser != '') {
      this.dataUsuario = JSON.parse(dataUser);
    }
    this.form = this.fb.group({
      Title: ['', [Validators.required]],
      Content: ['', [Validators.required]],
      userId: [this.dataUsuario?._id],
    });

    this.editarForm = this.fb.group({
      Title: ['', [Validators.required]],
      Content: ['', [Validators.required]],
    });
    this.showPosts();
  }

  showPosts() {
    this._post.getAllPost(this.actualPage, this.finishPage, this.filtro).subscribe((res: ResListAllPosts) => {
      console.log(res);
      const array = res.post.map(x => ({...x, update: false}));
      this.totalPase = res.totalPage;
      this.actualPage = res.page;
      this.arrayPosts.push(...array);
      console.log(this.arrayPosts);
    });
  }

  filtroPost() {
    this.arrayPosts = [];
    this.showPosts();
  }

  like(post:Post) {
    this._post.likePost(post._id).subscribe((res:Mensaje) => {
      post.Likes += 1;
    });
  }

  savePost(event:any) {
    this._services.addLoading(event.target);
    const data = this.form.getRawValue();
    this._post.savePost(data).subscribe((res: Post) => {
      const dataU = { 
        FullName: this.dataUsuario ? this.dataUsuario.FullName : '', 
        Email: this.dataUsuario ? this.dataUsuario.Email : '', 
        _id: this.dataUsuario ? this.dataUsuario._id : '' 
      };
      const dataPost = { ...res, user: dataU };
      this.form.reset();
      this.arrayPosts.unshift(dataPost);
      this._services.removeLoading(event.target);
    });
  }

  editarPost(post: Post) {
    console.log(post);
    this.editarForm.reset();
    this.editarForm.controls['Title'].setValue(post.Title);
    this.editarForm.controls['Content'].setValue(post.Content);
    post.update = true;
  }

  updatePost(event:any, post: Post) {
    this._services.addLoading(event.target);
    const data = this.editarForm.getRawValue();
    this._post.updatePost(data, post._id).subscribe((res:Mensaje) => {
      post.Content = data.Content;
      post.Title = data.Title;
      post.update = false;
      console.log(post);
      this._services.removeLoading(event.target);
    });
  }

  eliminarPost(event:any, post: Post) {
    this._services.addLoading(event.target);
    this._post.deletePost(post._id).subscribe((res:Mensaje) => {
      this._services.removeLoading(event.target);
      this.showPosts();
    })
  }

  onScroll() {
    if (this.actualPage < this.totalPase) {
      this.actualPage ++;
      this.showPosts();
    } else {
      console.log('No more lines. Finish page!');
    }
  }
  
}
