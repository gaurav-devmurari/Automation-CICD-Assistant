import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Code editor component for right drawer
 * Simple code editor with execution simulation
 */
@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  @Output() codeExecuted = new EventEmitter<string>();
  
  code = '';
  output = '';
  isExecuting = false;

  ngOnInit(): void {
    // Pre-fill with dummy JavaScript code
    this.code = `function greet() {
    console.log('Hello, World!');
}

greet();

// Try modifying this code!
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Doubled numbers:', doubled);`;
  }

  /**
   * Execute code simulation
   */
  runCode(): void {
    if (!this.code.trim()) {
      this.output = 'Error: No code to execute!';
      return;
    }

    this.isExecuting = true;
    this.output = 'Executing code...';

    setTimeout(() => {
      this.simulateCodeExecution();
      this.isExecuting = false;
      this.codeExecuted.emit(this.code);
    }, 1000);
  }

  /**
   * Simulate code execution
   */
  private simulateCodeExecution(): void {
    const outputs: string[] = [];
    
    if (this.code.includes('greet()')) {
      outputs.push('Hello, World!');
    }
    
    if (this.code.includes('doubled')) {
      outputs.push('Doubled numbers: [2, 4, 6, 8, 10]');
    }
    
    if (this.code.includes('console.log')) {
      const logCount = (this.code.match(/console\.log/g) || []).length;
      if (outputs.length === 0) {
        outputs.push(`Executed ${logCount} console.log statement(s)`);
      }
    }
    
    if (outputs.length === 0) {
      outputs.push('Code executed successfully!');
    }
    
    outputs.push('\n✅ Execution completed');
    this.output = outputs.join('\n');
  }

  /**
   * Clear code editor
   */
  clearCode(): void {
    this.code = '';
    this.output = '';
  }

  /**
   * Reset to default code
   */
  resetCode(): void {
    this.ngOnInit();
    this.output = '';
  }

  /**
   * Handle tab key for indentation
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      this.code = this.code.substring(0, start) + '  ' + this.code.substring(end);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
    }
  }

  /**
   * Get line numbers for display
   */
  getLineNumbers(): number[] {
    const lineCount = this.code.split('\n').length;
    return Array.from({ length: Math.max(lineCount, 15) }, (_, i) => i + 1);
  }
}