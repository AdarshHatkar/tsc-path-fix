import { expect, it } from 'vitest';
import { newImportStatementRegex, newStringRegex } from '../src/utils';
import { sampleImportStatements } from './utils';

it(`Import regex matches import statements`, () => {
  const expectedImportPaths = sampleImportStatements.match(
    /(\d+)/g
  ) as string[];

  const importStatementMatches = sampleImportStatements.match(
    newImportStatementRegex('g')
  ) as RegExpMatchArray;
  expect(importStatementMatches).toHaveLength(expectedImportPaths.length);

  const foundImportPaths: string[] = [];
  for (const importStatement of importStatementMatches) {
    // Global match is a string, not a match group, so re-match without the global flag.
    const pathMatch = importStatement.match(
      newStringRegex()
    ) as RegExpMatchArray;
    expect(pathMatch).toBeTruthy();
    if (pathMatch.groups) foundImportPaths.push(pathMatch.groups.path);
  }
  expectedImportPaths.forEach((expectedPath, i) => {
    expect(expectedPath).toEqual(foundImportPaths[i]);
  });
});

it(`Import regex does not match edge cases from keywords in strings`, function () {
  const testCase = `
    'a string with keyword from '
    // The from keyword in that string can cause
    // a match up to the next quote, since the regex does not
    // know that the keyword is in a string context
    'another string using same quote type'
  `;
  expect(newImportStatementRegex().exec(testCase)?.[0]).toBeUndefined();
});
