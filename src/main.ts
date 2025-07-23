import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

/**
 * Bootstrap the Angular application with the AppComponent
 */
bootstrapApplication(AppComponent)
  .catch(err => console.error('Error starting app:', err));