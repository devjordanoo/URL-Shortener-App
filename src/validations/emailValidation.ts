import { z } from "zod";

interface UrlValidationResult {
  success: boolean;
  error?: string;
}

export class UrlValidation {
  private static urlShema = z.string()
    .min(1, { message: "O e-mail é obrigatório." })
    .url({  message: "Invalid email format" });

  static validate(url: string): UrlValidationResult {
    const res = this.urlShema.safeParse(url);
    
    if(res.success === false) {
      return {
        success: false,
        error: res.error.errors[0].message
      }
    }

    return {
      success: true,
      error: ""
    };
  }
}