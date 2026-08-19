import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { afterEach, expect, it } from 'vitest';
import {
    clearPathResolutionCache,
    resolveFullImportPaths
} from '../src/utils/import-path-resolver';

const temporaryDirectories: string[] = [];

afterEach(async () => {
    clearPathResolutionCache();
    await Promise.all(
        temporaryDirectories.splice(0).map((directory) =>
            fs.rm(directory, { recursive: true, force: true })
        )
    );
});

it('rechecks a relative import after its target is emitted', async () => {
    const directory = await fs.mkdtemp(join(tmpdir(), 'tsc-path-fix-'));
    temporaryDirectories.push(directory);
    const sourcePath = join(directory, 'source.js');
    const source = "import value from './generated';";

    expect(resolveFullImportPaths(source, sourcePath)).toBe(source);

    await fs.writeFile(join(directory, 'generated.js'), 'export default 1;', 'utf8');

    expect(resolveFullImportPaths(source, sourcePath)).toContain(
        "from './generated.js'"
    );
});