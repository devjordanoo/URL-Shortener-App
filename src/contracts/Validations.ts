export interface ValidationResult {
  success: boolean;
  error?: string;
}

export interface ValidationClassContract {
  validate(url: string): ValidationResult;  
}