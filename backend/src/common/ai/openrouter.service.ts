import { Injectable, Logger } from '@nestjs/common';
import { 
  MISTRAL_MODELS,
  OPEN_ROUTER_LINK
} from '../configs/openrouter.config';

@Injectable()
export class OpenRouterService {
  private readonly logger = new Logger(OpenRouterService.name);
  private readonly apiKey: string;
  
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    
    if (!this.apiKey) {
      this.logger.warn('OpenRouter API key is not set. Please set OPENROUTER_API_KEY environment variable.');
    }
  }

  async writeToAI(prompt: string): Promise<string> {

    const res = await fetch(OPEN_ROUTER_LINK, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MISTRAL_MODELS.MISTRAL_7B_INSTRUCT,
        messages: [
          { role: "system", content: "You are a helpful assistant for it forum." },
          { role: "user", content: prompt }
        ]
      }),
    });
    
    const data = await res.json();
    console.log(data);
    return data.choices[0].message.content;
  }
}