import { Component, inject, input, Input, output } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountSevice } from '../../../core/services/account-sevice';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService = inject(AccountSevice);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  register() {
    this.accountService.register(this.creds).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => console.log(error),
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
