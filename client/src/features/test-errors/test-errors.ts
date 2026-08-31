import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
})
export class TestErrors {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  validationErrors = signal<string[]>([]);

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: (respose) => console.log(respose),
      error: (error) => console.log(error),
    });
  }
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: (respose) => console.log(respose),
      error: (error) => console.log(error),
    });
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: (respose) => console.log(respose),
      error: (error) => console.log(error),
    });
  }
  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: (respose) => console.log(respose),
      error: (error) => console.log(error),
    });
  }
  get400validationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: (respose) => console.log(respose),
      error: (error) => {
        this.validationErrors.set(error);
        console.log(error);
      },
    });
  }
}
