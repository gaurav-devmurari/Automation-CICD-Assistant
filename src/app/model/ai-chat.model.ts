export interface AiResponse {
  finish_reason: string;
  message: {
    role: 'assistant';
    content: {
      text: string;
    }[];
  };
}