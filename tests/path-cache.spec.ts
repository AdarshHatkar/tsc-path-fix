import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { afterEach, expect, it } from 'vitest';
import { PathCache } from '../src/utils/path-cache';

const temporaryDirectories: string[] = [];

afterEach(async () => {
    await Promise.all(
        temporaryDirectories.splice(0).map((directory) =>
            fs.rm(directory, { recursive: true, force: true })
        )
    );
});

it('does not cache a missing alias target permanently', async () => {
    const directory = await fs.mkdtemp(join(tmpdir(), 'tsc-path-fix-'));
    temporaryDirectories.push(directory);
    const target = join(directory, 'cronJobs');
    const cache = new PathCache(true);

    expect(cache.existsResolvedAlias(target)).toBe(false);
    await fs.writeFile(`${target}.js`, 'export {};', 'utf8');

    expect(cache.existsResolvedAlias(target)).toBe(true);
});