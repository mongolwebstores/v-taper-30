// Built-in coach: offline answers, form checks and a review of your logs.
// Every "science" line points at a source in the Sources list (#rN). Where the plan's
// sources don't cover a question, the answer says so instead of guessing.

/* ---------- Q&A knowledge base ----------
   keys: words/phrases that suggest this question (lowercase). a: short answer.
   why: the science in simple words. do: what to do. r: source numbers. gap: true when no source covers it. */
export const KB = [
  { t: 'Can ab exercises burn belly fat?', keys: ['belly', 'stomach', 'abs fat', 'belly fat', 'spot', 'lose belly', 'losing my belly', 'not losing belly', 'my belly', 'gut', 'love handles', 'six pack', 'sit up', 'crunches burn'],
    a: 'No. You can\'t choose where fat comes off.',
    why: 'In a 6-week trial, people did ab exercises 5 days a week. Their abs got stronger, but belly fat and waist size didn\'t change. A 2022 review of many studies found the same for training any one body part.',
    do: 'Keep the calorie deficit. The belly shrinks as your total body fat goes down. Keep ab work for a strong core.', r: [9, 10] },
  { t: 'How fast should I lose weight?', keys: ['how fast', 'lose weight', 'weight loss', 'kg per week', 'too fast', 'faster', 'speed', 'rate'],
    a: 'About 0.5 kg a week (around 0.7% of your body weight).',
    why: 'Athletes who lost weight slowly kept more muscle and gained more strength than athletes who lost it fast. Both groups lifted 4 times a week.',
    do: 'Check your weekly average weight. Losing more than 1 kg a week? Eat 150 kcal more.', r: [6] },
  { t: 'How much protein do I need?', keys: ['protein', 'how much protein', 'grams of protein', 'g protein'],
    a: 'About 2 g per kg of body weight. For you that\'s about 145 g a day.',
    why: 'In a big review of studies, muscle gain stopped improving above about 1.6 g/kg. Lean people eating less than they burn may need a bit more, so 2 g/kg covers both.',
    do: 'Split it into 4 meals of about 35 g. At the canteen, order two meat or egg dishes (两荤).', r: [7, 8] },
  { t: 'Do I need protein powder (whey)?', keys: ['whey', 'protein powder', 'shake', 'supplement protein', '蛋白粉'],
    a: 'No. It only helps you reach your protein target.',
    why: 'Protein supplements help only a little: about 0.3 kg extra lean mass on average across 49 studies. Total protein per day is what counts.',
    do: 'Eat food first. Use whey only on days you can\'t reach 145 g.', r: [7] },
  { t: 'Should I take creatine? Is it safe?', keys: ['creatine', '肌酸', 'kidney', 'hair loss', 'bald'],
    a: 'Optional, but it has the best evidence of any supplement. Take 3–5 g a day.',
    why: 'Creatine raises the creatine stored in your muscles, which helps strength and training results. Reviews call it safe at 3–5 g a day for healthy people. They also looked at fears about kidney damage and hair loss and didn\'t find good evidence for them.',
    do: 'Take 3–5 g of creatine monohydrate a day, at any time. No loading phase needed.', r: [11, 12] },
  { t: 'Should I train to failure?', keys: ['failure', 'to failure', 'last rep', 'until i cant', 'rir', 'reps in reserve', 'how hard'],
    a: 'Get close to failure, but you don\'t need to reach it on every set.',
    why: 'A review of 15 studies found a small benefit to training close to failure. Going all the way to failure didn\'t clearly beat stopping a rep or two short.',
    do: 'Follow the week\'s RIR: 3 reps left in week 1, then 2, then 1–2, then 1. Go to failure only on the last isolation set in week 4.', r: [3] },
  { t: 'What does RIR mean?', keys: ['what is rir', 'rir mean', 'reps in reserve', 'reps left'],
    a: 'RIR means reps in reserve: how many more clean reps you could still do.',
    why: 'It lets you control how hard a set is without going to failure every time. Training close to failure is what grows muscle.',
    do: 'At the end of a set, ask yourself: "How many more could I do with good form?" That number is your RIR.', r: [3] },
  { t: 'How long should I rest between sets?', keys: ['rest', 'rest time', 'between sets', 'how long rest', 'minutes'],
    a: '2–3 minutes on the big lifts, 60–90 seconds on smaller exercises.',
    why: 'Trained men who rested 3 minutes got stronger and grew more than men who rested 1 minute. Longer rest lets you lift more weight on the next set.',
    do: 'Use a timer. Don\'t cut rests short on the first lift of the day.', r: [4] },
  { t: 'How many sets should I do?', keys: ['how many sets', 'sets per week', 'volume', 'more sets', 'too many sets'],
    a: 'About 10–20 hard sets per muscle per week.',
    why: 'More weekly sets meant more muscle growth, at least up to about 10. Going above 20 hasn\'t clearly beaten 12–20.',
    do: 'The plan already does this. Back gets 20 sets, then 24 from week 3; side delts 14, then 18.', r: [1, 2] },
  { t: 'Can I build muscle and lose fat at the same time?', keys: ['same time', 'recomp', 'build muscle and lose fat', 'skinny fat', 'both'],
    a: 'Yes, especially at your stage, as long as you lose weight slowly.',
    why: 'In the slow weight-loss study, athletes who lost about 0.7% of their weight a week gained lean mass while losing fat. They lifted 4 times a week.',
    do: 'Keep the small deficit, about 2 g/kg of protein, and keep adding reps or weight every week.', r: [6, 7] },
  { t: 'Why do I have to sleep 8 hours?', keys: ['sleep', 'tired', 'late night', 'bed', 'insomnia', 'stay up', 'all nighter'],
    a: 'Short sleep makes you lose muscle instead of fat.',
    why: 'People on the same diet slept 5.5 hours for two weeks, then 8.5 hours for two weeks. With short sleep, 55% less of the weight they lost was fat. They lost more muscle and were hungrier.',
    do: 'Aim for 8 hours in bed. After a bad night, still train, but do one fewer set per exercise.', r: [5] },
  { t: 'I slept badly. Should I still train?', keys: ['slept badly', 'bad sleep', 'no sleep', 'didnt sleep', 'tired today'],
    a: 'Yes, but do a lighter session.',
    why: 'Missing one session doesn\'t matter much. The real risk is sleeping badly for weeks, because that makes you lose muscle instead of fat.',
    do: 'Do your normal weights, one fewer set per exercise, and stop with 3 reps left. Go to bed early tonight.', r: [5] },
  { t: 'I missed a workout. What now?', keys: ['missed', 'skip', 'skipped', 'couldnt go', 'no time', 'busy', 'exam'],
    a: 'Just do the next session in the order. Don\'t try to make it up.',
    why: 'Muscle responds to what you do over weeks. One missed day barely changes your weekly sets.',
    do: 'If you\'re busy all week, do 3–4 sessions instead of 6. On a short day, do only the first 2 exercises.', r: [1] },
  { t: 'Can I train only 3–4 days a week?', keys: ['3 days', '4 days', 'three days', 'four days', 'less days', 'fewer days', 'not 6'],
    a: 'Yes. You\'ll progress a bit more slowly, but it still works.',
    why: 'Growth tracks the hard sets per muscle per week. 10 or more is a good target, and 3–4 days can still get you there.',
    do: 'Rotate Push, Pull, Legs and keep going in order. Never skip Pull: it builds the V.', r: [1] },
  { t: 'I\'m very sore. Can I train?', keys: ['sore', 'doms', 'pain after', 'muscles hurt', 'stiff'],
    a: 'Usually yes. Soreness is normal in the first two weeks.',
    why: 'The plan\'s sources don\'t cover soreness itself. Coaches usually say that sore muscles can still train if your form stays good.',
    do: 'Warm up and use the weights from last week. If it hurts in a joint or feels sharp, stop that exercise.', gap: true },
  { t: 'Something hurts in my joint', keys: ['joint', 'sharp pain', 'shoulder hurts', 'knee hurts', 'back hurts', 'injury', 'injured', 'pain'],
    a: 'Stop that exercise and use the listed alternative.',
    why: 'A muscle burning during a set is normal. Sharp pain or pain in a joint is not.',
    do: 'Switch to the "No machine free?" option. If it lasts more than a few days, or it hurts outside the gym, see a doctor.', gap: true },
  { t: 'I\'m not losing weight', keys: ['not losing', 'stuck weight', 'plateau weight', 'scale not moving', 'no change weight', 'weight same'],
    a: 'Give it 2 weeks of weekly averages. Then eat 150 kcal less a day.',
    why: 'The calorie target is an estimate from an equation, and those are often off by about 10%. Your scale shows your real number.',
    do: 'Weigh every morning and compare weekly averages. Still flat after 2 weeks? Eat a bit less rice or skip one snack.', r: [13] },
  { t: 'My weight went up after I started', keys: ['weight went up', 'gained weight', 'heavier', 'weight increase'],
    a: 'In week 1, that\'s usually water, not fat.',
    why: 'The plan\'s sources don\'t measure this directly. Day-to-day weight swings with water, salt and food in your stomach, which is why the plan uses weekly averages.',
    do: 'Compare this week\'s average with next week\'s, not single days. Check your waist measurement too.', gap: true },
  { t: 'What should I eat at the canteen?', keys: ['canteen', '食堂', 'what to eat', 'what to order', 'lunch', 'dinner', 'tray', 'meal'],
    a: 'Two meat or egg dishes, one vegetable and one measured bowl of rice.',
    why: 'Each meal needs about 35 g of protein to reach 145 g a day. A braised chicken leg (卤鸡腿) gives about 16 g per 100 g. Tomato and egg (番茄炒蛋) gives only about 4 g per 100 g, so count it as a vegetable.',
    do: 'Use the tray builder in the Eat section. Say 少油 (less oil) and 米饭少一点 (a bit less rice).', r: [15, 16] },
  { t: 'Is rice bad for losing fat?', keys: ['rice', 'carbs', 'carb', 'noodles', 'bread', '米饭'],
    a: 'No. Too much of it is the problem.',
    why: 'Fat loss comes from eating fewer total calories than you burn. One 200 g bowl of rice is about 230 kcal and fuels your training.',
    do: 'Have one bowl at lunch and one at dinner on training days. Have half on rest days.', r: [14] },
  { t: 'Is Nanjing salted duck (盐水鸭) OK?', keys: ['duck', '盐水鸭', 'salted duck'],
    a: 'Yes, as a small portion with the skin off.',
    why: 'It has about 16.6 g of protein but 26 g of fat per 100 g, and a lot of salt.',
    do: 'Eat a few pieces as one of your two meat dishes, not a whole plate.', r: [18] },
  { t: 'Is duck blood soup (鸭血粉丝汤) OK?', keys: ['duck blood', '鸭血粉丝汤', 'soup', 'vermicelli'],
    a: 'Yes, as a light meal.',
    why: 'A small bowl is about 278 kcal and 15 g of protein, which is less than one meal\'s 35 g.',
    do: 'Add 2 tea eggs to it.', r: [17] },
  { t: 'Is tomato and egg (番茄炒蛋) a good protein?', keys: ['tomato', '番茄炒蛋', 'egg dish'],
    a: 'No. It\'s mostly tomato.',
    why: 'It has about 3.8 g of protein per 100 g. A tea egg alone has about 6 g.',
    do: 'Count it as your vegetable, then add a real protein dish.', r: [16, 14] },
  { t: 'Can I drink milk tea / bubble tea?', keys: ['milk tea', 'bubble tea', '奶茶', 'cola', 'juice', 'sweet drink', 'coke'],
    a: 'Better to skip it during these 30 days.',
    why: 'Sweet drinks add calories but no protein and don\'t fill you up. The plan\'s sources don\'t give a number for canteen milk tea.',
    do: 'Choose unsweetened soy milk (无糖豆浆), milk or water instead.', gap: true },
  { t: 'Can I have a cheat meal or eat out with friends?', keys: ['cheat', 'party', 'friends', 'hotpot', 'bbq', '烧烤', 'eat out', 'birthday'],
    a: 'Yes. One meal doesn\'t ruin a week.',
    why: 'Fat loss depends on your average intake over weeks, not one meal.',
    do: 'Pick lean meat first, skip the sweet drinks, and get back to the plan at the next meal. Don\'t skip the next day\'s meals to make up for it.', gap: true },
  { t: 'What about alcohol?', keys: ['alcohol', 'beer', 'drink', 'baijiu', '啤酒'],
    a: 'The plan\'s sources don\'t cover alcohol. Less is better.',
    why: 'Alcohol adds calories with no protein, and it often comes with greasy food.',
    do: 'If you drink, keep it to one night and have a lean-protein meal with it.', gap: true },
  { t: 'Does eating late at night make me fat?', keys: ['late', 'night eating', 'eat at night', 'midnight', 'after 8'],
    a: 'What matters is your total for the day, not the clock.',
    why: 'Energy balance (calories in vs calories burned) matters more than meal timing. Late takeout is a problem only because it\'s usually extra calories.',
    do: 'If you eat late, make it a protein snack: chicken breast, eggs or milk.', r: [8] },
  { t: 'Should I skip breakfast or do fasting?', keys: ['breakfast', 'fasting', 'intermittent', 'skip meal'],
    a: 'You can, but it makes 145 g of protein harder to reach.',
    why: 'The plan\'s sources compare protein amounts, not meal timing. Spreading protein over 4 meals makes the daily target easier.',
    do: 'Keep a quick breakfast: 3 tea eggs and milk.', gap: true },
  { t: 'Wide grip or close grip lat pulldown?', keys: ['grip', 'wide grip', 'close grip', 'pulldown grip', 'underhand'],
    a: 'Use an overhand grip about 1–1.5× shoulder width. The exact width matters little.',
    why: 'An overhand grip worked the lats best at every width tested. A 2025 study found that changing the grip barely changed how much the lats worked.',
    do: 'Choose the grip that lets you pull the most weight with your elbows going down to your sides.', r: [21, 22] },
  { t: 'Which machine is best for the back / V-shape?', keys: ['best back', 'back exercise', 'v shape', 'v-shape', 'wider', 'lats', 'width', 'machine back'],
    a: 'Lat pulldowns or pull-ups for width, chest-supported rows for thickness, and lateral raises for shoulder width.',
    why: 'Width comes from the lats and side delts. The plan gives back 20+ sets a week and side delts 14+, because more weekly sets means more growth.',
    do: 'Start Pull days with pulldowns or pull-ups while you\'re fresh, and add weight every week.', r: [1, 21] },
  { t: 'Best incline angle for upper chest?', keys: ['incline', 'angle', 'upper chest', 'degree', 'chest best', 'best chest'],
    a: 'About 30°.',
    why: 'Of 5 bench angles tested, 30° made the upper chest work hardest. Steeper angles shift the work to your shoulders.',
    do: 'Set the bench to the second or third notch (about 30°), and start Push days with this.', r: [23] },
  { t: 'Cable or dumbbell lateral raise?', keys: ['lateral raise', 'side delt', 'shoulder width', 'cable or dumbbell', 'delts'],
    a: 'Either one. They grew the side delts about the same.',
    why: 'In an 8-week study, each person trained one arm with cables and the other with dumbbells. Both arms grew about the same.',
    do: 'Use whichever is free. Lead with your elbow and stop at shoulder height.', r: [24] },
  { t: 'What is the pump? Do I need it?', keys: ['pump', 'burn', 'drop set', 'high reps', 'veins'],
    a: 'It\'s nice, but it isn\'t the main reason muscles grow.',
    why: 'Muscle grows mostly from hard, heavy sets. The pump (blood and burn) may add a little.',
    do: 'Do the heavy lifts first. Pump work goes at the end of the session, and you\'ll use drop sets in week 4.', r: [27] },
  { t: 'Why overhead triceps extensions?', keys: ['triceps', 'overhead', 'arms bigger', 'tricep'],
    a: 'They stretch the long head of the triceps, and that grew it more.',
    why: 'In a 12-week study, the arm trained overhead grew its triceps clearly more than the arm trained with pushdowns, even with lighter weights.',
    do: 'Keep your elbows by your ears and let your hands drop deep behind your head.', r: [26] },
  { t: 'What does "train at the stretch" mean?', keys: ['stretch', 'lengthened', 'partial', 'range of motion', 'full range', 'rom'],
    a: 'Use a deep range of motion, especially at the stretched end of the movement.',
    why: 'Training a muscle when it\'s long looks promising for growth, but the evidence is still early.',
    do: 'Let the bar or handles go all the way up on pulldowns, and open deep on flyes. Control the lowering.', r: [25, 26] },
  { t: 'How much weight should I start with?', keys: ['start weight', 'starting weight', 'how much weight', 'what weight', 'how heavy', 'kg', 'weight to use', 'first time'],
    a: 'Find it in your first session, using reps left in the tank.',
    why: 'Working weight depends on how strong you are, so no plan can give you the right kg. A weight that leaves about 3 reps in reserve in week 1 is enough to grow, and it lets you learn the movement.',
    do: 'Do a set of 8 with a light weight. Easy? Go up one step. Repeat until 8 reps leaves you about 3 reps in reserve. Log that weight on the exercise card.', r: [3] },
  { t: 'When should I add weight?', keys: ['add weight', 'increase weight', 'go heavier', 'progress', 'progression', 'when heavier'],
    a: 'When you hit the top of the rep range on all sets. That\'s called double progression.',
    why: 'Muscles grow when the work keeps getting a bit harder. Adding reps first, then weight, keeps your form clean.',
    do: 'For example, with 3 × 8–12: once every set gets 12, add the smallest weight step and go back to 8. The log on each card tells you this automatically.', r: [1, 3] },
  { t: 'I\'m stuck on the same weight', keys: ['stuck', 'stall', 'stalled', 'plateau', 'not getting stronger', 'same weight'],
    a: 'Check sleep, protein and rest times first.',
    why: 'Short sleep and short rests both reduce how much you can lift. In the studies, 3-minute rests gave more strength than 1-minute rests.',
    do: 'Rest a full 2–3 minutes, then aim for just +1 rep. If you\'re stuck 3 sessions in a row, drop the weight 10% and build back up.', r: [4, 5] },
  { t: 'Do I need to warm up?', keys: ['warm up', 'warmup', 'warm-up', 'stretch before'],
    a: 'Yes, 2 light sets before your first exercise.',
    why: 'The plan\'s sources don\'t test warm-ups. Coaches use them to practise the movement before the heavy sets.',
    do: 'Do 1 set of 10 at about 50% of your working weight, then 1 set of 5 at about 75%.', gap: true },
  { t: 'Do I really need to train legs?', keys: ['legs', 'leg day', 'skip legs', 'why legs'],
    a: 'Yes.',
    why: 'Your legs are your biggest muscles, so training them uses a lot of energy, which helps the deficit. It also keeps your build balanced under a wider upper body.',
    do: 'Keep the two Legs days at moderate volume. They\'re already set that way.', gap: true },
  { t: 'Does cardio kill my gains?', keys: ['cardio', 'running', 'run', 'treadmill', 'hiit', 'walking', 'steps'],
    a: 'Not at this amount.',
    why: 'The plan\'s sources don\'t compare types of cardio. Easy walking was chosen because it barely affects your recovery for lifting.',
    do: 'Walk 8–10k steps a day (a coaching target) and do 20–25 minutes of easy incline walking after 3 sessions.', gap: true },
  { t: 'When will I see abs?', keys: ['see abs', 'abs show', 'six pack', 'visible abs'],
    a: 'Probably not in 30 days. Abs show when overall body fat is low.',
    why: 'Fat comes off the whole body, not one spot.',
    do: 'Track your waist measurement. Expect visible abs after a few months, not weeks.', r: [9, 10] },
  { t: 'How do I track progress?', keys: ['track', 'measure', 'progress', 'how do i know', 'working', 'results'],
    a: 'Use 4 measures, not the mirror.',
    why: 'Single weigh-ins jump around. Your weekly average weight, waist, photos and lifts show the real trend.',
    do: 'Every Sunday: average your weight for the week, measure your waist at the belly button, take photos in the same light, and log your best sets.', gap: true },
  { t: 'Is training 6 days too much at 18?', keys: ['too much', 'overtraining', '6 days', 'six days', 'every day', 'age', '18', 'young'],
    a: 'Not if you eat and sleep enough.',
    why: 'Each muscle is trained twice a week, so it gets 2–3 days of rest. Short sleep is the bigger risk.',
    do: 'If your lifts drop two sessions in a row and you feel worn out, take an extra rest day.', r: [5] },
  { t: 'What about fat burners and other supplements?', keys: ['fat burner', 'pills', 'l-carnitine', 'bcaa', 'pre workout', 'preworkout', 'test booster'],
    a: 'Not part of this plan.',
    why: 'The plan\'s sources only support creatine (and whey for convenience). Others weren\'t researched here.',
    do: 'Spend the money on food: eggs, milk and chicken breast.', gap: true },
  { t: 'How much water should I drink?', keys: ['water', 'hydration', 'drink water'],
    a: 'The plan\'s sources don\'t cover water.',
    why: 'Nothing in the sources gives a water target.',
    do: 'Drink with each meal and during training. Pale yellow urine is a common rule of thumb.', gap: true },
  { t: 'Does lifting stop me growing taller?', keys: ['taller', 'tall', 'height', 'growth plates', 'stunt', 'grow taller', 'will i grow'],
    a: 'The plan\'s sources don\'t cover this.',
    why: 'Nothing in the sources looks at height.',
    do: 'If you\'re worried, ask a doctor. Lift with good form and controlled weights either way.', gap: true },
  { t: 'What happens after day 30?', keys: ['after 30', 'day 31', 'next month', 'deload', 'after the plan', 'continue'],
    a: 'Take one lighter week, then start another block.',
    why: 'A full V-shape takes months. The 30 days build the habits and give you starting numbers.',
    do: 'For one week, do half the sets at the same weights. Then repeat the block with the weights from your log.', gap: true },
];

