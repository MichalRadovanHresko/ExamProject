const range = document.getElementById('moodRange');
const moodLabel = document.getElementById('moodLabel');
const continueBtn = document.getElementById('continueBtn');
const resultBox = document.getElementById('resultBox');
const prayerText = document.getElementById('prayerText');
const verseText = document.getElementById('verseText');
const breathText = document.getElementById('breathText');
const journalPrompt = document.getElementById('journalPrompt');

function moodCategory(val) {
  const v = Number(val);
  if (v <= 20) return 'heavy';
  if (v <= 40) return 'restless';
  if (v <= 60) return 'neutral';
  if (v <= 80) return 'grateful';
  return 'joyful';
}

function labelFor(cat) {
  switch (cat) {
    case 'heavy': return 'Mood: heavy day';
    case 'restless': return 'Mood: restless';
    case 'neutral': return 'Mood: neutral';
    case 'grateful': return 'Mood: grateful';
    case 'joyful': return 'Mood: joyful';
    default: return 'Mood';
  }
}

function suggestions(cat) {
  const data = {
    heavy: {
      prayer: 'Lord, You know my burden. Give me strength for today and rest in You.',
      verse: 'Psalm 34:18 — The Lord is close to the brokenhearted.',
      breath: '4-4-6: inhale 4, hold 4, exhale 6 (×5).',
      journal: 'What small step toward peace can I take today?'
    },
    restless: {
      prayer: 'Jesus, calm my anxiety. Teach me trust in every step.',
      verse: 'Philippians 4:6–7 — Peace beyond understanding.',
      breath: 'Box breathing 4-4-4-4 (×4).',
      journal: 'What can I surrender to God instead of trying to control?'
    },
    neutral: {
      prayer: 'Thank You for this ordinary day. Help me notice small gifts.',
      verse: 'Psalm 23 — The Lord is my shepherd.',
      breath: 'Even breathing 5–5 (3 min).',
      journal: 'What simple gratitude can I practice right now?'
    },
    grateful: {
      prayer: 'Father, thank You for Your goodness. Let my gratitude bless someone today.',
      verse: 'James 1:17 — Every good gift is from above.',
      breath: 'Inhale 4, exhale 6 with a gentle smile (×5).',
      journal: 'Who can I thank or serve in a small way today?'
    },
    joyful: {
      prayer: 'Holy Spirit, deepen the joy in my heart so I can share it.',
      verse: 'Psalm 100 — Joyful praise to the Lord.',
      breath: 'Light, relaxed breathing while noticing gratitude (2 min).',
      journal: 'How can I share today’s joy with my community?'
    }
  };
  return data[cat];
}

function updateLabel() {
  const cat = moodCategory(range.value);
  moodLabel.textContent = labelFor(cat);
}

range.addEventListener('input', updateLabel);

continueBtn.addEventListener('click', () => {
  const cat = moodCategory(range.value);
  const s = suggestions(cat);
  prayerText.textContent = s.prayer;
  verseText.textContent = s.verse;
  breathText.textContent = s.breath;
  journalPrompt.textContent = s.journal;
  resultBox.style.display = 'block';
});

updateLabel();
