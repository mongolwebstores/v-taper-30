import { createBody } from './body3d.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
const fmt = n => Math.round(n).toLocaleString('en-US');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- DATA ---------- */
const GROUP_LABEL = { chest: 'Chest', back: 'Back', delts: 'Delts', arms: 'Arms', legs: 'Legs', core: 'Core' };

// [name, sets×reps, image id, muscle groups, cue, alternative, v-taper?]
const DAYS = {
  'Push A': { focus: 'Upper chest + side delts', face: 'front', ex: [
    ['Incline dumbbell press, 30°', '3 × 6–10', 'Incline_Dumbbell_Press', ['chest', 'delts', 'arms'], 'Pin your shoulder blades back. Lower slowly until the dumbbells reach chest level.', 'Incline Smith or incline machine press'],
    ['Machine chest press', '3 × 8–12', 'Leverage_Chest_Press', ['chest', 'arms'], 'Let the handles come back to a full stretch. Press without slamming the lockout.', 'Flat dumbbell press'],
    ['Pec deck / butterfly', '3 × 12–15', 'Butterfly', ['chest'], 'Arms slightly bent. Feel the stretch, then squeeze the handles together.', 'Cable fly'],
    ['Cable lateral raise', '4 × 12–20', 'Cable_Seated_Lateral_Raise', ['delts'], 'Lead with the elbow and stop at shoulder height.', 'Dumbbell lateral raise', true],
    ['Overhead cable triceps extension', '3 × 10–15', 'Cable_Rope_Overhead_Triceps_Extension', ['arms'], 'Elbows by your ears. Let your hands sink deep behind your head.', 'Overhead dumbbell extension'],
    ['Cable crunch', '3 × 10–15', 'Cable_Crunch', ['core'], 'Curl your ribs toward your hips. Your hips stay still.', 'Machine crunch'],
  ]},
  'Pull A': { focus: 'Lat width', face: 'back', ex: [
    ['Lat pulldown, overhand grip', '4 × 8–12', 'Wide-Grip_Lat_Pulldown', ['back', 'arms'], 'Chest up. Drive your elbows down to your sides; full stretch at the top.', 'Assisted pull-up', true],
    ['Chest-supported T-bar row', '3 × 8–12', 'Lying_T-Bar_Row', ['back', 'arms'], 'Chest stays on the pad. Pull your elbows back past your body.', 'Machine row'],
    ['Elevated cable row', '3 × 10–15', 'Elevated_Cable_Rows', ['back'], 'Sit tall, reach forward for the stretch, row to your belly.', 'Single-arm cable row'],
    ['Reverse pec deck', '3 × 15–20', 'Reverse_Machine_Flyes', ['delts', 'back'], 'Arms long. Move only at the shoulder.', 'Cable rear-delt fly'],
    ['Dumbbell lateral raise', '3 × 15–20', 'Side_Lateral_Raise', ['delts'], 'Light and controlled, no swinging.', 'Cable lateral raise', true],
    ['Dumbbell curl', '3 × 10–15', 'Dumbbell_Bicep_Curl', ['arms'], 'Elbows still. Lower slowly.', 'Cable curl'],
  ]},
  'Legs A': { focus: 'Quads + hamstrings', face: 'front', ex: [
    ['Hack squat', '3 × 6–10', 'Hack_Squat', ['legs'], 'Go as deep as you control, brace before each rep.', 'Squat or leg press'],
    ['Romanian deadlift', '3 × 8–10', 'Romanian_Deadlift', ['legs', 'back'], 'Hips back, bar close, back flat. Stop at the hamstring stretch.', 'Dumbbell RDL'],
    ['Leg extension', '2 × 12–15', 'Leg_Extensions', ['legs'], 'Pause 1 s at the top.', 'Split squat'],
    ['Seated leg curl', '3 × 10–15', 'Seated_Leg_Curl', ['legs'], 'Lean forward a little for a deeper stretch.', 'Lying leg curl'],
    ['Standing calf raise', '3 × 10–15', 'Standing_Calf_Raises', ['legs'], 'Full stretch at the bottom, 1 s pause.', 'Calf press on the leg press'],
    ['Hanging leg raise', '3 × 10–15', 'Hanging_Leg_Raise', ['core'], 'Tilt your pelvis up. No swinging; bent knees are fine.', 'Captain\'s chair knee raise'],
  ]},
  'Push B': { focus: 'Chest + side delts', face: 'front', ex: [
    ['Flat dumbbell press', '3 × 8–12', 'Dumbbell_Bench_Press', ['chest', 'arms'], 'Same setup as Push A. Control the stretch.', 'Machine chest press'],
    ['Incline machine press', '3 × 8–12', 'Leverage_Incline_Chest_Press', ['chest', 'delts'], 'Upper chest again. Handles to the top of your chest.', 'Smith incline 30°'],
    ['Dips, chest version', '2 × 8–12', 'Dips_-_Chest_Version', ['chest', 'arms'], 'Lean forward. If the front of your shoulder hurts, swap it.', 'Pec deck'],
    ['Cable lateral raise', '4 × 12–20', 'Cable_Seated_Lateral_Raise', ['delts'], 'Start with the cable behind you for a longer stretch.', 'Dumbbell lateral raise', true],
    ['Triceps pushdown', '3 × 12–15', 'Triceps_Pushdown', ['arms'], 'Elbows pinned to your sides.', 'Rope pushdown'],
    ['Plank', '3 × 30–45 s', 'Plank', ['core'], 'Squeeze your glutes, ribs down.', 'Dead bug'],
  ]},
  'Pull B': { focus: 'Back thickness + width', face: 'back', ex: [
    ['Pull-ups', '4 × 6–10', 'Pullups', ['back', 'arms'], 'Dead hang at the bottom, chest to the bar. Use the assist machine if needed.', 'Lat pulldown', true],
    ['Seated cable row', '3 × 8–12', 'Seated_Cable_Rows', ['back', 'arms'], 'Let your shoulders reach forward, then row to your belly.', 'Machine row'],
    ['Straight-arm pulldown', '3 × 12–15', 'Straight-Arm_Pulldown', ['back'], 'Arms nearly straight. Sweep the bar down to your thighs.', 'Dumbbell pullover'],
    ['Face pull', '3 × 15', 'Face_Pull', ['delts', 'back'], 'Pull to your forehead, thumbs going back.', 'Reverse pec deck'],
    ['Dumbbell lateral raise', '3 × 15–20', 'Side_Lateral_Raise', ['delts'], 'Lean forward slightly.', 'Cable lateral raise', true],
    ['Incline dumbbell curl', '3 × 10–12', 'Incline_Dumbbell_Curl', ['arms'], 'Arms hang behind you for the stretch.', 'Cable curl'],
  ]},
  'Legs B': { focus: 'Legs + glutes', face: 'back', ex: [
    ['Leg press', '3 × 10–15', 'Leg_Press', ['legs'], 'Feet mid-platform. Deep, but don\'t let your lower back round.', 'Hack squat'],
    ['Split squat with dumbbells', '3 × 8–12 / leg', 'Split_Squat_with_Dumbbells', ['legs'], 'Front shin fairly upright. Back foot on a bench for the Bulgarian version.', 'Walking lunge'],
    ['Lying leg curl', '3 × 10–15', 'Lying_Leg_Curls', ['legs'], 'Lower slowly.', 'Seated leg curl'],
    ['Hip thrust', '2 × 10–12', 'Barbell_Hip_Thrust', ['legs'], 'Chin tucked, pause at the top.', 'Glute machine'],
    ['Seated calf raise', '3 × 12–15', 'Seated_Calf_Raise', ['legs'], 'Use the full range.', 'Standing calf raise'],
    ['Cable crunch', '3 × 10–15', 'Cable_Crunch', ['core'], 'Ribs toward hips.', 'Machine crunch'],
  ]},
  'Rest': { focus: 'Recover', face: 'front', ex: [] },
};
const ORDER = Object.keys(DAYS);
const DAY_GROUPS = d => [...new Set(DAYS[d].ex.flatMap(e => e[3]))];

