import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private apiService: ApiService) {}
  title = 'frontend-test-app';
  $users: Observable<any>;
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
  ngOnInit() {
    this.$users = this.apiService.getUsers();
  }

  onSubmit() {
    this.apiService.createUser(this.profileForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.$users = this.apiService.getUsers();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
