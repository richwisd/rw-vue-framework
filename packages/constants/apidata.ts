export type JSONValue =
  | string
  | number
  | undefined
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue }

export interface infoI {
  [key: string]: JSONValue
}