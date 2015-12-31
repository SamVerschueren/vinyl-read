import test from 'ava';
import fn from './';

test('async', async t => {
	const files = await fn(['*', '!{node_modules,node_modules/**/*}']);
	t.is(files[0].cwd, process.cwd());
	t.is(files[0].base, process.cwd());
	t.is(files[0].path, 'fixture');
	t.same(files[0].content, undefined);

	const readme = await fn('readme.md', {cwd: 'node_modules/ava'});
	t.true(/Futuristic test runner/.test(readme[0].contents.toString('utf8')));

	const noContents = await fn('*.js', {read: false});
	t.same(noContents[0].contents, null);

	const markdown = await fn('*.md');
	t.true(/^# vinyl-read/.test(markdown[0].contents.toString('utf8')));
});

test('sync', t => {
	const files = fn.sync(['*', '!{node_modules,node_modules/**/*}']);
	t.is(files[0].path, 'fixture');
	t.is(files[0].cwd, process.cwd());
	t.is(files[0].base, process.cwd());
	t.is(files[0].path, 'fixture');
	t.same(files[0].content, undefined);

	const readme = fn.sync('readme.md', {cwd: 'node_modules/ava'});
	t.true(/Futuristic test runner/.test(readme[0].contents.toString('utf8')));

	const noContents = fn.sync('*.js', {read: false});
	t.same(noContents[0].contents, null);

	const markdown = fn.sync('*.md');
	t.true(/^# vinyl-read/.test(markdown[0].contents.toString('utf8')));
});
