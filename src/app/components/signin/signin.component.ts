import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SigninData {
  username: string;
  password: string;
}

/**
 * Signin component with modern ChatGPT-style design
 */
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  @Output() signinSubmit = new EventEmitter<SigninData>();
  @Output() switchToSignup = new EventEmitter<void>();
  
  formData: SigninData = {
    username: '',
    password: ''
  };
  
  isLoading = false;
  showPassword = false;
  errors: { [key: string]: string } = {};

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.validateForm()) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.signinSubmit.emit(this.formData);
        this.isLoading = false;
      }, 1500);
    }
  }

  /**
   * Validate form fields
   */
  private validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.formData.username.trim()) {
      this.errors['username'] = 'Username is required';
      isValid = false;
    }

    if (!this.formData.password) {
      this.errors['password'] = 'Password is required';
      isValid = false;
    } else if (this.formData.password.length < 6) {
      this.errors['password'] = 'Password must be at least 6 characters';
      isValid = false;
    }

    return isValid;
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Switch to signup form
   */
  onSwitchToSignup(): void {
    this.switchToSignup.emit();
  }

  /**
   * Handle social login
   */
  onSocialLogin(provider: string): void {
    console.log(`${provider} login clicked`);
    // Handle social login logic
  }
}