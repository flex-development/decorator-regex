/**
 * @file Snapshot Serializers - RegExpIterable
 * @module tests/setup/serializers/regex-iterable
 */

import type { RegExpArray } from '#tests/types'
import {
  cast,
  get,
  isArray,
  isNumber,
  isString,
  omit,
  select,
  type Fn
} from '@flex-development/tutils'

expect.addSnapshotSerializer({
  /**
   * Prints the given `value`.
   *
   * @param {unknown} value - Value to print
   * @param {Fn<[unknown], string>} printer - Print function
   * @return {string} `value` as printable string
   */
  print(value: unknown, printer: Fn<[unknown], string>): string {
    return printer(
      select([...cast<RegExpArray[]>(value)], null, m => {
        return omit(m, ['index', 'input'])
      })
    )
  },
  /**
   * Checks if the given `value` is a {@linkcode RegExpArray} array.
   *
   * @param {unknown} value - Value to check
   * @return {value is RegExpArray[]} `true` if `value` is `RegExpArray` array
   */
  test(value: unknown): value is RegExpArray[] {
    return (
      isArray(value) &&
      isNumber(get(value, '0.index')) &&
      isString(get(value, '0.input'))
    )
  }
})
