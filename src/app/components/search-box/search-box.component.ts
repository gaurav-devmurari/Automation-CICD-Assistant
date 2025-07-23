import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * ChatGPT-style search box component
 * Auto-expanding textarea with send button
 */
@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements AfterViewInit {
  @Output() messageSent = new EventEmitter<string>();
  @Input() hasMessages = false;
  @ViewChild('textareaRef') textareaRef!: ElementRef<HTMLTextAreaElement>;
  
  message = '';

  ngAfterViewInit(): void {
    this.adjustTextareaHeight();
  }

  /**
   * Handle key press events
   */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Shift + Enter: Allow new line
        return;
      } else {
        // Enter: Send message
        event.preventDefault();
        this.sendMessage();
      }
    }
  }

  /**
   * Handle input changes and adjust height
   */
  onInput(): void {
    this.adjustTextareaHeight();
  }

  /**
   * Adjust textarea height based on content
   */
  private adjustTextareaHeight(): void {
    if (this.textareaRef) {
      const textarea = this.textareaRef.nativeElement;
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }

  /**
   * Send message and reset input
   */
  sendMessage(): void {
    if (this.message.trim()) {
      this.messageSent.emit(this.message.trim());
      this.message = '';
      setTimeout(() => this.adjustTextareaHeight(), 0);
    }
  }
}