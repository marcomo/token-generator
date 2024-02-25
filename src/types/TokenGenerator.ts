import { DesignToken } from 'style-dictionary/types/DesignToken'

export interface Token extends DesignToken {
  attributes?: DesignToken['attributes']
}
export interface TokenDictionary<T = Token> {
  [key: string]: T
}
