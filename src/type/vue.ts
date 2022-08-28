/**
 * component ref
 */
export interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

export type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

export type ElRef<T extends HTMLElement = HTMLDivElement> = T | null | undefined

/**
 * ref type
 */
export type RefType<T> = T | null

/**
 * emit event type
 */
export type EmitType = (event: string, ...args: Array<unknown>) => void
