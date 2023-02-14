/**
 * @file Snapshot Serializers - RegExpIterable
 * @module tests/setup/serializers/regex-iterable
 */

import type { RegExpArray } from '#tests/types'
import { isNumber, isString, type Fn } from '@flex-development/tutils'
import { get, omit } from 'radash'

expect.addSnapshotSerializer({
  /**
   * Prints the given `value`.
   *
   * @param {unknown} value - Value to print
   * @param {Fn<[unknown], string>} printer - Print function
   * @return {string} `value` as printable string
   */
  print(value: unknown, printer: Fn<[unknown], string>): string {
    value = [...(value as RegExpArray[])].map(m => omit(m, ['index', 'input']))
    return printer(value)
  },
  /**
   * Checks if the given `value` is a {@linkcode RegExpArray} array.
   *
   * @param {unknown} value - Value to check
   * @return {value is RegExpArray[]} `true` if `value` is `RegExpArray` array
   */
  test(value: unknown): value is RegExpArray[] {
    return (
      Array.isArray(value) &&
      isNumber(get(value[0], 'index')) &&
      isString(get(value[0], 'input'))
    )
  }
})