const WEEKS = {
  1: { rir: 3, text: '<b>Week 1 · RIR 3.</b> Learn each machine, find working weights, write every weight down.' },
  2: { rir: 2, text: '<b>Week 2 · RIR 2.</b> Beat last week: +1–2 reps or the smallest weight step on everything.' },
  3: { rir: 1.5, text: '<b>Week 3 · RIR 1–2.</b> <b>+1 set</b> on pulldowns, pull-ups, rows and every lateral raise.' },
  4: { rir: 1, text: '<b>Week 4 · RIR 1.</b> Pump week: drop the weight ~30% on the last set of each isolation exercise and keep going. Days 29–30: half the sets, then retest.' },
};

const VOLUME = [
  ['Back', 20, 4, true], ['Side delts', 14, 4, true], ['Chest', 17, 0], ['Quads', 11, 0], ['Hamstrings', 9, 0], ['Arms', 9, 0], ['Core', 9, 0],
];

// Food. Numbers per serving shown; null = no reliable figure found.
const FOOD = [
  { id: 'drumstick', zh: '卤鸡腿', en: 'Braised chicken leg, skin off · 100 g', kcal: 127, p: 16, v: 'eat', vt: 'Order it', src: 15, note: 'Photo shows raw legs; the canteen braises them.' },
  { id: 'tea-egg', zh: '茶叶蛋', en: 'Tea egg · 1 egg', kcal: 74, p: 6, v: 'eat', vt: 'Order it', src: 14 },
  { id: 'chicken-breast', zh: '即食鸡胸肉', en: 'Ready-to-eat chicken breast · 100 g pack', kcal: 121, p: 24, v: 'eat', vt: 'Order it', src: 19, noimg: '鸡胸' },
  { id: 'duck-soup', zh: '鸭血粉丝汤', en: 'Duck blood & vermicelli soup · small bowl', kcal: 278, p: 15, v: 'eat', vt: 'OK + eggs', src: 17 },
  { id: 'kungpao', zh: '宫保鸡丁', en: 'Kung pao chicken', kcal: null, p: null, v: 'eat', vt: 'Protein, oily', src: null },
  { id: 'beef-celery', zh: '芹菜炒牛肉', en: 'Beef with celery', kcal: null, p: null, v: 'eat', vt: 'Protein', src: null },
  { id: 'mapo', zh: '麻婆豆腐', en: 'Mapo tofu', kcal: null, p: null, v: 'care', vt: 'Some protein, oily', src: null },
  { id: 'salted-duck', zh: '盐水鸭', en: 'Nanjing salted duck · 100 g', kcal: 313, p: 16.6, v: 'care', vt: 'Small portion', src: 18, note: '26 g fat per 100 g, very salty.' },
  { id: 'tomato-egg', zh: '番茄炒蛋', en: 'Tomato & egg · 150 g scoop', kcal: 120, p: 5.7, v: 'veg', vt: 'Count as veg', src: 16 },
  { id: 'greens', zh: '清炒青菜', en: 'Plain stir-fried greens', kcal: null, p: null, v: 'veg', vt: 'Veg', src: null },
  { id: 'rice', zh: '米饭', en: 'Rice · 1 bowl, 200 g cooked', kcal: 232, p: 5, v: 'eat', vt: 'Measured', src: 14, rice: true },
  { id: 'corn', zh: '玉米', en: 'Steamed corn', kcal: null, p: null, v: 'eat', vt: 'Carb swap', src: null, rice: true },
  { id: 'hongshao', zh: '红烧肉', en: 'Red-braised pork belly', kcal: null, p: null, v: 'skip', vt: 'Skip', src: null },
  { id: 'bubble-tea', zh: '奶茶', en: 'Milk tea', kcal: null, p: null, v: 'skip', vt: 'Skip', src: null },
];
const FOOD_BY = Object.fromEntries(FOOD.map(f => [f.id, f]));