/* ---------- Form checks by movement pattern ---------- */
export const FORM = {
  press: { good: ['Shoulder blades squeezed together and pressed into the bench', 'Lower slowly until you feel a chest stretch', 'Feet planted and wrists stacked over your elbows'],
    bad: ['Elbows flared straight out to the sides (hard on the shoulders)', 'Bouncing the weight off your chest', 'Half reps that stop far above the chest'],
    why: 'A deep, controlled stretch makes the chest do the work. Bouncing lets momentum do it instead.', r: [23, 25] },
  fly: { good: ['Elbows slightly bent and fixed', 'Open wide until the chest stretches', 'Squeeze the handles together'],
    bad: ['Bending the elbows so it turns into a press', 'Going so heavy that the range gets short'],
    why: 'Flyes load the chest when it\'s stretched, and training at long lengths looks good for growth.', r: [25] },
  pulldown: { good: ['Chest up, leaning back slightly', 'Drive your elbows down to your sides', 'Full stretch at the top on every rep'],
    bad: ['Swinging your body to move the weight', 'Pulling the bar behind your neck', 'Arms doing the work and the elbows staying high'],
    why: 'Lats move your upper arm down. Thinking "elbows down" makes them work, whatever the grip.', r: [21, 22] },
  row: { good: ['Chest on the pad, or sitting tall', 'Reach forward to stretch, then pull your elbows back', 'Pause 1 s with your shoulder blades squeezed'],
    bad: ['Yanking with your lower back', 'Shrugging your shoulders up to your ears', 'Cutting the stretch short'],
    why: 'Controlled rows with a full stretch train the back. Swinging moves the work to your lower back.', r: [25] },
  lateral: { good: ['Lead with your elbows, pinkies level with your thumbs', 'Stop around shoulder height', 'Lower slowly over 2 s'],
    bad: ['Swinging the weight up with your hips', 'Shrugging (that works the traps, not the delts)', 'Weight so heavy you only move it a few cm'],
    why: 'The side delt lifts your arm out to the side. Cables and dumbbells grew it about the same, so clean reps matter more than the tool.', r: [24] },
  reardelt: { good: ['Arms long, move only at the shoulder', 'Light weight with a slow squeeze'],
    bad: ['Rowing with bent elbows', 'Going too heavy'],
    why: 'Rear delts are small. Control matters more than load.', gap: true },
  curl: { good: ['Elbows still by your sides', 'Lower slowly to a full stretch'],
    bad: ['Swinging your back to lift', 'Elbows drifting forward'],
    why: 'Biceps bend the elbow. Body swing moves the work away from them.', gap: true },
  triceps: { good: ['Elbows fixed (by your ears or by your sides)', 'Full stretch, then full lockout'],
    bad: ['Elbows flaring and moving', 'Short, bouncy reps'],
    why: 'The overhead position stretches the long head of the triceps, and that grew more muscle.', r: [26] },
  squat: { good: ['Brace your stomach before each rep', 'Knees track over your toes', 'Go as deep as you control with a neutral back'],
    bad: ['Heels lifting off', 'Lower back rounding at the bottom', 'Knees caving inward'],
    why: 'Deep, controlled reps train the legs through a long range.', r: [25] },
  hinge: { good: ['Push your hips back, bar close to your legs', 'Flat back the whole time', 'Stop at the hamstring stretch'],
    bad: ['Rounding your back to reach lower', 'Squatting the weight instead of pushing your hips back'],
    why: 'Romanian deadlifts load the hamstrings at a stretch, which is good for growth.', r: [25] },
  legiso: { good: ['Control both ways', 'Pause 1 s at the hardest point'],
    bad: ['Swinging the pad with momentum', 'Lifting your hips off the seat'],
    why: 'Machines isolate one muscle, so clean reps put all the work on it.', gap: true },
  calf: { good: ['Full stretch at the bottom with a 1 s pause', 'Rise all the way onto your toes'],
    bad: ['Bouncing quick half reps'],
    why: 'Calves respond to a full, paused range more than bouncing.', gap: true },
  core: { good: ['Curl your ribs toward your hips', 'Breathe out on the hard part'],
    bad: ['Pulling with your arms or hips', 'Doing it to burn belly fat (it won\'t)'],
    why: 'Ab work makes the core stronger, but it doesn\'t remove belly fat.', r: [9] },
};
export function patternOf(name) {
  const n = name.toLowerCase();
  if (/fly|pec deck|butterfly/.test(n) && !/reverse/.test(n)) return 'fly';
  if (/reverse pec|face pull/.test(n)) return 'reardelt';
  if (/press|dips/.test(n) && !/leg press/.test(n)) return 'press';
  if (/pulldown|pull-up|pullup/.test(n)) return 'pulldown';
  if (/row/.test(n)) return 'row';
  if (/lateral raise/.test(n)) return 'lateral';
  if (/curl/.test(n) && !/leg curl/.test(n)) return 'curl';
  if (/triceps/.test(n)) return 'triceps';
  if (/squat|leg press/.test(n)) return 'squat';
  if (/romanian|deadlift|hip thrust/.test(n)) return 'hinge';
  if (/calf/.test(n)) return 'calf';
  if (/crunch|plank|leg raise/.test(n)) return 'core';
  return 'legiso';
}

