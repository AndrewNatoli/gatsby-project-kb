import { getReferences } from '../src/get-references'
import outdent  from 'outdent'

describe('getReferences', () => {
  it('get linkDefinition and wiki-links', () => {
    const text = outdent.string(`
    # Title
    [[link-to-1]]
    [[link-to-2]]

    [link-to-1] target-page
    `)
    const result = getReferences(text)
    expect(result.pages.map(o => o.target)).toEqual([
      'link-to-1',
      'link-to-2',
      'link-to-1',
    ])
  })

  it('can extract multiple referrences of same target', () => {
    const text = outdent.string(`
    [[link]] is a wiki-link
    [[link]] also referrenced in this line
    `)
    const result = getReferences(text)
    expect(result.pages.map(o => o.target)).toEqual([
      'link',
      'link',
    ])
  })

  it('get link definitions with context', () => {
    const text = outdent.string(`
    # Title
    [[link]] is a wiki-link
    `)
    const result = getReferences(text)
    expect(result.pages).toEqual([
      { target: 'link', contextLine: '[[link]] is a wiki-link' }
    ])
  })
})