const SAY = [
  ['少油', 'shǎo yóu', 'Less oil'], ['米饭少一点', 'mǐfàn shǎo yìdiǎn', 'A bit less rice'], ['不要汤汁', 'bú yào tāngzhī', 'No sauce on top'],
  ['加个蛋', 'jiā gè dàn', 'Add an egg'], ['要瘦的', 'yào shòu de', 'The lean piece'], ['去皮', 'qù pí', 'Skin off'],
];

const DAYLINE = [
  ['07:30', 'Breakfast', 'baozi-soymilk|tea-egg', '3 tea eggs, milk or unsweetened soy milk, 1 包子 or corn.'],
  ['12:00', 'Canteen lunch', 'drumstick|greens|rice', '卤鸡腿 (skin off) + another lean meat + greens + 1 bowl rice.'],
  ['After gym', 'Recovery', 'banana', 'A pack of 即食鸡胸肉 + a banana, or whey in milk.'],
  ['18:30', 'Canteen dinner', 'beef-celery|tomato-egg|rice', 'Beef or fish + tofu + 番茄炒蛋 as the veg + 1 bowl rice.'],
];

const FINDINGS = [
  ['30°', 'Incline angle', 'Of five bench angles, 30° gave the most upper-chest activity.', 23],
  ['≈', 'Cable = dumbbell', 'Cable and dumbbell lateral raises grew side delts about the same in 8 weeks.', 24],
  ['Grip', 'Overhand pulldown', 'An overhand grip worked the lats best at any width; newer data says grip matters little.', 21],
  ['Stretch', 'Long muscle lengths', 'Overhead triceps work grew the triceps clearly more than arms-down work. Training at the stretch looks promising, but early.', 26],
  ['Tension', 'Heavy first, pump last', 'Growth is driven mainly by hard, heavy sets. The pump may add a little, so it comes last in week 4.', 27],
  ['1.6+', 'g protein per kg', 'Muscle gain stopped improving above about 1.6 g/kg; lean dieters may need more. Plan uses 2 g/kg.', 7],
  ['3 min', 'Rest on big lifts', 'Trained men gained more strength and size with 3-minute rests than 1-minute rests.', 4],
  ['0.7%', 'Lose slowly', 'Losing ~0.7% of body weight a week kept more muscle than losing faster.', 6],
];

