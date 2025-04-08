import { expect, it } from 'vitest';
import { runTestProject } from './utils';

// Run tests on projects. 9-11 are for testing fullpath file resolution
[
  1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24
].forEach((value) => {
  it(`Project ${value} runs after alias resolution`, async () => {
    const code = await runTestProject(value);
    expect(code).toEqual(0);
  });
}); 