/* ---------- Matching ---------- */
const STOP = new Set('i me my a an the is it to do does should can how what when why of for in on and or with be am are this that you your get much many'.split(' '));
const norm = s => s.toLowerCase().replace(/[’']/g, '').replace(/[^\p{L}\p{N}\s-]/gu, ' ').replace(/\s+/g, ' ').trim();
export function answer(q) {
  const qn = ' ' + norm(q) + ' ';
  const words = qn.split(' ').filter(w => w && !STOP.has(w));
  const scored = KB.map((e, i) => {
    let s = 0;
    for (const k of e.keys) if (qn.includes(k.includes(' ') || /[^\x00-\x7f]/.test(k) ? k : ' ' + k)) s += k.includes(' ') ? 3 : 2;
    const tw = new Set(norm(e.t).split(' ').filter(w => !STOP.has(w)));
    for (const w of words) if (tw.has(w)) s += 1;
    return { i, s };
  }).sort((a, b) => b.s - a.s);
  return { best: scored[0].s >= 2 ? KB[scored[0].i] : null, related: scored.slice(scored[0].s >= 2 ? 1 : 0, 4).filter(x => x.s >= 1).map(x => KB[x.i]) };
}

/* ---------- Weight advice (double progression) ---------- */
export function parseRange(rx) {
  const right = rx.split('×')[1] || '';
  if (/\bs\b/.test(right)) return null; // timed (plank)
  const m = right.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (m) return { lo: +m[1], hi: +m[2] };
  const one = right.match(/(\d+)/);
  return one ? { lo: +one[1], hi: +one[1] } : null;
}
export function stepFor(name) {
  const n = name.toLowerCase();
  if (/pull-up|dips/.test(n)) return 'less assistance (or +2.5 kg on a belt)';
  if (/dumbbell|lateral raise(?!.*cable)/.test(n) && !/cable/.test(n)) return 'the next dumbbell up';
  if (/machine|cable|pulldown|pec deck|butterfly|leg curl|leg extension|crunch|pushdown|row|face pull|reverse/.test(n)) return 'one pin down the stack';
  return '+2.5 kg';
}
export function advise(name, rx, entries, targetRir) {
  const range = parseRange(rx);
  if (!range) return null;
  if (!entries?.length) {
    return { tone: 'info', text: `First time: start light, do 8 reps, go up one step until 8 reps leaves ~${Math.round(targetRir)} in the tank. Log that set.` };
  }
  const last = entries[entries.length - 1];
  const rir = last.rir === '' || last.rir == null ? null : +last.rir;
  const step = stepFor(name);
  if (last.reps >= range.hi && (rir == null || rir >= targetRir - 0.5)) return { tone: 'up', text: `Hit ${range.hi}. Next time: ${step}, aim for ${range.lo}+ reps.` };
  if (last.reps >= range.hi) return { tone: 'hold', text: `Hit ${range.hi} but at RIR ${rir} (target ${targetRir}). Same ${last.kg} kg, clean reps at the target effort.` };
  if (last.reps < range.lo) return { tone: 'down', text: `Below ${range.lo} reps: too heavy. Go back one step and own the range.` };
  if (rir != null && rir >= targetRir + 2) return { tone: 'up', text: `${rir} reps left is too easy for this week. Add 2 reps or ${step}.` };
  return { tone: 'hold', text: `Same ${last.kg} kg. Aim for ${Math.min(last.reps + 1, range.hi)} reps.` };
}
// Epley estimate (kg × (1 + reps/30)) only to compare sessions, never shown as a max.
const est = e => e.kg * (1 + e.reps / 30);

/* ---------- Review of the logs ---------- */
export function review(logs, checksByDay) {
  const good = [], fix = [];
  const names = Object.keys(logs).filter(n => logs[n]?.length);
  let up = 0, flat = [];
  for (const n of names) {
    const L = logs[n];
    if (L.length >= 2) {
      const a = est(L[L.length - 2]), b = est(L[L.length - 1]);
      if (b > a + 0.01) up++;
      if (L.length >= 3 && est(L[L.length - 1]) <= est(L[L.length - 3]) + 0.01) flat.push(n);
    }
  }
  const days = Object.keys(checksByDay).sort().slice(-7);
  const count = idx => days.filter(d => checksByDay[d]?.[idx]).length;
  const trained = count(0), protein = count(1), kcal = count(2), steps = count(3), sleep = count(5), logged = count(6);

  if (!names.length && !days.length) {
    return { empty: true, good, fix };
  }
  if (names.length && !names.some(n => logs[n].length >= 2)) good.push({ t: `Logging started: ${names.length} exercise${names.length > 1 ? 's' : ''} so far.`, why: 'After the next session I can compare and tell you which lifts went up.', gap: true });
  if (up) good.push({ t: `${up} exercise${up > 1 ? 's' : ''} went up since last time.`, why: 'Adding reps or weight week after week is what makes muscle keep growing.', r: [1, 3] });
  if (flat.length) fix.push({ t: `No progress in 3 sessions: ${flat.slice(0, 3).join(', ')}.`, why: 'Before blaming the program, check rest (3 min beat 1 min for strength) and sleep.', do: 'Rest a full 2–3 min and aim for +1 rep. Still stuck? Drop 10% and build back.', r: [4, 5] });
  if (days.length) {
    const n = days.length;
    if (trained >= Math.min(5, n)) good.push({ t: `Trained or walked on ${trained} of the last ${n} days.`, why: 'Consistency keeps your weekly hard sets high, which drives growth.', r: [1] });
    else if (n >= 3) fix.push({ t: `Only ${trained} of the last ${n} days trained.`, why: 'Growth follows weekly hard sets. 3–4 sessions still work.', do: 'Book the next session in your calendar. Short on time? Do the first 2 exercises only.', r: [1] });
    if (protein >= Math.ceil(n * 0.7)) good.push({ t: `Protein hit on ${protein}/${n} days.`, why: 'About 1.6–2 g/kg of protein supports muscle while you eat less.', r: [7, 8] });
    else fix.push({ t: `Protein hit on only ${protein}/${n} days.`, why: 'Too little protein while eating less risks losing muscle instead of fat.', do: 'Order 两荤 every meal and keep tea eggs or a chicken-breast pack as backup.', r: [7, 8] });
    if (sleep >= Math.ceil(n * 0.7)) good.push({ t: `8 h in bed on ${sleep}/${n} nights.`, why: 'With 8.5 h sleep, more of the weight lost was fat than with 5.5 h.', r: [5] });
    else fix.push({ t: `8 h sleep on only ${sleep}/${n} nights.`, why: 'With short sleep, 55% less of the weight lost was fat, and more muscle was lost.', do: 'Set a phone-off time 30 min before bed. On short nights, train lighter.', r: [5] });
    if (kcal < Math.ceil(n * 0.6)) fix.push({ t: `Calories near target on ${kcal}/${n} days.`, why: 'The belly only shrinks with an overall deficit; ab work alone doesn\'t.', do: 'Easiest wins: less rice (米饭少一点), no milk tea, no late takeout.', r: [9, 10] });
    if (steps >= Math.ceil(n * 0.7)) good.push({ t: `Steps done on ${steps}/${n} days.`, why: 'Daily walking adds to the deficit without hurting recovery (coaching target).', gap: true });
    if (logged < Math.ceil(n * 0.5) && trained > 0) fix.push({ t: 'Few workouts logged.', why: 'Without the numbers you can\'t tell if you\'re adding reps or weight, and that\'s what drives growth.', do: 'Log your top set on each exercise card. It takes 5 seconds.', r: [1] });
  }
  return { empty: false, good, fix };
}