const REFS = [
  ['Schoenfeld, Ogborn, Krieger (2017). Weekly training volume and muscle mass, meta-analysis. J Sports Sci.', 'https://researchgate.net/profile/Brad-Schoenfeld/publication/305455324_Dose-response_relationship_between_weekly_resistance_training_volume_and_increases_in_muscle_mass_A_systematic_review_and_meta-analysis/links/59dc0269458515e9ab4527d6/Dose-response-relationship-between-weekly-resistance-training-volume-and-increases-in-muscle-mass-A-systematic-review-and-meta-analysis.pdf'],
  ['Baz-Valle et al. (2022). 12–20 vs more than 20 weekly sets, systematic review. J Hum Kinet.', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8884877/'],
  ['Refalo et al. (2023). Proximity to failure and hypertrophy, meta-analysis. Sports Med.', 'https://link.springer.com/article/10.1007/s40279-023-01946-6'],
  ['Schoenfeld et al. (2016). Longer rest periods and hypertrophy in trained men. JSCR.', 'https://pubmed.ncbi.nlm.nih.gov/26605807/'],
  ['Nedeltcheva et al. (2010). Insufficient sleep undermines dietary efforts to reduce adiposity. Ann Intern Med.', 'https://pubmed.ncbi.nlm.nih.gov/20921542/'],
  ['Garthe et al. (2011). Two weight-loss rates in elite athletes. IJSNEM.', 'https://pubmed.ncbi.nlm.nih.gov/?term=Garthe+2011+weight-loss+rates+elite+athletes'],
  ['Morton et al. (2018). Protein supplementation and resistance training, meta-analysis. Br J Sports Med.', 'https://pubmed.ncbi.nlm.nih.gov/28698222/'],
  ['Helms et al. (2014). Protein for lean lifters in a deficit. IJSNEM.', 'https://pubmed.ncbi.nlm.nih.gov/24092765/'],
  ['Vispute et al. (2011). Abdominal exercise and abdominal fat. JSCR.', 'https://doi.org/10.1519/JSC.0b013e3181fb4a46'],
  ['Systematic review with meta-analysis (2022): localized training and local fat. Human Movement.', 'https://doi.org/10.5114/HM.2022.110373'],
  ['Kreider et al. (2017). ISSN position stand: creatine. JISSN.', 'https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0173-z'],
  ['Antonio et al. (2021). Common questions about creatine. JISSN.', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7871530/'],
  ['Mifflin-St Jeor equation and activity factors (NIH Bookshelf).', 'https://www.ncbi.nlm.nih.gov/books/NBK278991/table/diet-treatment-obes.table12est/'],
  ['Boohee food database: rice 116 kcal/100 g, tea egg 74 kcal; egg and rice protein from USDA FoodData Central.', 'https://i.boohee.com/shiwu/wuxiangchadan'],
  ['Boohee: 卤鸡腿, 127 kcal and 16.3 g protein per 100 g.', 'https://www.boohee.com/shiwu_more/fd6ba167'],
  ['Boohee: 番茄炒蛋 (no sugar), 80 kcal and 3.8 g protein per 100 g.', 'http://www.boohee.com/shiwu/fanqiechaodan_wutang'],
  ['Boohee: 鸭血粉丝汤, small bowl 250 g = 278 kcal; 6.2 g protein per 100 g.', 'https://www.boohee.com/shiwu_more/yaxuefensitang'],
  ['Bowtie (Hong Kong Centre for Food Safety data): 鹽水鴨.', 'https://www.bowtie.com.hk/blog/zh/%E7%87%9F%E9%A4%8A%E8%B2%BC%E5%A3%AB/%E9%B9%BD%E6%B0%B4%E9%B4%A8/'],
  ['Dcard: FamilyMart chicken breast labels (Taiwan products; mainland labels may differ).', 'https://www.dcard.tw/f/fitness/p/232553254'],
  ['Yangtse Evening Post (2025): Nanjing community canteen prices.', 'https://www.yzwb.net/news/jiangsu/nanjing/202509/t20250903_258651.html'],
  ['Lusk, Hale, Russell (2010). Grip width and forearm orientation in the lat pull-down. JSCR.', 'https://pubmed.ncbi.nlm.nih.gov/20543740/'],
  ['Buonsenso et al. (2025). Back muscle EMG with lat pulldown grip variations.', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12452428/'],
  ['Rodríguez-Ridao et al. (2020). Five bench inclinations and pectoralis EMG. IJERPH.', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7579505/'],
  ['Dumbbell vs cable lateral raises (2025). Front Physiol.', 'https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2025.1611468/full'],
  ['Stronger By Science: stretch-mediated hypertrophy.', 'https://www.strongerbyscience.com/stretch-mediated-hypertrophy/'],
  ['Maeo et al. (2023). Overhead vs neutral arm triceps training. Eur J Sport Sci.', 'https://pubmed.ncbi.nlm.nih.gov/35819335/'],
  ['Schoenfeld (2010). The mechanisms of muscle hypertrophy. JSCR.', 'https://pubmed.ncbi.nlm.nih.gov/20847704/'],
];

/* ---------- 3D ---------- */
const accent = 0xff6a2b;
const hero = createBody($('#heroBody'), { highlight: ['back', 'delts', 'chest'], accent });
if (!hero) $('.hero-stage .nogl').hidden = false;
const legend = $('#heroLegend');
let heroSel = new Set(['back', 'delts', 'chest']);
Object.entries(GROUP_LABEL).forEach(([g, label]) => {
  const b = document.createElement('button');
  b.type = 'button'; b.textContent = label; b.setAttribute('aria-pressed', heroSel.has(g));
  b.onclick = () => {
    heroSel.has(g) ? heroSel.delete(g) : heroSel.add(g);
    b.setAttribute('aria-pressed', heroSel.has(g));
    hero?.highlight([...heroSel]);
  };
  legend.appendChild(b);
});

const range = $('#dayRange');
function setDay(v) { $('#dayOut').textContent = v; hero?.setDay((v - 1) / 29); }
range.addEventListener('input', () => { stopDemo(); setDay(+range.value); });
// Gentle one-time demo sweep 1 → 30 → 1 so the morph is visible without touching anything
let demo = 0;
function stopDemo() { cancelAnimationFrame(demo); demo = 0; }
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && hero) {
  const t0 = performance.now() + 900;
  const tick = now => {
    const t = Math.max(0, now - t0) / 5200;
    if (t >= 1) { range.value = 30; setDay(30); demo = 0; return; }
    const v = Math.round(1 + 29 * (0.5 - 0.5 * Math.cos(Math.PI * t)));
    range.value = v; setDay(v);
    demo = requestAnimationFrame(tick);
  };
  demo = requestAnimationFrame(tick);
}

const side = createBody($('#trainBody'), { accent, dist: 4.4, autoRotate: false });

/* ---------- PLAN ---------- */
const bars = $('#volBars');
const maxV = 24;
bars.innerHTML = VOLUME.map(([n, s, x, v]) =>
  `<div class="bar-row${v ? ' v' : ''}"><span>${n}</span><div class="track"><div class="fill" style="--w:${s / maxV * 100}%"></div>${x ? `<div class="ext" style="--w:${s / maxV * 100}%;--x:${x / maxV * 100}%"></div>` : ''}</div><b>${s}${x ? '→' + (s + x) : ''}</b></div>`).join('');

$('#gears').innerHTML = [1, 2, 3, 4].map(w => {
  const lit = { 1: 1, 2: 2, 3: 3, 4: 4 }[w];
  return `<li><span class="wk">W${w}</span><div class="gauge">${[1, 2, 3, 4].map(i => `<i class="${i <= lit ? 'on' : ''}"></i>`).join('')}</div><p>${WEEKS[w].text}</p></li>`;
}).join('');

function calc() {
  const age = +$('#inAge').value || 21, kg = +$('#inKg').value || 73, cm = +$('#inCm').value || 175;
  const bmr = 10 * kg + 6.25 * cm - 5 * age + 5, tdee = bmr * 1.55;
  const kcal = Math.round((tdee - 550) / 50) * 50;
  const p = Math.round(kg * 2 / 5) * 5, f = Math.round(kg * 0.8 / 5) * 5;
  const c = Math.max(0, Math.round((kcal - p * 4 - f * 9) / 4));
  const parts = [[p * 4, 'dPro'], [f * 9, 'dFat'], [c * 4, 'dCarb']];
  let off = 0;
  parts.forEach(([k, id]) => {
    const pct = k / kcal * 100;
    const el = $('#' + id);
    el.style.strokeDasharray = `${pct} ${100 - pct}`;
    el.style.strokeDashoffset = `${-off}`;
    off += pct;
  });
  $('#dK').textContent = fmt(kcal);
  $('#macroList').innerHTML = [
    ['var(--orange)', 'Protein · 2 g/kg', `${p} g`], ['var(--caution)', 'Fat · 0.8 g/kg', `${f} g`], ['var(--cobalt)', 'Carbs · the rest', `${c} g`],
  ].map(([col, l, v]) => `<li><i style="background:${col}"></i><span>${l}</span><b>${v}</b></li>`).join('');
  $('#mathLine').innerHTML = `<span class="mono">BMR ${fmt(bmr)} × 1.55 = ${fmt(tdee)} − 550 ≈ ${fmt(kcal)} kcal</span>`;
  $('#kKcal').textContent = fmt(kcal); $('#kPro').textContent = p + ' g';
  meal.kcal = Math.round(kcal / 4 / 5) * 5; $('#mealK').textContent = meal.kcal;
  renderMeters();
}
const meal = { kcal: 525, p: 35 };
['inAge', 'inKg', 'inCm'].forEach(id => $('#' + id).addEventListener('input', calc));

/* ---------- TRAIN ---------- */
let week = +store.get('vt-week') || 1; if (week < 1 || week > 4) week = 1;
let day = store.get('vt-day'); if (!ORDER.includes(day)) day = 'Push A';

function plusOne(name) {
  return week >= 3 && /pulldown|pull-up|row|lateral raise/i.test(name) && !/straight-arm/i.test(name);
}
function renderTrain() {
  $('#weekSel').innerHTML = [1, 2, 3, 4].map(w => `<button type="button" aria-pressed="${w === week}" data-w="${w}">Week ${w}</button>`).join('');
  $('#weekNote').innerHTML = WEEKS[week].text;
  $('#daySel').innerHTML = ORDER.map((d, i) => `<button type="button" aria-pressed="${d === day}" data-d="${d}"><b>${d.replace(' ', '&nbsp;')}</b><span>day ${i + 1}</span></button>`).join('');
  const D = DAYS[day];
  $('#dayName').textContent = day; $('#dayFocus').textContent = D.focus;
  side?.highlight(DAY_GROUPS(day)); side?.face(D.face);
  const list = $('#exList');
  if (!D.ex.length) {
    list.innerHTML = `<div class="rest-card"><b>Rest day</b><p>Walk 8–10k easy steps. Sleep 8+ hours. Eat your protein. Muscle is built while you recover.</p></div>`;
    return;
  }
  list.innerHTML = D.ex.map((e, i) => {
    const [name, rx, img, groups, cue, alt, v] = e;
    const tempo = /plank/i.test(name) ? '6s' : '3.2s';
    return `<article class="ex enter" style="animation-delay:${i * 50}ms" data-g="${groups.join(' ')}">
      <div class="anim" style="--tempo:${tempo}" role="button" tabindex="0" aria-label="${esc(name)} animation, tap to pause">
        <img src="img/ex/${img}_0.jpg" alt="${esc(name)}, start position" loading="lazy" decoding="async">
        <img class="b" src="img/ex/${img}_1.jpg" alt="" loading="lazy" decoding="async">
        <span class="phase">${i === 0 ? 'MAIN LIFT' : 'LOOP'} · TAP TO PAUSE</span><span class="num">${i + 1}</span><i class="tempo"></i>
      </div>
      <div class="ex-body">
        <div class="ex-top"><span class="ex-name">${esc(name)}</span><span class="rx">${rx}${plusOne(name) ? '<small>+1 set this week</small>' : ''}</span></div>
        <p class="cue">${esc(cue)}</p>
        <p class="alt"><span class="fine">No machine free?</span> ${esc(alt)}</p>
        <div class="ex-tags">${groups.map(g => `<span>${GROUP_LABEL[g]}</span>`).join('')}${v ? '<span class="v">V-taper</span>' : ''}</div>
      </div></article>`;
  }).join('');
}
$('#weekSel').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; week = +b.dataset.w; store.set('vt-week', week); renderTrain(); });
$('#daySel').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; day = b.dataset.d; store.set('vt-day', day); renderTrain(); });
$$('.flip button').forEach(b => b.addEventListener('click', () => side?.face(b.dataset.face)));
const exList = $('#exList');
exList.addEventListener('click', e => { const a = e.target.closest('.anim'); if (a) a.classList.toggle('paused'); });
exList.addEventListener('keydown', e => { const a = e.target.closest('.anim'); if (a && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); a.classList.toggle('paused'); } });
const focusEx = card => side?.highlight(card ? card.dataset.g.split(' ') : DAY_GROUPS(day));
exList.addEventListener('pointerover', e => { const c = e.target.closest('.ex'); if (c) focusEx(c); });
exList.addEventListener('pointerleave', () => focusEx(null));
exList.addEventListener('focusin', e => { const c = e.target.closest('.ex'); if (c) focusEx(c); });

