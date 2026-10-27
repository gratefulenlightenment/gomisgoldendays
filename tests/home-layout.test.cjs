// 홈 재배치 때 기존 구매 경로·계산기·Favorites 자료가 유실되지 않는지 검증합니다.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const home = read('index.html');
const favorites = read('favorites/index.html');
const section = (html, id) => html.match(new RegExp('<section[^>]+id="' + id + '"[\\s\\S]*?</section>'))[0];

test('home offers all twelve guides and three free tools before the journal', () => {
  const guides = section(home, 'senior-dog-care');
  const routes = ['senior-dog-care-guide', 'senior-dog-signs-checklist', 'senior-dog-sleeping-more', 'senior-dog-not-eating', 'senior-dog-nutrition', 'senior-dog-bad-breath', 'senior-dog-struggling-with-stairs', 'signs-dog-in-pain', 'senior-dog-eye-care', 'dog-dementia-signs', 'old-dog-new-tricks', 'do-big-dogs-age-faster'];
  for (const route of routes) assert.ok(guides.includes('href="' + route + '/"'), route);
  const tools = section(home, 'free-tools');
  for (const href of ['senior-dog-signs-checklist/#vet-note-tool', 'senior-dog-nutrition/#treat-budget-tool', '#age-calculator']) assert.ok(tools.includes('href="' + href + '"'), href);
  const order = ['senior-dog-care', 'free-tools', 'age-calculator', 'film', 'story', 'journal', 'favorites'];
  const positions = order.map((id) => home.indexOf('id="' + id + '"'));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.ok(!/amazon\.com|amzn\.to/.test(home));
  assert.match(section(home, 'favorites'), /href="favorites\/"/);
  for (const id of ['calculator', 'age-calculator', 'journal', 'favorites']) assert.ok(home.includes('id="' + id + '"'));
});

test('Favorites keeps six distinct sponsored shopping links and the original archive files', () => {
  const shopping = favorites.match(/<a[^>]+href="https:\/\/www\.amazon\.com[^>]+>/g) || [];
  assert.equal(shopping.length, 6);
  assert.equal(new Set(shopping.map((link) => link.match(/href="([^"]+)/)[1])).size, 6);
  for (const link of shopping) assert.match(link, /rel="[^"]*sponsored/);
  assert.match(favorites, /As an Amazon Associate/);
  for (const file of ['videos/gomi-flying-disc-fetch-2019.mp4', 'videos/gomi-leash-walk-2022.mp4', 'images/gomi-flying-disc-2019.jpg', 'images/gomi-leash-walk-2022.jpg', 'images/gomi-cozy-bed-2019.jpg']) {
    assert.ok(favorites.includes('../' + file), file);
    assert.ok(fs.existsSync(path.join(root, file)), file);
  }
});

test('local stylesheet, image, video, and navigation targets resolve on changed pages', () => {
  for (const file of ['index.html', 'favorites/index.html', 'about/index.html', 'old-dog-new-tricks/index.html', 'senior-dog-nutrition/index.html']) {
    const html = read(file);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(ids.length, new Set(ids).size, file + ': duplicate ids');
    for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
      const url = match[1];
      if (/^(?:https?:|mailto:|data:|javascript:)/.test(url)) continue;
      const [resource, hash] = url.split('#');
      const clean = resource.split('?')[0];
      let target = clean.startsWith('/') ? path.join(root, clean) : path.resolve(root, path.dirname(file), clean || path.basename(file));
      if (clean.endsWith('/')) target = path.join(target, 'index.html');
      assert.ok(fs.existsSync(target), file + ': ' + url);
      if (hash && target.endsWith('.html')) assert.ok(read(path.relative(root, target)).includes('id="' + hash + '"'), file + ': ' + url);
    }
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) assert.doesNotThrow(() => JSON.parse(match[1]));
  }
});
