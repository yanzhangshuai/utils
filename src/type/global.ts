/**
 * Promise, or maybe not
 */
export type Awaitable<T> = T | PromiseLike<T>

/**
 * Null or whatever
 */
export type Nullable<T> = T | null | undefined

/**
 * Array, or not yet
 */
export type Arrayable<T> = T | Array<T>

/**
 * Constructor
 */
export type Constructor<T = void> = new (...args: any[]) => T

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never

/**
 * Defines an intersection type of all union items.
 *
 * @param U Union of any types that will be intersected.
 * @returns U items intersected
 * @see https://stackoverflow.com/a/50375286/9259330
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

/**
 * Infers the arguments type of a function
 */
export type ArgumentsType<T> = T extends ((...args: infer A) => any) ? A : never

export type MergeInsertions<T> =
  T extends object
    ? { [K in keyof T]: MergeInsertions<T[K]> }
    : T

export type DeepMerge<F, S> = MergeInsertions<{
  [K in keyof F | keyof S]: K extends keyof S & keyof F
    ? DeepMerge<F[K], S[K]>
    : K extends keyof S
      ? S[K]
      : K extends keyof F
        ? F[K]
        : never
}>

/**
  * writeable properties of an object
  */
export type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 * deep writeable properties of an object
 */
export type DeepWritable<T> = {
  -readonly [K in keyof T]: keyof T[K] extends undefined ? T[K] : DeepWritable<T[K]>
}

/**
 * deep readonly properties of an object
 */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends undefined ? T[K] : DeepReadonly<T[K]>
}

/**
 * deep partial properties of an object
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

/**
 * settimeout return type
 */
export type Timeout = ReturnType<typeof setTimeout>

/**
 * setInterval return type
 */
export type Timer = ReturnType<typeof setInterval>

/**
 * string keys of an object
 */
export type Recordable<T = any> = Record<string, T>

/**
 * not object type
 */
export type ValueType = string | number | boolean | undefined | null | Symbol

/**
 * indexable type
 */
export type IndexableType = string | number | Symbol

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

/**
 *  type without keys of U
 */
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

/**
 * function type with arguments and return type
 */
export type Fn<T = any, R = T> = (...args: any[]) => R

/**
 * Promise function type with arguments and return type
 */
export type PromiseFn<T = any, R = T> = (...arg: Array<T>) => Promise<R>

export type TargetContext = '_self' | '_blank'