/* ---------- EAT ---------- */
const tray = [null, null, null, null];
function dishImg(f, cls = 'ph') {
  return f.noimg ? `<div class="${cls} none">${f.noimg}</div>` : `<img class="${cls}" src="img/food/${f.id}.jpg" alt="${esc(f.en)}" loading="lazy" decoding="async">`;
}
$('#dishGrid').innerHTML = FOOD.map(f => `<button type="button" class="dish" data-id="${f.id}">
  ${dishImg(f)}
  <span class="d-in"><span class="verdict ${f.v}">${f.vt}</span><span class="zh">${f.zh}</span><span class="en">${esc(f.en)}</span>
  <span class="nums">${f.kcal != null ? `${f.kcal} kcal · ${f.p} g protein${f.src ? `<sup><a href="#r${f.src}">${f.src}</a></sup>` : ''}` : '<span class="gap">[gap] no reliable number</span>'}</span>
  ${f.note ? `<span class="en">${esc(f.note)}</span>` : ''}</span></button>`).join('');

$('#dishGrid').addEventListener('click', e => {
  if (e.target.closest('sup a')) return;
  const b = e.target.closest('.dish'); if (!b) return;
  const f = FOOD_BY[b.dataset.id];
  let slot = f.rice ? 0 : tray.findIndex((x, i) => i > 0 && !x);
  if (slot === -1) slot = 3;
  tray[slot] = f.id; renderTray();
  if (matchMedia('(max-width: 859px)').matches) $('.tray-3d').scrollIntoView({ behavior: 'smooth', block: 'center' });
});
$('#tray').addEventListener('click', e => { const s = e.target.closest('.slot'); if (!s) return; tray[+s.dataset.slot] = null; renderTray(); });
function renderTray() {
  $$('#tray .slot').forEach((s, i) => {
    const id = tray[i];
    const label = i === 0 ? '米饭' : i === 3 ? '素' : '荤';
    s.innerHTML = id ? (FOOD_BY[id].noimg ? `<span style="color:#fff;font-weight:800">${FOOD_BY[id].noimg}</span>` : `<img src="img/food/${id}.jpg" alt="${esc(FOOD_BY[id].zh)}">`) : `<span>${label}</span>`;
  });
  renderMeters();
}
function renderMeters() {
  let k = 0, p = 0, unknown = 0;
  tray.forEach(id => { if (!id) return; const f = FOOD_BY[id]; if (f.kcal == null) unknown++; else { k += f.kcal; p += f.p; } });
  $('#mPro').textContent = `${Math.round(p)} / ${meal.p} g`;
  $('#mKcal').textContent = `${fmt(k)} / ${meal.kcal} kcal`;
  const pb = $('#mProBar'), kb = $('#mKcalBar');
  pb.style.width = Math.min(100, p / meal.p * 100) + '%';
  kb.style.width = Math.min(100, k / meal.kcal * 100) + '%';
  kb.classList.toggle('over', k > meal.kcal * 1.15);
  const hasSkip = tray.some(id => id && FOOD_BY[id].v === 'skip');
  $('#mNote').innerHTML = [
    unknown ? `+ ${unknown} dish${unknown > 1 ? 'es' : ''} without reliable numbers (not counted). Log them in the 薄荷健康 app.` : '',
    hasSkip ? 'That tray has a skip item on it.' : '',
    !tray.some(Boolean) ? 'Try: 卤鸡腿 + 茶叶蛋 + 清炒青菜 + rice.' : '',
  ].filter(Boolean).join(' ');
}

