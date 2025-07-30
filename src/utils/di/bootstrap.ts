import { ShortedUrlRepository } from "../..//repositories/ShortedUrlRepository"

import { register } from "./container"

export const TOKENS = {
  ShortedUrlRepository: "ShortedUrlRepository"
}

export const boostrap = () => {
  register(TOKENS.ShortedUrlRepository, new ShortedUrlRepository());
}