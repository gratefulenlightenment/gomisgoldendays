// 진료 요약의 원문 보존과 간식 예산의 계산·경계값을 검증합니다.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = vm.createContext({ document: { querySelector: () => null } });
vm.runInContext(fs.readFileSync(path.join(__dirname, '../care-tools.js'), 'utf8'), context);
const base = { daily: 250, percent: 10, extras: 10, perTreat: 3, rewards: 10 };
const calculate = (values) => context.calculateTreatBudget({ ...base, ...values });

test('illustrative example leaves 15 kcal, five treats, half a treat per reward', () => {
  const value = calculate({});
  assert.equal(value.allowance, 25);
  assert.equal(value.remaining, 15);
  assert.equal(value.wholeTreats, 5);
  assert.equal(value.portion, 0.5);
});
test('extras above the allowance do not produce negative food or reward counts', () => {
  const value = calculate({ extras: 30 });
  assert.equal(value.remaining, 0);
  assert.equal(value.over, 5);
  assert.equal(value.wholeTreats, 0);
});
test('exactly exhausted and zero-percent allowances yield zero', () => {
  assert.equal(calculate({ extras: 25 }).wholeTreats, 0);
  assert.equal(calculate({ percent: 0, extras: 0 }).remaining, 0);
});
test('lower veterinarian-set percentages and optional rewards are supported', () => {
  const value = calculate({ percent: 5, extras: 0, rewards: null });
  assert.equal(value.allowance, 12.5);
  assert.equal(value.wholeTreats, 4);
  assert.equal(value.portion, null);
});
test('whole-treat rounding handles decimal representation', () => {
  assert.equal(calculate({ daily: 3, extras: 0, perTreat: 0.1 }).wholeTreats, 3);
  assert.equal(calculate({ perTreat: 4 }).wholeTreats, 3);
});
for (const invalid of [{ daily: 0 }, { daily: NaN }, { daily: Infinity }, { percent: 11 },
  { percent: -1 }, { extras: -1 }, { perTreat: 0 }, { rewards: 0 }, { rewards: 1.5 }]) {
  test('rejects invalid input ' + Object.entries(invalid).map(([key, value]) => key + '=' + value).join(', '), () => assert.throws(() => calculate(invalid)));
}
test('summary includes only supplied observations, without a diagnosis or invented dates', () => {
  const text = context.buildVetSummary({ dog: ' Demo ', onset: '', baseline: 'Usual\n pattern',
    change: '<script>literal text</script>', care: '', questions: 'What should I record?' });
  assert.ok(text.includes('Dog:\nDemo'));
  assert.ok(text.includes('Usual pattern:\nUsual pattern'));
  assert.ok(text.includes('<script>literal text</script>'));
  assert.ok(!text.includes('First noticed:'));
  assert.ok(!text.includes('Current care / medications as reported:'));
  assert.ok(text.includes('NOT A DIAGNOSIS'));
});
test('tools have no network, persistent storage, or HTML insertion calls', () => {
  const script = fs.readFileSync(path.join(__dirname, '../care-tools.js'), 'utf8');
  assert.ok(!/fetch\(|XMLHttpRequest|localStorage|sessionStorage|sendBeacon|innerHTML/.test(script));
});
test('forms stay inert until their handlers are ready', () => {
  for (const [file, id] of [['senior-dog-signs-checklist/index.html', 'vet-note-form'],
    ['senior-dog-nutrition/index.html', 'treat-budget-form']]) {
    const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    assert.ok(html.includes('<form id="' + id + '" inert>'));
    assert.ok(html.includes('<noscript>'));
  }
});