$('#sayList').innerHTML = SAY.map(([zh, py, en]) => `<button type="button" data-zh="${zh}"><span class="zh">${zh}</span><span class="py">${py}</span><span class="en">${en}</span></button>`).join('');
$('#sayList').addEventListener('click', async e => {
  const b = e.target.closest('button'); if (!b) return;
  try { await navigator.clipboard.writeText(b.dataset.zh); b.classList.add('copied'); setTimeout(() => b.classList.remove('copied'), 900); } catch {}
});

$('#dayline').innerHTML = DAYLINE.map(([when, t, imgs, text]) => `<li><div class="pics">${imgs.split('|').map(id => `<img src="img/food/${id}.jpg" alt="" loading="lazy">`).join('')}</div>
  <div class="t"><span class="when">${when}</span><b>${t}</b><p>${text}</p></div></li>`).join('');

/* ---------- TODAY ---------- */
const now = new Date();
const todayKey = 'vt-check-' + now.toISOString().slice(0, 10);
$('#todayDate').textContent = now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const CHECKS = ['Trained, or walked on a rest day', 'Protein: 4 meals of ~35 g', 'Near calorie target, no sweet drinks', '8–10k steps', 'Creatine 3–5 g (if you take it)', 'In bed 8+ hours', 'Logged weights and reps'];
let done = {}; try { done = JSON.parse(store.get(todayKey) || '{}'); } catch {}
$('#checks').innerHTML = CHECKS.map((c, i) => `<li><label for="c${i}"><input type="checkbox" id="c${i}" ${done[i] ? 'checked' : ''}>${c}</label></li>`).join('');
function ring() {
  const n = CHECKS.filter((_, i) => done[i]).length;
  $('#ringNum').textContent = `${n}/${CHECKS.length}`;
  $('#ringBar').style.strokeDasharray = `${n / CHECKS.length * 100} 100`;
}
$('#checks').addEventListener('change', e => { const i = +e.target.id.slice(1); done[i] = e.target.checked; store.set(todayKey, JSON.stringify(done)); ring(); });

