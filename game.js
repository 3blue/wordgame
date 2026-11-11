// One hardcoded puzzle. Later: generate puzzles from a real word list.
const CENTER = "v";
const OUTER = ["c", "d", "e", "i", "t", "u"];
const ANSWERS = [
  "deductive", // pangram
  "civet", "civic", "deceive", "deceived", "detective",
  "device", "dive", "dived", "divide", "divided", "divvied", "duvet",
  "evict", "evicted", "evictee", "ivied", "vetted", "vice", "vied",
  "vivid"
];

const found = [];
let score = 0;
const $ = (id) => document.getElementById(id);

const isPangram = (word) => new Set(word).size === 7;

function points(word) {
  let p = word.length === 4 ? 1 : word.length;
  if (isPangram(word)) p += 7;
  return p;
}

// Returns an error message, or null if the word is valid.
function check(word) {
  if (word.length < 4) return "Too short.";
  if (!word.includes(CENTER)) return "Missing center letter.";
  if ([...word].some((ch) => ch !== CENTER && !OUTER.includes(ch))) return "Bad letters.";
  if (found.includes(word)) return "Already found.";
  if (!ANSWERS.includes(word)) return "Not in word list.";
  return null;
}

function submit() {
  const word = $("guess").value.trim().toLowerCase();
  $("guess").value = "";
  const error = check(word);
  if (error) {
    $("message").textContent = error;
    return;
  }
  found.push(word);
  score += points(word);
  $("message").textContent = isPangram(word) ? "PANGRAM!!!" : "Nice!";
  render();
}

function render() {
  $("score").textContent = score;
  $("count").textContent = found.length + " / " + ANSWERS.length;
  $("found").textContent = [...found].sort().join(", ");
}

$("center").textContent = CENTER.toUpperCase();
$("outer").textContent = OUTER.join(" ").toUpperCase();
$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  submit();
});
render();
