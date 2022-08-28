import { flattenArrayable } from '../array/index'

/**
 * sum all args
 */
export const sum = <T = number>(args: T[] | T[][], fn: (val: T) => number = val => val as number) => flattenArrayable<T>(args).reduce((p, c) => p + fn(c), 0)

