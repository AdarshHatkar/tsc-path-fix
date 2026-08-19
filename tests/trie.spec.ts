import { expect, it } from 'vitest';
import { TrieNode } from '../src/utils/trie';

it('does not reuse an alias result from a different trie branch', () => {
    const trie = new TrieNode<string>();
    trie.add('@firstProjectHelpers/', 'first');
    trie.add('@secondProjectHelpers/', 'second');

    expect(trie.search('@firstProjectHelpers/cronJobs')).toBe('first');
    expect(trie.search('@secondProjectHelpers/cronJobs')).toBe('second');
});