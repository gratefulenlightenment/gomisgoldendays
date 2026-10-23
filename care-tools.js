// 진료용 관찰 요약과 간식 예산을 브라우저 안에서만 작성·계산합니다.
function buildVetSummary(values) {
  const fields = [
    ['Dog', values.dog], ['First noticed', values.onset],
    ['Usual pattern', values.baseline], ['What changed', values.change],
    ['Current care / medications as reported', values.care], ['Questions for the vet', values.questions]
  ];
  return 'OWNER OBSERVATIONS — NOT A DIAGNOSIS\n\n' + fields
    .filter(([, value]) => value.trim())
    .map(([label, value]) => label + ':\n' + value.trim().replace(/\s+/g, ' ')).join('\n\n') +
    '\n\nPrepared from owner-entered notes. No medical interpretation has been added.';
}

function calculateTreatBudget(values) {
  const { daily, percent, extras, perTreat, rewards } = values;
  if (![daily, percent, extras, perTreat].every(Number.isFinite) || daily <= 0 ||
      percent < 0 || percent > 10 || extras < 0 || perTreat <= 0 ||
      (rewards !== null && (!Number.isSafeInteger(rewards) || rewards < 1))) {
    throw new Error('Enter positive calorie amounts, a 0–10% allowance, nonnegative extras, and a whole number of rewards.');
  }
  const allowance = daily * (percent / 100);
  const remaining = Math.max(0, allowance - extras);
  const wholeTreats = Math.floor(remaining / perTreat + 1e-9);
  return { allowance, remaining, over: Math.max(0, extras - allowance), wholeTreats,
    portion: rewards === null ? null : wholeTreats / rewards };
}

const vetForm = document.querySelector('#vet-note-form');
if (vetForm) {
  const result = document.querySelector('#vet-note-result');
  const output = document.querySelector('#vet-note-output');
  const status = document.querySelector('#vet-note-status');
  const copy = document.querySelector('#vet-note-copy');
  const print = document.querySelector('#vet-note-print');
  function clearVetNote() {
    result.hidden = true;
    output.textContent = '';
    copy.disabled = print.disabled = true;
    status.textContent = 'Create a new summary after editing. Nothing is saved by this tool.';
  }
  vetForm.addEventListener('input', clearVetNote);
  vetForm.addEventListener('reset', clearVetNote);
  vetForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!vetForm.reportValidity()) return;
    const values = Object.fromEntries(new FormData(vetForm));
    if (!values.baseline.trim() || !values.change.trim()) {
      status.textContent = 'Describe the usual pattern and what changed; spaces alone are not a note.';
      return;
    }
    output.textContent = buildVetSummary(values);
    result.hidden = false;
    copy.disabled = print.disabled = false;
    status.textContent = 'Summary ready. Review it before copying or printing.';
  });
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.textContent);
      status.textContent = 'Summary copied.';
    } catch {
      status.textContent = 'Copy is unavailable here. Select the summary text and copy it manually.';
    }
  });
  print.addEventListener('click', () => window.print());
  vetForm.inert = false;
}

const treatForm = document.querySelector('#treat-budget-form');
if (treatForm) {
  const result = document.querySelector('#treat-budget-result');
  const output = document.querySelector('#treat-budget-output');
  const status = document.querySelector('#treat-budget-status');
  const number = (value) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
  function clearTreatBudget() {
    result.hidden = true;
    output.textContent = '';
    status.textContent = 'Calculate again after editing. This is arithmetic, not a feeding recommendation.';
  }
  treatForm.addEventListener('input', clearTreatBudget);
  treatForm.addEventListener('reset', clearTreatBudget);
  treatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!treatForm.reportValidity()) return;
    const field = (name) => treatForm.elements.namedItem(name).value;
    const values = { daily: Number(field('daily')), percent: Number(field('percent')),
      extras: Number(field('extras')), perTreat: Number(field('perTreat')),
      rewards: field('rewards') === '' ? null : Number(field('rewards')) };
    try {
      const budget = calculateTreatBudget(values);
      let lines = [
        'Treats and extras allowance: ' + number(budget.allowance) + ' kcal',
        'Other extras entered: ' + number(values.extras) + ' kcal',
        'Remaining allowance: ' + number(budget.remaining) + ' kcal',
        'Whole treats that fit: ' + budget.wholeTreats + ' at ' + number(values.perTreat) + ' kcal each'
      ];
      if (budget.over > 0) lines.push('The extras entered already exceed this allowance by ' + number(budget.over) + ' kcal. No additional treats fit this budget.');
      if (budget.portion !== null && budget.wholeTreats > 0) lines.push(
        'For ' + values.rewards + ' equal rewards: divide those ' + budget.wholeTreats + ' treats into ' + values.rewards +
        ' portions (about ' + number(budget.portion) + ' of a treat per reward). Divide only if the treat can be split safely.');
      if (budget.wholeTreats === 0 && budget.over === 0) lines.push('No whole treat fits. This does not recommend skipping care or changing your dog\'s diet.');
      lines.push('The allowance is a ceiling, not an amount your dog needs. Include all extras; do not count an item twice.');
      output.textContent = lines.join('\n\n');
      result.hidden = false;
      status.textContent = 'Calculation ready. Check your label values and your veterinarian\'s plan.';
    } catch (error) {
      status.textContent = error.message;
    }
  });
  document.querySelector('#treat-budget-example').addEventListener('click', () => {
    for (const [name, value] of Object.entries({ daily: 250, percent: 10, extras: 10, perTreat: 3, rewards: 10 })) {
      treatForm.elements.namedItem(name).value = value;
    }
    clearTreatBudget();
    status.textContent = 'Illustrative numbers loaded — not Gomi\'s diet or a calorie recommendation. Press Calculate to see the example.';
  });
  treatForm.inert = false;
}
