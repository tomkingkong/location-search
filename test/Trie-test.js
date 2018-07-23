const { expect } = require('chai');
const Trie = require('../lib/Trie');

describe('TRIE', () => {
  let prefixTrie;

  beforeEach(() => {
    prefixTrie = new Trie();
  });

  it('should start with zero words', () => {
    expect(prefixTrie.wordCount).to.eq(0);
  });

  it('should start with empty children object as its root', () => {
    expect(prefixTrie.root.children).to.deep.eq({});
  });

  describe('INSERT', () => {
    it('should be able to add a word', () => {
      prefixTrie.insert('hello');
  
      expect(prefixTrie.wordCount).to.eq(1);
    });
  
    it('should keep count of words added', () => {
      prefixTrie.insert('hello');
      prefixTrie.insert('world');
      prefixTrie.insert('goodbye');
      
      expect(prefixTrie.wordCount).to.eq(3);   
    });
  
    it('should store first letter in word as child of root', () => {
      prefixTrie.insert('world');

      let children = Object.keys(prefixTrie.root.children);
      expect(children).to.deep.eq(['w']);

    });

    it('should store next letters as children of the previous child', () => {
      prefixTrie.insert('will');
      
      let childOfRoot = Object.keys(prefixTrie.root.children);

      expect(childOfRoot).to.deep.eq(['w']);

      expect(prefixTrie.wordCount).to.eq(1);
    });
    
    it('shouldn\'t make a new child if one exists', () => {
      prefixTrie.insert('whoa');
      prefixTrie.insert('world');
      prefixTrie.insert('what');

      let numOfRootChildren = Object.keys(prefixTrie.root.children).length;
      let numOfWChildren = Object.keys(prefixTrie.root.children.w.children).length;

      expect(numOfRootChildren).to.eq(1);
      expect(numOfWChildren).to.eq(2);
   
    });

    it('shouldn\'t count duplicate words', () => {
      prefixTrie.insert('whoa');
      
      expect(prefixTrie.wordCount).to.eq(1);
      
      prefixTrie.insert('world');

      expect(prefixTrie.wordCount).to.eq(2);

      prefixTrie.insert('world');

      expect(prefixTrie.wordCount).to.eq(2);
    });
  })

  describe('COUNT', () => {
    it('should return the current word count', () => {
      let number = prefixTrie.count();

      expect(number).to.eq(0);
      
      prefixTrie.insert('world');

      number = prefixTrie.count();

      expect(number).to.eq(1);

    });
  })

  describe('SUGGEST', () => {
    it('should return an empty array if input doesn\'t match', () => {
      prefixTrie.insert('hello');

      let autoFill = prefixTrie.getSuggestions('hx');

      expect(autoFill).to.deep.eq([]);
    });

    it('should find a word with a few letters as input', () => {
      prefixTrie.insert('hello');
      prefixTrie.insert('heap');
      prefixTrie.insert('help');
      prefixTrie.insert('heeding');

      let autoFill = prefixTrie.getSuggestions('he', prefixTrie.root);

      expect(autoFill).to.deep.eq(['hello', 'help', 'heap', 'heeding']);
    });

    it('should suggest a word based on fragments of words', () => {
      prefixTrie.insert('hello');
      prefixTrie.insert('happy');
      prefixTrie.insert('world');

      let autoFill = prefixTrie.getSuggestions('hel', prefixTrie.root);

      expect(autoFill).to.deep.eq(['hello']);

      autoFill = prefixTrie.getSuggestions('h', prefixTrie.root);
 
      expect(autoFill).to.deep.eq(['hello', 'happy']);
    });

    it('should suggest words nested in similar words', () => {
      prefixTrie.insert('anna');
      prefixTrie.insert('ann');

      let autoFill = prefixTrie.getSuggestions('an', prefixTrie.root);
      
      expect(autoFill).to.deep.eq(['ann', 'anna']);

      prefixTrie.insert('annabelle');

      autoFill = prefixTrie.getSuggestions('an', prefixTrie.root);

      expect(autoFill).to.deep.eq(['ann', 'anna', 'annabelle']);
      
    });

    it('should return suggestions from a large set of words', () => {
      const fs = require('fs');
      const text = "/usr/share/dict/words";
      const dictionary = fs.readFileSync(text).toString().trim().split('\n');
      
      prefixTrie.populate(dictionary);

      let autoFill = prefixTrie.getSuggestions('wiz', prefixTrie.root);

      expect(autoFill).to.deep.eq(
        [ 'wizardship',
          'wizard',
          'wizardism',
          'wizardlike',
          'wizardly',
          'wizardry',
          'wizardess',
          'wizen',
          'wizened',
          'wizenedness',
          'wizier',
          'wizzen' 
        ]
      )
    })
    it('should return suggestions in order of most popular', () => {
      const fs = require('fs');
      const text = "/usr/share/dict/words";
      const dictionary = fs.readFileSync(text).toString().trim().split('\n');
      
      prefixTrie.populate(dictionary);

      prefixTrie.search('wizardly');

      let autoFill = prefixTrie.getSuggestions('wiz', prefixTrie.root);

      expect(autoFill).to.deep.eq(
        [ 'wizardly',
          'wizardship',
          'wizardism',
          'wizardlike',
          'wizard',
          'wizardry',
          'wizardess',
          'wizen',
          'wizened',
          'wizenedness',
          'wizier',
          'wizzen' 
        ]
      )

    })
  });

  describe('POPULATE', () => {
    it('should insert a dictionary\'s worth of words at once', () => {
      const fs = require('fs');
      const text = "/usr/share/dict/words";
      const dictionary = fs.readFileSync(text).toString().trim().split('\n');
     
      prefixTrie.populate(dictionary);
      
      let prefixTrieLength = prefixTrie.count();

      expect(dictionary.length).to.eq(prefixTrieLength);
    });
  });

  describe('SEARCH', () => {
    it('should return true if a word exists', () => {
      const wizardry = [ 'wizard',
                         'wizardess',
                         'wizardism',
                         'wizardlike',
                         'wizardly'
                        ]

      prefixTrie.populate(wizardry);

      let found = prefixTrie.search('wizardly');

      expect(found).to.eq(true);
    });

    it('should return false if a word does not match', () => {
      const wizardry = [ 'wizard',
                         'wizardess',
                         'wizardism',
                         'wizardlike'
                        ]

      prefixTrie.populate(wizardry);

      let found = prefixTrie.search('wizarbobloblaw');

      expect(found).to.eq(false);
    });

    it('should return false if the string doesn\'t count as a word', () => {
      const wizardry = [ 'wizard',
                         'wizardess',
                         'wizardism',
                         'wizardlike'
                        ]

      prefixTrie.populate(wizardry);

      let found = prefixTrie.search('wiz');

      expect(found).to.eq(false);

      found = prefixTrie.search('wizard');

      expect(found).to.eq(true);
    });

    it('should increase the word\'s popularity if exists', () => {
      prefixTrie.insert('ann');

      let popular = prefixTrie.root.children.a.children.n.children.n.popularity;
      
      expect(popular).to.eq(0);

      prefixTrie.search('ann');

      popular = prefixTrie.root.children.a.children.n.children.n.popularity;
      
      expect(popular).to.eq(1);
    })

    it('should create the word if it doesn\'t exist', () => {
      prefixTrie.insert('ann');

      prefixTrie.search('word');

      let newWord = prefixTrie.root.children.w.children.o.children.r.children.d.endOfWord;
      expect(newWord).to.eq(true);
    })
  });

  describe('REMOVE WORD', () => {
    it('should remove a word from being suggested', () => {
      prefixTrie.insert('anna');
      prefixTrie.insert('ann');
      
      let autoFill = prefixTrie.getSuggestions('a', prefixTrie.root);

      expect(autoFill).to.deep.eq(['ann', 'anna']);

      prefixTrie.removeWord('ann');

      autoFill = prefixTrie.getSuggestions('a', prefixTrie.root);

      expect(autoFill).to.deep.eq(['anna']);
    });

    it('should decrement wordCount', () => {
      prefixTrie.insert('anna');
      prefixTrie.insert('ann');

      prefixTrie.removeWord('ann');

      let wordCount = prefixTrie.count();

      expect(wordCount).to.eq(1);
    });

    it('should not decrement if deleted word doesn\'t exist', () => {
      prefixTrie.insert('anna');
      prefixTrie.insert('ann');

      prefixTrie.removeWord('ann');

      let wordCount = prefixTrie.count();

      expect(wordCount).to.eq(1);

      prefixTrie.removeWord('ann');

      wordCount = prefixTrie.count();

      expect(wordCount).to.eq(1);
    });

    it('should remove a node if has no children', () => {
      prefixTrie.insert('anna');
      prefixTrie.insert('ann');

      prefixTrie.removeWord('anna');
      let emptyChild = prefixTrie.root.children.a.children.n.children.n.children;
     
      expect(emptyChild).to.deep.eq({});
    });

    it('should not remove a node if it does have kids', () => {
      prefixTrie.insert('ann');
      prefixTrie.insert('anna');

      prefixTrie.removeWord('ann');

      let parentChild = prefixTrie.root.children.a.children.n.children.n.children;
      let aChild = { 'a': { 'endOfWord': true, 'popularity': 0, 'children': {} } };
      
      expect(parentChild).to.deep.eq(aChild);
    });
  });
});