import { ValidationClassContract, ValidationResult } from "../contracts/Validations";

import { z } from "zod";

export class UrlValidation implements ValidationClassContract {
  private urlShema = z.string()
    .min(1, { message: "O e-mail é obrigatório." })
    .url({  message: "Invalid email format" });

  validate(url: string): ValidationResult {
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
