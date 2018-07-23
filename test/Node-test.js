const { expect } = require('chai')
const Node = require('../lib/Node')

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  })

  it('should exist', () => {
    expect(node).to.exist;
  })

  it('should know if it is the end of a word, and be false by default', () => {
    expect(node.endOfWord).to.eq(false)
  })

  it('should have an empty children object by default', () => {
    expect(Object.keys(node.children).length).to.equal(0);
  })

  it('should have a default popularity of zero', () => {
    expect(node.popularity).to.equal(0);
  })
})
