import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChatConversation {
  id: string;
  title: string;
}

/**
 * Chat history component for left sidebar
 * Displays conversation history in ChatGPT style
 */
@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {
  
  @Input() isCollapsed: boolean = false;
  @Output() toggleCollapse = new EventEmitter<void>();  
  @Output() pipelineList = new EventEmitter<void>();
  @Output() newChatClicked = new EventEmitter<void>();
  
  chatConversations: ChatConversation[] = [
    { id: '1', title: 'Java 24 new features' },
    { id: '2', title: 'Tailwind CSS in Ionic' },
    { id: '3', title: 'CICD pipeline assistance' },
    { id: '4', title: 'Q-A pair for node js course project' },
    { id: '5', title: 'Async File Operations FAQs' },
    { id: '6', title: 'Prompt Structuring Best Practices' },
    { id: '7', title: 'Basic Sign In Page' },
    { id: '8', title: '2D-3D animation' },
    { id: '9', title: 'Angular component architecture' },
    { id: '10', title: 'TypeScript best practices' }
  ];

  ngOnInit(): void {
    // Component initialization
  }

  /**
   * Handle new chat creation
   */
  createNewChat(): void {
    this.newChatClicked.emit();
  }

  /**
   * Handle chat search
   */
  searchChats(): void {
    console.log('Searching chats...');
    // Handle search logic
  }

  /**
   * Handle conversation selection
   */
  selectConversation(conversation: ChatConversation): void {
    console.log('Selected conversation:', conversation.title);
    // Handle conversation selection logic
  }

  /**
   * Track by function for ngFor performance
   */
  trackByConversation(index: number, conversation: ChatConversation): string {
    return conversation.id;
  }

  openPipelineList(): void {    
    this.pipelineList.emit();
  }

  
}