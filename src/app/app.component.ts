import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchBoxComponent } from "./components/search-box/search-box.component";
import { ChatHistoryComponent } from "./components/chat-history/chat-history.component";
import { CodeEditorComponent } from "./components/code-editor/code-editor.component";
import { PipelineListComponent } from "./components/pipeline-list/pipeline-list.component";
import { WelcomePageComponent } from "./components/welcome-page/welcome-page.component";

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}
/**
 * Main application component with ChatGPT-style interface
 * Features fixed left sidebar and right drawer with centered search input
 */
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    SearchBoxComponent,
    ChatHistoryComponent,
    CodeEditorComponent,
    PipelineListComponent,
    WelcomePageComponent
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "ChatGPT Style App";
  currentView: "chat" | "list" | 'welcome'= "welcome";
  // Chat messages array
  messages: ChatMessage[] = [
    // {
    //   id: "1",
    //   content: "Hello! How can I help you today?",
    //   isUser: false,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "2",
    //   content: "I need help with my code.",
    //   isUser: true,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "3",
    //   content: "Sure, let me show you how to do that.",
    //   isUser: false,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "4",
    //   content: "Thanks!",
    //   isUser: true,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "5",
    //   content: "You're welcome!",
    //   isUser: false,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "6",
    //   content: "I have another question.",
    //   isUser: true,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "7",
    //   content: "Sure, let me show you how to do that.",
    //   isUser: false,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "8",
    //   content: "Thanks!",
    //   isUser: true,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "9",
    //   content: "You're welcome!",
    //   isUser: false,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "10",
    //   content: "I have another question.",
    //   isUser: true,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "11",
    //   content: "Sure, let me show you how to do that.",
    //   isUser: false,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "12",
    //   content: "Thanks!",
    //   isUser: true,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "13",
    //   content: "You're welcome!",
    //   isUser: false,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "14",
    //   content: "I have another question.",
    //   isUser: true,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "15",
    //   content: "Sure, let me show you how to do that.",
    //   isUser: false,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "16",
    //   content: "Thanks!",
    //   isUser: true,
    //   timestamp: new Date(),
    // },
    // {
    //   id: "17",
    //   content: "You're welcome!",
    //   isUser: false,
    //   timestamp: new Date(),
    // },
  ];

  // Sidebar slide state
  isLeftSidebarOpened = false;

  // Drawer visibility states (right drawer only)
  showRightDrawer = false;

  // Sidebar hover logic
  private sidebarHoverCount = 0;
  private sidebarCloseTimeout: any;

  onSidebarMouseEnter() {
    this.sidebarHoverCount++;
    clearTimeout(this.sidebarCloseTimeout);
    this.isLeftSidebarOpened = true;
  }

  onSidebarMouseLeave() {
    this.sidebarHoverCount--;
    if (this.sidebarHoverCount <= 0) {
      this.sidebarCloseTimeout = setTimeout(() => {
        if (this.sidebarHoverCount <= 0) {
          this.isLeftSidebarOpened = false;
        }
      }, 120); // Small delay for smoothness
    }
  }

  openLeftSidebar() {
    this.isLeftSidebarOpened = true;
  }

  closeLeftSidebar() {
    this.isLeftSidebarOpened = false;
  }

  toggleLeftSidebar() {
    this.isLeftSidebarOpened = !this.isLeftSidebarOpened;
  }

  closeDrawers(): void {
    this.showRightDrawer = false;
  }

  /**
   * Handle message sent from search box
   */
  onMessageSent(message: string): void {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    this.messages.push(userMessage);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: this.generateAIResponse(message),
        isUser: false,
        timestamp: new Date(),
      };
      this.messages.push(aiResponse);
    }, 1000);
  }

  /**
   * Generate a simple AI response (simulation)
   */
  private generateAIResponse(userMessage: string): string {
    const responses = [
      "That's a great question! Let me help you with that.",
      "I understand what you're looking for. Here's my response:",
      "Thanks for asking! I'd be happy to assist you.",
      "That's an interesting point. Let me elaborate on that.",
      "I'm here to help! Here's what I think about your question:",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse} You asked: "${userMessage}". This is a simulated response to demonstrate the chat interface.`;
  }

  /**
   * Handle code execution from code editor
   */
  onCodeExecuted(code: string): void {
    console.log("Code executed:", code);
    // Handle code execution logic here
  }

  showPipelineList() {
    this.currentView = "list";
    this.closeDrawers();
  }

  showNewChat() {
    this.currentView = "chat";
    this.closeDrawers();
  }

  // Right sidebar resizing
  private resizingRightSidebar = false;
  private startX = 0;
  private startWidth = 360;

  onRightSidebarResizeStart(event: MouseEvent) {
    this.resizingRightSidebar = true;
    this.startX = event.clientX;
    const sidebar = document.querySelector('.right-sidebar') as HTMLElement;
    this.startWidth = sidebar ? sidebar.offsetWidth : 360;
    document.addEventListener('mousemove', this.onRightSidebarResize);
    document.addEventListener('mouseup', this.onRightSidebarResizeEnd);
    event.preventDefault();
  }

  onRightSidebarResize = (event: MouseEvent) => {
    if (!this.resizingRightSidebar) return;
    const dx = this.startX - event.clientX;
    let newWidth = this.startWidth + dx;
    const maxWidth = window.innerWidth / 2;
    const minWidth = 220;
    newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
    document.documentElement.style.setProperty('--right-sidebar-width', `${newWidth}px`);
  };

  onRightSidebarResizeEnd = () => {
    this.resizingRightSidebar = false;
    document.removeEventListener('mousemove', this.onRightSidebarResize);
    document.removeEventListener('mouseup', this.onRightSidebarResizeEnd);
  };

}
