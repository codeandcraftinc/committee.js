import flatten from 'lodash.flatten'
import get from 'lodash.get'
import map from 'lodash.map'
import reduce from 'lodash.reduce'

/**
 * @todo
 * @returns {Object}
 */
export default function buildRoutes(schema) {
  const definitions = get(schema, 'definitions', {})
  const links = flatten(map(definitions, 'links'))

  return reduce(links, (memo, link) => {
    if (!link) {
      return memo
    }

    if (!memo[link.method]) {
      memo[link.method] = []
    }

    memo[link.method].push([
      new RegExp(link.href.replace(/\{(.*?)\}/, '([^/]+)')),
      link
    ])

    return memo
  }, {})
}
