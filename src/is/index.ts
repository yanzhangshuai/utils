const toString = Object.prototype.toString

/**
 *  check value type
 */
export const is = (val: unknown, type: string): boolean => toString.call(val) === `[object ${type}]`

/**
 *  check value is defined
 */
export const isDef = <T = any>(val?: T): val is T => val !== undefined

/**
 *  check value is undefined
 *
 */
export const isUnDef = <T = any>(val?: T): val is undefined => !isDef(val)

/**
 * check value is null
 *
 */
export const isNull = (val: any): val is null => val === null

/**
 * check value is undefined or null
 */
export const isNil = (val: any): val is null | undefined => isUnDef(val) || isNull(val)

/**
 * check value is number
 */
export const isNumber = (val: any): val is number => is(val, 'Number')

/**
 * check value is function
 */
export const isFunc = (val: any): val is Function => typeof val === 'function'

/**
 * check value is string
 */
export const isString = (val: any): val is string => is(val, 'String')

/**
 *  check value is object
 */
export const isObject = (val: any): val is Record<string | number | symbol, any> => val !== null && is(val, 'Object')

/**
 *  check value is array
 */
export const isArray = <T = any>(val: any): val is Array<T> => is(val, 'Array')

/**
 * check value is ArrayLink
 */
export const isArrayLike = <T = any>(val: any): val is ArrayLike<T> => isDef(val) && isNumber(val.length) && !isFunc(val)

/**
 * check value is number or check value is number string
 */
export const isNumeric = (val: any): val is number | string => !isArray(val) && !isObject(val) && val - parseFloat(val) + 1 >= 0

/**
 * check value is boolean
 */
export const isBoolean = (val: any): val is boolean => is(val, 'Boolean')

/**
 * check value is symbol
 */
export const isSymbol = (val: any): val is symbol => is(val, 'Symbol')

/**
 * check value is regExp
 */
export const isRegExp = (val: any): val is RegExp => is(val, 'RegExp')

/**
 * check value is Data
 */
export const isDate = (val: any): val is Date => is(val, 'Date')

/**
 * check value is error
 */
export const isError = (val: any): val is Error => is(val, 'Error')

/**
 * check value is Map
 */
export const isMap = <K = any, V = any>(val: any): val is Map<K, V> => is(val, 'Map')

/**
 * check value is WeakMap
 */
export const isWeakMap = <K extends object = any, V = any>(val: any): val is WeakMap<K, V> => is(val, 'WeakMap')

/**
 * check value is Set
 */
export const isSet = <T = any>(val: any): val is Set<T> => is(val, 'Set')

/**
 * check value is WeakSet
 */
export const isWeakSet = <T extends object = any>(val: any): val is WeakSet<T> => is(val, 'WeakSet')

/**
 * check value is Promise
 */
export const isPromise = <T = any>(val: any): val is Promise<T> => is(val, 'Promise')

/**
 * check value is PromiseLike
 */
export const isPromiseLike = <T = any>(val: any): val is PromiseLike<T> => isObject(val) && isFunc(val.then)

/**
 * check value is generator
 */
export const isGenerator = <T = any>(val: any): val is Generator<T> => is(val, 'Generator')

// /**
//  * check value is generator function
//  */
// export const isGeneratorFunction = <T = any>(val: any): val is GeneratorFunction<T> => is(val, 'GeneratorFunction')

// //@ts-ignore
// export function isAsyncFunction(val: any): val is AsyncFunction {
//   return is(val, 'AsyncFunction')
// }

// export function isGeneratorFunction(val: any): val is GeneratorFunction {
//   return is(val, 'GeneratorFunction')
// }

// export function isGenerator<T1 = any,T2 = any,T3 =any>(val: any): val is Generator<T1, T2, T3> {
//   return is(val, 'Generator')
// }

// //@ts-ignore
// export function isGeneratorIterator(val: any): val is GeneratorIterator<any, any, any> {
//   return is(val, 'GeneratorIterator')
// }

// export function isAsyncGeneratorFunction(val: any): val is AsyncGeneratorFunction {
//   return is(val, 'AsyncGeneratorFunction')
// }

// export function isAsyncGenerator(val: any): val is AsyncGenerator<any, any, any> {
//   return is(val, 'AsyncGenerator')
// }

// //@ts-ignore
// export function isAsyncGeneratorIterator<T1 = any,T2 = any,T3 =any>(val: any): val is AsyncGeneratorIterator<T1, T2, T3> {
//   return is(val, 'AsyncGeneratorIterator')
// }

/**
 *  check value is empty
 *  if value is array,  return value.length === 0
 *  if value is map,    return value.size === 0
 *  if value is set,    return value.size === 0
 *  if value is object, return Object.keys(value).length === 0
 *  if value is string, return value.length === 0
 */
export const isEmpty = <T = any>(val: T): val is T => {
  if (isArray(val) || isString(val))
    return val.length === 0

  if (isMap(val) || isSet(val))
    return val.size === 0

  if (isObject(val))
    return Object.keys(val).length === 0

  return false
}

// @ts-ignore
export const isBrowser = typeof window !== 'undefined'

// @ts-ignore
export const isServer = typeof window === 'undefined'

// @ts-ignore
export function isWindow(val: any): val is Window {
  return (isBrowser) && is(val, 'Window')
}

export function isUrl(path: string): boolean {
  const reg = /(((^https?:(?:\/\/)?)(?:[-:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%\/.\w-_]*)?\??[-+=&%@.\w_]*#?[\w]*)?)$/
  return reg.test(path)
}
