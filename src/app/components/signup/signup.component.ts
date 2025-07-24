import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Signup component with modern ChatGPT-style design
 */
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @Output() signupSubmit = new EventEmitter<SignupData>();
  @Output() switchToSignin = new EventEmitter<void>();
  
  formData: SignupData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  errors: { [key: string]: string } = {};
  passwordStrength = 0;

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.validateForm()) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.signupSubmit.emit(this.formData);
        this.isLoading = false;
      }, 2000);
    }
  }

  /**
   * Validate form fields
   */
  private validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    // Name validation
    if (!this.formData.name.trim()) {
      this.errors['name'] = 'Full name is required';
      isValid = false;
    } else if (this.formData.name.trim().length < 2) {
      this.errors['name'] = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (!this.formData.email.trim()) {
      this.errors['email'] = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.formData.email)) {
      this.errors['email'] = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!this.formData.password) {
      this.errors['password'] = 'Password is required';
      isValid = false;
    } else if (this.formData.password.length < 8) {
      this.errors['password'] = 'Password must be at least 8 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!this.formData.confirmPassword) {
      this.errors['confirmPassword'] = 'Please confirm your password';
      isValid = false;
    } else if (this.formData.password !== this.formData.confirmPassword) {
      this.errors['confirmPassword'] = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  /**
   * Check if email is valid
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Calculate password strength
   */
  onPasswordChange(): void {
    this.calculatePasswordStrength();
  }

  private calculatePasswordStrength(): void {
    const password = this.formData.password;
    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;

    this.passwordStrength = Math.min(strength, 100);
  }

  /**
   * Get password strength label
   */
  getPasswordStrengthLabel(): string {
    if (this.passwordStrength < 25) return 'Weak';
    if (this.passwordStrength < 50) return 'Fair';
    if (this.passwordStrength < 75) return 'Good';
    return 'Strong';
  }

  /**
   * Get password strength color
   */
  getPasswordStrengthColor(): string {
    if (this.passwordStrength < 25) return '#ef4444';
    if (this.passwordStrength < 50) return '#f59e0b';
    if (this.passwordStrength < 75) return '#3b82f6';
    return '#10b981';
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggle confirm password visibility
   */
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /**
   * Switch to signin form
   */
  onSwitchToSignin(): void {
    this.switchToSignin.emit();
  }

  /**
   * Handle social signup
   */
  onSocialSignup(provider: string): void {
    console.log(`${provider} signup clicked`);
    // Handle social signup logic
  }
}