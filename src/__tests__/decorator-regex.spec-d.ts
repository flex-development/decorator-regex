/**
 * @file Type Tests - DECORATOR_REGEX
 * @module decorator-regex/tests/unit-d/DECORATOR_REGEX
 */

import type TEST_SUBJECT from '../decorator-regex'

describe('unit-d:DECORATOR_REGEX', () => {
  it('should be instance of RegExp', () => {
    expectTypeOf<typeof TEST_SUBJECT>().toEqualTypeOf<RegExp>()
  })
})
