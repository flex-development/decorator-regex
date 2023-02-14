/**
 * @file DECORATOR_REGEX
 * @module decorator-regex/DECORATOR_REGEX
 */

/**
 * Regular expression matching multi and single-line decorators.
 *
 * Ignores matches in comments.
 *
 * Required flags:
 *
 * - `s`: dot all
 * - `u`: unicode
 *
 * @see https://codeguage.com/courses/regexp/flags
 * @see https://github.com/tc39/proposal-decorators
 * @see https://regex101.com/r/WPavSs
 *
 * @const {RegExp} DECORATOR_REGEX
 */
const DECORATOR_REGEX: RegExp =
  /(?<=^|[\n,] *|(?<!\* *[$_\p{ID_Start}][$\u200C\u200D\p{ID_Continue}]*)\()@(?<identifier>[$_\p{ID_Start}][$\u200C\u200D\p{ID_Continue}]*)(?:<.+?>)?(?<parameters>\(.*?\)(?=\n *@?[$_\p{ID_Start}][$\u200C\u200D\p{ID_Continue}]*|(?: @?[$_\p{ID_Start}][$\u200C\u200D\p{ID_Continue}]*)))?/gsu

export default DECORATOR_REGEX
