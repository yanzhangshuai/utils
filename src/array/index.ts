/**
 * Convert `Arrayable<T>` to `Array<T>`
 *
 * @category Array
 */
export const toArray = <T>(array?: Nullable<Arrayable<T>>): Array<T> => {
  array = array || []
  if (Array.isArray(array))
    return array
  return [array]
}

/**
 * Convert `Arrayable<T>` to `Array<T>` and flatten it
 *
 * @category Array
 */
export const flattenArrayable = <T>(array?: Nullable<Arrayable<T | Array<T>>>): Array<T> => toArray(array).flat(1) as Array<T>