/* ---------- SCIENCE ---------- */
$('#findings').innerHTML = FINDINGS.map(([big, t, p, r]) => `<div class="finding rv"><span class="big">${big}</span><b>${t}</b><p>${p}<sup><a href="#r${r}">${r}</a></sup></p></div>`).join('');
$('#refs').innerHTML = REFS.map((r, i) => `<li id="r${i + 1}">${esc(r[0])} <a href="${r[1]}" target="_blank" rel="noopener">link</a></li>`).join('');
fetch('img/food/credits.json').then(r => r.json()).then(c => {
  $('#credits').innerHTML = Object.entries(c).map(([k, v]) => `<li>${esc(k)}: “${esc(v.title)}” by ${esc(v.artist || 'unknown')}, ${esc(v.license)} — <a href="${v.url}" target="_blank" rel="noopener">source</a></li>`).join('');
}).catch(() => {});

/* ---------- Motion & nav ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); e.target.classList.remove('pre'); io.unobserve(e.target); }
}), { rootMargin: '0px 0px -10% 0px' });
io.observe(bars);
$$('.rv').forEach(el => { if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('pre'); io.observe(el); } });

const links = $$('.nav a');
const secObs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main .sec').forEach(s => secObs.observe(s));

calc(); renderTrain(); renderTray(); ring();
