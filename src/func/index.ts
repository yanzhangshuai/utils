import { flattenArrayable } from '../array'
import type { Fn, Nullable } from '../type/global'

/**
 * Call the function
 */
export function invoke(fn: Fn) {
  return fn()
}

/**
 * condition is true, call function and return value, otherwise return undefined
 *
 */
export function ifInvoke(condition: boolean, fn: Fn) {
  if (condition)
    return fn()

  return undefined
}

/**
 * Call every function in an array
 */
export function batchInvoke(...functions: Nullable<Fn>[] | Nullable<Fn>[][]) {
  flattenArrayable(functions).forEach(fn => fn && fn())
}

/**
 * Pass the value through the callback, and return the value
 *
 * @example
 * ```
 * function createUser(name: string): User {
 *   return tap(new User, user => {
 *     user.name = name
 *   })
 * }
 * ```
 */
export function tap<T>(value: T, callback: (value: T) => void): T {
  callback(value)
  return value
}
