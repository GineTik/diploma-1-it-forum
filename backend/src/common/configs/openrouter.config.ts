export const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';
export const OPENROUTER_CHAT_ENDPOINT = '/chat/completions';

export const OPEN_ROUTER_LINK = OPENROUTER_API_URL + OPENROUTER_CHAT_ENDPOINT;

// Models
export const MISTRAL_MODELS = {
  /** Free models */
  MISTRAL_7B: 'mistralai/mistral-7b',
  MISTRAL_7B_INSTRUCT: 'mistralai/mistral-7b-instruct:free',
  
  /** Paid models */
  MISTRAL_SMALL: 'mistralai/mistral-small',
  MISTRAL_MEDIUM: 'mistralai/mistral-medium',
  MISTRAL_LARGE: 'mistralai/mistral-large'
};

// Default configuration
export const DEFAULT_MODEL_CONFIG = {
  temperature: 0.7,
  max_tokens: 1000,
  top_p: 0.95,
  frequency_penalty: 0,
  presence_penalty: 0,
}; 