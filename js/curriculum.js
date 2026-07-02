/* ════════════════════════════════════════════════════════════════
   curriculum.js — the Pythoneer course content
   ----------------------------------------------------------------
   A lesson is one of:
     kind: "lesson"   → explanation + a runnable example (starter)
     kind: "exercise" → a task; `tests` auto-check it
     kind: "quiz"     → an end-of-module knowledge check (microtest)

   Exercise test `code` runs AFTER the learner's code, in the same
   namespace, and may read `__stdout__` (everything the program printed).

   Quiz schema:
     { id, kind:"quiz", title, intro, questions:[
         { q, options:[...], answer:<index>, explain, tags:[...] }
     ] }

   Concept tags: exercises and quiz questions carry `tags: ["slug", ...]` drawn
   from CURRICULUM.concepts below. They drive the Review page's retention model —
   a miss on any tagged item flags that concept until the learner re-demonstrates
   it. Use only slugs defined in `concepts`; keep each slug on ≥2 items so there's
   always practice to recommend.
   ════════════════════════════════════════════════════════════════ */
window.CURRICULUM = {
  level: "Beginner → Advanced",
  // Canonical concept vocabulary (slug → human label) for the retention model.
  concepts: {
    "output-basics": "Output & f-strings",
    "variables": "Variables",
    "numbers-math": "Numbers & math",
    "strings": "Strings & slicing",
    "string-methods": "String methods",
    "input-conversion": "Input & type conversion",
    "booleans-logic": "Booleans & logic",
    "conditionals": "Conditionals",
    "loops": "Loops",
    "lists": "Lists",
    "tuples": "Tuples",
    "dicts": "Dictionaries",
    "sets": "Sets",
    "functions": "Functions",
    "scope": "Scope",
    "args-kwargs": "Arguments & defaults",
    "lambda-hof": "Lambdas & higher-order functions",
    "classes-oop": "Classes & objects",
    "inheritance": "Inheritance",
    "dunder-methods": "Dunder methods",
    "files-io": "Files & I/O",
    "exceptions": "Exceptions",
    "modules-imports": "Modules & imports",
    "datetime": "Dates & times",
    "collections-module": "collections module",
    "regex": "Regular expressions",
    "comprehensions": "Comprehensions",
    "generators-iterators": "Generators & iterators",
    "decorators": "Decorators",
    "typing": "Type hints",
    "itertools": "itertools",
    "sorting": "Sorting",
    "testing": "Testing & assertions",
    "dataclasses": "Dataclasses",
    "enums": "Enums",
    "namedtuple": "namedtuple",
    "pattern-matching": "Pattern matching",
  },
  modules: [
    /* ═══════════════ MODULE 01 ═══════════════ */
    {
      id: "m01", num: "Module 01", title: "First Steps",
      icon: "fas fa-flag-checkered",
      desc: "Run your first program, print to the screen, and meet variables.",
      lessons: [
        {
          id: "m01-l01", kind: "lesson", title: "Hello, Pythoneer",
          docs: [{ label: "print()", url: "https://docs.python.org/3/library/functions.html#print" }],
          content: `
<div class="lc-eyebrow">Lesson 1 · First Steps</div>
<h1>Your first program</h1>
<p>Welcome! Python is a language for telling a computer what to do, written in
words that read almost like English. Every Pythoneer's journey starts with one
line that shows a message on the screen.</p>
<p>The tool for that is <code>print()</code>. You put something inside the
parentheses, and Python displays it.</p>
<pre><code>print("Hello, world!")</code></pre>
<p>The text in quotes is called a <b>string</b> — a piece of text. Press
<b>Run</b> on the right (or <code>Ctrl</code>+<code>Enter</code>) and watch the
output appear below the editor.</p>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
The code on the right is yours to change. Try replacing the message with your own
name, then run it again. Experimenting is how you learn fastest.</div></div>
<h2>Printing more than once</h2>
<p>Each <code>print()</code> writes on its own line. Programs run top to bottom,
one line at a time.</p>
<pre><code>print("Line one")
print("Line two")</code></pre>`,
          starter: `# Press Run (or Ctrl+Enter) to see what happens.
print("Hello, world!")
print("I'm learning Python with Pythoneer.")`,
        },
        {
          id: "m01-l02", kind: "lesson", title: "Variables: naming values",
          docs: [{ label: "Variables & assignment", url: "https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator" }],
          content: `
<div class="lc-eyebrow">Lesson 2 · First Steps</div>
<h1>Storing values in variables</h1>
<p>A <b>variable</b> is a name that points to a value. You create one with
<code>=</code>, the assignment operator. The name goes on the left, the value on
the right.</p>
<pre><code>name = "Ada"
age = 36</code></pre>
<p>Now <code>name</code> holds the text <code>"Ada"</code> and <code>age</code>
holds the number <code>36</code>. You can use those names anywhere you'd use the
value:</p>
<pre><code>print(name)
print(age)</code></pre>
<h2>Names can change</h2>
<p>Assigning again replaces what the variable points to:</p>
<pre><code>score = 10
score = score + 5   # score is now 15</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<b>Good names matter.</b> Use lowercase words joined by underscores, like
<code>first_name</code> or <code>total_price</code>. A clear name is a comment
you never have to write.</div></div>`,
          starter: `city = "Lisbon"
temperature = 24
print(city)
print(temperature)

# Try changing temperature, then print it again:
temperature = temperature + 1
print(temperature)`,
        },
        {
          id: "m01-l03", kind: "lesson", title: "Talking with f-strings",
          docs: [{ label: "Formatted string literals (f-strings)", url: "https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals" }],
          content: `
<div class="lc-eyebrow">Lesson 3 · First Steps</div>
<h1>Building messages with f-strings</h1>
<p>Often you want to mix text and values together. The cleanest way is an
<b>f-string</b>: put the letter <code>f</code> right before the opening quote,
then drop variables inside <code>{ }</code>.</p>
<pre><code>name = "Ada"
age = 36
print(f"{name} is {age} years old.")</code></pre>
<p>Python replaces each <code>{...}</code> with the value, producing:
<code>Ada is 36 years old.</code></p>
<h2>You can compute inside the braces</h2>
<pre><code>print(f"Next year she'll be {age + 1}.")</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
f-strings are the modern, readable way to format text. You'll use them
constantly — get comfortable with them now.</div></div>`,
          starter: `language = "Python"
year = 1991
print(f"{language} first appeared in {year}.")
print(f"That was {2024 - year} years before 2024.")`,
        },
        {
          id: "m01-l04", kind: "exercise", title: "Exercise: Introduce yourself",
          tags: ["output-basics", "variables"],
          content: `
<div class="lc-eyebrow">Exercise · First Steps</div>
<h1>Introduce yourself</h1>
<p>Time to write code from scratch. Create two variables and print one sentence
using an f-string.</p>
<h3>Your task</h3>
<ul>
  <li>Create a variable <code>name</code> holding your name (any text).</li>
  <li>Create a variable <code>hobby</code> holding something you enjoy.</li>
  <li>Print exactly one line in this shape:
      <code>Hi, I'm NAME and I love HOBBY.</code></li>
</ul>
<div class="callout"><i class="fas fa-flask"></i><div>
Press <b>Check</b> to test your solution. The checker reads the variables you
created and the text you printed.</div></div>`,
          starter: `name = ""      # put your name here
hobby = ""     # put a hobby here

print(f"Hi, I'm {name} and I love {hobby}.")`,
          tests: [
            { name: "You defined a non-empty name", code: `assert isinstance(name, str) and name.strip(), "name should be a non-empty string"` },
            { name: "You defined a non-empty hobby", code: `assert isinstance(hobby, str) and hobby.strip(), "hobby should be a non-empty string"` },
            { name: "You printed the introduction sentence", code: `assert f"Hi, I'm {name} and I love {hobby}." in __stdout__, "Print the exact sentence using an f-string"` },
          ],
        },
        {
          id: "m01-l05", kind: "exercise", title: "Exercise: Tiny story",
          tags: ["output-basics", "variables"],
          content: `
<div class="lc-eyebrow">Exercise · First Steps</div>
<h1>Build a tiny story</h1>
<p>Practise variables and f-strings by assembling a two-line story from parts.</p>
<h3>Your task</h3>
<p>Keep the three variables <code>hero</code>, <code>place</code>, and
<code>item</code>, then use f-strings to print two lines in this shape:</p>
<pre><code>{hero} travelled to {place}
There they found a magical {item}</code></pre>
<p>With the starter values, your program should print:</p>
<pre><code>Mara travelled to the northern peaks
There they found a magical lantern</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
The checker only cares that each line uses the variables in the right order — a
final full stop is optional, and "travelled" / "traveled" are both accepted.</div></div>`,
          starter: `hero = "Mara"
place = "the northern peaks"
item = "lantern"

# Print the two story lines using f-strings:
`,
          tests: [
            { name: "All three variables are non-empty strings", code: `assert all(isinstance(v, str) and v.strip() for v in (hero, place, item)), "hero, place and item must be non-empty strings"` },
            { name: "First line uses hero, place and 'travelled to'", code: `out = __stdout__.lower().replace("traveled", "travelled")\nassert f"{hero} travelled to {place}".lower() in out, "Print a line like: {hero} travelled to {place}"` },
            { name: "Second line uses 'magical' and item", code: `assert f"there they found a magical {item}".lower() in __stdout__.lower(), "Print a line like: There they found a magical {item}"` },
          ],
        },
        {
          id: "m01-l06", kind: "exercise", title: "Exercise: Business card",
          tags: ["output-basics", "variables"],
          docs: [
            { label: "print()", url: "https://docs.python.org/3/library/functions.html#print" },
            { label: "f-strings", url: "https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · First Steps</div>
<h1>Print a business card</h1>
<p>A realistic warm-up: assemble someone's details into a tidy two-line card.</p>
<h3>Your task</h3>
<p>Using the given variables, print exactly these two lines:</p>
<pre><code>Ada Lovelace
Engineer at Analytical Engines</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>Use an f-string for the
second line: <code>f"{role} at {company}"</code>.</div></div>`,
          starter: `name = "Ada Lovelace"
role = "Engineer"
company = "Analytical Engines"

# print the two card lines
`,
          tests: [
            { name: "prints the name on its own line", code: `assert name in __stdout__.splitlines(), "First line should be exactly the name"` },
            { name: "prints 'ROLE at COMPANY'", code: `assert f"{role} at {company}" in __stdout__, "Second line should read: ROLE at COMPANY"` },
          ],
        },
        {
          id: "m01-quiz", kind: "quiz", title: "Module 1 Check: First Steps",
          intro: "A quick five-question check on printing, variables, and f-strings. Score 80% or more to mark it complete.",
          questions: [
            { q: "Which line displays a message on the screen?", options: ["show(\"hi\")", "print(\"hi\")", "echo \"hi\"", "display(\"hi\")"], answer: 1, explain: "print() is Python's built-in for writing output." , tags: ["output-basics"] },
            { q: "What is a value like \"Ada\" (text in quotes) called?", options: ["A number", "A string", "A variable", "A function"], answer: 1, explain: "Text in quotes is a string." , tags: ["strings"] },
            { q: "What does the = operator do in `score = 10`?", options: ["Compares score to 10", "Tests equality", "Assigns 10 to score", "Prints score"], answer: 2, explain: "A single = assigns the right-hand value to the name on the left." , tags: ["variables"] },
            { q: "Which is a correctly written f-string?", options: ["f\"Hi {name}\"", "\"Hi {name}\"", "f\"Hi name\"", "\"Hi\" + {name}"], answer: 0, explain: "An f-string starts with f and puts variables inside { }." , tags: ["output-basics"] },
            { q: "After `x = 5` then `x = x + 3`, what is x?", options: ["5", "3", "8", "53"], answer: 2, explain: "x becomes its old value (5) plus 3 = 8." , tags: ["variables"] },
          ],
        },
      ],
    },

    /* ═══════════════ MODULE 02 ═══════════════ */
    {
      id: "m02", num: "Module 02", title: "Numbers, Strings & Input",
      icon: "fas fa-calculator",
      desc: "Do math, slice and reshape text, and read input from the user.",
      lessons: [
        {
          id: "m02-l01", kind: "lesson", title: "Numbers and arithmetic",
          docs: [{ label: "Numeric types — int, float", url: "https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex" }],
          content: `
<div class="lc-eyebrow">Lesson 1 · Numbers, Strings & Input</div>
<h1>Math in Python</h1>
<p>Python has two everyday number types: <b>int</b> (whole numbers) and
<b>float</b> (numbers with a decimal point). The arithmetic operators are what
you'd expect, with a couple of useful extras.</p>
<pre><code>print(7 + 2)    # 9   addition
print(7 - 2)    # 5   subtraction
print(7 * 2)    # 14  multiplication
print(7 / 2)    # 3.5 division (always a float)
print(7 // 2)   # 3   floor division (drops the remainder)
print(7 % 2)    # 1   modulo (the remainder)
print(7 ** 2)   # 49  power (7 squared)</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<b>Modulo</b> (<code>%</code>) is more useful than it looks: <code>n % 2</code>
is <code>0</code> for even numbers, and you'll use it constantly to detect
"every Nth" things.</div></div>
<h2>Order of operations</h2>
<p>Python follows normal math precedence. Use parentheses to be explicit:</p>
<pre><code>print(2 + 3 * 4)     # 14
print((2 + 3) * 4)   # 20</code></pre>`,
          starter: `price = 19.99
quantity = 3
subtotal = price * quantity
tax = subtotal * 0.08
print(f"Subtotal: {subtotal}")
print(f"Total with tax: {subtotal + tax}")`,
        },
        {
          id: "m02-l02", kind: "lesson", title: "Rounding & number formatting",
          docs: [
            { label: "round()", url: "https://docs.python.org/3/library/functions.html#round" },
            { label: "Format spec mini-language", url: "https://docs.python.org/3/library/string.html#format-specification-mini-language" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 2 · Numbers, Strings & Input</div>
<h1>Making numbers readable</h1>
<p>Floating-point math can produce long tails like <code>2.4000000000004</code>.
Two tools tidy that up.</p>
<h2>round()</h2>
<pre><code>print(round(3.14159, 2))   # 3.14
print(round(2.5))          # 2  (rounds to nearest even)</code></pre>
<h2>Format specifiers inside f-strings</h2>
<p>After a colon inside the braces you can describe how to display the number:</p>
<pre><code>total = 1234.5
print(f"{total:.2f}")     # 1234.50  → two decimals
print(f"{total:,.2f}")    # 1,234.50 → thousands separator
print(f"{0.27:.0%}")      # 27%      → percentage</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>:.2f</code> means "fixed-point, 2 decimals." This is how you show money,
percentages, and measurements cleanly.</div></div>`,
          starter: `amount = 2530.5
rate = 0.075
interest = amount * rate
print(f"Interest: {interest:,.2f}")
print(f"Rate: {rate:.1%}")
print(f"Rounded: {round(interest)}")`,
        },
        {
          id: "m02-l03", kind: "lesson", title: "Working with strings",
          docs: [
            { label: "String methods", url: "https://docs.python.org/3/library/stdtypes.html#string-methods" },
            { label: "Strings & slicing", url: "https://docs.python.org/3/tutorial/introduction.html#strings" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 3 · Numbers, Strings & Input</div>
<h1>Strings are toolkits</h1>
<p>Text comes with built-in <b>methods</b> — actions you call with a dot.</p>
<pre><code>title = "the martian"
print(title.upper())        # THE MARTIAN
print(title.title())        # The Martian
print(title.replace("a", "@"))   # the m@rti@n
print(len(title))           # 11  (number of characters)</code></pre>
<h2>Indexing and slicing</h2>
<p>Each character has a position starting at <code>0</code>. Square brackets pick
characters; a colon takes a slice (a range).</p>
<pre><code>word = "Python"
print(word[0])     # P   (first)
print(word[-1])    # n   (last)
print(word[0:3])   # Pyt (positions 0,1,2)
print(word[2:])    # thon</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Slices are <b>half-open</b>: <code>[0:3]</code> includes 0, 1, 2 but stops
before 3. This trips everyone up once — then never again.</div></div>`,
          starter: `email = "ada.lovelace@example.com"
print(email.split("@"))          # split into parts
name, domain = email.split("@")
print(f"User: {name}")
print(f"Domain: {domain}")
print(f"Uppercased: {name.upper()}")`,
        },
        {
          id: "m02-l04", kind: "lesson", title: "Reading input & converting types",
          docs: [
            { label: "input()", url: "https://docs.python.org/3/library/functions.html#input" },
            { label: "int()", url: "https://docs.python.org/3/library/functions.html#int" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 4 · Numbers, Strings & Input</div>
<h1>Input and type conversion</h1>
<p>The <code>input()</code> function pauses the program and waits for the user to
type a line. Whatever they type comes back as a <b>string</b> — even if it looks
like a number.</p>
<pre><code>name = input("What's your name? ")
print(f"Hello, {name}!")</code></pre>
<div class="callout"><i class="fas fa-keyboard"></i><div>
In Pythoneer's editor, type your responses in the <b>Input</b> box (one line per
<code>input()</code> call) before running.</div></div>
<h2>Turning text into numbers</h2>
<p>To do math on typed input, convert it with <code>int()</code> or
<code>float()</code>:</p>
<pre><code>age_text = input("Your age? ")
age = int(age_text)
print(f"In ten years you'll be {age + 10}.")</code></pre>
<p>Conversion the other way uses <code>str()</code>, though f-strings usually
handle that for you.</p>`,
          starter: `# Type a number in the Input box on the right, then Run.
text = input("Pick a number: ")
n = int(text)
print(f"{n} doubled is {n * 2}")
print(f"{n} squared is {n ** 2}")`,
          stdin: "7",
        },
        {
          id: "m02-l05", kind: "exercise", title: "Exercise: Tip calculator",
          tags: ["numbers-math", "output-basics"],
          content: `
<div class="lc-eyebrow">Exercise · Numbers, Strings & Input</div>
<h1>Build a tip calculator</h1>
<p>Combine arithmetic and formatting into a tiny useful tool.</p>
<h3>Your task</h3>
<ul>
  <li>A bill amount is given as the variable <code>bill</code> (already set).</li>
  <li>Compute a 18% tip and store it in <code>tip</code>.</li>
  <li>Compute <code>total = bill + tip</code>.</li>
  <li>Print a line in this exact shape, each money value with <b>2 decimals</b>:<br>
      <code>Tip: 9.00 | Total: 59.00</code></li>
</ul>
<div class="callout"><i class="fas fa-flask"></i><div>
Use <code>f"{value:.2f}"</code> for the formatting. The checker verifies both the
<code>tip</code> value and the printed line.</div></div>`,
          starter: `bill = 50.00

tip = 0      # 18% of the bill
total = 0    # bill + tip

print(f"Tip: {tip:.2f} | Total: {total:.2f}")`,
          tests: [
            { name: "tip is 18% of the bill", code: `assert abs(tip - bill * 0.18) < 1e-9, f"Expected tip {bill*0.18:.2f}, got {tip}"` },
            { name: "total adds bill and tip", code: `assert abs(total - (bill + tip)) < 1e-9, "total should be bill + tip"` },
            { name: "printed line is correctly formatted", code: `assert f"Tip: {bill*0.18:.2f} | Total: {bill*1.18:.2f}" in __stdout__, "Check the exact printed format with 2 decimals"` },
          ],
        },
        {
          id: "m02-l06", kind: "exercise", title: "Exercise: Celsius to Fahrenheit",
          tags: ["numbers-math"],
          content: `
<div class="lc-eyebrow">Exercise · Numbers, Strings & Input</div>
<h1>Temperature converter</h1>
<p>The formula is <code>F = C × 9/5 + 32</code>.</p>
<h3>Your task</h3>
<ul>
  <li>A temperature in Celsius is given as <code>celsius</code>.</li>
  <li>Convert it and store the result in a variable named <code>fahrenheit</code>.</li>
  <li>Print one line: <code>25°C = 77.0°F</code> (use the actual numbers).</li>
</ul>`,
          starter: `celsius = 25

fahrenheit = 0   # apply the formula

print(f"{celsius}°C = {fahrenheit}°F")`,
          tests: [
            { name: "fahrenheit is computed correctly", code: `assert abs(fahrenheit - (celsius * 9/5 + 32)) < 1e-9, f"Expected {celsius*9/5+32}, got {fahrenheit}"` },
            { name: "you printed the conversion line", code: `assert f"{celsius}°C = {celsius*9/5+32}°F" in __stdout__, "Print: C°C = F°F"` },
          ],
        },
        {
          id: "m02-l07", kind: "exercise", title: "Exercise: Email parts",
          tags: ["string-methods", "strings"],
          content: `
<div class="lc-eyebrow">Exercise · Numbers, Strings & Input</div>
<h1>Pull an email apart</h1>
<p>Practise splitting, unpacking, and indexing strings — no loops needed.</p>
<h3>Your task</h3>
<ul>
  <li>An <code>email</code> like <code>"ada.lovelace@example.com"</code> is given.</li>
  <li>Split it on <code>"@"</code> into <code>username</code> and <code>domain</code>.</li>
  <li>Set <code>provider</code> to the part of the domain before the first dot
      (for <code>example.com</code> that's <code>"example"</code>).</li>
  <li>Print one line: <code>User: ada.lovelace | Provider: Example</code>
      (provider Title-Cased).</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Unpack the two halves with <code>username, domain = email.split("@")</code>, then
<code>domain.split(".")[0]</code> gives the provider.</div></div>`,
          starter: `email = "ada.lovelace@example.com"

username = ""
domain = ""
provider = ""

print(f"User: {username} | Provider: {provider.title()}")`,
          tests: [
            { name: "username and domain split correctly", code: `assert username == "ada.lovelace" and domain == "example.com", "Split the email on '@' into username and domain"` },
            { name: "provider is the part before the first dot", code: `assert provider == "example", f"Expected 'example', got {provider!r}"` },
            { name: "you printed the formatted line", code: `assert f"User: {username} | Provider: {provider.title()}" in __stdout__, "Print: User: USERNAME | Provider: PROVIDER"` },
          ],
        },
        {
          id: "m02-l08", kind: "exercise", title: "Exercise: Split the bill",
          tags: ["numbers-math"],
          docs: [
            { label: "Numeric types & arithmetic", url: "https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex" },
            { label: "Format spec (:.2f)", url: "https://docs.python.org/3/library/string.html#format-specification-mini-language" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · Numbers, Strings & Input</div>
<h1>Split a restaurant bill</h1>
<h3>Your task</h3>
<ul>
  <li><code>total</code> and <code>people</code> are given.</li>
  <li>Compute <code>per_person = total / people</code>.</li>
  <li>Print exactly: <code>Each person pays 28.80</code> (two decimals).</li>
</ul>`,
          starter: `total = 86.40
people = 3

per_person = 0   # total divided by people

print(f"Each person pays {per_person:.2f}")`,
          tests: [
            { name: "per_person is total / people", code: `assert abs(per_person - total / people) < 1e-9, f"Expected {total/people}, got {per_person}"` },
            { name: "printed with two decimals", code: `assert f"Each person pays {total/people:.2f}" in __stdout__, "Print the amount with 2 decimals"` },
          ],
        },
        {
          id: "m02-l09", kind: "lesson", title: "The string toolkit, part 2",
          docs: [{ label: "String methods", url: "https://docs.python.org/3/library/stdtypes.html#string-methods" }],
          content: `
<div class="lc-eyebrow">Lesson 9 · Numbers, Strings & Input</div>
<h1>Trimming and searching strings</h1>
<p>Real-world text is messy — extra spaces, inconsistent capitalisation, stray
punctuation. Python's strings come with methods that clean and inspect text for
you. Remember: strings are <b>immutable</b>, so these methods <i>return a new
string</i> rather than changing the original.</p>
<h2>Trimming whitespace</h2>
<p><code>strip()</code> removes whitespace from both ends; <code>lstrip()</code>
and <code>rstrip()</code> trim only the left or right. Pass characters to strip
those instead of spaces.</p>
<pre><code>raw = "   hello   "
print(raw.strip())          # "hello"
print("...done...".strip(".")) # "done"</code></pre>
<h2>Asking yes/no questions</h2>
<p><code>startswith()</code> and <code>endswith()</code> return a boolean:</p>
<pre><code>name = "report_2024.csv"
print(name.endswith(".csv"))    # True
print(name.startswith("report")) # True</code></pre>
<h2>Finding things</h2>
<p><code>find()</code> returns the index of the first match, or <code>-1</code> if
it's not there. <code>index()</code> does the same but <b>raises an error</b> on a
miss. <code>count()</code> tells you how many times a piece appears.</p>
<pre><code>s = "banana"
print(s.find("na"))    # 2
print(s.find("z"))     # -1  (no error)
print(s.count("a"))    # 3</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Use <code>find()</code> when a miss is normal and you'll check for
<code>-1</code>; use <code>index()</code> when a miss is a real bug you want to
hear about.</div></div>`,
          starter: `raw = "   Ada Lovelace   "
print(raw.strip())
print(raw.strip().startswith("Ada"))

s = "mississippi"
print("s appears", s.count("s"), "times")
print("first 'ss' at index", s.find("ss"))`,
        },
        {
          id: "m02-l10", kind: "exercise", title: "Exercise: Clean the CSV field",
          tags: ["string-methods"],
          docs: [{ label: "str.strip()", url: "https://docs.python.org/3/library/stdtypes.html#str.strip" }],
          content: `
<div class="lc-eyebrow">Exercise · Numbers, Strings & Input</div>
<h1>Tidy a messy field</h1>
<p>A value pulled from a spreadsheet arrived wrapped in spaces and quotation
marks. Clean it up.</p>
<h3>Your task</h3>
<ul>
  <li>Start from <code>raw</code> and produce <code>cleaned</code> with no
      surrounding whitespace and no double-quote characters.</li>
  <li>With the starter value, <code>cleaned</code> should be
      <code>Ada Lovelace</code>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>strip()</code> handles the spaces; <code>replace('"', '')</code> removes the
quotes. Order doesn't matter here.</div></div>`,
          starter: `raw = '   "Ada Lovelace"   '

cleaned = raw    # strip the spaces and remove the quote characters

print(f"[{cleaned}]")`,
          tests: [
            { name: "cleaned is exactly 'Ada Lovelace'", code: `assert cleaned == "Ada Lovelace", f"Expected 'Ada Lovelace', got {cleaned!r}"` },
            { name: "no surrounding whitespace remains", code: `assert cleaned == cleaned.strip(), "cleaned still has leading/trailing whitespace"` },
            { name: "no quote characters remain", code: `assert '"' not in cleaned, "Remove the double-quote characters"` },
          ],
        },
        {
          id: "m02-l11", kind: "lesson", title: "Padding & aligning text",
          docs: [
            { label: "str.zfill()", url: "https://docs.python.org/3/library/stdtypes.html#str.zfill" },
            { label: "Format spec mini-language", url: "https://docs.python.org/3/library/string.html#format-specification-mini-language" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 10 · Numbers, Strings & Input</div>
<h1>Lining things up</h1>
<p>Reports, receipts, and tables look professional when columns line up. Python
gives you two ways to pad text to a fixed width.</p>
<h2>Zero-padding numbers</h2>
<p><code>zfill(n)</code> pads a string on the left with zeros until it's
<code>n</code> characters long — perfect for IDs and timestamps.</p>
<pre><code>print(str(42).zfill(5))   # "00042"
print("7".zfill(3))        # "007"</code></pre>
<h2>Aligning with methods</h2>
<p><code>ljust</code>, <code>rjust</code>, and <code>center</code> pad with spaces
(or a fill character you choose) to a width.</p>
<pre><code>print("Name".ljust(10) + "|")   # "Name      |"
print("42".rjust(6))             # "    42"
print("title".center(11, "-"))   # "---title---"</code></pre>
<h2>The same, inside f-strings</h2>
<p>Format specs <code>&lt;</code>, <code>&gt;</code>, and <code>^</code> do left,
right, and centre alignment:</p>
<pre><code>print(f"{'Widget':&gt;12}")   # right-aligned in 12 columns
print(f"{42:05d}")           # "00042"</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Inside f-strings the width can be a variable too:
<code>f"{name:&gt;{w}}"</code> right-aligns to width <code>w</code>.</div></div>`,
          starter: `for n in [1, 42, 999]:
    print("ID-" + str(n).zfill(4))

print(f"{'Total':<10}{'$42.00':>8}")`,
        },
        {
          id: "m02-l12", kind: "exercise", title: "Exercise: Format an invoice ID",
          tags: ["output-basics", "strings"],
          docs: [{ label: "str.zfill()", url: "https://docs.python.org/3/library/stdtypes.html#str.zfill" }],
          content: `
<div class="lc-eyebrow">Exercise · Numbers, Strings & Input</div>
<h1>Build a tidy invoice line</h1>
<h3>Your task</h3>
<ul>
  <li>Make <code>invoice_id</code> by joining <code>"INV-"</code> with
      <code>seq</code> zero-padded to <b>5</b> digits — so <code>42</code> becomes
      <code>INV-00042</code>.</li>
  <li>Build <code>line</code> as the product <code>name</code> right-aligned to a
      width of <b>12</b>, then <code>": "</code>, then the invoice id, and
      <code>print</code> it.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>str(seq).zfill(5)</code> for the number; <code>f"{name:&gt;12}"</code> for the
alignment.</div></div>`,
          starter: `seq = 42
name = "Widget"

invoice_id = ""     # "INV-" + zero-padded seq
line = ""           # f"{name:>12}: {invoice_id}"

print(line)`,
          tests: [
            { name: "invoice_id is 'INV-00042'", code: `assert invoice_id == "INV-00042", f"Expected 'INV-00042', got {invoice_id!r}"` },
            { name: "line is right-aligned to width 12", code: `assert line == f"{'Widget':>12}: INV-00042", f"Got {line!r}"` },
            { name: "you printed the line", code: `assert line in __stdout__ and line.strip(), "Print the assembled line"` },
          ],
        },
        {
          id: "m02-l13", kind: "exercise", title: "Exercise: Shout the vowels",
          tags: ["string-methods", "strings"],
          docs: [
            { label: "str.maketrans()", url: "https://docs.python.org/3/library/stdtypes.html#str.maketrans" },
            { label: "str.translate()", url: "https://docs.python.org/3/library/stdtypes.html#str.translate" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · Numbers, Strings & Input</div>
<h1>Upper-case every vowel</h1>
<p><code>str.maketrans</code> builds a translation table mapping characters to
their replacements, and <code>str.translate</code> applies it in one pass.</p>
<h3>Your task</h3>
<ul>
  <li>Build a table that maps each lower-case vowel
      (<code>a e i o u</code>) to its upper-case form.</li>
  <li>Apply it to <code>text</code> and store the result in
      <code>shouted</code>.</li>
  <li>With the starter value, <code>shouted</code> is
      <code>encyclopedia</code> → <code>EncyclOpEdIA</code>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>str.maketrans("aeiou", "AEIOU")</code> pairs the two strings character by
character.</div></div>`,
          starter: `text = "encyclopedia"

table = {}      # str.maketrans("aeiou", "AEIOU")
shouted = text  # text.translate(table)

print(shouted)`,
          tests: [
            { name: "shouted matches translate()", code: `assert shouted == text.translate(str.maketrans("aeiou", "AEIOU")), "Map each lower vowel to upper-case"` },
            { name: "length is unchanged", code: `assert len(shouted) == len(text), "translate() replaces 1-for-1; length should not change"` },
            { name: "no lower-case vowels remain", code: `assert not any(c in shouted for c in "aeiou"), "Every lower vowel should be upper-cased"` },
          ],
        },
        {
          id: "m02-quiz", kind: "quiz", title: "Module 2 Check: Numbers & Strings",
          intro: "Test your grip on arithmetic, formatting, strings, and input.",
          questions: [
            { q: "What does 7 % 3 evaluate to?", options: ["2", "1", "2.33", "21"], answer: 1, explain: "% is the remainder: 7 = 2×3 + 1, so the remainder is 1." , tags: ["numbers-math"] },
            { q: "What is the result of 7 / 2 in Python 3?", options: ["3", "3.5", "4", "1"], answer: 1, explain: "A single / always produces a float; use // for floor division." , tags: ["numbers-math"] },
            { q: "How do you format the number 5 as '5.00'?", options: ["f\"{5:2f}\"", "f\"{5:.2f}\"", "f\"{5:,2}\"", "round(5, 2)"], answer: 1, explain: ":.2f means fixed-point with two decimals." , tags: ["output-basics"] },
            { q: "For word = \"Python\", what is word[-1]?", options: ["P", "n", "Python", "o"], answer: 1, explain: "Index -1 is the last character." , tags: ["strings"] },
            { q: "What type does input() always return?", options: ["int", "float", "str", "It depends on what's typed"], answer: 2, explain: "input() always returns a string; convert with int()/float()." , tags: ["input-conversion"] },
            { q: "What is word[1:4] for word = \"Python\"?", options: ["Pyt", "yth", "ytho", "tho"], answer: 1, explain: "Slices are half-open: positions 1,2,3 → 'yth'." , tags: ["strings"] },
          ],
        },
      ],
    },

    /* ═══════════════ MODULE 03 ═══════════════ */
    {
      id: "m03", num: "Module 03", title: "Making Decisions & Repeating",
      icon: "fas fa-code-branch",
      desc: "Branch with if/else, repeat with loops, and combine conditions.",
      lessons: [
        {
          id: "m03-l01", kind: "lesson", title: "Booleans & comparisons",
          docs: [
            { label: "Boolean operations (and/or/not)", url: "https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not" },
            { label: "Comparisons", url: "https://docs.python.org/3/library/stdtypes.html#comparisons" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 1 · Decisions & Repeating</div>
<h1>True, False, and comparisons</h1>
<p>A <b>boolean</b> is a value that is either <code>True</code> or
<code>False</code>. Comparisons produce booleans:</p>
<pre><code>print(5 > 3)     # True
print(5 == 5)    # True   (== tests equality; = assigns)
print(5 != 4)    # True   (!= is "not equal")
print(2 >= 9)    # False</code></pre>
<h2>Combining with and / or / not</h2>
<pre><code>age = 20
print(age >= 18 and age < 65)   # True
print(age < 13 or age > 65)     # False
print(not (age == 20))          # False</code></pre>
<div class="callout"><i class="fas fa-triangle-exclamation"></i><div>
<b>One equals assigns, two equals compares.</b> <code>x = 5</code> stores 5;
<code>x == 5</code> asks "is x five?" Mixing these up is the most common
beginner bug.</div></div>`,
          starter: `temperature = 28
is_warm = temperature > 20
is_hot = temperature > 35
print(f"Warm? {is_warm}")
print(f"Hot? {is_hot}")
print(f"Pleasant? {is_warm and not is_hot}")`,
        },
        {
          id: "m03-l02", kind: "lesson", title: "if / elif / else",
          docs: [{ label: "if statements", url: "https://docs.python.org/3/tutorial/controlflow.html#if-statements" }],
          content: `
<div class="lc-eyebrow">Lesson 2 · Decisions & Repeating</div>
<h1>Branching your program</h1>
<p><code>if</code> runs a block only when a condition is true. The indented lines
below it belong to that branch — indentation is how Python groups code.</p>
<pre><code>score = 82
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Keep practicing!")</code></pre>
<p>Python checks each condition top to bottom and runs the <b>first</b> one that's
true, then skips the rest. <code>else</code> catches everything left over.</p>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<b>Indentation is syntax in Python.</b> Use 4 spaces per level. The editor does
this for you when you press Enter after a colon.</div></div>`,
          starter: `hour = 14
if hour < 12:
    greeting = "Good morning"
elif hour < 18:
    greeting = "Good afternoon"
else:
    greeting = "Good evening"
print(greeting)`,
        },
        {
          id: "m03-l03", kind: "lesson", title: "for loops & range",
          docs: [
            { label: "for statements", url: "https://docs.python.org/3/tutorial/controlflow.html#for-statements" },
            { label: "range()", url: "https://docs.python.org/3/library/stdtypes.html#range" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 3 · Decisions & Repeating</div>
<h1>Repeating with for</h1>
<p>A <code>for</code> loop runs a block once for each item in a sequence. The
<code>range()</code> function generates numbers to loop over.</p>
<pre><code>for i in range(5):
    print(i)        # 0 1 2 3 4</code></pre>
<p><code>range(start, stop)</code> and <code>range(start, stop, step)</code> give
you more control:</p>
<pre><code>for n in range(1, 6):       # 1 2 3 4 5
    print(n * n)            # squares

for even in range(0, 11, 2):  # 0 2 4 6 8 10
    print(even)</code></pre>
<h2>Looping over text</h2>
<pre><code>for letter in "cat":
    print(letter)</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Accumulate results in a variable defined <b>before</b> the loop:
<code>total = 0</code> then <code>total = total + n</code> inside.</div></div>`,
          starter: `total = 0
for n in range(1, 11):   # 1 through 10
    total = total + n
print(f"Sum of 1..10 is {total}")`,
        },
        {
          id: "m03-l04", kind: "lesson", title: "while loops",
          docs: [
            { label: "while statement", url: "https://docs.python.org/3/reference/compound_stmts.html#the-while-statement" },
            { label: "break & continue", url: "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 4 · Decisions & Repeating</div>
<h1>Looping until a condition changes</h1>
<p>A <code>while</code> loop repeats as long as its condition stays true. Use it
when you don't know in advance how many times to loop.</p>
<pre><code>countdown = 3
while countdown > 0:
    print(countdown)
    countdown = countdown - 1
print("Lift off!")</code></pre>
<div class="callout"><i class="fas fa-triangle-exclamation"></i><div>
<b>Always change something inside the loop</b> that moves toward making the
condition false — otherwise it runs forever. (Pythoneer stops runaway loops after
a few seconds so you're safe to experiment.)</div></div>
<h2>break and continue</h2>
<pre><code>for n in range(100):
    if n == 5:
        break        # leave the loop entirely
    if n % 2 == 0:
        continue     # skip to the next iteration
    print(n)         # prints 1, 3</code></pre>`,
          starter: `# Double a number until it passes 1000
value = 1
steps = 0
while value <= 1000:
    value = value * 2
    steps = steps + 1
print(f"Reached {value} after {steps} doublings")`,
        },
        {
          id: "m03-l05", kind: "exercise", title: "Exercise: FizzBuzz",
          tags: ["conditionals", "loops"],
          content: `
<div class="lc-eyebrow">Exercise · Decisions & Repeating</div>
<h1>FizzBuzz — the classic</h1>
<p>This little puzzle is a rite of passage. It combines loops, conditions, and
modulo.</p>
<h3>Your task</h3>
<p>Loop over the numbers <b>1 to 15</b> (inclusive) and print one line per number:</p>
<ul>
  <li>If the number is divisible by <b>both</b> 3 and 5 → print <code>FizzBuzz</code></li>
  <li>Else if divisible by <b>3</b> → print <code>Fizz</code></li>
  <li>Else if divisible by <b>5</b> → print <code>Buzz</code></li>
  <li>Otherwise → print the number itself</li>
</ul>
<div class="callout"><i class="fas fa-flask"></i><div>
Order matters: check the "both" case first. Use <code>n % 3 == 0</code> to test
divisibility.</div></div>`,
          starter: `for n in range(1, 16):
    # decide what to print for n
    pass`,
          tests: [
            { name: "Multiples of 15 print FizzBuzz", code: `lines = [l for l in __stdout__.splitlines() if l.strip()]\nassert lines[14] == "FizzBuzz", "Line for 15 should be FizzBuzz"` },
            { name: "Multiples of 3 print Fizz", code: `lines = [l for l in __stdout__.splitlines() if l.strip()]\nassert lines[2] == "Fizz" and lines[5] == "Fizz", "Lines for 3 and 6 should be Fizz"` },
            { name: "Multiples of 5 print Buzz", code: `lines = [l for l in __stdout__.splitlines() if l.strip()]\nassert lines[4] == "Buzz" and lines[9] == "Buzz", "Lines for 5 and 10 should be Buzz"` },
            { name: "Other numbers print themselves", code: `lines = [l for l in __stdout__.splitlines() if l.strip()]\nassert lines[0] == "1" and lines[6] == "7", "Plain numbers should print as-is"` },
            { name: "Exactly 15 lines printed", code: `lines = [l for l in __stdout__.splitlines() if l.strip()]\nassert len(lines) == 15, f"Expected 15 lines, got {len(lines)}"` },
          ],
        },
        {
          id: "m03-l06", kind: "exercise", title: "Exercise: Sum the even numbers",
          tags: ["loops", "numbers-math"],
          content: `
<div class="lc-eyebrow">Exercise · Decisions & Repeating</div>
<h1>Sum of evens</h1>
<h3>Your task</h3>
<ul>
  <li>Loop over <code>1</code> to <code>100</code> (inclusive).</li>
  <li>Add up only the <b>even</b> numbers into a variable <code>total</code>.</li>
  <li>Print <code>Total: 2550</code>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
A number is even when <code>n % 2 == 0</code>.</div></div>`,
          starter: `total = 0
for n in range(1, 101):
    pass   # add n to total only if it's even

print(f"Total: {total}")`,
          tests: [
            { name: "total equals 2550", code: `assert total == 2550, f"Expected 2550, got {total}"` },
            { name: "you printed the total", code: `assert "Total: 2550" in __stdout__, "Print: Total: 2550"` },
          ],
        },
        {
          id: "m03-l07", kind: "exercise", title: "Exercise: Leap year",
          tags: ["conditionals", "booleans-logic"],
          content: `
<div class="lc-eyebrow">Exercise · Decisions & Repeating</div>
<h1>Is it a leap year?</h1>
<p>A year is a leap year if it is divisible by 4, <b>except</b> century years,
which must be divisible by 400. So 2000 is a leap year; 1900 is not.</p>
<h3>Your task</h3>
<ul>
  <li>A <code>year</code> variable is given.</li>
  <li>Set a boolean variable <code>is_leap</code> to <code>True</code> or
      <code>False</code> using the rule above.</li>
</ul>`,
          starter: `year = 2024

is_leap = False
# apply the leap-year rule

print(f"{year} leap year? {is_leap}")`,
          tests: [
            { name: "is_leap is a boolean", code: `assert isinstance(is_leap, bool), "is_leap should be True or False"` },
            { name: "rule is correct for the given year", code: `expected = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)\nassert is_leap == expected, f"For {year} expected {expected}, got {is_leap}"` },
            { name: "works for 1900 (not a leap year)", code: `def leap(y): return (y%4==0 and y%100!=0) or (y%400==0)\nassert leap(1900) is False and leap(2000) is True, "Your understanding should match 1900=False, 2000=True"` },
          ],
        },
        {
          id: "m03-l08", kind: "exercise", title: "Exercise: Make initials",
          tags: ["loops", "strings"],
          content: `
<div class="lc-eyebrow">Exercise · Decisions & Repeating</div>
<h1>Initials from a full name</h1>
<p>Combine a <code>for</code> loop with the string skills from Module 2 — exactly
the accumulator pattern from the loops lesson.</p>
<h3>Your task</h3>
<ul>
  <li>A <code>full_name</code> like <code>"grace murray hopper"</code> is given.</li>
  <li>Build a string <code>initials</code> with the uppercase first letter of each
      word, separated by dots and ending in a dot — e.g. <code>"G.M.H."</code></li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>full_name.split()</code> gives the list of words. Start with
<code>initials = ""</code>, then <b>loop</b> over the words and add
<code>word[0].upper() + "."</code> to <code>initials</code> on each pass.</div></div>`,
          starter: `full_name = "grace murray hopper"

initials = ""
for word in full_name.split():
    pass   # add this word's uppercase first letter and a dot to initials

print(initials)`,
          tests: [
            { name: "initials is a string", code: `assert isinstance(initials, str), "initials should be a string"` },
            { name: "correct initials produced", code: `expected = "".join(w[0].upper() + "." for w in full_name.split())\nassert initials == expected, f"Expected {expected!r}, got {initials!r}"` },
          ],
        },
        {
          id: "m03-l09", kind: "exercise", title: "Exercise: Savings goal",
          tags: ["loops", "numbers-math"],
          docs: [
            { label: "while statement", url: "https://docs.python.org/3/reference/compound_stmts.html#the-while-statement" },
            { label: "Numeric operators", url: "https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · Decisions & Repeating</div>
<h1>How long to reach a savings goal?</h1>
<p>You save a fixed amount each month. Count the months until you hit the goal.</p>
<h3>Your task</h3>
<ul>
  <li><code>goal</code> and <code>monthly</code> are given.</li>
  <li>Starting from 0, add <code>monthly</code> each month with a <code>while</code>
      loop, counting months until your savings reach (or pass) <code>goal</code>.</li>
  <li>Store the number of months in <code>months</code>.</li>
</ul>`,
          starter: `goal = 1000
monthly = 150

savings = 0
months = 0
# loop until savings >= goal, counting months

print(f"It takes {months} months to save {goal}.")`,
          tests: [
            { name: "months is correct", code: `import math\nassert months == math.ceil(goal / monthly), f"Expected {math.ceil(goal/monthly)}, got {months}"` },
            { name: "savings actually reached the goal", code: `assert months * monthly >= goal, "After that many months the savings must reach the goal"` },
          ],
        },
        {
          id: "m03-quiz", kind: "quiz", title: "Module 3 Check: Decisions & Loops",
          intro: "Booleans, branching, and loops.",
          questions: [
            { q: "Which operator tests equality (not assignment)?", options: ["=", "==", ":=", "==="], answer: 1, explain: "== compares; a single = assigns." , tags: ["booleans-logic"] },
            { q: "What does range(1, 6) produce?", options: ["1,2,3,4,5,6", "1,2,3,4,5", "0,1,2,3,4,5", "1,6"], answer: 1, explain: "range stops BEFORE the second number, so 1..5." , tags: ["loops"] },
            { q: "In if/elif/else, how many branches run for a given input?", options: ["All that are true", "At most one", "Exactly two", "None"], answer: 1, explain: "Python runs the first true branch and skips the rest." , tags: ["conditionals"] },
            { q: "What does `continue` do inside a loop?", options: ["Exits the loop", "Skips to the next iteration", "Restarts the program", "Pauses the loop"], answer: 1, explain: "continue jumps straight to the next iteration; break exits." , tags: ["loops"] },
            { q: "Which condition is True when n is even?", options: ["n % 2 == 1", "n / 2 == 0", "n % 2 == 0", "n // 2 == 0"], answer: 2, explain: "Even numbers have remainder 0 when divided by 2." , tags: ["booleans-logic", "numbers-math"] },
            { q: "What kind of loop is best when you don't know how many repeats you'll need?", options: ["for", "while", "range", "if"], answer: 1, explain: "while loops run until a condition becomes false." , tags: ["loops"] },
          ],
        },
      ],
    },

    /* ═══════════════ MODULE 04 ═══════════════ */
    {
      id: "m04", num: "Module 04", title: "Collections",
      icon: "fas fa-layer-group",
      desc: "Lists, dictionaries, tuples, and sets — Python's core containers.",
      lessons: [
        {
          id: "m04-l01", kind: "lesson", title: "Lists: ordered collections",
          docs: [{ label: "More on lists", url: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists" }],
          content: `
<div class="lc-eyebrow">Lesson 1 · Collections</div>
<h1>Lists</h1>
<p>A <b>list</b> holds many values in order, written in square brackets and
separated by commas.</p>
<pre><code>fruits = ["apple", "banana", "cherry"]
print(fruits[0])        # apple
print(len(fruits))      # 3
fruits.append("date")   # add to the end
fruits[1] = "blueberry" # change an item
print(fruits)</code></pre>
<h2>Looping over a list</h2>
<pre><code>for fruit in fruits:
    print(fruit.title())</code></pre>
<h2>Handy operations</h2>
<pre><code>nums = [4, 1, 7, 3]
print(sum(nums))     # 15
print(max(nums))     # 7
print(sorted(nums))  # [1, 3, 4, 7]
print(nums[-1])      # 3  (last item)</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Lists are the workhorse of Python. Almost every program collects things into a
list and then loops over them.</div></div>`,
          starter: `scores = [88, 92, 79, 95, 84]
print(f"Highest: {max(scores)}")
print(f"Average: {sum(scores) / len(scores):.1f}")
scores.append(100)
print(f"After adding 100: {sorted(scores, reverse=True)}")`,
        },
        {
          id: "m04-l02", kind: "lesson", title: "Dictionaries: key → value",
          docs: [{ label: "Dictionaries", url: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries" }],
          content: `
<div class="lc-eyebrow">Lesson 2 · Collections</div>
<h1>Dictionaries</h1>
<p>A <b>dictionary</b> stores pairs: a <i>key</i> you look things up by, and a
<i>value</i> it maps to. Written with curly braces.</p>
<pre><code>person = {"name": "Ada", "age": 36, "city": "London"}
print(person["name"])        # Ada
person["age"] = 37           # update
person["job"] = "Engineer"   # add a new pair
print(person)</code></pre>
<h2>Looping over a dictionary</h2>
<pre><code>for key, value in person.items():
    print(f"{key}: {value}")</code></pre>
<h2>Safe lookups with get()</h2>
<pre><code>print(person.get("email", "no email"))   # default if missing</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Reach for a dictionary whenever you think "I want to look something up <i>by</i>
a name or id." Counting, grouping, and config all live in dicts.</div></div>`,
          starter: `inventory = {"apples": 12, "bread": 4, "milk": 2}
inventory["apples"] = inventory["apples"] - 3
inventory["eggs"] = 6
for item, qty in inventory.items():
    print(f"{item}: {qty}")
print(f"Total distinct items: {len(inventory)}")`,
        },
        {
          id: "m04-l03", kind: "lesson", title: "Tuples & sets",
          docs: [
            { label: "Tuples", url: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences" },
            { label: "Sets", url: "https://docs.python.org/3/tutorial/datastructures.html#sets" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 3 · Collections</div>
<h1>Tuples and sets</h1>
<h2>Tuples — fixed groups</h2>
<p>A <b>tuple</b> is like a list but <i>immutable</i>: once made, it can't change.
Use it for values that belong together and shouldn't be edited, like a
coordinate.</p>
<pre><code>point = (3, 4)
x, y = point          # "unpacking" into two variables
print(x, y)           # 3 4
print(point[0])       # 3
# point[0] = 9  ->  TypeError: tuples can't be changed</code></pre>
<h2>Sets — unique values</h2>
<p>A <b>set</b> holds unique items with no duplicates and no order. Great for
membership tests and de-duplicating.</p>
<pre><code>tags = {"python", "web", "python", "data"}
print(tags)               # {'python', 'web', 'data'} — duplicate gone
print("web" in tags)      # True
tags.add("ml")
print(len(tags))          # 4</code></pre>
<pre><code>nums = [1, 2, 2, 3, 3, 3]
print(set(nums))          # {1, 2, 3}
print(sorted(set(nums)))  # [1, 2, 3]</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<b>When to use which:</b> list = ordered & editable; tuple = ordered & fixed;
dict = lookup by key; set = unique membership.</div></div>`,
          starter: `words = ["red", "green", "red", "blue", "green", "red"]
unique = set(words)
print(f"Unique colors: {sorted(unique)}")
print(f"How many unique: {len(unique)}")

coord = (51.5, -0.12)
lat, lon = coord
print(f"Latitude {lat}, longitude {lon}")`,
        },
        {
          id: "m04-l04", kind: "exercise", title: "Exercise: Count the words",
          tags: ["dicts", "string-methods"],
          content: `
<div class="lc-eyebrow">Exercise · Collections</div>
<h1>Count word frequencies</h1>
<p>A real-world dictionary task: tally how often each word appears.</p>
<h3>Your task</h3>
<ul>
  <li>The variable <code>sentence</code> is given.</li>
  <li>Split it into words and build a dictionary <code>counts</code> mapping each
      word to how many times it appears.</li>
  <li>The checker reads your <code>counts</code> dictionary directly.</li>
</ul>
<div class="callout"><i class="fas fa-flask"></i><div>
<code>sentence.split()</code> gives a list of words. Loop over it and use
<code>counts.get(word, 0) + 1</code> to increment.</div></div>`,
          starter: `sentence = "the cat sat on the mat and the cat slept"

counts = {}
# fill counts so that counts["the"] == 3, etc.

print(counts)`,
          tests: [
            { name: "counts is a dictionary", code: `assert isinstance(counts, dict), "counts should be a dict"` },
            { name: "'the' appears 3 times", code: `assert counts.get("the") == 3, f"Expected 3 for 'the', got {counts.get('the')}"` },
            { name: "'cat' appears 2 times", code: `assert counts.get("cat") == 2, f"Expected 2 for 'cat', got {counts.get('cat')}"` },
            { name: "single words counted once", code: `assert counts.get("mat") == 1 and counts.get("slept") == 1, "Unique words should map to 1"` },
          ],
        },
        {
          id: "m04-l05", kind: "exercise", title: "Exercise: De-duplicate & sort",
          tags: ["sets", "sorting"],
          content: `
<div class="lc-eyebrow">Exercise · Collections</div>
<h1>Unique, sorted values</h1>
<h3>Your task</h3>
<ul>
  <li>A list <code>readings</code> with duplicate numbers is given.</li>
  <li>Produce a list <code>unique_sorted</code> containing each value once, in
      ascending order.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
A <code>set</code> removes duplicates; <code>sorted()</code> turns it back into an
ordered list.</div></div>`,
          starter: `readings = [5, 3, 8, 3, 5, 1, 8, 9, 1]

unique_sorted = []
# remove duplicates and sort ascending

print(unique_sorted)`,
          tests: [
            { name: "result is a list", code: `assert isinstance(unique_sorted, list), "unique_sorted should be a list"` },
            { name: "duplicates removed and sorted", code: `assert unique_sorted == sorted(set(readings)), f"Expected {sorted(set(readings))}, got {unique_sorted}"` },
          ],
        },
        {
          id: "m04-l06", kind: "exercise", title: "Exercise: Top scorer",
          tags: ["dicts"],
          content: `
<div class="lc-eyebrow">Exercise · Collections</div>
<h1>Find the highest scorer</h1>
<h3>Your task</h3>
<ul>
  <li>A dictionary <code>scores</code> maps player names to points.</li>
  <li>Find the name with the highest score and store it in <code>winner</code>.</li>
  <li>Print <code>Winner: NAME with POINTS points</code>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
You can loop and track the best so far, or use
<code>max(scores, key=scores.get)</code>.</div></div>`,
          starter: `scores = {"Mara": 47, "Iris": 88, "Leo": 72, "Ada": 88, "Sam": 65}

winner = None
# find the name with the highest score

print(f"Winner: {winner} with {scores[winner]} points")`,
          tests: [
            { name: "winner has the maximum score", code: `assert scores[winner] == max(scores.values()), f"{winner} does not have the top score"` },
            { name: "you printed the winner line", code: `assert f"Winner: {winner} with {scores[winner]} points" in __stdout__, "Print the winner line in the requested format"` },
          ],
        },
        {
          id: "m04-l07", kind: "exercise", title: "Exercise: Low-stock report",
          tags: ["dicts", "loops"],
          docs: [
            { label: "Dictionaries (.items())", url: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries" },
            { label: "Lists (.append())", url: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · Collections</div>
<h1>Which products need restocking?</h1>
<h3>Your task</h3>
<ul>
  <li><code>stock</code> maps each product to its quantity; <code>threshold</code> is given.</li>
  <li>Build a list <code>low_stock</code> of the product names whose quantity is
      <b>below</b> the threshold, in the order they appear.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>Loop with
<code>for product, qty in stock.items():</code> and <code>append</code> the ones under
the threshold.</div></div>`,
          starter: `stock = {"apples": 12, "bread": 3, "milk": 1, "eggs": 8, "rice": 4}
threshold = 5

low_stock = []
# add products with quantity below threshold

print(low_stock)`,
          tests: [
            { name: "finds the low-stock products in order", code: `assert low_stock == ["bread", "milk", "rice"], f"Expected ['bread', 'milk', 'rice'], got {low_stock}"` },
            { name: "low_stock is a list", code: `assert isinstance(low_stock, list), "low_stock should be a list"` },
          ],
        },
        {
          id: "m04-l08", kind: "lesson", title: "List methods in depth",
          docs: [{ label: "Mutable sequence methods", url: "https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types" }],
          content: `
<div class="lc-eyebrow">Lesson 8 · Collections</div>
<h1>Editing lists in place</h1>
<p>You already know <code>append</code>. Lists have a whole toolkit for changing
their contents. A key distinction: most of these methods <b>change the list in
place and return <code>None</code></b> — they don't hand you a new list.</p>
<h2>Adding</h2>
<pre><code>nums = [1, 2, 3]
nums.append(4)          # [1, 2, 3, 4]   — one item
nums.extend([5, 6])     # [1, 2, 3, 4, 5, 6] — many items
nums.insert(0, 0)       # [0, 1, 2, 3, 4, 5, 6] — at an index</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<code>append([5, 6])</code> would add the <i>list</i> as a single element.
<code>extend</code> adds each item separately.</div></div>
<h2>Removing</h2>
<pre><code>nums.remove(3)   # deletes the first 3 by value
last = nums.pop()   # removes & RETURNS the last item
first = nums.pop(0) # pop by index too</code></pre>
<h2>Inspecting & copying</h2>
<pre><code>letters = ["a", "b", "a", "c"]
print(letters.index("b"))  # 1  (first position; raises if absent)
print(letters.count("a"))  # 2
backup = letters.copy()    # an independent shallow copy</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>pop</code> is special: it both removes <i>and</i> returns. The others return
<code>None</code>, so never write <code>nums = nums.append(4)</code>.</div></div>`,
          starter: `queue = ["alice", "bob"]
queue.append("carol")
queue.insert(0, "vip")
served = queue.pop(0)

print("now serving:", served)
print("waiting:", queue)`,
        },
        {
          id: "m04-l09", kind: "exercise", title: "Exercise: Playlist editor",
          tags: ["lists"],
          docs: [{ label: "list.pop()", url: "https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types" }],
          content: `
<div class="lc-eyebrow">Exercise · Collections</div>
<h1>Edit a playlist</h1>
<p>Apply this exact sequence of edits to <code>playlist</code>:</p>
<h3>Your task</h3>
<ol>
  <li><code>append</code> <code>"Outro"</code> to the end.</li>
  <li><code>insert</code> <code>"Chorus"</code> at index <code>2</code>.</li>
  <li><code>remove</code> the track <code>"Bridge"</code>.</li>
  <li><code>pop</code> the last track and store it in <code>encore</code>.</li>
</ol>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Remember <code>pop()</code> with no argument removes <i>and returns</i> the last
item.</div></div>`,
          starter: `playlist = ["Intro", "Verse", "Bridge"]

# 1) append "Outro"
# 2) insert "Chorus" at index 2
# 3) remove "Bridge"
# 4) encore = pop the last track
encore = ""

print(playlist)
print("encore:", encore)`,
          tests: [
            { name: "playlist ends as the right three tracks", code: `assert playlist == ["Intro", "Verse", "Chorus"], f"Got {playlist}"` },
            { name: "encore is 'Outro'", code: `assert encore == "Outro", f"Expected 'Outro', got {encore!r}"` },
            { name: "'Chorus' landed at index 2", code: `assert playlist.index("Chorus") == 2, "Chorus should be at index 2"` },
          ],
        },
        {
          id: "m04-l10", kind: "lesson", title: "Sorting with keys",
          docs: [
            { label: "sorted()", url: "https://docs.python.org/3/library/functions.html#sorted" },
            { label: "list.sort()", url: "https://docs.python.org/3/library/stdtypes.html#list.sort" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 9 · Collections</div>
<h1>Sorting your way</h1>
<p>Two tools, one idea. <code>list.sort()</code> sorts a list <b>in place</b>
(returns <code>None</code>); <code>sorted(iterable)</code> returns a <b>new</b>
sorted list and works on anything iterable.</p>
<pre><code>nums = [3, 1, 2]
nums.sort()                 # nums is now [1, 2, 3]
print(sorted([3, 1, 2]))    # [1, 2, 3], original untouched</code></pre>
<h2>The <code>key</code> argument</h2>
<p><code>key</code> takes a function applied to each item to decide the sort
order. Pair it with <code>reverse=True</code> for descending.</p>
<pre><code>words = ["pear", "fig", "apple"]
print(sorted(words, key=len))            # ['fig', 'pear', 'apple']
print(sorted(words, key=len, reverse=True))  # ['apple', 'pear', 'fig']</code></pre>
<h2>Sorting by more than one thing</h2>
<p>Return a <b>tuple</b> from <code>key</code> to sort by several fields. Sorting
is <i>stable</i>, so ties keep their original order.</p>
<pre><code>people = [("Ada", 90), ("Bo", 90), ("Cy", 75)]
# highest score first, then name A→Z:
print(sorted(people, key=lambda p: (-p[1], p[0])))</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Negating a number (<code>-p[1]</code>) flips just that field to descending while
the rest stay ascending.</div></div>`,
          starter: `scores = [("Ada", 90), ("Cy", 75), ("Bo", 90)]
ranked = sorted(scores, key=lambda p: (-p[1], p[0]))
for name, pts in ranked:
    print(f"{name}: {pts}")`,
        },
        {
          id: "m04-l11", kind: "exercise", title: "Exercise: Leaderboard by score then name",
          tags: ["sorting", "lists", "tuples"],
          docs: [{ label: "sorted(key=...)", url: "https://docs.python.org/3/library/functions.html#sorted" }],
          content: `
<div class="lc-eyebrow">Exercise · Collections</div>
<h1>Rank the players</h1>
<h3>Your task</h3>
<ul>
  <li><code>players</code> is a list of dicts with <code>name</code> and
      <code>score</code>.</li>
  <li>Build <code>ordered</code>: sorted by <b>score descending</b>, and for equal
      scores by <b>name A→Z</b>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
A tuple key does both at once:
<code>key=lambda p: (-p["score"], p["name"])</code>.</div></div>`,
          starter: `players = [
    {"name": "Cy", "score": 75},
    {"name": "Bo", "score": 90},
    {"name": "Ada", "score": 90},
]

ordered = players    # sort by score desc, then name asc

for p in ordered:
    print(p["name"], p["score"])`,
          tests: [
            { name: "ordered matches the reference sort", code: `assert ordered == sorted(players, key=lambda p: (-p["score"], p["name"])), "Sort by score desc, then name asc"` },
            { name: "the top player is Ada", code: `assert ordered[0]["name"] == "Ada", "Ada and Bo tie at 90; Ada comes first by name"` },
            { name: "the names are in the right order", code: `assert [p["name"] for p in ordered] == ["Ada", "Bo", "Cy"], f"Got {[p['name'] for p in ordered]}"` },
          ],
        },
        {
          id: "m04-l12", kind: "lesson", title: "Dictionary methods",
          docs: [{ label: "dict methods", url: "https://docs.python.org/3/library/stdtypes.html#dict" }],
          content: `
<div class="lc-eyebrow">Lesson 10 · Collections</div>
<h1>Working with dictionaries</h1>
<p>Beyond <code>get</code>, dicts have methods for updating, grouping, and merging.</p>
<h2>setdefault — get, or set then get</h2>
<p>Great for building up groups: it returns the value if the key exists, otherwise
inserts your default first.</p>
<pre><code>groups = {}
for word in ["ant", "ace", "bee"]:
    groups.setdefault(word[0], []).append(word)
# {'a': ['ant', 'ace'], 'b': ['bee']}</code></pre>
<h2>update & pop</h2>
<pre><code>config = {"debug": False}
config.update({"debug": True, "level": 3})  # merge another dict in
removed = config.pop("level")               # remove & return its value</code></pre>
<h2>Merging with |</h2>
<p>Python 3.9+ merges dicts with <code>|</code> (a new dict) or <code>|=</code>
(in place). On key clashes, the <b>right-hand side wins</b>.</p>
<pre><code>base = {"a": 1, "b": 2}
extra = {"b": 9, "c": 3}
print(base | extra)   # {'a': 1, 'b': 9, 'c': 3}</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<code>base | extra</code> leaves <code>base</code> untouched; <code>base |= extra</code>
modifies <code>base</code>.</div></div>`,
          starter: `inventory = {}
for item in ["apple", "apple", "pear", "apple", "pear"]:
    inventory[item] = inventory.get(item, 0) + 1
print(inventory)

prefs = {"theme": "light"} | {"theme": "dark", "size": "L"}
print(prefs)`,
        },
        {
          id: "m04-l13", kind: "exercise", title: "Exercise: Merge user settings",
          tags: ["dicts"],
          docs: [{ label: "Dict merge |", url: "https://docs.python.org/3/library/stdtypes.html#dict" }],
          content: `
<div class="lc-eyebrow">Exercise · Collections</div>
<h1>Layer overrides on top of defaults</h1>
<h3>Your task</h3>
<ul>
  <li>Produce <code>settings</code> = <code>defaults</code> with
      <code>overrides</code> layered on top (overrides win on clashes).</li>
  <li>Crucially, <b>do not mutate</b> <code>defaults</code> — other code still
      relies on it.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>defaults | overrides</code> builds a fresh dict and leaves both inputs
alone. (<code>defaults.update(overrides)</code> would mutate it — avoid that
here.)</div></div>`,
          starter: `defaults  = {"theme": "light", "volume": 5, "lang": "en"}
overrides = {"theme": "dark", "volume": 8}

settings = defaults     # merge overrides on top, without changing defaults

print(settings)`,
          tests: [
            { name: "settings has overrides applied", code: `assert settings == {"theme": "dark", "volume": 8, "lang": "en"}, f"Got {settings}"` },
            { name: "settings equals defaults | overrides", code: `assert settings == (defaults | overrides), "Layer overrides on top of defaults"` },
            { name: "defaults was not mutated", code: `assert defaults == {"theme": "light", "volume": 5, "lang": "en"}, "defaults should be unchanged"` },
          ],
        },
        {
          id: "m04-l14", kind: "exercise", title: "Exercise: Set algebra on skills",
          tags: ["sets"],
          docs: [{ label: "Set operations", url: "https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset" }],
          content: `
<div class="lc-eyebrow">Exercise · Collections</div>
<h1>Compare two skill sets</h1>
<p>Sets make "what's shared / unique / either" trivial. Compute four results from
<code>alice</code> and <code>bob</code>.</p>
<h3>Your task</h3>
<ul>
  <li><code>both</code> — skills they <b>share</b> (intersection).</li>
  <li><code>either</code> — <b>all</b> skills combined (union).</li>
  <li><code>only_alice</code> — skills Alice has that Bob lacks (difference).</li>
  <li><code>exclusive</code> — skills exactly one of them has (symmetric
      difference).</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
The operators are <code>&amp;</code> (and), <code>|</code> (or), <code>-</code>
(minus), <code>^</code> (xor) — or the named methods
<code>intersection</code>, <code>union</code>, <code>difference</code>,
<code>symmetric_difference</code>.</div></div>`,
          starter: `alice = {"python", "sql", "git", "docker"}
bob   = {"git", "docker", "aws", "python"}

both       = set()   # shared
either     = set()   # all combined
only_alice = set()   # Alice minus Bob
exclusive  = set()   # exactly one of them

print(both, either, only_alice, exclusive)`,
          tests: [
            { name: "both is the intersection", code: `assert both == (alice & bob) == {"python", "git", "docker"}, f"Got {both}"` },
            { name: "either is the union", code: `assert either == (alice | bob), f"Got {either}"` },
            { name: "only_alice is the difference", code: `assert only_alice == (alice - bob) == {"sql"}, f"Got {only_alice}"` },
            { name: "exclusive is the symmetric difference", code: `assert exclusive == (alice ^ bob) == {"sql", "aws"}, f"Got {exclusive}"` },
          ],
        },
        {
          id: "m04-quiz", kind: "quiz", title: "Module 4 Check: Collections",
          intro: "Lists, dicts, tuples, and sets.",
          questions: [
            { q: "Which collection is ordered and editable?", options: ["tuple", "set", "list", "frozenset"], answer: 2, explain: "Lists are ordered and mutable." , tags: ["lists"] },
            { q: "How do you add 'x' to the end of a list called items?", options: ["items.add('x')", "items.append('x')", "items + 'x'", "items.push('x')"], answer: 1, explain: "Lists use .append(); .add() is for sets." , tags: ["lists"] },
            { q: "What does set([1,2,2,3]) give?", options: ["[1,2,2,3]", "{1,2,3}", "(1,2,3)", "{1,2,2,3}"], answer: 1, explain: "Sets keep only unique values." , tags: ["sets"] },
            { q: "Which collection can't be changed after creation?", options: ["list", "dict", "tuple", "set"], answer: 2, explain: "Tuples are immutable." , tags: ["tuples"] },
            { q: "How do you safely read a missing key from dict d?", options: ["d['x']", "d.get('x', default)", "d.find('x')", "d->x"], answer: 1, explain: ".get(key, default) returns the default instead of raising KeyError." , tags: ["dicts"] },
            { q: "What does person.items() yield in a for loop?", options: ["keys only", "values only", "key/value pairs", "the length"], answer: 2, explain: ".items() yields (key, value) tuples." , tags: ["dicts"] },
          ],
        },
      ],
    },

    /* ═══════════════ MODULE 05 ═══════════════ */
    {
      id: "m05", num: "Module 05", title: "Functions & Scope",
      icon: "fas fa-cube",
      desc: "Define reusable functions, arguments, *args/**kwargs, closures, decorators.",
      lessons: [
        {
          id: "m05-l01", kind: "lesson", title: "Defining functions",
          docs: [{ label: "Defining functions", url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" }],
          content: `
<div class="lc-eyebrow">Lesson 1 · Functions & Scope</div>
<h1>Packaging code into functions</h1>
<p>A <b>function</b> is a named block of code you can reuse. Define it with
<code>def</code>, give it a name and parentheses, and indent its body.</p>
<pre><code>def greet():
    print("Hello!")

greet()   # call it — prints Hello!
greet()   # call it again</code></pre>
<h2>Inputs (parameters) and outputs (return)</h2>
<p>Parameters let you pass values in; <code>return</code> sends a value back out.</p>
<pre><code>def square(n):
    return n * n

result = square(5)
print(result)        # 25
print(square(9))     # 81</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<b>print vs return:</b> <code>print</code> shows something to the user;
<code>return</code> hands a value back to the code that called the function so it
can be used further. They are not the same!</div></div>`,
          starter: `def area_of_rectangle(width, height):
    return width * height

print(area_of_rectangle(4, 5))
print(area_of_rectangle(10, 2))

a = area_of_rectangle(3, 3)
print(f"A 3x3 square has area {a}")`,
        },
        {
          id: "m05-l02", kind: "lesson", title: "Default & keyword arguments",
          docs: [
            { label: "Default argument values", url: "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values" },
            { label: "Keyword arguments", url: "https://docs.python.org/3/tutorial/controlflow.html#keyword-arguments" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 2 · Functions & Scope</div>
<h1>Flexible arguments</h1>
<h2>Default values</h2>
<p>Give a parameter a default and callers may omit it.</p>
<pre><code>def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Ada"))               # Hello, Ada!
print(greet("Ada", "Welcome"))    # Welcome, Ada!</code></pre>
<h2>Keyword arguments</h2>
<p>You can pass arguments by name, in any order — which makes calls readable.</p>
<pre><code>def make_box(width, height, color="black"):
    return f"{width}x{height} {color} box"

print(make_box(height=2, width=5))
print(make_box(5, 2, color="red"))</code></pre>
<div class="callout"><i class="fas fa-triangle-exclamation"></i><div>
Never use a mutable default like <code>def f(items=[])</code> — the same list is
shared across calls. Use <code>None</code> and create a fresh list inside.</div></div>`,
          starter: `def power(base, exponent=2):
    return base ** exponent

print(power(5))          # 25  (squared by default)
print(power(2, 10))      # 1024
print(power(exponent=3, base=2))   # 8`,
        },
        {
          id: "m05-l03", kind: "lesson", title: "*args and **kwargs",
          docs: [{ label: "Arbitrary argument lists", url: "https://docs.python.org/3/tutorial/controlflow.html#arbitrary-argument-lists" }],
          content: `
<div class="lc-eyebrow">Lesson 3 · Functions & Scope</div>
<h1>Accepting any number of arguments</h1>
<p><code>*args</code> collects extra positional arguments into a tuple;
<code>**kwargs</code> collects extra named arguments into a dictionary.</p>
<pre><code>def total(*numbers):
    return sum(numbers)

print(total(1, 2, 3))        # 6
print(total(10, 20, 30, 40)) # 100</code></pre>
<pre><code>def describe(**facts):
    for key, value in facts.items():
        print(f"{key}: {value}")

describe(name="Ada", role="Engineer", city="London")</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
The names <code>args</code> and <code>kwargs</code> are just convention — it's the
<code>*</code> and <code>**</code> that matter.</div></div>`,
          starter: `def average(*numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

print(average(4, 8, 6))
print(average(10, 20))
print(average())`,
        },
        {
          id: "m05-l04", kind: "lesson", title: "Scope & the LEGB rule",
          docs: [{ label: "Scopes & namespaces", url: "https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces" }],
          content: `
<div class="lc-eyebrow">Lesson 4 · Functions & Scope</div>
<h1>Where names live</h1>
<p>A variable created <i>inside</i> a function is <b>local</b> — it exists only
while that function runs. Variables outside are <b>global</b>.</p>
<pre><code>message = "global"     # global

def show():
    message = "local"  # a different, local variable
    print(message)     # local

show()
print(message)         # global — unchanged</code></pre>
<p>When Python looks up a name it searches in order — <b>L</b>ocal, then
<b>E</b>nclosing, then <b>G</b>lobal, then <b>B</b>uilt-in. That's the LEGB rule.</p>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Functions can <i>read</i> globals, but assigning inside a function makes a new
local by default. Prefer passing values in as arguments and returning results out
— it keeps functions predictable.</div></div>`,
          starter: `tax_rate = 0.2   # global

def with_tax(price):
    # reads the global tax_rate, returns a new value
    return price * (1 + tax_rate)

print(with_tax(100))
print(with_tax(50))
print(f"tax_rate is still {tax_rate}")`,
        },
        {
          id: "m05-l05", kind: "lesson", title: "Closures & decorators",
          docs: [
            { label: "Decorator (glossary)", url: "https://docs.python.org/3/glossary.html#term-decorator" },
            { label: "functools.wraps", url: "https://docs.python.org/3/library/functools.html#functools.wraps" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 5 · Functions & Scope</div>
<h1>Functions that build functions</h1>
<p>Functions are values: you can pass them around and even return them. A
<b>closure</b> is a function that remembers variables from where it was created.</p>
<pre><code>def multiplier(factor):
    def multiply(n):
        return n * factor      # remembers 'factor'
    return multiply

double = multiplier(2)
triple = multiplier(3)
print(double(10))   # 20
print(triple(10))   # 30</code></pre>
<h2>Decorators</h2>
<p>A <b>decorator</b> wraps a function to add behaviour. The <code>@</code> syntax
applies it.</p>
<pre><code>def shout(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

@shout
def greet(name):
    return f"hi {name}"

print(greet("ada"))   # HI ADA</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Decorators power logging, timing, caching, and access control across real-world
Python — you'll meet them again in frameworks like Flask.</div></div>`,
          starter: `def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def cheer(team):
    print(f"Go {team}!")

cheer("Pythoneers")`,
        },
        {
          id: "m05-l06", kind: "exercise", title: "Exercise: Write is_palindrome",
          tags: ["functions", "strings"],
          content: `
<div class="lc-eyebrow">Exercise · Functions & Scope</div>
<h1>Define a function</h1>
<h3>Your task</h3>
<ul>
  <li>Define a function <code>is_palindrome(text)</code> that returns
      <code>True</code> if <code>text</code> reads the same forwards and
      backwards, ignoring case, and <code>False</code> otherwise.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>text.lower()</code> normalises case; <code>text[::-1]</code> reverses a
string.</div></div>`,
          starter: `def is_palindrome(text):
    # return True or False
    pass

print(is_palindrome("Racecar"))   # True
print(is_palindrome("python"))    # False`,
          tests: [
            { name: "'racecar' is a palindrome", code: `assert is_palindrome("racecar") is True, "racecar should be True"` },
            { name: "case is ignored", code: `assert is_palindrome("Level") is True, "Level should be True (ignore case)"` },
            { name: "'python' is not a palindrome", code: `assert is_palindrome("python") is False, "python should be False"` },
            { name: "returns a boolean", code: `assert isinstance(is_palindrome("abc"), bool), "should return True/False"` },
          ],
        },
        {
          id: "m05-l07", kind: "exercise", title: "Exercise: apply_twice",
          tags: ["functions", "lambda-hof"],
          content: `
<div class="lc-eyebrow">Exercise · Functions & Scope</div>
<h1>Functions as arguments</h1>
<h3>Your task</h3>
<ul>
  <li>Define <code>apply_twice(func, value)</code> that calls <code>func</code> on
      <code>value</code>, then calls it again on the result, and returns it.</li>
  <li>Example: with <code>func</code> that adds 3, <code>apply_twice(add3, 10)</code>
      returns <code>16</code>.</li>
</ul>`,
          starter: `def apply_twice(func, value):
    # call func on value twice
    pass

def add_three(n):
    return n + 3

print(apply_twice(add_three, 10))   # 16`,
          tests: [
            { name: "applies the function twice", code: `assert apply_twice(lambda x: x + 3, 10) == 16, "Expected 16"` },
            { name: "works with other functions", code: `assert apply_twice(lambda x: x * 2, 5) == 20, "Expected 20"` },
            { name: "works with strings too", code: `assert apply_twice(lambda s: s + "!", "hi") == "hi!!", "Expected 'hi!!'"` },
          ],
        },
        {
          id: "m05-l08", kind: "exercise", title: "Exercise: Price with discount & tax",
          tags: ["functions", "numbers-math"],
          docs: [
            { label: "Defining functions", url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" },
            { label: "Default argument values", url: "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · Functions & Scope</div>
<h1>An e-commerce price function</h1>
<p>Real pricing applies a discount, then tax. Sensible defaults keep the common
call simple.</p>
<h3>Your task</h3>
<p>Write <code>final_price(price, discount=0.0, tax=0.2)</code> that:</p>
<ul>
  <li>applies the discount — <code>price * (1 - discount)</code>,</li>
  <li>then adds tax — <code>* (1 + tax)</code>,</li>
  <li>returns the result rounded to 2 decimals.</li>
</ul>`,
          starter: `def final_price(price, discount=0.0, tax=0.2):
    # discount, then tax, rounded to 2 decimals
    pass

print(final_price(100))            # 120.0
print(final_price(100, 0.1))       # 108.0
print(final_price(50, 0.0, 0.0))   # 50.0`,
          tests: [
            { name: "default 20% tax applies", code: `assert final_price(100) == 120.0, "100 + 20% tax = 120.0"` },
            { name: "discount then tax", code: `assert final_price(100, 0.1) == 108.0, "10% off then 20% tax = 108.0"` },
            { name: "no discount, no tax", code: `assert final_price(50, 0.0, 0.0) == 50.0, "With both zero the price is unchanged"` },
            { name: "rounds to 2 decimals", code: `assert final_price(19.99, 0.15) == round(19.99 * 0.85 * 1.2, 2), "Round the final amount to 2 decimals"` },
          ],
        },
        {
          id: "m05-quiz", kind: "quiz", title: "Module 5 Check: Functions",
          intro: "Defining and using functions, arguments, scope, and closures.",
          questions: [
            { q: "What keyword defines a function?", options: ["function", "def", "fun", "define"], answer: 1, explain: "Python uses def." , tags: ["functions"] },
            { q: "What does `return` do?", options: ["Prints a value", "Sends a value back to the caller", "Ends the program", "Loops"], answer: 1, explain: "return hands a value back; print only displays." , tags: ["functions"] },
            { q: "In `def f(a, b=2)`, what is b?", options: ["Required", "A default argument", "A keyword-only argument", "Invalid syntax"], answer: 1, explain: "b has a default value, so callers may omit it." , tags: ["args-kwargs"] },
            { q: "What does *args collect?", options: ["Extra keyword arguments into a dict", "Extra positional arguments into a tuple", "Nothing", "Only strings"], answer: 1, explain: "*args gathers extra positional args as a tuple; **kwargs gathers keyword args as a dict." , tags: ["args-kwargs"] },
            { q: "A variable assigned inside a function is by default…", options: ["Global", "Local to that function", "A constant", "Shared with the caller"], answer: 1, explain: "Assignment inside a function creates a local name (the L in LEGB)." , tags: ["scope"] },
            { q: "What does the @ symbol above a function apply?", options: ["A comment", "A decorator", "A type hint", "A loop"], answer: 1, explain: "@name applies a decorator that wraps the function." , tags: ["decorators"] },
          ],
        },
      ],
    },

    /* ═══════════════ MODULE 06 ═══════════════ */
    {
      id: "m06", num: "Module 06", title: "Object-Oriented Python",
      icon: "fas fa-shapes",
      desc: "Classes, instances, inheritance, dunder methods, and dataclasses.",
      lessons: [
        {
          id: "m06-l01", kind: "lesson", title: "Classes & instances",
          docs: [{ label: "A first look at classes", url: "https://docs.python.org/3/tutorial/classes.html#a-first-look-at-classes" }],
          content: `
<div class="lc-eyebrow">Lesson 1 · Object-Oriented Python</div>
<h1>Your own data types</h1>
<p>A <b>class</b> is a blueprint. An <b>instance</b> is a thing built from that
blueprint. The special method <code>__init__</code> runs when you create one and
sets up its data, stored on <code>self</code>.</p>
<pre><code>class Dog:
    def __init__(self, name, age):
        self.name = name      # an "attribute"
        self.age = age

buddy = Dog("Buddy", 3)       # make an instance
print(buddy.name)             # Buddy
print(buddy.age)              # 3</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<code>self</code> is the instance itself — the first parameter of every method.
You don't pass it manually; Python does it for you when you call
<code>buddy.bark()</code>.</div></div>`,
          starter: `class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

b = Book("Dune", "Herbert", 412)
print(f"{b.title} by {b.author}, {b.pages} pages")`,
        },
        {
          id: "m06-l02", kind: "lesson", title: "Methods: behaviour on objects",
          docs: [{ label: "Instance objects & methods", url: "https://docs.python.org/3/tutorial/classes.html#instance-objects" }],
          content: `
<div class="lc-eyebrow">Lesson 2 · Object-Oriented Python</div>
<h1>Methods</h1>
<p>A <b>method</b> is a function defined inside a class. It acts on the instance's
own data through <code>self</code>.</p>
<pre><code>class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1

    def reset(self):
        self.count = 0

c = Counter()
c.increment()
c.increment()
print(c.count)   # 2
c.reset()
print(c.count)   # 0</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Objects bundle <b>data</b> (attributes) and <b>behaviour</b> (methods) together —
that's the whole idea of object-oriented programming.</div></div>`,
          starter: `class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
        else:
            print("Insufficient funds")

acc = BankAccount("Ada")
acc.deposit(100)
acc.withdraw(30)
print(f"{acc.owner} has {acc.balance}")`,
        },
        {
          id: "m06-l03", kind: "lesson", title: "Inheritance",
          docs: [{ label: "Inheritance", url: "https://docs.python.org/3/tutorial/classes.html#inheritance" }],
          content: `
<div class="lc-eyebrow">Lesson 3 · Object-Oriented Python</div>
<h1>Building on existing classes</h1>
<p><b>Inheritance</b> lets a class reuse and extend another. The child gets the
parent's methods and can add or override its own.</p>
<pre><code>class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Cat(Animal):
    def speak(self):           # override
        return "Meow"

class Dog(Animal):
    def speak(self):
        return "Woof"

for pet in [Cat("Tom"), Dog("Rex")]:
    print(f"{pet.name} says {pet.speak()}")</code></pre>
<p>Use <code>super()</code> to call the parent's version:</p>
<pre><code>class Puppy(Dog):
    def __init__(self, name, toy):
        super().__init__(name)   # run Dog/Animal __init__
        self.toy = toy</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Looping over different objects that share a method name (like <code>speak</code>)
and getting the right behaviour is called <b>polymorphism</b>.</div></div>`,
          starter: `class Shape:
    def area(self):
        return 0

class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14159 * self.radius ** 2

for s in [Square(4), Circle(3)]:
    print(f"{type(s).__name__} area: {s.area():.2f}")`,
        },
        {
          id: "m06-l04", kind: "lesson", title: "Dunder methods",
          docs: [{ label: "Special method names (data model)", url: "https://docs.python.org/3/reference/datamodel.html#special-method-names" }],
          content: `
<div class="lc-eyebrow">Lesson 4 · Object-Oriented Python</div>
<h1>Making objects feel native</h1>
<p>"Dunder" (double-underscore) methods let your objects work with Python's
built-in syntax. Define <code>__str__</code> for a friendly printout,
<code>__eq__</code> for <code>==</code>, and <code>__add__</code> for <code>+</code>.</p>
<pre><code>class Money:
    def __init__(self, cents):
        self.cents = cents

    def __str__(self):
        return f"\${self.cents / 100:.2f}"

    def __add__(self, other):
        return Money(self.cents + other.cents)

    def __eq__(self, other):
        return self.cents == other.cents

a = Money(150)
b = Money(250)
print(a + b)          # $4.00  (uses __add__ then __str__)
print(a == Money(150))  # True</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Without <code>__str__</code>, printing an object shows something like
<code>&lt;Money object at 0x...&gt;</code>. Dunder methods make it readable.</div></div>`,
          starter: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    def __str__(self):
        return f"({self.x}, {self.y})"

v = Vector(1, 2) + Vector(3, 4)
print(v)   # (4, 6)`,
        },
        {
          id: "m06-l05", kind: "lesson", title: "Dataclasses",
          docs: [{ label: "dataclasses", url: "https://docs.python.org/3/library/dataclasses.html" }],
          content: `
<div class="lc-eyebrow">Lesson 5 · Object-Oriented Python</div>
<h1>Less boilerplate with @dataclass</h1>
<p>For classes that mostly hold data, the <code>@dataclass</code> decorator writes
<code>__init__</code>, <code>__repr__</code>, and <code>__eq__</code> for you.</p>
<pre><code>from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p = Point(3, 4)
print(p)            # Point(x=3, y=4)  — free __repr__
print(p == Point(3, 4))   # True       — free __eq__</code></pre>
<p>You can add defaults and methods too:</p>
<pre><code>@dataclass
class Product:
    name: str
    price: float
    in_stock: bool = True

    def label(self):
        return f"{self.name}: \${self.price:.2f}"</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Dataclasses are the modern, concise way to model records. Reach for them whenever
a class is "mostly fields".</div></div>`,
          starter: `from dataclasses import dataclass

@dataclass
class Task:
    title: str
    done: bool = False

t = Task("Write tests")
print(t)
t.done = True
print(t)
print(Task("A") == Task("A"))`,
        },
        {
          id: "m06-l06", kind: "exercise", title: "Exercise: A Rectangle class",
          tags: ["classes-oop"],
          content: `
<div class="lc-eyebrow">Exercise · Object-Oriented Python</div>
<h1>Model a rectangle</h1>
<h3>Your task</h3>
<p>Define a class <code>Rectangle</code> with:</p>
<ul>
  <li>an <code>__init__(self, width, height)</code> storing both,</li>
  <li>a method <code>area(self)</code> returning width × height,</li>
  <li>a method <code>perimeter(self)</code> returning 2 × (width + height).</li>
</ul>`,
          starter: `class Rectangle:
    def __init__(self, width, height):
        pass

    def area(self):
        pass

    def perimeter(self):
        pass

r = Rectangle(4, 5)
print(r.area())        # 20
print(r.perimeter())   # 18`,
          tests: [
            { name: "stores width and height", code: `r = Rectangle(4, 5)\nassert r.width == 4 and r.height == 5, "Store width and height on self"` },
            { name: "area() is correct", code: `assert Rectangle(4, 5).area() == 20, "area should be width*height"` },
            { name: "perimeter() is correct", code: `assert Rectangle(4, 5).perimeter() == 18, "perimeter should be 2*(w+h)"` },
            { name: "works for other sizes", code: `assert Rectangle(3, 7).area() == 21 and Rectangle(3, 7).perimeter() == 20, "Should work for any size"` },
          ],
        },
        {
          id: "m06-l07", kind: "exercise", title: "Exercise: Vector addition",
          tags: ["classes-oop", "dunder-methods"],
          content: `
<div class="lc-eyebrow">Exercise · Object-Oriented Python</div>
<h1>Add vectors with +</h1>
<h3>Your task</h3>
<p>Define a class <code>Vec</code> with <code>x</code> and <code>y</code>, and a
<code>__add__</code> method so that <code>Vec(1,2) + Vec(3,4)</code> produces a new
<code>Vec</code> with <code>x == 4</code> and <code>y == 6</code>.</p>`,
          starter: `class Vec:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        pass   # return a new Vec

result = Vec(1, 2) + Vec(3, 4)
print(result.x, result.y)   # 4 6`,
          tests: [
            { name: "addition produces correct x", code: `assert (Vec(1,2) + Vec(3,4)).x == 4, "x should add"` },
            { name: "addition produces correct y", code: `assert (Vec(1,2) + Vec(3,4)).y == 6, "y should add"` },
            { name: "result is a Vec instance", code: `assert isinstance(Vec(1,2) + Vec(3,4), Vec), "__add__ should return a new Vec"` },
          ],
        },
        {
          id: "m06-l08", kind: "exercise", title: "Exercise: A shopping cart",
          tags: ["classes-oop"],
          docs: [
            { label: "Classes", url: "https://docs.python.org/3/tutorial/classes.html" },
            { label: "Lists (.append())", url: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · Object-Oriented Python</div>
<h1>Model a shopping cart</h1>
<h3>Your task</h3>
<p>Define a <code>ShoppingCart</code> class:</p>
<ul>
  <li><code>__init__</code> starts an empty <code>items</code> list.</li>
  <li><code>add(self, name, price)</code> stores the item (e.g. as a tuple).</li>
  <li><code>total(self)</code> returns the sum of all the prices.</li>
  <li><code>count(self)</code> returns how many items are in the cart.</li>
</ul>`,
          starter: `class ShoppingCart:
    def __init__(self):
        pass

    def add(self, name, price):
        pass

    def total(self):
        pass

    def count(self):
        pass

cart = ShoppingCart()
cart.add("Pen", 2.50)
cart.add("Notebook", 4.00)
print(cart.total(), cart.count())   # 6.5 2`,
          tests: [
            { name: "a new cart is empty", code: `c = ShoppingCart()\nassert c.total() == 0 and c.count() == 0, "An empty cart totals 0 with 0 items"` },
            { name: "total sums the prices", code: `c = ShoppingCart()\nc.add("Pen", 2.50)\nc.add("Notebook", 4.00)\nassert c.total() == 6.5, "total should sum the prices"` },
            { name: "count tracks the items", code: `c = ShoppingCart()\nc.add("A", 1)\nc.add("B", 2)\nc.add("C", 3)\nassert c.count() == 3, "count should be the number of items"` },
          ],
        },
        {
          id: "m06-quiz", kind: "quiz", title: "Module 6 Check: OOP",
          intro: "Classes, instances, inheritance, and dunder methods.",
          questions: [
            { q: "What runs automatically when you create an instance?", options: ["__new__ only", "__init__", "__main__", "__str__"], answer: 1, explain: "__init__ initialises a new instance." , tags: ["classes-oop"] },
            { q: "What is `self` in a method?", options: ["The class itself", "The current instance", "A global variable", "The parent class"], answer: 1, explain: "self refers to the specific instance the method was called on." , tags: ["classes-oop"] },
            { q: "What does a child class get from its parent?", options: ["Nothing", "Only attributes", "The parent's methods and attributes", "Only the name"], answer: 2, explain: "Inheritance gives the child the parent's behaviour, which it can extend or override." , tags: ["inheritance"] },
            { q: "Which dunder method customises what print() shows?", options: ["__print__", "__show__", "__str__", "__repr_only__"], answer: 2, explain: "__str__ defines the human-readable string." , tags: ["dunder-methods"] },
            { q: "What does @dataclass generate for you?", options: ["A database table", "__init__, __repr__, __eq__", "A web server", "Type checking"], answer: 1, explain: "It auto-writes the common boilerplate methods." , tags: ["classes-oop"] },
            { q: "How do you call the parent class's __init__?", options: ["parent()", "super().__init__()", "self.__init__()", "Animal.init()"], answer: 1, explain: "super().__init__(...) invokes the parent initialiser." , tags: ["inheritance"] },
          ],
        },
      ],
    },

    /* ═══════════════ MODULE 07 ═══════════════ */
    {
      id: "m07", num: "Module 07", title: "Files & Exceptions",
      icon: "fas fa-folder-open",
      desc: "Read and write files, handle errors gracefully, and use pathlib.",
      lessons: [
        {
          id: "m07-l01", kind: "lesson", title: "Reading & writing files",
          docs: [
            { label: "Reading & writing files", url: "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" },
            { label: "open()", url: "https://docs.python.org/3/library/functions.html#open" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 1 · Files & Exceptions</div>
<h1>Working with files</h1>
<p>Open a file with <code>open(path, mode)</code>. Modes: <code>"r"</code> read,
<code>"w"</code> write (replaces), <code>"a"</code> append. The safe way is a
<code>with</code> block — it closes the file automatically.</p>
<pre><code>with open("notes.txt", "w") as f:
    f.write("First line\\n")
    f.write("Second line\\n")

with open("notes.txt", "r") as f:
    content = f.read()
print(content)</code></pre>
<h2>Reading line by line</h2>
<pre><code>with open("notes.txt") as f:
    for line in f:
        print(line.strip())   # strip removes the trailing newline</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
In Pythoneer, files you write land in a temporary working folder for that run — so
you can write and read them back safely in the same program.</div></div>`,
          starter: `# Write three lines, then read them back
with open("shopping.txt", "w") as f:
    for item in ["milk", "bread", "eggs"]:
        f.write(item + "\\n")

lines = []
with open("shopping.txt") as f:
    for line in f:
        lines.append(line.strip())

print(lines)
print(f"{len(lines)} items")`,
        },
        {
          id: "m07-l02", kind: "lesson", title: "Handling errors with try/except",
          docs: [{ label: "Handling exceptions", url: "https://docs.python.org/3/tutorial/errors.html#handling-exceptions" }],
          content: `
<div class="lc-eyebrow">Lesson 2 · Files & Exceptions</div>
<h1>When things go wrong</h1>
<p>Some operations can fail — dividing by zero, converting bad input, opening a
missing file. Instead of crashing, wrap risky code in <code>try</code> and handle
the failure in <code>except</code>.</p>
<pre><code>try:
    number = int("not a number")
except ValueError:
    print("That wasn't a valid number")</code></pre>
<p>You can catch specific error types and add <code>else</code> / <code>finally</code>:</p>
<pre><code>try:
    result = 10 / divisor
except ZeroDivisionError:
    print("Can't divide by zero")
else:
    print(f"Result is {result}")   # runs if no error
finally:
    print("Done")                  # always runs</code></pre>
<div class="callout"><i class="fas fa-triangle-exclamation"></i><div>
Catch <i>specific</i> exceptions, not a bare <code>except:</code>. Hiding every
error makes bugs invisible.</div></div>`,
          starter: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "undefined"

print(safe_divide(10, 2))   # 5.0
print(safe_divide(10, 0))   # undefined
print(safe_divide(9, 3))    # 3.0`,
        },
        {
          id: "m07-l03", kind: "lesson", title: "Raising & custom exceptions",
          docs: [
            { label: "Raising exceptions", url: "https://docs.python.org/3/tutorial/errors.html#raising-exceptions" },
            { label: "User-defined exceptions", url: "https://docs.python.org/3/tutorial/errors.html#user-defined-exceptions" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 3 · Files & Exceptions</div>
<h1>Signalling problems yourself</h1>
<p>Use <code>raise</code> to report a problem from your own code. You can raise
built-in exceptions or define your own by subclassing <code>Exception</code>.</p>
<pre><code>def set_age(age):
    if age < 0:
        raise ValueError("age cannot be negative")
    return age

try:
    set_age(-5)
except ValueError as e:
    print(f"Rejected: {e}")</code></pre>
<h2>Custom exception types</h2>
<pre><code>class InsufficientFunds(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFunds("not enough money")
    return balance - amount</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Custom exceptions make error handling expressive: callers can catch
<code>InsufficientFunds</code> specifically and respond to it.</div></div>`,
          starter: `class TooLongError(Exception):
    pass

def validate_username(name):
    if len(name) > 10:
        raise TooLongError(f"'{name}' is too long")
    return name.lower()

print(validate_username("Ada"))
try:
    validate_username("ThisNameIsWayTooLong")
except TooLongError as e:
    print(f"Error: {e}")`,
        },
        {
          id: "m07-l04", kind: "lesson", title: "pathlib & the filesystem",
          docs: [{ label: "pathlib", url: "https://docs.python.org/3/library/pathlib.html" }],
          content: `
<div class="lc-eyebrow">Lesson 4 · Files & Exceptions</div>
<h1>Modern paths with pathlib</h1>
<p>The <code>pathlib</code> module treats paths as objects with handy methods —
cleaner and cross-platform compared to string juggling.</p>
<pre><code>from pathlib import Path

p = Path("data") / "report.txt"   # join with /
print(p.name)        # report.txt
print(p.suffix)      # .txt
print(p.stem)        # report

# Write and read directly:
note = Path("hello.txt")
note.write_text("Hi there")
print(note.read_text())
print(note.exists())   # True</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<code>Path</code> objects work with <code>/</code> to build paths and offer
<code>.exists()</code>, <code>.read_text()</code>, <code>.glob()</code> and much
more — prefer them over manual string paths.</div></div>`,
          starter: `from pathlib import Path

f = Path("diary.txt")
f.write_text("Day 1: started Python\\nDay 2: learned files\\n")

text = f.read_text()
print(text)
print(f"File name: {f.name}, exists: {f.exists()}")`,
        },
        {
          id: "m07-l05", kind: "exercise", title: "Exercise: Save & count lines",
          tags: ["files-io"],
          content: `
<div class="lc-eyebrow">Exercise · Files & Exceptions</div>
<h1>Write a file, then read it</h1>
<h3>Your task</h3>
<ul>
  <li>A list <code>quotes</code> is given.</li>
  <li>Write each quote on its own line to a file named <code>quotes.txt</code>.</li>
  <li>Read the file back and store the number of lines in a variable
      <code>line_count</code>.</li>
</ul>`,
          starter: `quotes = ["Stay hungry", "Think different", "Just do it"]

# 1) write each quote on its own line to quotes.txt
# 2) read it back and set line_count

line_count = 0
print(f"Lines: {line_count}")`,
          tests: [
            { name: "quotes.txt was created", code: `from pathlib import Path\nassert Path("quotes.txt").exists(), "Write the file quotes.txt"` },
            { name: "file has 3 lines", code: `from pathlib import Path\ntext = Path("quotes.txt").read_text()\nassert len([l for l in text.splitlines() if l.strip()]) == 3, "File should contain 3 non-empty lines"` },
            { name: "line_count is 3", code: `assert line_count == 3, f"Expected line_count 3, got {line_count}"` },
          ],
        },
        {
          id: "m07-l06", kind: "exercise", title: "Exercise: Safe integer parsing",
          tags: ["exceptions", "input-conversion"],
          content: `
<div class="lc-eyebrow">Exercise · Files & Exceptions</div>
<h1>Parse safely</h1>
<h3>Your task</h3>
<p>Define <code>to_int(text)</code> that returns the integer value of
<code>text</code>, or <code>-1</code> if it can't be converted (catch the
<code>ValueError</code>).</p>`,
          starter: `def to_int(text):
    # try converting; return -1 on failure
    pass

print(to_int("42"))      # 42
print(to_int("hello"))   # -1`,
          tests: [
            { name: "valid numbers convert", code: `assert to_int("42") == 42, "Should convert '42' to 42"` },
            { name: "invalid text returns -1", code: `assert to_int("hello") == -1, "Invalid input should return -1"` },
            { name: "empty string returns -1", code: `assert to_int("") == -1, "Empty string should return -1"` },
            { name: "negative numbers work", code: `assert to_int("-7") == -7, "Should handle negatives"` },
          ],
        },
        {
          id: "m07-l07", kind: "exercise", title: "Exercise: Scan a log file",
          tags: ["files-io", "strings"],
          docs: [
            { label: "Reading & writing files", url: "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files" },
            { label: "str methods (in / count)", url: "https://docs.python.org/3/library/stdtypes.html#string-methods" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · Files & Exceptions</div>
<h1>Count errors in a log</h1>
<p>A common real task: write out a log, then scan it for problems.</p>
<h3>Your task</h3>
<ul>
  <li>Write each string in <code>lines</code> on its own line to <code>app.log</code>.</li>
  <li>Read the file back and set <code>error_count</code> to the number of lines
      that contain <code>"ERROR"</code>.</li>
</ul>`,
          starter: `lines = [
    "INFO  service started",
    "ERROR disk full",
    "INFO  request handled",
    "ERROR timeout talking to db",
    "WARN  memory high",
]

error_count = 0
# 1) write each line to app.log
# 2) read it back and count lines containing "ERROR"

print("Errors:", error_count)`,
          tests: [
            { name: "app.log was written", code: `from pathlib import Path\nassert Path("app.log").exists(), "Write the lines to app.log"` },
            { name: "counts the ERROR lines", code: `assert error_count == 2, f"Expected 2 ERROR lines, got {error_count}"` },
            { name: "the file actually holds the lines", code: `from pathlib import Path\nassert Path("app.log").read_text().count("ERROR") == 2, "The file should contain the 2 ERROR lines"` },
          ],
        },
        {
          id: "m07-quiz", kind: "quiz", title: "Module 7 Check: Files & Errors",
          intro: "Files, the with statement, and exception handling.",
          questions: [
            { q: "Which mode opens a file for writing (replacing it)?", options: ["\"r\"", "\"w\"", "\"a\"", "\"x\""], answer: 1, explain: "\"w\" writes and truncates; \"a\" appends; \"r\" reads." , tags: ["files-io"] },
            { q: "Why use `with open(...) as f:`?", options: ["It's faster", "It closes the file automatically", "It reads faster", "It's required by Python"], answer: 1, explain: "The with block guarantees the file is closed even on errors." , tags: ["files-io"] },
            { q: "Where does risky code go?", options: ["In except", "In try", "In finally", "In else"], answer: 1, explain: "Put code that might fail in try; handle failures in except." , tags: ["exceptions"] },
            { q: "What does `finally` do?", options: ["Runs only on error", "Runs only on success", "Always runs", "Never runs"], answer: 2, explain: "finally runs whether or not an exception occurred." , tags: ["exceptions"] },
            { q: "How do you signal an error from your own code?", options: ["throw", "raise", "error()", "panic"], answer: 1, explain: "Python uses raise." , tags: ["exceptions"] },
            { q: "What does Path('a') / 'b.txt' produce?", options: ["A division error", "The joined path a/b.txt", "The string 'a/b.txt' only on Windows", "None"], answer: 1, explain: "pathlib overloads / to join path parts cross-platform." , tags: ["files-io"] },
          ],
        },
      ],
    },

    /* ═══════════════ MODULE 08 ═══════════════ */
    {
      id: "m08", num: "Module 08", title: "The Standard Library",
      icon: "fas fa-book",
      desc: "math, random, datetime, collections, itertools, and json — batteries included.",
      lessons: [
        {
          id: "m08-l01", kind: "lesson", title: "math & random",
          docs: [
            { label: "math", url: "https://docs.python.org/3/library/math.html" },
            { label: "random", url: "https://docs.python.org/3/library/random.html" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 1 · The Standard Library</div>
<h1>Importing power</h1>
<p>Python ships with hundreds of modules. <code>import</code> one to use it.</p>
<h2>math</h2>
<pre><code>import math
print(math.sqrt(144))     # 12.0
print(math.pi)            # 3.14159...
print(math.ceil(4.1))     # 5
print(math.floor(4.9))    # 4
print(math.gcd(12, 18))   # 6</code></pre>
<h2>random</h2>
<pre><code>import random
random.seed(42)               # makes results reproducible
print(random.randint(1, 6))   # a dice roll
print(random.choice(["a", "b", "c"]))
deck = [1, 2, 3, 4, 5]
random.shuffle(deck)
print(deck)</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Seeding the random generator (<code>random.seed(...)</code>) makes a program
produce the same "random" results each run — invaluable for testing.</div></div>`,
          starter: `import math
import random

random.seed(7)
rolls = []
for _ in range(5):
    rolls.append(random.randint(1, 6))
print("Rolls:", rolls)
print("Sum:", sum(rolls))
print("Hypotenuse of 3,4:", math.hypot(3, 4))`,
        },
        {
          id: "m08-l02", kind: "lesson", title: "datetime",
          docs: [{ label: "datetime", url: "https://docs.python.org/3/library/datetime.html" }],
          content: `
<div class="lc-eyebrow">Lesson 2 · The Standard Library</div>
<h1>Dates and times</h1>
<p>The <code>datetime</code> module handles dates, times, and the gaps between
them.</p>
<pre><code>from datetime import date, timedelta

d = date(2024, 1, 1)
print(d.year, d.month, d.day)   # 2024 1 1
print(d.weekday())              # 0 = Monday

future = d + timedelta(days=100)
print(future)                   # 2024-04-10

gap = date(2024, 12, 25) - date(2024, 1, 1)
print(gap.days)                 # 359</code></pre>
<p>Format a date for display with <code>strftime</code>:</p>
<pre><code>print(d.strftime("%A, %d %B %Y"))   # Monday, 01 January 2024</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Subtracting two dates gives a <code>timedelta</code>; its <code>.days</code>
attribute is the number of days between them.</div></div>`,
          starter: `from datetime import date, timedelta

launch = date(2024, 3, 15)
print("Launch:", launch.strftime("%d %b %Y"))
print("Weekday number:", launch.weekday())

deadline = launch + timedelta(weeks=6)
print("Deadline:", deadline)
print("Days from launch to year end:", (date(2024, 12, 31) - launch).days)`,
        },
        {
          id: "m08-l03", kind: "lesson", title: "collections: Counter & defaultdict",
          docs: [
            { label: "collections.Counter", url: "https://docs.python.org/3/library/collections.html#collections.Counter" },
            { label: "collections.defaultdict", url: "https://docs.python.org/3/library/collections.html#collections.defaultdict" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 3 · The Standard Library</div>
<h1>Smarter containers</h1>
<h2>Counter</h2>
<p><code>Counter</code> tallies things in one line and finds the most common.</p>
<pre><code>from collections import Counter

votes = ["red", "blue", "red", "green", "red", "blue"]
tally = Counter(votes)
print(tally)                 # Counter({'red': 3, 'blue': 2, 'green': 1})
print(tally["red"])          # 3
print(tally.most_common(1))  # [('red', 3)]</code></pre>
<h2>defaultdict</h2>
<p><code>defaultdict</code> gives missing keys a default automatically — perfect
for grouping.</p>
<pre><code>from collections import defaultdict

groups = defaultdict(list)
for name in ["Ann", "Bob", "Amy"]:
    groups[name[0]].append(name)
print(dict(groups))   # {'A': ['Ann', 'Amy'], 'B': ['Bob']}</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>Counter</code> replaces the manual "count words" loop you wrote earlier —
this is the idiomatic way.</div></div>`,
          starter: `from collections import Counter, defaultdict

text = "to be or not to be that is the question to be"
counts = Counter(text.split())
print("Most common:", counts.most_common(2))

by_length = defaultdict(list)
for word in set(text.split()):
    by_length[len(word)].append(word)
print("By length:", dict(by_length))`,
        },
        {
          id: "m08-l04", kind: "lesson", title: "itertools & json",
          docs: [
            { label: "itertools", url: "https://docs.python.org/3/library/itertools.html" },
            { label: "json", url: "https://docs.python.org/3/library/json.html" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 4 · The Standard Library</div>
<h1>Combinations and data exchange</h1>
<h2>itertools</h2>
<pre><code>from itertools import combinations, product, accumulate

print(list(combinations([1,2,3], 2)))   # [(1,2),(1,3),(2,3)]
print(list(accumulate([1,2,3,4])))      # [1,3,6,10] running totals</code></pre>
<h2>json — the language of APIs</h2>
<p><code>json</code> converts between Python objects and JSON text, the format
most web APIs speak.</p>
<pre><code>import json

data = {"name": "Ada", "skills": ["python", "math"], "active": True}
text = json.dumps(data)        # Python -> JSON string
print(text)

back = json.loads(text)        # JSON string -> Python
print(back["skills"][0])       # python</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<code>dumps</code> = "dump string", <code>loads</code> = "load string". The file
variants are <code>dump</code> and <code>load</code>.</div></div>`,
          starter: `import json
from itertools import accumulate

monthly = [120, 80, 200, 150]
running = list(accumulate(monthly))
print("Running totals:", running)

record = {"months": monthly, "total": sum(monthly)}
as_text = json.dumps(record, indent=2)
print(as_text)
print("Parsed total:", json.loads(as_text)["total"])`,
        },
        {
          id: "m08-l05", kind: "exercise", title: "Exercise: Word frequency with Counter",
          tags: ["collections-module", "dicts"],
          content: `
<div class="lc-eyebrow">Exercise · The Standard Library</div>
<h1>Most common word</h1>
<h3>Your task</h3>
<ul>
  <li>Use <code>collections.Counter</code> on <code>text.split()</code>.</li>
  <li>Store the single most common word (just the word, not the count) in a
      variable <code>top_word</code>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>Counter(...).most_common(1)</code> returns a list like
<code>[('the', 4)]</code> — index into it to get the word.</div></div>`,
          starter: `from collections import Counter

text = "data is the new oil but data needs refining and data needs care"

top_word = ""
# use Counter to find the most common word

print("Top word:", top_word)`,
          tests: [
            { name: "top_word is the most common word", code: `from collections import Counter\nassert top_word == Counter(text.split()).most_common(1)[0][0], "Find the most frequent word"` },
            { name: "for this text it's 'data'", code: `assert top_word == "data", f"Expected 'data', got {top_word!r}"` },
          ],
        },
        {
          id: "m08-l06", kind: "exercise", title: "Exercise: JSON round-trip",
          tags: ["modules-imports"],
          content: `
<div class="lc-eyebrow">Exercise · The Standard Library</div>
<h1>Serialise and parse</h1>
<h3>Your task</h3>
<ul>
  <li>A dictionary <code>profile</code> is given.</li>
  <li>Convert it to a JSON string named <code>as_json</code> with
      <code>json.dumps</code>.</li>
  <li>Parse that string back into a dict named <code>restored</code> with
      <code>json.loads</code>.</li>
</ul>`,
          starter: `import json

profile = {"name": "Iris", "level": 7, "tags": ["py", "data"]}

as_json = ""     # json.dumps(...)
restored = {}    # json.loads(as_json)

print(as_json)
print(restored["name"])`,
          tests: [
            { name: "as_json is a string", code: `assert isinstance(as_json, str), "as_json should be a JSON string"` },
            { name: "restored equals the original", code: `assert restored == profile, "Round-tripped dict should equal the original"` },
            { name: "nested list survived", code: `assert restored["tags"] == ["py", "data"], "Nested data should round-trip intact"` },
          ],
        },
        {
          id: "m08-l07", kind: "exercise", title: "Exercise: Shipping time",
          tags: ["datetime"],
          docs: [
            { label: "datetime", url: "https://docs.python.org/3/library/datetime.html" },
            { label: "datetime.strptime", url: "https://docs.python.org/3/library/datetime.html#datetime.datetime.strptime" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · The Standard Library</div>
<h1>How long did shipping take?</h1>
<h3>Your task</h3>
<ul>
  <li>Two date strings (<code>YYYY-MM-DD</code>) are given: <code>ordered</code> and
      <code>delivered</code>.</li>
  <li>Parse both with <code>datetime.strptime(text, "%Y-%m-%d")</code> and set
      <code>days</code> to the number of days between them.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>Subtracting two datetimes
gives a <code>timedelta</code>; its <code>.days</code> is what you want.</div></div>`,
          starter: `from datetime import datetime

ordered = "2024-03-01"
delivered = "2024-03-15"

days = 0
# parse both dates and compute the gap in days

print(f"Shipping took {days} days")`,
          tests: [
            { name: "days is 14", code: `assert days == 14, f"Expected 14, got {days}"` },
            { name: "days is a whole number of days", code: `assert isinstance(days, int) and days > 0, "days should be a positive integer (a timedelta's .days)"` },
          ],
        },
        {
          id: "m08-l08", kind: "lesson", title: "Parsing & formatting dates",
          docs: [
            { label: "strftime / strptime", url: "https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior" },
            { label: "date.fromisoformat", url: "https://docs.python.org/3/library/datetime.html#datetime.date.fromisoformat" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 8 · The Standard Library</div>
<h1>Text ⇄ dates</h1>
<p>Dates almost always arrive as text and need to leave as text. Two methods are
the bridge, and it's easy to mix them up:</p>
<ul>
  <li><code>strptime(text, fmt)</code> — <b>p</b>arse a string <i>into</i> a
      datetime.</li>
  <li><code>dt.strftime(fmt)</code> — <b>f</b>ormat a datetime <i>into</i> a
      string.</li>
</ul>
<pre><code>from datetime import datetime
dt = datetime.strptime("2024-03-09", "%Y-%m-%d")
print(dt.strftime("%d %b %Y"))   # "09 Mar 2024"
print(dt.strftime("%A"))         # "Saturday"</code></pre>
<h2>Handy format codes</h2>
<p><code>%Y</code> 4-digit year · <code>%m</code> month number ·
<code>%d</code> day · <code>%b</code> short month name · <code>%A</code> weekday ·
<code>%H:%M</code> time.</p>
<h2>ISO shortcuts & arithmetic</h2>
<pre><code>from datetime import date, timedelta
d = date.fromisoformat("2024-03-09")   # quick parse of YYYY-MM-DD
print(d + timedelta(days=7))           # 2024-03-16</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Memory aid: st<b>p</b>time <b>p</b>arses; str<b>f</b>time <b>f</b>ormats.</div></div>`,
          starter: `from datetime import datetime

dt = datetime.strptime("2024-12-25", "%Y-%m-%d")
print(dt.strftime("%A, %d %B %Y"))`,
        },
        {
          id: "m08-l09", kind: "exercise", title: "Exercise: Reformat a date",
          tags: ["datetime"],
          docs: [{ label: "strftime codes", url: "https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior" }],
          content: `
<div class="lc-eyebrow">Exercise · The Standard Library</div>
<h1>Change a date's clothes</h1>
<h3>Your task</h3>
<ul>
  <li>Parse <code>iso</code> (an <code>YYYY-MM-DD</code> string) with
      <code>strptime</code>.</li>
  <li>Format it into <code>out</code> as <code>DD Mon YYYY</code> — for
      <code>"2024-03-09"</code> that's <code>09 Mar 2024</code>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Parse with <code>"%Y-%m-%d"</code>, then format with <code>"%d %b %Y"</code>.</div></div>`,
          starter: `from datetime import datetime

iso = "2024-03-09"

out = iso     # parse with strptime, then strftime to "DD Mon YYYY"

print(out)`,
          tests: [
            { name: "out is '09 Mar 2024'", code: `assert out == "09 Mar 2024", f"Expected '09 Mar 2024', got {out!r}"` },
            { name: "it really came from parsing iso", code: `from datetime import datetime\nassert out == datetime.strptime(iso, "%Y-%m-%d").strftime("%d %b %Y"), "Parse iso then reformat it"` },
          ],
        },
        {
          id: "m08-l10", kind: "exercise", title: "Exercise: Sample statistics",
          tags: ["modules-imports", "numbers-math"],
          docs: [
            { label: "random.sample", url: "https://docs.python.org/3/library/random.html#random.sample" },
            { label: "statistics", url: "https://docs.python.org/3/library/statistics.html" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · The Standard Library</div>
<h1>Draw a sample, summarise it</h1>
<p>Seeding the random generator makes a "random" draw reproducible — essential for
tests and for this exercise.</p>
<h3>Your task</h3>
<ul>
  <li>Keep <code>random.seed(0)</code> and the pool as-is.</li>
  <li>Draw <code>draw</code> = a <code>random.sample</code> of <b>5</b> numbers
      from the pool.</li>
  <li>Set <code>avg</code> to <code>statistics.mean(draw)</code> and
      <code>med</code> to <code>statistics.median(draw)</code>.</li>
</ul>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<code>random.sample(pool, k)</code> picks <code>k</code> distinct items without
replacement.</div></div>`,
          starter: `import random, statistics

random.seed(0)
pool = list(range(1, 101))

draw = []     # random.sample(pool, 5)
avg = 0       # statistics.mean(draw)
med = 0       # statistics.median(draw)

print("draw:", draw)
print("mean:", avg, "median:", med)`,
          tests: [
            { name: "draw is the seeded sample of 5", code: `import random\nrandom.seed(0)\nassert draw == random.sample(list(range(1, 101)), 5), "Seed 0, then sample 5 from 1..100"` },
            { name: "avg is the mean of your draw", code: `import statistics\nassert avg == statistics.mean(draw), "avg should be statistics.mean(draw)"` },
            { name: "med is the median of your draw", code: `import statistics\nassert med == statistics.median(draw), "med should be statistics.median(draw)"` },
          ],
        },
        {
          id: "m08-quiz", kind: "quiz", title: "Module 8 Check: Standard Library",
          intro: "math, random, datetime, collections, itertools, json.",
          questions: [
            { q: "How do you use a module like math?", options: ["use math", "import math", "include math", "require math"], answer: 1, explain: "import brings a module into your program." , tags: ["modules-imports"] },
            { q: "What makes random produce repeatable results?", options: ["random.fixed()", "random.seed(n)", "random.lock()", "It can't be repeated"], answer: 1, explain: "Seeding the generator gives the same sequence each run." , tags: ["modules-imports"] },
            { q: "Subtracting two date objects gives…", options: ["an int of seconds", "a timedelta", "a string", "an error"], answer: 1, explain: "date - date is a timedelta; use .days for the day count." , tags: ["datetime"] },
            { q: "What does Counter(words).most_common(1) return?", options: ["The rarest item", "A list with the top (item, count) pair", "Just a number", "A dict"], answer: 1, explain: "It returns a list of the most common (item, count) tuples." , tags: ["collections-module"] },
            { q: "json.dumps converts…", options: ["JSON text into a Python object", "a Python object into JSON text", "a file into JSON", "nothing"], answer: 1, explain: "dumps = object → string; loads = string → object." , tags: ["modules-imports"] },
            { q: "Which gives a running total of [1,2,3]?", options: ["sum([1,2,3])", "accumulate([1,2,3])", "product([1,2,3])", "max([1,2,3])"], answer: 1, explain: "itertools.accumulate yields running totals: 1, 3, 6." , tags: ["itertools"] },
          ],
        },
      ],
    },

    /* ═══════════════ MODULE 09 ═══════════════ */
    {
      id: "m09", num: "Module 09", title: "Comprehensions & Generators",
      icon: "fas fa-wand-magic-sparkles",
      desc: "Concise comprehensions, lazy generators, and the iterator protocol.",
      lessons: [
        {
          id: "m09-l01", kind: "lesson", title: "List comprehensions",
          docs: [{ label: "List comprehensions", url: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions" }],
          content: `
<div class="lc-eyebrow">Lesson 1 · Comprehensions & Generators</div>
<h1>Transforming lists in one line</h1>
<p>A <b>comprehension</b> builds a list from another sequence compactly. Compare
the loop and the comprehension:</p>
<pre><code># the long way
squares = []
for n in range(1, 6):
    squares.append(n * n)

# the comprehension
squares = [n * n for n in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]</code></pre>
<h2>Add a condition to filter</h2>
<pre><code>evens = [n for n in range(20) if n % 2 == 0]
print(evens)     # [0, 2, 4, ..., 18]

words = ["hi", "world", "a", "python"]
long = [w.upper() for w in words if len(w) > 2]
print(long)      # ['WORLD', 'PYTHON']</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Read it as: <i>expression</i> — <i>for each item</i> — <i>optional condition</i>.
Keep them simple; if it gets hard to read, use a normal loop.</div></div>`,
          starter: `prices = [9.99, 19.50, 4.25, 99.00, 14.75]

with_tax = [round(p * 1.2, 2) for p in prices]
print(with_tax)

cheap = [p for p in prices if p < 15]
print("Under 15:", cheap)`,
        },
        {
          id: "m09-l02", kind: "lesson", title: "Dict & set comprehensions",
          docs: [
            { label: "Dict comprehensions", url: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries" },
            { label: "Set comprehensions", url: "https://docs.python.org/3/tutorial/datastructures.html#sets" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 2 · Comprehensions & Generators</div>
<h1>Comprehensions for dicts and sets</h1>
<p>The same syntax with <code>{ }</code> builds dictionaries and sets.</p>
<h2>Dict comprehension</h2>
<pre><code>nums = [1, 2, 3, 4]
squares = {n: n * n for n in nums}
print(squares)   # {1: 1, 2: 4, 3: 9, 4: 16}

prices = {"pen": 2, "book": 12, "bag": 30}
discounted = {item: cost * 0.9 for item, cost in prices.items()}
print(discounted)</code></pre>
<h2>Set comprehension</h2>
<pre><code>text = "mississippi"
unique_letters = {ch for ch in text}
print(unique_letters)   # {'m', 'i', 's', 'p'}</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
The shape of the braces decides the result: <code>[]</code> list, <code>{k: v}</code>
dict, <code>{x}</code> set.</div></div>`,
          starter: `words = ["apple", "banana", "cherry"]

lengths = {w: len(w) for w in words}
print(lengths)

first_letters = {w[0] for w in words}
print("First letters:", first_letters)`,
        },
        {
          id: "m09-l03", kind: "lesson", title: "Generators & yield",
          docs: [
            { label: "Generators", url: "https://docs.python.org/3/tutorial/classes.html#generators" },
            { label: "yield expressions", url: "https://docs.python.org/3/reference/expressions.html#yield-expressions" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 3 · Comprehensions & Generators</div>
<h1>Lazy sequences with yield</h1>
<p>A <b>generator</b> produces values one at a time, on demand, instead of
building a whole list in memory. Use <code>yield</code> instead of
<code>return</code>.</p>
<pre><code>def count_up_to(limit):
    n = 1
    while n <= limit:
        yield n
        n += 1

for value in count_up_to(5):
    print(value)        # 1 2 3 4 5</code></pre>
<p>Because they're lazy, generators can represent huge or even infinite sequences
cheaply:</p>
<pre><code>def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci()
print([next(gen) for _ in range(8)])   # [0,1,1,2,3,5,8,13]</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
A <b>generator expression</b> uses parentheses:
<code>sum(n*n for n in range(1000))</code> — no intermediate list is built.</div></div>`,
          starter: `def even_numbers(limit):
    n = 0
    while n < limit:
        yield n
        n += 2

evens = list(even_numbers(10))
print(evens)   # [0, 2, 4, 6, 8]

# generator expression, no list built:
total = sum(n * n for n in range(1, 6))
print("Sum of squares:", total)`,
        },
        {
          id: "m09-l04", kind: "exercise", title: "Exercise: Comprehension drills",
          tags: ["comprehensions"],
          content: `
<div class="lc-eyebrow">Exercise · Comprehensions & Generators</div>
<h1>Build with comprehensions</h1>
<h3>Your task</h3>
<p>Using <b>comprehensions</b> (not plain loops), create:</p>
<ul>
  <li><code>cubes</code> — the cubes of <code>1</code> through <code>10</code>.</li>
  <li><code>divisible</code> — numbers from <code>1</code> to <code>50</code>
      divisible by both 3 and 5.</li>
  <li><code>length_map</code> — a dict mapping each word in <code>words</code> to
      its length.</li>
</ul>`,
          starter: `words = ["sun", "planet", "moon", "asteroid"]

cubes = []
divisible = []
length_map = {}

print(cubes)
print(divisible)
print(length_map)`,
          tests: [
            { name: "cubes is correct", code: `assert cubes == [n**3 for n in range(1, 11)], "cubes of 1..10"` },
            { name: "divisible by 3 and 5", code: `assert divisible == [n for n in range(1, 51) if n % 15 == 0], "Expected [15, 30, 45]"` },
            { name: "length_map maps word -> length", code: `assert length_map == {w: len(w) for w in words}, "Map each word to its length"` },
          ],
        },
        {
          id: "m09-l05", kind: "exercise", title: "Exercise: A countdown generator",
          tags: ["generators-iterators"],
          content: `
<div class="lc-eyebrow">Exercise · Comprehensions & Generators</div>
<h1>Write a generator</h1>
<h3>Your task</h3>
<p>Define a generator function <code>countdown(n)</code> that <code>yield</code>s
the numbers from <code>n</code> down to <code>1</code> (inclusive).</p>`,
          starter: `def countdown(n):
    # yield n, n-1, ..., 1
    pass

print(list(countdown(5)))   # [5, 4, 3, 2, 1]`,
          tests: [
            { name: "countdown(5) yields 5..1", code: `assert list(countdown(5)) == [5, 4, 3, 2, 1], "Should yield 5,4,3,2,1"` },
            { name: "countdown(1) yields [1]", code: `assert list(countdown(1)) == [1], "countdown(1) should be [1]"` },
            { name: "it's a generator (lazy)", code: `import types\nassert isinstance(countdown(3), types.GeneratorType), "Use yield to make a generator"` },
          ],
        },
        {
          id: "m09-l06", kind: "exercise", title: "Exercise: Discount the premium items",
          tags: ["comprehensions"],
          docs: [
            { label: "List comprehensions", url: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions" },
            { label: "round()", url: "https://docs.python.org/3/library/functions.html#round" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · Comprehensions & Generators</div>
<h1>Apply a discount with a comprehension</h1>
<h3>Your task</h3>
<p>Using a single <b>list comprehension</b>, build <code>discounted</code>: for every
price in <code>prices</code> that is <code>50</code> or more, take 10% off and round
to 2 decimals. Cheaper items are left out entirely.</p>`,
          starter: `prices = [19.99, 65.00, 4.50, 120.00, 50.00, 8.0]

discounted = []   # comprehension: 10% off items >= 50, rounded to 2 decimals

print(discounted)`,
          tests: [
            { name: "correct discounted premium prices", code: `assert discounted == [58.5, 108.0, 45.0], f"Expected [58.5, 108.0, 45.0], got {discounted}"` },
            { name: "cheaper items were excluded", code: `assert len(discounted) == 3, "Only items priced 50 or more should appear"` },
          ],
        },
        {
          id: "m09-quiz", kind: "quiz", title: "Module 9 Check: Comprehensions & Generators",
          intro: "Comprehensions and lazy generators.",
          questions: [
            { q: "What does [n*2 for n in range(3)] produce?", options: ["[0,1,2]", "[0,2,4]", "[2,4,6]", "[0,2,4,6]"], answer: 1, explain: "n is 0,1,2 → doubled gives 0,2,4." , tags: ["comprehensions"] },
            { q: "How do you filter inside a comprehension?", options: ["with else", "with an if clause", "with while", "you can't"], answer: 1, explain: "[x for x in seq if condition] keeps matching items." , tags: ["comprehensions"] },
            { q: "Which braces build a dictionary comprehension?", options: ["[k: v ...]", "(k, v ...)", "{k: v for ...}", "{k for ...}"], answer: 2, explain: "{key: value for ...} builds a dict; {x for ...} builds a set." , tags: ["comprehensions"] },
            { q: "What keyword makes a generator function?", options: ["return", "yield", "generate", "lazy"], answer: 1, explain: "yield produces values one at a time." , tags: ["generators-iterators"] },
            { q: "Why prefer a generator over building a list?", options: ["It's always faster to write", "It produces items lazily, saving memory", "It sorts automatically", "It can't fail"], answer: 1, explain: "Generators compute values on demand instead of storing them all." , tags: ["generators-iterators"] },
            { q: "What does next(gen) do?", options: ["Restarts the generator", "Gets the next yielded value", "Closes it", "Returns a list"], answer: 1, explain: "next() pulls the following value from a generator." , tags: ["generators-iterators"] },
          ],
        },
      ],
    },

    /* ═══════════════ MODULE 10 ═══════════════ */
    {
      id: "m10", num: "Module 10", title: "Pro Toolkit",
      icon: "fas fa-rocket",
      desc: "Type hints, virtual environments, pip, and testing — write code like a pro.",
      lessons: [
        {
          id: "m10-l01", kind: "lesson", title: "Type hints",
          docs: [
            { label: "typing", url: "https://docs.python.org/3/library/typing.html" },
            { label: "Type hint (glossary)", url: "https://docs.python.org/3/glossary.html#term-type-hint" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 1 · Pro Toolkit</div>
<h1>Documenting your types</h1>
<p><b>Type hints</b> annotate what types your functions expect and return. Python
doesn't enforce them at runtime, but they make code clearer and let tools like
<code>mypy</code> and your editor catch mistakes.</p>
<pre><code>def greet(name: str) -> str:
    return f"Hello, {name}"

def total(prices: list[float]) -> float:
    return sum(prices)

age: int = 30
names: list[str] = ["Ada", "Bo"]</code></pre>
<p>For "maybe a value, maybe None" use <code>Optional</code> (or <code>| None</code>):</p>
<pre><code>def find(items: list[int], target: int) -> int | None:
    for i, v in enumerate(items):
        if v == target:
            return i
    return None</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Hints are <i>annotations</i>, not checks — your program still runs even if a hint
is "wrong". Their value is documentation and tooling.</div></div>`,
          starter: `def repeat(text: str, times: int) -> str:
    return text * times

print(repeat("ab", 3))
print(repeat.__annotations__)   # see the recorded hints`,
        },
        {
          id: "m10-l02", kind: "lesson", title: "Virtual environments & pip",
          docs: [
            { label: "venv", url: "https://docs.python.org/3/library/venv.html" },
            { label: "pip — getting started", url: "https://pip.pypa.io/en/stable/getting-started/" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 2 · Pro Toolkit</div>
<h1>Isolated, reproducible projects</h1>
<p>Real projects depend on third-party packages. A <b>virtual environment</b> is a
private folder of packages for one project, so versions never clash between
projects. (These are shell commands you run in a terminal, not in this editor.)</p>
<pre><code># create an environment named .venv
python -m venv .venv

# activate it
#   Windows:  .venv\\Scripts\\activate
#   macOS/Linux:  source .venv/bin/activate

# install packages with pip
pip install requests pandas

# record exact versions for others
pip freeze > requirements.txt

# later, recreate the same environment
pip install -r requirements.txt</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Golden rule: <b>one virtual environment per project</b>, and commit your
<code>requirements.txt</code> so collaborators get the same versions.</div></div>
<h2>Importing what you install</h2>
<p>Once installed, packages are imported like any module: <code>import requests</code>.
The Frameworks section of Pythoneer walks through specific libraries.</p>`,
          starter: `# This lesson is about terminal commands rather than runnable code.
# But you CAN inspect what's available right now:
import sys
print("Python version:", sys.version.split()[0])
print("Module search paths:", len(sys.path), "locations")`,
        },
        {
          id: "m10-l03", kind: "lesson", title: "Testing your code",
          docs: [
            { label: "The assert statement", url: "https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement" },
            { label: "pytest", url: "https://docs.pytest.org/en/stable/" },
          ],
          content: `
<div class="lc-eyebrow">Lesson 3 · Pro Toolkit</div>
<h1>Tests give you confidence</h1>
<p>A <b>test</b> is code that checks other code. The simplest form is an
<code>assert</code>: it raises an error if its condition is false.</p>
<pre><code>def add(a, b):
    return a + b

assert add(2, 3) == 5
assert add(-1, 1) == 0
print("All asserts passed!")</code></pre>
<p>In real projects you'd use <b>pytest</b>: write functions named
<code>test_*</code> and run <code>pytest</code> in your terminal.</p>
<pre><code># test_math.py
def test_add():
    assert add(2, 3) == 5

def test_add_negatives():
    assert add(-2, -3) == -5</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
The exercise checker in Pythoneer works exactly like this under the hood — each
check is an <code>assert</code> against your code.</div></div>`,
          starter: `def is_even(n):
    return n % 2 == 0

# write some asserts to test it
assert is_even(4) == True
assert is_even(7) == False
assert is_even(0) == True
print("is_even passes all tests")`,
        },
        {
          id: "m10-l04", kind: "exercise", title: "Exercise: A fully typed function",
          tags: ["typing"],
          content: `
<div class="lc-eyebrow">Exercise · Pro Toolkit</div>
<h1>Annotate a function</h1>
<h3>Your task</h3>
<p>Define a function <code>shout(text)</code> that returns <code>text</code>
uppercased with an exclamation mark, and add type hints: it takes a
<code>str</code> and returns a <code>str</code>.</p>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Hints look like <code>def shout(text: str) -&gt; str:</code>. The checker reads
<code>shout.__annotations__</code>.</div></div>`,
          starter: `def shout(text):   # add the type hints here
    pass

print(shout("hello"))   # HELLO!`,
          tests: [
            { name: "returns uppercased text with !", code: `assert shout("hello") == "HELLO!", "Should return 'HELLO!'"` },
            { name: "works for any text", code: `assert shout("go") == "GO!", "Should work for any input"` },
            { name: "parameter is annotated as str", code: `assert shout.__annotations__.get("text") is str, "Annotate text as str"` },
            { name: "return is annotated as str", code: `assert shout.__annotations__.get("return") is str, "Annotate the return as str"` },
          ],
        },
        {
          id: "m10-l05", kind: "exercise", title: "Exercise: Write the tests",
          tags: ["testing"],
          content: `
<div class="lc-eyebrow">Exercise · Pro Toolkit</div>
<h1>Test a function yourself</h1>
<h3>Your task</h3>
<p>A function <code>clamp(value, low, high)</code> is provided — it should keep a
value within a range. Add <b>at least three</b> <code>assert</code> statements
that verify it, then set <code>tests_written</code> to how many asserts you wrote.</p>`,
          starter: `def clamp(value, low, high):
    return max(low, min(value, high))

# Write at least 3 asserts that check clamp:
# e.g. assert clamp(5, 0, 10) == 5

tests_written = 0   # set this to the number of asserts you wrote`,
          tests: [
            { name: "clamp behaves correctly", code: `assert clamp(5,0,10)==5 and clamp(-3,0,10)==0 and clamp(99,0,10)==10, "clamp should bound the value"` },
            { name: "you recorded 3+ tests", code: `assert isinstance(tests_written, int) and tests_written >= 3, "Write at least 3 asserts and set tests_written"` },
          ],
        },
        {
          id: "m10-l06", kind: "exercise", title: "Exercise: A typed slugify",
          tags: ["typing", "string-methods"],
          docs: [
            { label: "Type hints (typing)", url: "https://docs.python.org/3/library/typing.html" },
            { label: "str methods", url: "https://docs.python.org/3/library/stdtypes.html#string-methods" },
          ],
          content: `
<div class="lc-eyebrow">Exercise · Pro Toolkit</div>
<h1>Make URL slugs — with type hints</h1>
<p>Blogs turn titles into URL "slugs". Write the helper and annotate its types.</p>
<h3>Your task</h3>
<p>Write <code>slugify(title)</code> that lowercases the title, trims surrounding
spaces, and replaces inner spaces with hyphens — annotated as taking a
<code>str</code> and returning a <code>str</code>.</p>
<ul>
  <li><code>slugify("Hello World")</code> → <code>"hello-world"</code></li>
  <li><code>slugify("  My First Post ")</code> → <code>"my-first-post"</code></li>
</ul>`,
          starter: `def slugify(title):   # add type hints: (title: str) -> str
    pass

print(slugify("Hello World"))
print(slugify("  My First Post "))`,
          tests: [
            { name: "basic slug", code: `assert slugify("Hello World") == "hello-world", "Lowercase and hyphenate"` },
            { name: "trims surrounding spaces", code: `assert slugify("  My First Post ") == "my-first-post", "Strip the ends, hyphenate inner spaces"` },
            { name: "annotated str -> str", code: `assert slugify.__annotations__.get("title") is str and slugify.__annotations__.get("return") is str, "Annotate the parameter and return as str"` },
          ],
        },
        {
          id: "m10-quiz", kind: "quiz", title: "Module 10 Check: Pro Toolkit",
          intro: "Type hints, environments, pip, and testing.",
          questions: [
            { q: "Are type hints enforced by Python at runtime?", options: ["Yes, always", "No — they're annotations for humans and tools", "Only for ints", "Only in functions"], answer: 1, explain: "Hints document types; tools like mypy check them, but Python doesn't enforce them." , tags: ["typing"] },
            { q: "What is a virtual environment for?", options: ["Speeding up Python", "Isolating a project's packages", "Encrypting code", "Running tests"], answer: 1, explain: "It keeps each project's dependencies separate." , tags: ["modules-imports"] },
            { q: "Which command installs a package?", options: ["python install x", "pip install x", "venv add x", "import x"], answer: 1, explain: "pip is Python's package installer." , tags: ["modules-imports"] },
            { q: "What does `pip freeze > requirements.txt` do?", options: ["Deletes packages", "Records exact installed versions", "Upgrades pip", "Runs tests"], answer: 1, explain: "It captures the current versions so others can reproduce them." , tags: ["modules-imports"] },
            { q: "What does `assert x == 5` do when x is 3?", options: ["Prints 5", "Silently passes", "Raises an AssertionError", "Sets x to 5"], answer: 2, explain: "A failing assert raises AssertionError — that's how tests fail." , tags: ["testing"] },
            { q: "In pytest, test functions are named…", options: ["check_*", "test_*", "assert_*", "it_*"], answer: 1, explain: "pytest discovers functions whose names start with test_." , tags: ["testing"] },
          ],
        },
      ],
    },

    /* ═══════════════ MODULE 11 ═══════════════ */
    {
      id: "m11", num: "Module 11", title: "Standard Library & Method Mastery",
      icon: "fas fa-screwdriver-wrench",
      desc: "Drill the exact methods that separate fluent Pythonistas from beginners — str, list, dict, set, the iteration toolkit, and re/datetime/pathlib.",
      lessons: [
        /* ───────── Section A · str mastery ───────── */
        {
          id: "m11-l01", kind: "lesson", title: "Splitting & joining",
          docs: [
            { label: "str.split()", url: "https://docs.python.org/3/library/stdtypes.html#str.split" },
            { label: "str.join()", url: "https://docs.python.org/3/library/stdtypes.html#str.join" },
          ],
          content: `
<div class="lc-eyebrow">Section A · str mastery</div>
<h1>Breaking text apart and back together</h1>
<p>Turning text into a list of pieces — and a list back into text — is one of the
most common things you'll do. These are the workhorses.</p>
<h2>split & rsplit</h2>
<p><code>split()</code> with no argument splits on any run of whitespace and drops
empties. Give it a separator to split on that instead. <code>rsplit</code> works
from the right and pairs nicely with <code>maxsplit</code>.</p>
<pre><code>print("a,b,c".split(","))        # ['a', 'b', 'c']
print("  one  two ".split())     # ['one', 'two']
print("a.b.c".rsplit(".", 1))    # ['a.b', 'c']</code></pre>
<h2>splitlines & join</h2>
<pre><code>print("line1\\nline2".splitlines())  # ['line1', 'line2']
print("-".join(["2024", "03", "09"])) # "2024-03-09"</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<code>join</code> is a method <i>of the separator</i>:
<code>", ".join(items)</code>. The items must all be strings.</div></div>
<h2>partition</h2>
<p><code>partition(sep)</code> splits once and always returns three parts:
<code>(before, sep, after)</code> — perfect for <code>key=value</code>.</p>
<pre><code>print("name=Ada".partition("="))   # ('name', '=', 'Ada')</code></pre>`,
          starter: `path = "usr/local/bin"
parts = path.split("/")
print(parts)
print(" / ".join(parts))
print("key=value".partition("="))`,
        },
        {
          id: "m11-l02", kind: "exercise", title: "Exercise: Reverse the full name",
          tags: ["string-methods", "strings"],
          docs: [{ label: "str.split()", url: "https://docs.python.org/3/library/stdtypes.html#str.split" }],
          content: `
<div class="lc-eyebrow">Section A · str mastery</div>
<h1>Surname first</h1>
<h3>Your task</h3>
<ul>
  <li>Split <code>full</code> into first and last name.</li>
  <li>Build <code>flipped</code> in the shape <code>Last, First</code> — for
      <code>"Ada Lovelace"</code> that's <code>Lovelace, Ada</code>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>first, last = full.split()</code> unpacks the two pieces in one line.</div></div>`,
          starter: `full = "Ada Lovelace"

flipped = full     # build "Last, First"

print(flipped)`,
          tests: [
            { name: "flipped is 'Lovelace, Ada'", code: `assert flipped == "Lovelace, Ada", f"Expected 'Lovelace, Ada', got {flipped!r}"` },
            { name: "it works by splitting full", code: `parts = full.split()\nassert flipped == f"{parts[-1]}, {parts[0]}", "Build it from the split pieces of full"` },
          ],
        },
        {
          id: "m11-l03", kind: "exercise", title: "Exercise: Parse key=value lines",
          tags: ["string-methods"],
          docs: [{ label: "str.partition()", url: "https://docs.python.org/3/library/stdtypes.html#str.partition" }],
          content: `
<div class="lc-eyebrow">Section A · str mastery</div>
<h1>Config text → dictionary</h1>
<h3>Your task</h3>
<ul>
  <li><code>blob</code> holds one <code>key=value</code> per line.</li>
  <li>Build <code>config</code>, a dict mapping each key to its value (as a
      string).</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Loop over <code>blob.splitlines()</code>, then
<code>key, _, value = line.partition("=")</code>.</div></div>`,
          starter: `blob = "name=Ada\\nrole=admin\\nlevel=7"

config = {}
# fill config from each line

print(config)`,
          tests: [
            { name: "config has all three keys", code: `assert config == {"name": "Ada", "role": "admin", "level": "7"}, f"Got {config}"` },
            { name: "values are strings", code: `assert all(isinstance(v, str) for v in config.values()), "Keep values as strings"` },
          ],
        },
        {
          id: "m11-l04", kind: "exercise", title: "Exercise: Case-insensitive search",
          tags: ["string-methods"],
          docs: [{ label: "str.casefold()", url: "https://docs.python.org/3/library/stdtypes.html#str.casefold" }],
          content: `
<div class="lc-eyebrow">Section A · str mastery</div>
<h1>Count a word, ignoring case</h1>
<h3>Your task</h3>
<ul>
  <li>Count how many times <code>word</code> appears in <code>text</code>,
      <b>ignoring case</b>, into <code>hits</code>.</li>
  <li>Find the index of the first case-insensitive match into
      <code>first_at</code>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Lower-case both sides with <code>casefold()</code>, then use <code>count</code> and
<code>find</code>.</div></div>`,
          starter: `text = "The cat sat on the mat. THE END."
word = "the"

hits = 0       # case-insensitive count
first_at = -1  # index of first case-insensitive match

print(hits, first_at)`,
          tests: [
            { name: "hits counts every case", code: `assert hits == text.casefold().count(word.casefold()) == 3, f"Expected 3, got {hits}"` },
            { name: "first_at is 0", code: `assert first_at == text.casefold().find(word.casefold()) == 0, f"Got {first_at}"` },
          ],
        },
        {
          id: "m11-quizA", kind: "quiz", title: "Section A Check: Strings",
          intro: "split, join, partition, find, and casefold.",
          questions: [
            { q: "split() with no arguments splits on…", options: ["commas", "any run of whitespace", "newlines only", "every character"], answer: 1, explain: "Bare split() splits on whitespace and drops empty pieces." , tags: ["string-methods"] },
            { q: "What does 'a,b,c'.split(',') return?", options: ["'a','b','c'", "['a', 'b', 'c']", "('a', 'b', 'c')", "'abc'"], answer: 1, explain: "split returns a list of strings." , tags: ["string-methods"] },
            { q: "What does ' '.join(['a', 'b']) give?", options: ["['a', 'b']", "'a b'", "'ab'", "an error"], answer: 1, explain: "join glues items with the separator string." , tags: ["string-methods"] },
            { q: "'Hello'.find('z') returns…", options: ["0", "-1", "a ValueError", "None"], answer: 1, explain: "find returns -1 on a miss (index() would raise)." , tags: ["string-methods"] },
            { q: "Why casefold() before comparing text?", options: ["to sort it", "for case-insensitive matching", "to remove spaces", "to reverse it"], answer: 1, explain: "casefold normalises case so comparisons ignore it." , tags: ["string-methods"] },
          ],
        },

        /* ───────── Section B · list mastery ───────── */
        {
          id: "m11-l05", kind: "lesson", title: "Mutation vs new lists",
          docs: [{ label: "Mutable sequence types", url: "https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types" }],
          content: `
<div class="lc-eyebrow">Section B · list mastery</div>
<h1>Reshaping lists</h1>
<p>List methods mostly mutate in place and return <code>None</code>. Slicing, by
contrast, returns a <i>new</i> list — unless you assign <i>to</i> a slice.</p>
<h2>The mutating crew</h2>
<pre><code>xs = [1, 2, 3]
xs.append(4)        # [1, 2, 3, 4]
xs.extend([5, 6])   # [1, 2, 3, 4, 5, 6]
xs.insert(0, 0)     # [0, 1, 2, 3, 4, 5, 6]
xs.remove(3)        # drops first 3
top = xs.pop()      # removes & returns the last</code></pre>
<h2>Slicing reads, slice-assignment writes</h2>
<pre><code>nums = [0, 1, 2, 3, 4, 5]
print(nums[::-1])   # [5, 4, 3, 2, 1, 0]  (a new reversed list)
print(nums[::2])    # [0, 2, 4]           (every other)
nums[1:4] = [99]    # replace a whole range → [0, 99, 4, 5]</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>nums.copy()</code> (or <code>nums[:]</code>) gives an independent list, so
edits to one don't touch the other.</div></div>`,
          starter: `nums = [0, 1, 2, 3, 4, 5]
print("reversed:", nums[::-1])
print("evens:", nums[::2])
nums[1:4] = ["x"]
print("after slice assign:", nums)`,
        },
        {
          id: "m11-l06", kind: "exercise", title: "Exercise: Run the edit script",
          tags: ["lists"],
          docs: [{ label: "list.pop()", url: "https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types" }],
          content: `
<div class="lc-eyebrow">Section B · list mastery</div>
<h1>Apply the edits in order</h1>
<h3>Your task</h3>
<ol>
  <li><code>append</code> <code>40</code>.</li>
  <li><code>insert</code> <code>5</code> at index <code>0</code>.</li>
  <li><code>remove</code> the value <code>20</code>.</li>
  <li><code>pop</code> the item at index <code>1</code> into <code>popped</code>.</li>
</ol>`,
          starter: `data = [10, 20, 30]
popped = None
# apply the four edits in order

print(data, popped)`,
          tests: [
            { name: "data ends as [5, 30, 40]", code: `assert data == [5, 30, 40], f"Got {data}"` },
            { name: "popped is 10", code: `assert popped == 10, f"Expected 10, got {popped!r}"` },
          ],
        },
        {
          id: "m11-l07", kind: "exercise", title: "Exercise: Slice surgery",
          tags: ["lists", "strings"],
          docs: [{ label: "Slicing", url: "https://docs.python.org/3/library/stdtypes.html#common-sequence-operations" }],
          content: `
<div class="lc-eyebrow">Section B · list mastery</div>
<h1>Slices that read and write</h1>
<h3>Your task</h3>
<ul>
  <li>Save an independent <code>backup</code> of <code>nums</code>.</li>
  <li><code>reversed_nums</code> = <code>nums</code> reversed via a slice.</li>
  <li><code>every_other</code> = every second item via a step slice.</li>
  <li>Replace items at indices <code>1,2,3</code> of <code>nums</code> with the
      single value <code>99</code> using slice assignment.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>nums[::-1]</code>, <code>nums[::2]</code>, and
<code>nums[1:4] = [99]</code>. Take <code>backup</code> <i>before</i> the
assignment.</div></div>`,
          starter: `nums = [0, 1, 2, 3, 4, 5]

backup = nums          # make it independent!
reversed_nums = nums   # nums[::-1]
every_other = nums     # nums[::2]
# now slice-assign indices 1..3 to a single 99

print(nums, backup, reversed_nums, every_other)`,
          tests: [
            { name: "reversed_nums is fully reversed", code: `assert reversed_nums == [5, 4, 3, 2, 1, 0], f"Got {reversed_nums}"` },
            { name: "every_other took a step of 2", code: `assert every_other == [0, 2, 4], f"Got {every_other}"` },
            { name: "slice assignment collapsed 1..3 to 99", code: `assert nums == [0, 99, 4, 5], f"Got {nums}"` },
            { name: "backup stayed independent", code: `assert backup == [0, 1, 2, 3, 4, 5], "backup should be an unchanged copy of the original"` },
          ],
        },
        {
          id: "m11-l08", kind: "exercise", title: "Exercise: Multi-key sort",
          tags: ["sorting"],
          docs: [{ label: "sorted(key=...)", url: "https://docs.python.org/3/library/functions.html#sorted" }],
          content: `
<div class="lc-eyebrow">Section B · list mastery</div>
<h1>Sort by two fields</h1>
<h3>Your task</h3>
<ul>
  <li><code>records</code> are dicts with <code>dept</code> and
      <code>salary</code>.</li>
  <li>Build <code>ordered</code>: by <b>dept A→Z</b>, then within a dept by
      <b>salary, highest first</b>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>key=lambda r: (r["dept"], -r["salary"])</code> — ascending dept, descending
salary.</div></div>`,
          starter: `records = [
    {"dept": "A", "salary": 50},
    {"dept": "B", "salary": 50},
    {"dept": "A", "salary": 70},
]

ordered = records   # sort by dept asc, salary desc

for r in ordered:
    print(r["dept"], r["salary"])`,
          tests: [
            { name: "ordered matches the reference sort", code: `assert ordered == sorted(records, key=lambda r: (r["dept"], -r["salary"])), "dept ascending, salary descending"` },
            { name: "the first record is A/70", code: `assert ordered[0] == {"dept": "A", "salary": 70}, f"Got {ordered[0]}"` },
          ],
        },
        {
          id: "m11-quizB", kind: "quiz", title: "Section B Check: Lists",
          intro: "Mutation, slicing, and sorting.",
          questions: [
            { q: "nums.append([1, 2]) adds…", options: ["two items", "one list as a single item", "nothing", "an error"], answer: 1, explain: "append adds its argument as one element; extend adds each item." , tags: ["lists"] },
            { q: "list.sort() returns…", options: ["a new sorted list", "None (it sorts in place)", "the first item", "a tuple"], answer: 1, explain: "sort mutates in place and returns None; use sorted() for a new list." , tags: ["lists", "sorting"] },
            { q: "x = [1, 2, 3]; x.pop() returns / leaves…", options: ["1 / [2, 3]", "3 / [1, 2]", "None / [1, 2]", "3 / [1, 2, 3]"], answer: 1, explain: "pop() removes and returns the last item." , tags: ["lists"] },
            { q: "nums[::-1] produces…", options: ["a reversed copy", "the list sorted", "every other item", "an error"], answer: 0, explain: "A step of -1 returns a new, reversed list." , tags: ["lists"] },
            { q: "Is Python's sort stable?", options: ["No", "Yes — equal items keep their order", "Only for numbers", "Only with key="], answer: 1, explain: "Stable sorting is what makes multi-key sorts work." , tags: ["sorting"] },
          ],
        },

        /* ───────── Section C · dict & set mastery ───────── */
        {
          id: "m11-l09", kind: "lesson", title: "Dict methods & comprehensions",
          docs: [{ label: "dict", url: "https://docs.python.org/3/library/stdtypes.html#dict" }],
          content: `
<div class="lc-eyebrow">Section C · dict & set mastery</div>
<h1>Building and transforming dicts</h1>
<h2>The essential methods</h2>
<pre><code>d = {"a": 1}
d.get("z", 0)          # 0 — safe read with a default
d.setdefault("a", 99)  # 1 — key exists, default ignored
d.update({"b": 2})     # merge another dict in
d.pop("a")             # remove "a" and return its value
for k, v in d.items(): # iterate pairs
    print(k, v)</code></pre>
<h2>Dict comprehensions</h2>
<p>Build a dict from any iterable, just like a list comprehension:</p>
<pre><code>squares = {n: n*n for n in range(4)}   # {0:0, 1:1, 2:4, 3:9}
prices = {"pen": 2, "pad": 5}
inverted = {v: k for k, v in prices.items()}  # {2:'pen', 5:'pad'}</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Merge with <code>a | b</code> (new dict) — the right-hand dict wins on clashes.</div></div>`,
          starter: `prices = {"pen": 2, "pad": 5, "ink": 9}
cheap = {k: v for k, v in prices.items() if v < 6}
print(cheap)
print({v: k for k, v in prices.items()})`,
        },
        {
          id: "m11-l10", kind: "exercise", title: "Exercise: Invert a mapping",
          tags: ["dicts"],
          docs: [{ label: "dict.items()", url: "https://docs.python.org/3/library/stdtypes.html#dict.items" }],
          content: `
<div class="lc-eyebrow">Section C · dict & set mastery</div>
<h1>Swap keys and values</h1>
<h3>Your task</h3>
<ul>
  <li>Build <code>inverted</code> from <code>codes</code> so each value becomes a
      key and vice-versa.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
A dict comprehension does it in one line:
<code>{v: k for k, v in codes.items()}</code>.</div></div>`,
          starter: `codes = {"red": "#f00", "green": "#0f0", "blue": "#00f"}

inverted = {}   # value -> key

print(inverted)`,
          tests: [
            { name: "inverted swaps keys and values", code: `assert inverted == {v: k for k, v in codes.items()}, "Map each value back to its key"` },
            { name: "you can look up by colour code", code: `assert inverted["#0f0"] == "green", f"Got {inverted.get('#0f0')!r}"` },
          ],
        },
        {
          id: "m11-l11", kind: "exercise", title: "Exercise: Group words by length",
          tags: ["dicts"],
          docs: [{ label: "dict.setdefault()", url: "https://docs.python.org/3/library/stdtypes.html#dict.setdefault" }],
          content: `
<div class="lc-eyebrow">Section C · dict & set mastery</div>
<h1>Bucket words by their length</h1>
<h3>Your task</h3>
<ul>
  <li>Build <code>groups</code>, a dict mapping a word length to the <b>list</b> of
      words with that length, keeping each word's original order.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>groups.setdefault(len(w), []).append(w)</code> creates the list on first
sight of a length, then appends to it.</div></div>`,
          starter: `words = ["hi", "cat", "ox", "dog", "be", "ant"]

groups = {}
# group words by their length

print(groups)`,
          tests: [
            { name: "groups buckets by length", code: `expected = {}\nfor w in words:\n    expected.setdefault(len(w), []).append(w)\nassert groups == expected, f"Got {groups}"` },
            { name: "the keys are the lengths present", code: `assert set(groups.keys()) == {2, 3}, f"Got keys {set(groups.keys())}"` },
          ],
        },
        {
          id: "m11-l12", kind: "lesson", title: "Set algebra",
          docs: [{ label: "set types", url: "https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset" }],
          content: `
<div class="lc-eyebrow">Section C · dict & set mastery</div>
<h1>Thinking in sets</h1>
<p>Sets hold unique items and answer "membership" questions instantly. Four
operations cover almost everything:</p>
<pre><code>a = {1, 2, 3}
b = {3, 4, 5}
print(a | b)   # union          {1, 2, 3, 4, 5}
print(a & b)   # intersection   {3}
print(a - b)   # difference     {1, 2}
print(a ^ b)   # symmetric diff {1, 2, 4, 5}</code></pre>
<p>Each has a named method too: <code>union</code>, <code>intersection</code>,
<code>difference</code>, <code>symmetric_difference</code>.</p>
<h2>Membership & subsets</h2>
<pre><code>print(2 in a)            # True
print({1, 2}.issubset(a)) # True
a.add(9)
a.discard(99)  # discard never errors; remove() would</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Sets are <b>unordered</b> — never rely on iteration order, and compare with
<code>==</code> (which ignores order) rather than converting to a list.</div></div>`,
          starter: `frontend = {"html", "css", "js"}
backend = {"py", "sql", "js"}
print("shared:", frontend & backend)
print("either:", frontend | backend)
print("front only:", frontend - backend)`,
        },
        {
          id: "m11-l13", kind: "exercise", title: "Exercise: Common & exclusive",
          tags: ["sets"],
          docs: [{ label: "Set operations", url: "https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset" }],
          content: `
<div class="lc-eyebrow">Section C · dict & set mastery</div>
<h1>Compare two sets</h1>
<h3>Your task</h3>
<ul>
  <li><code>shared</code> — items in <b>both</b> <code>a</code> and
      <code>b</code>.</li>
  <li><code>exclusive</code> — items in <b>exactly one</b> of them.</li>
</ul>`,
          starter: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

shared = set()      # in both
exclusive = set()   # in exactly one

print(shared, exclusive)`,
          tests: [
            { name: "shared is the intersection", code: `assert shared == (a & b) == {3, 4}, f"Got {shared}"` },
            { name: "exclusive is the symmetric difference", code: `assert exclusive == (a ^ b) == {1, 2, 5, 6}, f"Got {exclusive}"` },
          ],
        },
        {
          id: "m11-quizC", kind: "quiz", title: "Section C Check: Dicts & Sets",
          intro: "get, setdefault, merging, and set operations.",
          questions: [
            { q: "d.get('x', 0) when 'x' is missing returns…", options: ["a KeyError", "0", "None", "'x'"], answer: 1, explain: "get returns the default instead of raising." , tags: ["dicts"] },
            { q: "setdefault(k, []) does what?", options: ["always overwrites k", "returns the existing value, or inserts the default then returns it", "deletes k", "raises if k exists"], answer: 1, explain: "It's get-or-create in one call — ideal for grouping." , tags: ["dicts"] },
            { q: "{'a': 1} | {'a': 2} gives…", options: ["{'a': 1}", "{'a': 2}", "{'a': [1, 2]}", "an error"], answer: 1, explain: "On a clash the right-hand dict wins." , tags: ["dicts"] },
            { q: "a & b on sets is the…", options: ["union", "intersection", "difference", "symmetric difference"], answer: 1, explain: "& is intersection (items in both)." , tags: ["sets"] },
            { q: "a ^ b on sets is…", options: ["items in both", "items in exactly one", "all items", "no items"], answer: 1, explain: "^ is the symmetric difference." , tags: ["sets"] },
          ],
        },

        /* ───────── Section D · iteration toolkit ───────── */
        {
          id: "m11-l14", kind: "lesson", title: "enumerate, zip, reversed",
          docs: [
            { label: "enumerate()", url: "https://docs.python.org/3/library/functions.html#enumerate" },
            { label: "zip()", url: "https://docs.python.org/3/library/functions.html#zip" },
          ],
          content: `
<div class="lc-eyebrow">Section D · iteration toolkit</div>
<h1>Looping like a pro</h1>
<p>Reach for these built-ins instead of manual index bookkeeping.</p>
<h2>enumerate — index + item</h2>
<pre><code>for i, name in enumerate(["a", "b"], start=1):
    print(i, name)      # 1 a / 2 b</code></pre>
<h2>zip — walk lists together</h2>
<pre><code>names = ["Ada", "Bo"]
scores = [90, 85]
print(dict(zip(names, scores)))  # {'Ada': 90, 'Bo': 85}</code></pre>
<p><code>zip</code> stops at the <b>shortest</b> input. To pad to the longest
instead, use <code>itertools.zip_longest(..., fillvalue=0)</code>.</p>
<h2>reversed</h2>
<pre><code>for x in reversed([1, 2, 3]):
    print(x)            # 3, 2, 1</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>enumerate</code> defaults to starting at 0 — pass <code>start=1</code> when
you want human-friendly numbering.</div></div>`,
          starter: `fruits = ["apple", "pear", "plum"]
for rank, fruit in enumerate(fruits, start=1):
    print(f"{rank}. {fruit}")

print(dict(zip(fruits, [3, 5, 2])))`,
        },
        {
          id: "m11-l15", kind: "exercise", title: "Exercise: Numbered roster",
          tags: ["loops"],
          docs: [{ label: "enumerate()", url: "https://docs.python.org/3/library/functions.html#enumerate" }],
          content: `
<div class="lc-eyebrow">Section D · iteration toolkit</div>
<h1>Number the names</h1>
<h3>Your task</h3>
<ul>
  <li>Build <code>lines</code> = <code>["1. Ada", "2. Bo", "3. Cy"]</code> using
      <code>enumerate</code> starting at 1.</li>
  <li>Print each line.</li>
</ul>`,
          starter: `names = ["Ada", "Bo", "Cy"]

lines = []   # ["1. Ada", "2. Bo", "3. Cy"]

for line in lines:
    print(line)`,
          tests: [
            { name: "lines are numbered from 1", code: `assert lines == [f"{i}. {n}" for i, n in enumerate(names, start=1)] == ["1. Ada", "2. Bo", "3. Cy"], f"Got {lines}"` },
            { name: "you printed the first line", code: `assert "1. Ada" in __stdout__, "Print each numbered line"` },
          ],
        },
        {
          id: "m11-l16", kind: "exercise", title: "Exercise: Merge columns",
          tags: ["loops"],
          docs: [{ label: "itertools.zip_longest", url: "https://docs.python.org/3/library/itertools.html#itertools.zip_longest" }],
          content: `
<div class="lc-eyebrow">Section D · iteration toolkit</div>
<h1>Pair names with scores</h1>
<p>The lists are <b>ragged</b> — there's one more name than score.</p>
<h3>Your task</h3>
<ul>
  <li><code>paired</code> = a dict from <code>zip(names, scores)</code> (the extra
      name is dropped).</li>
  <li><code>padded</code> = <code>list(zip_longest(names, scores, fillvalue=0))</code>
      so every name is kept, missing scores becoming <code>0</code>.</li>
</ul>`,
          starter: `from itertools import zip_longest

names = ["Ada", "Bo", "Cy"]
scores = [90, 85]

paired = {}    # dict(zip(...))
padded = []    # list(zip_longest(..., fillvalue=0))

print(paired)
print(padded)`,
          tests: [
            { name: "paired drops the unmatched name", code: `assert paired == {"Ada": 90, "Bo": 85}, f"Got {paired}"` },
            { name: "padded keeps everyone, filling with 0", code: `from itertools import zip_longest\nassert padded == list(zip_longest(names, scores, fillvalue=0)) == [("Ada", 90), ("Bo", 85), ("Cy", 0)], f"Got {padded}"` },
          ],
        },
        {
          id: "m11-l17", kind: "lesson", title: "key=, any/all, map/filter",
          docs: [
            { label: "max()", url: "https://docs.python.org/3/library/functions.html#max" },
            { label: "any() / all()", url: "https://docs.python.org/3/library/functions.html#all" },
          ],
          content: `
<div class="lc-eyebrow">Section D · iteration toolkit</div>
<h1>Reduce a sequence to an answer</h1>
<h2>min / max with key=</h2>
<pre><code>words = ["fig", "apple", "kiwi"]
print(max(words, key=len))   # 'apple'
print(min(words, key=len))   # 'fig'</code></pre>
<h2>any / all</h2>
<pre><code>nums = [2, 4, 6]
print(all(n % 2 == 0 for n in nums))  # True
print(any(n > 5 for n in nums))       # True</code></pre>
<p>Edge cases worth memorising: <code>all([])</code> is <code>True</code>,
<code>any([])</code> is <code>False</code>.</p>
<h2>map / filter</h2>
<pre><code>nums = [1, 2, 3, 4]
evens = filter(lambda n: n % 2 == 0, nums)
print(list(map(lambda n: n * n, evens)))  # [4, 16]</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>map</code> and <code>filter</code> return lazy iterators — wrap them in
<code>list(...)</code> to see the results.</div></div>`,
          starter: `temps = [12, 19, 7, 23, 15]
print("hottest:", max(temps))
print("all above zero?", all(t > 0 for t in temps))
print("doubled:", list(map(lambda t: t * 2, temps)))`,
        },
        {
          id: "m11-l18", kind: "exercise", title: "Exercise: Word stats with key=",
          tags: ["sorting", "dicts"],
          docs: [{ label: "max(key=...)", url: "https://docs.python.org/3/library/functions.html#max" }],
          content: `
<div class="lc-eyebrow">Section D · iteration toolkit</div>
<h1>Longest, shortest, all-alpha</h1>
<h3>Your task</h3>
<ul>
  <li><code>longest</code> = the longest word (use <code>max(..., key=len)</code>).</li>
  <li><code>shortest</code> = the shortest word.</li>
  <li><code>all_alpha</code> = <code>True</code> if every word is letters-only.</li>
</ul>`,
          starter: `words = ["fig", "apple", "kiwi", "banana"]

longest = ""    # max by length
shortest = ""   # min by length
all_alpha = False  # all words isalpha()?

print(longest, shortest, all_alpha)`,
          tests: [
            { name: "longest is 'banana'", code: `assert longest == max(words, key=len) == "banana", f"Got {longest!r}"` },
            { name: "shortest is 'fig'", code: `assert shortest == min(words, key=len) == "fig", f"Got {shortest!r}"` },
            { name: "all_alpha is True", code: `assert all_alpha is True and all_alpha == all(w.isalpha() for w in words), "Use all() with str.isalpha"` },
          ],
        },
        {
          id: "m11-l19", kind: "exercise", title: "Exercise: map/filter pipeline",
          tags: ["lambda-hof"],
          docs: [{ label: "map() / filter()", url: "https://docs.python.org/3/library/functions.html#map" }],
          content: `
<div class="lc-eyebrow">Section D · iteration toolkit</div>
<h1>Square the even numbers</h1>
<h3>Your task</h3>
<ul>
  <li>From <code>nums</code>, keep the even numbers, square them, and collect the
      results into the list <code>result</code> — using <code>map</code> and
      <code>filter</code>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>list(map(lambda x: x*x, filter(lambda x: x % 2 == 0, nums)))</code>.</div></div>`,
          starter: `nums = [1, 2, 3, 4, 5, 6]

result = []   # squares of the even numbers

print(result)`,
          tests: [
            { name: "result is the squared evens", code: `assert result == [x*x for x in nums if x % 2 == 0] == [4, 16, 36], f"Got {result}"` },
            { name: "result is a list", code: `assert isinstance(result, list), "Wrap the map/filter in list(...)"` },
          ],
        },
        {
          id: "m11-quizD", kind: "quiz", title: "Section D Check: Iteration",
          intro: "enumerate, zip, key=, any/all, map/filter.",
          questions: [
            { q: "enumerate(seq, start=1) gives the first index as…", options: ["0", "1", "len(seq)", "-1"], answer: 1, explain: "start sets the first index." , tags: ["loops"] },
            { q: "zip stops when…", options: ["the longest input ends", "the shortest input ends", "never", "it reaches 10 items"], answer: 1, explain: "zip truncates to the shortest; zip_longest pads instead." , tags: ["loops"] },
            { q: "sorted(words, key=len) sorts by…", options: ["the alphabet", "length", "reverse order", "random"], answer: 1, explain: "key transforms each item before comparing." , tags: ["sorting"] },
            { q: "all([]) returns…", options: ["True", "False", "None", "an error"], answer: 0, explain: "all() of an empty iterable is True (nothing fails)." , tags: ["booleans-logic"] },
            { q: "any([0, '', None]) returns…", options: ["True", "False", "an error", "None"], answer: 1, explain: "All items are falsy, so any() is False." , tags: ["booleans-logic"] },
            { q: "list(map(f, xs)) does what?", options: ["filters xs", "applies f to each item", "sorts xs", "sums xs"], answer: 1, explain: "map applies f to every element." , tags: ["lambda-hof"] },
          ],
        },

        /* ───────── Section E · itertools ───────── */
        {
          id: "m11-l20", kind: "lesson", title: "Infinite & slicing iterators",
          docs: [{ label: "itertools", url: "https://docs.python.org/3/library/itertools.html" }],
          content: `
<div class="lc-eyebrow">Section E · itertools</div>
<h1>Lazy streams you control</h1>
<p><code>itertools</code> builds iterators that compute items on demand — including
<b>infinite</b> ones. The golden rule: always bound an infinite iterator with
<code>islice</code> (or a <code>break</code>), or your program hangs.</p>
<pre><code>from itertools import count, cycle, islice, takewhile

# count: 10, 12, 14, ...  (infinite!)
print(list(islice(count(10, 2), 4)))   # [10, 12, 14, 16]

# cycle: A, B, A, B, ...  (infinite!)
print(list(islice(cycle("AB"), 5)))    # ['A','B','A','B','A']

# takewhile: stop the first time the test fails
print(list(takewhile(lambda n: n < 5, [1, 3, 5, 1])))  # [1, 3]</code></pre>
<div class="callout"><i class="fas fa-triangle-exclamation"></i><div>
<code>list(count(1))</code> with no <code>islice</code> never finishes. Always cap
the stream.</div></div>`,
          starter: `from itertools import count, islice
# first 5 multiples of 3, generated lazily
print(list(islice(count(3, 3), 5)))`,
        },
        {
          id: "m11-l21", kind: "exercise", title: "Exercise: First N squares lazily",
          tags: ["generators-iterators", "itertools"],
          docs: [{ label: "itertools.islice", url: "https://docs.python.org/3/library/itertools.html#itertools.islice" }],
          content: `
<div class="lc-eyebrow">Section E · itertools</div>
<h1>Squares without a range</h1>
<h3>Your task</h3>
<ul>
  <li>Using <code>count(1)</code> and <code>islice</code>, build
      <code>squares</code> = the first <b>10</b> square numbers
      (<code>1, 4, 9, …, 100</code>).</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>islice(map(lambda n: n*n, count(1)), 10)</code>, then wrap in
<code>list(...)</code>.</div></div>`,
          starter: `from itertools import count, islice

squares = []   # first 10 squares, generated lazily

print(squares)`,
          tests: [
            { name: "squares is the first ten squares", code: `assert squares == [n*n for n in range(1, 11)] == [1, 4, 9, 16, 25, 36, 49, 64, 81, 100], f"Got {squares}"` },
          ],
        },
        {
          id: "m11-l22", kind: "lesson", title: "Combinatorics & grouping",
          docs: [
            { label: "combinations / permutations", url: "https://docs.python.org/3/library/itertools.html#itertools.combinations" },
            { label: "accumulate", url: "https://docs.python.org/3/library/itertools.html#itertools.accumulate" },
          ],
          content: `
<div class="lc-eyebrow">Section E · itertools</div>
<h1>Combine, accumulate, group</h1>
<pre><code>from itertools import combinations, permutations, accumulate, chain, product

print(list(combinations("ABC", 2)))  # AB AC BC  (order doesn't matter)
print(list(permutations("ABC", 2)))  # AB AC BA BC CA CB  (order matters)
print(list(accumulate([1, 2, 3, 4]))) # [1, 3, 6, 10]  (running totals)
print(list(chain([1, 2], [3, 4])))    # [1, 2, 3, 4]
print(list(product([1, 2], "ab")))    # every pair across the two</code></pre>
<h2>groupby — but sort first!</h2>
<p><code>groupby</code> only groups <b>consecutive</b> equal keys. To group an
unsorted collection, sort by the same key first.</p>
<pre><code>from itertools import groupby
data = ["apple", "avocado", "banana"]
data.sort(key=lambda w: w[0])
for letter, items in groupby(data, key=lambda w: w[0]):
    print(letter, list(items))</code></pre>
<div class="callout"><i class="fas fa-triangle-exclamation"></i><div>
Forgetting to sort before <code>groupby</code> is the #1 mistake — you'll get
several little groups for the same key.</div></div>`,
          starter: `from itertools import accumulate, combinations
print(list(accumulate([10, 20, 30])))
print(list(combinations(["a", "b", "c"], 2)))`,
        },
        {
          id: "m11-l23", kind: "exercise", title: "Exercise: Pair everyone up",
          tags: ["itertools"],
          docs: [{ label: "itertools.combinations", url: "https://docs.python.org/3/library/itertools.html#itertools.combinations" }],
          content: `
<div class="lc-eyebrow">Section E · itertools</div>
<h1>Every unique pairing</h1>
<h3>Your task</h3>
<ul>
  <li>Build <code>pairs</code> = every unique 2-person pairing of
      <code>team</code> (order within a pair doesn't matter).</li>
</ul>`,
          starter: `from itertools import combinations

team = ["Ada", "Bo", "Cy", "Di"]

pairs = []   # list(combinations(team, 2))

print(pairs)`,
          tests: [
            { name: "pairs are all 2-combinations", code: `from itertools import combinations\nassert pairs == list(combinations(team, 2)), "Use combinations(team, 2)"` },
            { name: "there are 6 pairs", code: `assert len(pairs) == 6, f"Expected 6 pairs, got {len(pairs)}"` },
          ],
        },
        {
          id: "m11-l24", kind: "exercise", title: "Exercise: Running balance",
          tags: ["itertools"],
          docs: [{ label: "itertools.accumulate", url: "https://docs.python.org/3/library/itertools.html#itertools.accumulate" }],
          content: `
<div class="lc-eyebrow">Section E · itertools</div>
<h1>Account balance after each transaction</h1>
<h3>Your task</h3>
<ul>
  <li>Given <code>tx</code> (deposits and withdrawals), build
      <code>balances</code> = the running total after each one.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>list(accumulate(tx))</code> gives the cumulative sums.</div></div>`,
          starter: `from itertools import accumulate

tx = [100, -30, -20, 50]

balances = []   # running total after each transaction

print(balances)`,
          tests: [
            { name: "balances are the running totals", code: `from itertools import accumulate\nassert balances == list(accumulate(tx)) == [100, 70, 50, 100], f"Got {balances}"` },
          ],
        },
        {
          id: "m11-l25", kind: "exercise", title: "Exercise: Group by first letter",
          tags: ["itertools", "dicts"],
          docs: [{ label: "itertools.groupby", url: "https://docs.python.org/3/library/itertools.html#itertools.groupby" }],
          content: `
<div class="lc-eyebrow">Section E · itertools</div>
<h1>Bucket words by first letter</h1>
<p>Remember: <code>groupby</code> only groups <b>consecutive</b> items, so sort by
the key first.</p>
<h3>Your task</h3>
<ul>
  <li>Build <code>grouped</code>, a dict mapping each first letter to the list of
      words starting with it.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Sort by <code>w[0]</code>, then
<code>{k: list(g) for k, g in groupby(sorted_words, key=lambda w: w[0])}</code>.</div></div>`,
          starter: `from itertools import groupby

words = ["apple", "avocado", "banana", "cherry", "cranberry", "blueberry"]

grouped = {}   # first letter -> list of words

print(grouped)`,
          tests: [
            { name: "grouped buckets by first letter", code: `from itertools import groupby\nref = {k: list(g) for k, g in groupby(sorted(words, key=lambda w: w[0]), key=lambda w: w[0])}\nassert {k: sorted(v) for k, v in grouped.items()} == {k: sorted(v) for k, v in ref.items()}, f"Got {grouped}"` },
            { name: "the keys are a, b, c", code: `assert set(grouped.keys()) == {"a", "b", "c"}, f"Got {set(grouped.keys())}"` },
          ],
        },
        {
          id: "m11-quizE", kind: "quiz", title: "Section E Check: itertools",
          intro: "Infinite iterators, combinatorics, accumulate, groupby.",
          questions: [
            { q: "Why wrap count(1) in islice?", options: ["to sort it", "it's infinite — you must bound it", "to reverse it", "to make a set"], answer: 1, explain: "count is infinite; islice caps how many you take." , tags: ["itertools"] },
            { q: "Order matters in…", options: ["combinations", "permutations", "both", "neither"], answer: 1, explain: "permutations counts AB and BA separately; combinations doesn't." , tags: ["itertools"] },
            { q: "accumulate([1, 2, 3]) yields…", options: ["[1, 2, 3]", "[1, 3, 6]", "[6]", "[1, 2, 3, 6]"], answer: 1, explain: "Running totals: 1, 1+2, 1+2+3." , tags: ["itertools"] },
            { q: "groupby requires its input to be…", options: ["a set", "sorted by the grouping key", "reversed", "a dict"], answer: 1, explain: "It only groups consecutive equal keys." , tags: ["itertools"] },
            { q: "chain([1, 2], [3, 4]) yields…", options: ["'1234'", "1, 2, 3, 4 in sequence", "[[1, 2], [3, 4]]", "an error"], answer: 1, explain: "chain flattens the iterables one after another." , tags: ["itertools"] },
            { q: "product([1, 2], [3, 4]) has how many items?", options: ["2", "4", "1", "8"], answer: 1, explain: "It's the Cartesian product: 2 × 2 = 4 pairs." , tags: ["itertools"] },
          ],
        },

        /* ───────── Section F · re (regular expressions) ───────── */
        {
          id: "m11-l26", kind: "lesson", title: "match, search, findall",
          docs: [
            { label: "re module", url: "https://docs.python.org/3/library/re.html" },
            { label: "re.findall", url: "https://docs.python.org/3/library/re.html#re.findall" },
          ],
          content: `
<div class="lc-eyebrow">Section F · regular expressions</div>
<h1>Finding patterns in text</h1>
<p>Regular expressions describe <i>shapes</i> of text. Always write patterns as
<b>raw strings</b> (<code>r"..."</code>) so backslashes mean what you expect.</p>
<h2>The three you'll use most</h2>
<pre><code>import re
s = "Order 12 shipped"
re.search(r"\\d+", s)   # finds the first match ANYWHERE → match for "12"
re.match(r"\\d+", s)    # only matches at the START → None here
re.findall(r"\\d+", s)  # ALL matches as a list → ['12']</code></pre>
<p>Common pieces: <code>\\d</code> a digit, <code>\\w</code> a word character,
<code>\\s</code> whitespace, <code>+</code> one-or-more, <code>*</code>
zero-or-more, <code>.</code> any character.</p>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<code>search</code> looks anywhere; <code>match</code> is anchored to the start.
Both return a match object (or <code>None</code>); <code>findall</code> returns a
plain list of strings.</div></div>`,
          starter: `import re
text = "There are 3 cats and 12 dogs"
print(re.findall(r"\\d+", text))   # ['3', '12']
print(re.search(r"\\d+", text).group())  # '3'`,
        },
        {
          id: "m11-l27", kind: "exercise", title: "Exercise: Extract all numbers",
          tags: ["regex"],
          docs: [{ label: "re.findall", url: "https://docs.python.org/3/library/re.html#re.findall" }],
          content: `
<div class="lc-eyebrow">Section F · regular expressions</div>
<h1>Pull the numbers out</h1>
<h3>Your task</h3>
<ul>
  <li><code>nums</code> = all runs of digits in <code>text</code>, as strings
      (use <code>re.findall</code> with <code>r"\\d+"</code>).</li>
  <li><code>as_ints</code> = the same values converted to <code>int</code>.</li>
</ul>`,
          starter: `import re

text = "Order 12: 7 apples, 99 pears"

nums = []      # re.findall(r"\\d+", text)
as_ints = []   # [int(n) for n in nums]

print(nums, as_ints)`,
          tests: [
            { name: "nums are the digit runs as strings", code: `import re\nassert nums == re.findall(r"\\d+", text) == ["12", "7", "99"], f"Got {nums}"` },
            { name: "as_ints are integers", code: `assert as_ints == [12, 7, 99] and all(isinstance(n, int) for n in as_ints), f"Got {as_ints}"` },
          ],
        },
        {
          id: "m11-l28", kind: "lesson", title: "Groups, named groups, sub & split",
          docs: [
            { label: "re.sub", url: "https://docs.python.org/3/library/re.html#re.sub" },
            { label: "Match.group", url: "https://docs.python.org/3/library/re.html#re.Match.group" },
          ],
          content: `
<div class="lc-eyebrow">Section F · regular expressions</div>
<h1>Capturing and replacing</h1>
<h2>Groups</h2>
<p>Parentheses <code>( )</code> capture part of a match. Name them with
<code>(?P&lt;name&gt;...)</code> for readable access.</p>
<pre><code>import re
m = re.search(r"(?P&lt;y&gt;\\d{4})-(?P&lt;m&gt;\\d{2})", "2024-03")
print(m.group("y"))   # '2024'
print(m.groups())     # ('2024', '03')</code></pre>
<h2>sub — find & replace</h2>
<pre><code>print(re.sub(r"\\s+", " ", "a   big   gap"))  # 'a big gap'</code></pre>
<h2>split — on a pattern</h2>
<pre><code>print(re.split(r"[;,]\\s*", "a, b; c,d"))   # ['a', 'b', 'c', 'd']</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>re.sub(pattern, replacement, text)</code> replaces <i>every</i> match unless
you pass <code>count=</code>.</div></div>`,
          starter: `import re
m = re.search(r"(?P<level>[A-Z]+) (?P<msg>.+)", "ERROR disk full")
print(m.group("level"), "/", m.group("msg"))
print(re.sub(r"\\d", "#", "PIN 1234"))`,
        },
        {
          id: "m11-l29", kind: "exercise", title: "Exercise: Redact emails",
          tags: ["regex"],
          docs: [{ label: "re.sub", url: "https://docs.python.org/3/library/re.html#re.sub" }],
          content: `
<div class="lc-eyebrow">Section F · regular expressions</div>
<h1>Hide the email addresses</h1>
<h3>Your task</h3>
<ul>
  <li>Replace every email in <code>text</code> with <code>[redacted]</code>, into
      <code>clean</code>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
A simple pattern is <code>r"\\w+@\\w+\\.\\w+"</code>. Use
<code>re.sub(pattern, "[redacted]", text)</code>.</div></div>`,
          starter: `import re

text = "Contact ada@x.com or bob@y.org for info."

clean = text   # re.sub the emails with "[redacted]"

print(clean)`,
          tests: [
            { name: "no @ remains", code: `assert "@" not in clean, "Every email should be replaced"` },
            { name: "both emails became [redacted]", code: `assert clean.count("[redacted]") == 2, f"Expected 2 redactions, got {clean.count('[redacted]')}"` },
            { name: "the rest of the text is intact", code: `assert clean == "Contact [redacted] or [redacted] for info.", f"Got {clean!r}"` },
          ],
        },
        {
          id: "m11-l30", kind: "exercise", title: "Exercise: Parse a log line",
          tags: ["regex"],
          docs: [{ label: "Named groups", url: "https://docs.python.org/3/library/re.html#index-17" }],
          content: `
<div class="lc-eyebrow">Section F · regular expressions</div>
<h1>Extract fields with named groups</h1>
<h3>Your task</h3>
<p>A log line looks like <code>DATE LEVEL MESSAGE</code> (space-separated, the
message may contain spaces). Use one <code>re.search</code> with named groups to
set:</p>
<ul>
  <li><code>level</code> — the second field (e.g. <code>ERROR</code>).</li>
  <li><code>msg</code> — everything after it.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Try <code>r"(?P&lt;date&gt;\\S+) (?P&lt;level&gt;\\S+) (?P&lt;msg&gt;.+)"</code> and read
<code>m.group("level")</code>.</div></div>`,
          starter: `import re

line = "2024-03-09 ERROR Disk full on /dev/sda"

level = ""   # the LEVEL field
msg = ""     # the rest of the line

print(level, "|", msg)`,
          tests: [
            { name: "level is ERROR", code: `assert level == "ERROR", f"Expected 'ERROR', got {level!r}"` },
            { name: "msg is the trailing message", code: `assert msg == "Disk full on /dev/sda", f"Got {msg!r}"` },
          ],
        },
        {
          id: "m11-quizF", kind: "quiz", title: "Section F Check: Regex",
          intro: "search vs match, findall, sub, named groups.",
          questions: [
            { q: "re.match anchors the pattern at…", options: ["the end of the string", "the start of the string", "any position", "every newline"], answer: 1, explain: "match only succeeds at the start; search looks anywhere." , tags: ["regex"] },
            { q: "re.findall(r\"\\d+\", s) returns…", options: ["a match object", "a list of strings", "the first integer", "None"], answer: 1, explain: "findall returns all matches as a list of strings." , tags: ["regex"] },
            { q: "Why use raw strings r'...' for patterns?", options: ["they run faster", "backslashes aren't treated as escapes", "they're shorter", "Python requires it"], answer: 1, explain: "Raw strings stop Python from eating the backslashes before regex sees them." , tags: ["regex"] },
            { q: "re.sub(pattern, repl, s) does what?", options: ["finds the first match", "replaces matches with repl", "splits s", "counts matches"], answer: 1, explain: "sub substitutes every match (unless count is given)." , tags: ["regex"] },
            { q: "The named-group syntax is…", options: ["(name)", "(?P<name>...)", "[name]", "{name}"], answer: 1, explain: "(?P<name>...) names a capture group." , tags: ["regex"] },
            { q: "m.group('level') returns…", options: ["all groups", "the named group's matched text", "the match length", "None always"], answer: 1, explain: "group(name) returns that group's captured text." , tags: ["regex"] },
          ],
        },

        /* ───────── Section G · time, paths & math ───────── */
        {
          id: "m11-l31", kind: "lesson", title: "datetime deep-dive",
          docs: [{ label: "datetime", url: "https://docs.python.org/3/library/datetime.html" }],
          content: `
<div class="lc-eyebrow">Section G · time, paths & math</div>
<h1>Dates, times, and durations</h1>
<pre><code>from datetime import datetime, date, timedelta

d = date(2024, 3, 9)
print(d.year, d.month, d.day)        # 2024 3 9
print(d + timedelta(days=30))        # 2024-04-08

# parse & format
dt = datetime.strptime("2024-03-09 14:30", "%Y-%m-%d %H:%M")
print(dt.strftime("%A %d %b"))       # 'Saturday 09 Mar'

# subtracting dates gives a timedelta
gap = date(2024, 3, 1) - date(2024, 1, 1)
print(gap.days)                      # 60</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Use <code>.replace(day=1)</code> to copy a date with one field changed. Subtract
two dates to get a <code>timedelta</code>; read <code>.days</code> for the count.</div></div>`,
          starter: `from datetime import date, timedelta
start = date(2024, 1, 1)
print("in 100 days:", start + timedelta(days=100))
print("days in Q1:", (date(2024, 4, 1) - start).days)`,
        },
        {
          id: "m11-l32", kind: "exercise", title: "Exercise: Days until launch",
          tags: ["datetime"],
          docs: [{ label: "datetime.strptime", url: "https://docs.python.org/3/library/datetime.html#datetime.datetime.strptime" }],
          content: `
<div class="lc-eyebrow">Section G · time, paths & math</div>
<h1>Count the days between two dates</h1>
<h3>Your task</h3>
<ul>
  <li>Parse <code>start_s</code> and <code>launch_s</code> (both
      <code>YYYY-MM-DD</code>).</li>
  <li>Set <code>days</code> to the whole number of days between them.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Subtract the two parsed dates and read <code>.days</code> off the resulting
<code>timedelta</code>.</div></div>`,
          starter: `from datetime import datetime

start_s = "2024-01-01"
launch_s = "2024-03-01"

days = 0   # whole days between start and launch

print(f"{days} days to launch")`,
          tests: [
            { name: "days is 60", code: `assert days == 60, f"Expected 60, got {days}"` },
            { name: "days is an int from a timedelta", code: `from datetime import datetime\nexpected = (datetime.strptime(launch_s, "%Y-%m-%d") - datetime.strptime(start_s, "%Y-%m-%d")).days\nassert isinstance(days, int) and days == expected, "Subtract the parsed dates and use .days"` },
          ],
        },
        {
          id: "m11-l33", kind: "exercise", title: "Exercise: Weekday name",
          tags: ["datetime"],
          docs: [{ label: "strftime codes", url: "https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes" }],
          content: `
<div class="lc-eyebrow">Section G · time, paths & math</div>
<h1>Which day of the week?</h1>
<h3>Your task</h3>
<ul>
  <li>Parse <code>iso</code> and set <code>day_name</code> to its full weekday name
      (e.g. <code>"Saturday"</code>).</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>%A</code> is the full weekday name in <code>strftime</code>.</div></div>`,
          starter: `from datetime import datetime

iso = "2024-03-09"

day_name = ""   # full weekday name via strftime("%A")

print(day_name)`,
          tests: [
            { name: "day_name is 'Saturday'", code: `assert day_name == "Saturday", f"Expected 'Saturday', got {day_name!r}"` },
            { name: "it came from parsing iso", code: `from datetime import datetime\nassert day_name == datetime.strptime(iso, "%Y-%m-%d").strftime("%A"), "Parse iso, then strftime('%A')"` },
          ],
        },
        {
          id: "m11-l34", kind: "lesson", title: "pathlib",
          docs: [{ label: "pathlib", url: "https://docs.python.org/3/library/pathlib.html" }],
          content: `
<div class="lc-eyebrow">Section G · time, paths & math</div>
<h1>Paths as objects</h1>
<p><code>pathlib.Path</code> treats file paths as smart objects. Build them with the
<code>/</code> operator and read their parts by attribute.</p>
<pre><code>from pathlib import PurePosixPath
p = PurePosixPath("/home/ada/report.csv")
print(p.name)    # 'report.csv'
print(p.stem)    # 'report'   (name without suffix)
print(p.suffix)  # '.csv'     (NOTE: includes the dot)
print(p.parts)   # ('/', 'home', 'ada', 'report.csv')
print(p.parent / "notes.txt")  # /home/ada/notes.txt</code></pre>
<h2>Finding files</h2>
<pre><code>from pathlib import Path
for f in Path(".").glob("*.txt"):
    print(f.name)</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<code>.suffix</code> includes the leading dot (<code>'.csv'</code>);
<code>.stem</code> is the name with the suffix removed.</div></div>`,
          starter: `from pathlib import PurePosixPath
p = PurePosixPath("project/data/sales.csv")
print("name:", p.name)
print("stem:", p.stem)
print("suffix:", p.suffix)`,
        },
        {
          id: "m11-l35", kind: "exercise", title: "Exercise: Dissect a path",
          tags: ["files-io"],
          docs: [{ label: "PurePath", url: "https://docs.python.org/3/library/pathlib.html#pure-paths" }],
          content: `
<div class="lc-eyebrow">Section G · time, paths & math</div>
<h1>Pull a path apart</h1>
<h3>Your task</h3>
<p>From the path object <code>p</code>, set:</p>
<ul>
  <li><code>name</code> — the final component.</li>
  <li><code>stem</code> — the name without its suffix.</li>
  <li><code>suffix</code> — the extension (with the dot).</li>
</ul>`,
          starter: `from pathlib import PurePosixPath

p = PurePosixPath("/home/ada/report.csv")

name = ""     # p.name
stem = ""     # p.stem
suffix = ""   # p.suffix

print(name, stem, suffix)`,
          tests: [
            { name: "name is 'report.csv'", code: `assert name == "report.csv", f"Got {name!r}"` },
            { name: "stem is 'report'", code: `assert stem == "report", f"Got {stem!r}"` },
            { name: "suffix is '.csv' (with the dot)", code: `assert suffix == ".csv", f"Got {suffix!r}"` },
          ],
        },
        {
          id: "m11-l36", kind: "exercise", title: "Exercise: List files by suffix",
          tags: ["files-io"],
          docs: [{ label: "Path.glob", url: "https://docs.python.org/3/library/pathlib.html#pathlib.Path.glob" }],
          content: `
<div class="lc-eyebrow">Section G · time, paths & math</div>
<h1>Find the .txt files</h1>
<p>A scratch folder has been created for you and three files written into it. Use
<code>glob</code> to find just the text files.</p>
<h3>Your task</h3>
<ul>
  <li>Set <code>txt_stems</code> = the <b>sorted</b> list of stems (names without
      suffix) of every <code>*.txt</code> file in <code>folder</code>.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>sorted(p.stem for p in folder.glob("*.txt"))</code>.</div></div>`,
          starter: `import tempfile
from pathlib import Path

folder = Path(tempfile.mkdtemp())
for fname in ["alpha.txt", "beta.txt", "notes.log"]:
    (folder / fname).write_text("hello")

txt_stems = []   # sorted stems of the *.txt files

print(txt_stems)`,
          tests: [
            { name: "found both .txt files by stem", code: `assert txt_stems == ["alpha", "beta"], f"Got {txt_stems}"` },
            { name: "the .log file was excluded", code: `assert "notes" not in txt_stems, "Glob *.txt should skip the .log file"` },
          ],
        },
        {
          id: "m11-l37", kind: "lesson", title: "math, random & statistics",
          docs: [
            { label: "math", url: "https://docs.python.org/3/library/math.html" },
            { label: "statistics", url: "https://docs.python.org/3/library/statistics.html" },
          ],
          content: `
<div class="lc-eyebrow">Section G · time, paths & math</div>
<h1>Numbers, chance, and summaries</h1>
<pre><code>import math, random, statistics

print(math.isclose(0.1 + 0.2, 0.3))  # True — never use == on floats
print(math.comb(5, 2))               # 10 — combinations count
print(math.prod([1, 2, 3, 4]))       # 24

random.seed(42)                       # reproducible "randomness"
print(random.sample(range(10), 3))    # 3 distinct items
print(random.choices("ABC", k=4))     # 4 picks, with repeats

print(statistics.mean([2, 4, 6]))     # 4
print(statistics.median([1, 2, 3, 4]))# 2.5</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Seed the generator (<code>random.seed(n)</code>) whenever you need the same
"random" result every run — like in tests.</div></div>`,
          starter: `import math, statistics
print("isclose:", math.isclose(0.1 + 0.2, 0.3))
print("mean:", statistics.mean([10, 20, 30]))
print("median:", statistics.median([3, 1, 2, 4]))`,
        },
        {
          id: "m11-l38", kind: "exercise", title: "Exercise: Lottery draw (seeded)",
          tags: ["modules-imports"],
          docs: [{ label: "random.sample", url: "https://docs.python.org/3/library/random.html#random.sample" }],
          content: `
<div class="lc-eyebrow">Section G · time, paths & math</div>
<h1>A reproducible draw</h1>
<h3>Your task</h3>
<ul>
  <li>Keep <code>random.seed(7)</code>.</li>
  <li>Draw <b>6</b> distinct numbers from <code>1..49</code> with
      <code>random.sample</code>, then store them <b>sorted</b> in
      <code>draw</code>.</li>
</ul>
<div class="callout"><i class="fas fa-circle-info"></i><div>
The seed makes the draw identical every run, so the check can verify it.</div></div>`,
          starter: `import random

random.seed(7)

draw = []   # sorted(random.sample(range(1, 50), 6))

print(draw)`,
          tests: [
            { name: "draw matches the seeded sample", code: `import random\nrandom.seed(7)\nassert draw == sorted(random.sample(range(1, 50), 6)), "Seed 7, sample 6 from 1..49, sorted"` },
            { name: "six distinct numbers in range", code: `assert len(draw) == 6 and len(set(draw)) == 6 and all(1 <= n <= 49 for n in draw), f"Got {draw}"` },
          ],
        },
        {
          id: "m11-quizG", kind: "quiz", title: "Section G Check: Time, Paths & Math",
          intro: "datetime, pathlib, and seeded randomness.",
          questions: [
            { q: "strptime is for…", options: ["formatting a datetime to text", "parsing text into a datetime", "time zones", "sleeping"], answer: 1, explain: "strptime parses; strftime formats." , tags: ["datetime"] },
            { q: "(date2 - date1) gives…", options: ["an int", "a timedelta", "a string", "seconds"], answer: 1, explain: "Subtracting dates yields a timedelta; read .days." , tags: ["datetime"] },
            { q: "PurePosixPath('a/b.txt').suffix is…", options: ["'b'", "'.txt'", "'txt'", "'b.txt'"], answer: 1, explain: "suffix includes the leading dot." , tags: ["files-io"] },
            { q: "PurePosixPath('a/b.txt').stem is…", options: ["'b'", "'b.txt'", "'.txt'", "'a'"], answer: 0, explain: "stem is the name without the suffix." , tags: ["files-io"] },
            { q: "Why call random.seed(n) before sampling?", options: ["it's faster", "it makes results reproducible", "it's more random", "Python requires it"], answer: 1, explain: "Seeding fixes the sequence so runs match." , tags: ["modules-imports"] },
            { q: "statistics.median([1, 2, 3, 4]) is…", options: ["2", "2.5", "3", "4"], answer: 1, explain: "With an even count it's the average of the two middle values." , tags: ["modules-imports", "numbers-math"] },
          ],
        },
      ],
    },

    /* ═══════════════ MODULE 12 ═══════════════ */
    {
      id: "m12", num: "Module 12", title: "Modern Python",
      icon: "fas fa-wand-magic-sparkles",
      desc: "Dataclasses in depth, Enum, namedtuple, structural pattern matching, and richer type hints.",
      lessons: [
        {
          id: "m12-l01", kind: "lesson", title: "Dataclasses, deeper",
          docs: [{ label: "dataclasses", url: "https://docs.python.org/3/library/dataclasses.html" }],
          content: `
<div class="lc-eyebrow">Lesson 1 · Modern Python</div>
<h1>Dataclasses beyond the basics</h1>
<p>You met <code>@dataclass</code> back in the OOP module. Here are the features that
make it a workhorse for real code.</p>

<h2>Default factories for mutable fields</h2>
<p>Never give a field a mutable default like <code>[]</code> directly — every instance
would share one list. Use <code>field(default_factory=list)</code>:</p>
<pre><code>from dataclasses import dataclass, field

@dataclass
class Cart:
    items: list = field(default_factory=list)

a, b = Cart(), Cart()
a.items.append("apple")
print(a.items, b.items)   # ['apple'] []  — independent</code></pre>

<h2>__post_init__ for computed fields</h2>
<p><code>__post_init__</code> runs right after the generated <code>__init__</code>, so
you can derive extra attributes from the ones passed in:</p>
<pre><code>@dataclass
class Line:
    qty: int
    price: float
    def __post_init__(self):
        self.subtotal = self.qty * self.price</code></pre>

<h2>Frozen &amp; ordered</h2>
<p><code>@dataclass(frozen=True)</code> makes instances immutable (and hashable);
<code>order=True</code> generates <code>&lt;</code>, <code>&gt;</code> and friends from
the field order, so you can sort instances:</p>
<pre><code>@dataclass(frozen=True, order=True)
class Version:
    major: int
    minor: int

print(sorted([Version(1, 2), Version(1, 0)]))</code></pre>

<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>asdict(obj)</code> and <code>astuple(obj)</code> (from <code>dataclasses</code>)
turn an instance into a plain dict or tuple — handy for JSON or quick comparisons.</div></div>`,
          starter: `from dataclasses import dataclass, field, asdict

@dataclass(frozen=True, order=True)
class Version:
    major: int
    minor: int

for v in sorted([Version(2, 0), Version(1, 5), Version(1, 12)]):
    print(v)

print(asdict(Version(3, 1)))`,
        },
        {
          id: "m12-l02", kind: "exercise", title: "Exercise: A cart item",
          tags: ["dataclasses"],
          content: `
<div class="lc-eyebrow">Exercise · Modern Python</div>
<h1>Model a cart item</h1>
<h3>Your task</h3>
<p>Create a dataclass <code>CartItem</code> with these fields:</p>
<ul>
<li><code>name: str</code>, <code>qty: int</code>, <code>unit_price: float</code></li>
<li><code>notes</code> — a list that <b>defaults to empty</b> via a default factory, so
each item gets its own list</li>
</ul>
<p>In <code>__post_init__</code>, set <code>self.subtotal</code> to
<code>qty * unit_price</code> rounded to 2 decimals.</p>`,
          starter: `from dataclasses import dataclass, field

@dataclass
class CartItem:
    # add your fields, then a __post_init__ that sets self.subtotal
    ...
`,
          tests: [
            { name: "subtotal is qty * unit_price", code: `assert CartItem("Widget", 3, 2.5).subtotal == 7.5, "subtotal should be qty*unit_price rounded to 2dp"` },
            { name: "each item gets its own notes list", code: `a = CartItem("A", 1, 1.0); b = CartItem("B", 1, 1.0); a.notes.append("x"); assert b.notes == [], "use field(default_factory=list) so lists aren't shared"` },
          ],
        },
        {
          id: "m12-l03", kind: "lesson", title: "Enums",
          docs: [{ label: "enum", url: "https://docs.python.org/3/library/enum.html" }],
          content: `
<div class="lc-eyebrow">Lesson 2 · Modern Python</div>
<h1>Named constants with Enum</h1>
<p>An <code>Enum</code> gives a fixed set of named values a proper type — clearer and
safer than passing around bare strings or magic numbers.</p>
<pre><code>from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

print(Color.RED)          # Color.RED
print(Color.RED.name)     # 'RED'
print(Color.RED.value)    # 1</code></pre>

<h2>auto() and iteration</h2>
<p>Let Python number members for you with <code>auto()</code>, and loop over a whole
enum:</p>
<pre><code>from enum import Enum, auto

class Status(Enum):
    PENDING = auto()
    SHIPPED = auto()
    DELIVERED = auto()

for s in Status:
    print(s.name, s.value)</code></pre>

<h2>Identity comparison</h2>
<p>Members are singletons, so compare with <code>is</code>:</p>
<pre><code>s = Status.SHIPPED
print(s is Status.SHIPPED)   # True</code></pre>

<div class="callout"><i class="fas fa-lightbulb"></i><div>
Subclass <code>IntEnum</code> (or <code>StrEnum</code> in 3.11+) when you want members
that also behave like plain <code>int</code>s or <code>str</code>s.</div></div>`,
          starter: `from enum import Enum, auto

class Priority(Enum):
    LOW = auto()
    MEDIUM = auto()
    HIGH = auto()

for p in Priority:
    print(p.name, "=", p.value)

print(Priority.HIGH is Priority.HIGH)`,
        },
        {
          id: "m12-l04", kind: "exercise", title: "Exercise: Order status",
          tags: ["enums"],
          content: `
<div class="lc-eyebrow">Exercise · Modern Python</div>
<h1>An order's lifecycle</h1>
<h3>Your task</h3>
<p>Define an enum <code>Status</code> with members <code>PENDING</code>,
<code>SHIPPED</code>, <code>DELIVERED</code> (use <code>auto()</code>).</p>
<p>Then write <code>next_status(s)</code> that returns the following status in that
order. <code>DELIVERED</code> is the last stage, so it stays <code>DELIVERED</code>.</p>`,
          starter: `from enum import Enum, auto

class Status(Enum):
    ...

def next_status(s):
    # return the next Status; DELIVERED stays DELIVERED
    ...
`,
          tests: [
            { name: "members are named", code: `assert Status.PENDING.name == "PENDING", "a member's .name is its identifier"` },
            { name: "PENDING advances to SHIPPED", code: `assert next_status(Status.PENDING) is Status.SHIPPED` },
            { name: "DELIVERED is the final status", code: `assert next_status(Status.DELIVERED) is Status.DELIVERED` },
          ],
        },
        {
          id: "m12-l05", kind: "lesson", title: "namedtuple & NamedTuple",
          docs: [{ label: "collections.namedtuple", url: "https://docs.python.org/3/library/collections.html#collections.namedtuple" }],
          content: `
<div class="lc-eyebrow">Lesson 3 · Modern Python</div>
<h1>Lightweight records with namedtuple</h1>
<p>A <code>namedtuple</code> is a tuple whose positions also have names. It's immutable,
tiny, and reads far better than <code>pt[0]</code>:</p>
<pre><code>from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(1, 2)
print(p.x, p.y)     # 1 2
print(p[0])         # 1  — still a tuple
x, y = p            # still unpacks</code></pre>

<h2>Copy-with-changes: _replace</h2>
<p>Because it's immutable, you make a modified copy instead of mutating:</p>
<pre><code>moved = p._replace(y=9)
print(p, moved)     # Point(x=1, y=2) Point(x=1, y=9)
print(p._asdict())  # {'x': 1, 'y': 2}</code></pre>

<h2>The class form: typing.NamedTuple</h2>
<p>For type hints and defaults, the class syntax is clearer:</p>
<pre><code>from typing import NamedTuple

class Point(NamedTuple):
    x: int
    y: int = 0</code></pre>

<div class="callout"><i class="fas fa-lightbulb"></i><div>
Reach for a <b>namedtuple</b> for small immutable value objects; reach for a
<b>dataclass</b> when you want mutability, methods, or more behavior.</div></div>`,
          starter: `from collections import namedtuple

Color = namedtuple("Color", ["r", "g", "b"])
c = Color(255, 100, 0)
print(c, "->", c.r, c.g, c.b)

lighter = c._replace(b=50)
print(lighter)
print(c._asdict())`,
        },
        {
          id: "m12-l06", kind: "exercise", title: "Exercise: A Point record",
          tags: ["namedtuple"],
          content: `
<div class="lc-eyebrow">Exercise · Modern Python</div>
<h1>Move a point without mutating it</h1>
<h3>Your task</h3>
<p>Create a namedtuple <code>Point</code> with fields <code>x</code> and
<code>y</code>. Build <code>p = Point(1, 2)</code>, then make <code>moved</code> a copy
of <code>p</code> with <code>y</code> set to <code>5</code> — without changing
<code>p</code>.</p>`,
          starter: `from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(1, 2)
moved = ...   # a copy of p with y = 5
`,
          tests: [
            { name: "fields are accessible by name", code: `assert (p.x, p.y) == (1, 2)` },
            { name: "moved is a copy with y=5", code: `assert moved == Point(1, 5), "use p._replace(y=5)"` },
            { name: "the original is unchanged", code: `assert p.y == 2, "namedtuples are immutable — p should be untouched"` },
          ],
        },
        {
          id: "m12-l07", kind: "lesson", title: "Pattern matching: the basics",
          docs: [{ label: "match statements", url: "https://docs.python.org/3/tutorial/controlflow.html#match-statements" }],
          content: `
<div class="lc-eyebrow">Lesson 4 · Modern Python</div>
<h1>match / case</h1>
<p>Structural pattern matching (Python 3.10+) reads like a supercharged
<code>if/elif</code>, but it can also <b>destructure</b> the value it matches.</p>
<pre><code>def describe(x):
    match x:
        case 0:
            return "zero"
        case 1 | 2 | 3:
            return "small"          # | is an OR-pattern
        case _:
            return "many"           # _ is the wildcard (default)</code></pre>

<h2>Capture and guards</h2>
<p>A bare name <b>captures</b> the value; add an <code>if</code> guard for extra
conditions:</p>
<pre><code>def sign(n):
    match n:
        case 0:
            return "zero"
        case v if v &gt; 0:
            return "positive"
        case _:
            return "negative"</code></pre>

<div class="callout"><i class="fas fa-triangle-exclamation"></i><div>
<code>case _:</code> matches anything and is the catch-all. A lone name like
<code>case v:</code> also matches anything (and captures it) — so put specific cases
first.</div></div>`,
          starter: `def describe(x):
    match x:
        case 0:
            return "zero"
        case 1 | 2 | 3:
            return "small"
        case v if v > 100:
            return "huge"
        case _:
            return "many"

for n in [0, 2, 50, 999]:
    print(n, "->", describe(n))`,
        },
        {
          id: "m12-l08", kind: "lesson", title: "Pattern matching: structural",
          docs: [{ label: "Patterns", url: "https://docs.python.org/3/reference/compound_stmts.html#the-match-statement" }],
          content: `
<div class="lc-eyebrow">Lesson 5 · Modern Python</div>
<h1>Matching shapes of data</h1>
<p>The real power of <code>match</code> is matching the <i>structure</i> of lists,
dicts, and objects — binding parts as you go.</p>

<h2>Sequences</h2>
<pre><code>match command:
    case ["go", direction]:
        move(direction)
    case ["drop", *items]:       # *items captures the rest
        drop(items)</code></pre>

<h2>Mappings</h2>
<pre><code>match event:
    case {"type": "click", "x": x, "y": y}:
        print(x, y)              # keys must be present</code></pre>

<h2>Class patterns</h2>
<p>You can match objects — including dataclasses — by type and pull out fields:</p>
<pre><code>from dataclasses import dataclass

@dataclass
class Circle:
    radius: float

match shape:
    case Circle(radius=r):
        area = 3.14159 * r * r</code></pre>

<div class="callout"><i class="fas fa-lightbulb"></i><div>
Class patterns are why dataclasses and <code>match</code> pair so well — together they
give you tidy, type-directed branching without a wall of <code>isinstance</code>
checks.</div></div>`,
          starter: `def handle(event):
    match event:
        case {"type": "click", "x": x, "y": y}:
            return f"click at {x},{y}"
        case {"type": "key", "value": v}:
            return f"key {v}"
        case _:
            return "ignored"

print(handle({"type": "click", "x": 3, "y": 4}))
print(handle({"type": "key", "value": "Esc"}))
print(handle({"type": "scroll"}))`,
        },
        {
          id: "m12-l09", kind: "exercise", title: "Exercise: A tiny command parser",
          tags: ["pattern-matching"],
          content: `
<div class="lc-eyebrow">Exercise · Modern Python</div>
<h1>Parse commands with match/case</h1>
<h3>Your task</h3>
<p>Write <code>run(cmd)</code> where <code>cmd</code> is a list. Use
<code>match</code>/<code>case</code> to return:</p>
<ul>
<li><code>["move", x, y]</code> → <code>"moving to x,y"</code> (e.g. <code>"moving to 3,4"</code>)</li>
<li><code>["stop"]</code> → <code>"stopping"</code></li>
<li><code>["say", *words]</code> → <code>"say: "</code> followed by the words joined by spaces</li>
<li>anything else → <code>"unknown"</code></li>
</ul>`,
          starter: `def run(cmd):
    match cmd:
        # add your cases here
        ...
`,
          tests: [
            { name: "move captures x and y", code: `assert run(["move", 3, 4]) == "moving to 3,4"` },
            { name: "stop", code: `assert run(["stop"]) == "stopping"` },
            { name: "say joins the rest", code: `assert run(["say", "hi", "there"]) == "say: hi there"` },
            { name: "fallback is unknown", code: `assert run(["nope"]) == "unknown"` },
          ],
        },
        {
          id: "m12-l10", kind: "exercise", title: "Exercise: Shape area by pattern",
          tags: ["pattern-matching", "dataclasses"],
          content: `
<div class="lc-eyebrow">Exercise · Modern Python</div>
<h1>Areas with class patterns</h1>
<h3>Your task</h3>
<p><code>Circle</code> and <code>Rectangle</code> dataclasses are provided. Write
<code>area(shape)</code> that uses <code>match</code> with <b>class patterns</b> to
return:</p>
<ul>
<li>a <code>Circle</code> → <code>math.pi * radius ** 2</code></li>
<li>a <code>Rectangle</code> → <code>width * height</code></li>
</ul>`,
          starter: `from dataclasses import dataclass
import math

@dataclass
class Circle:
    radius: float

@dataclass
class Rectangle:
    width: float
    height: float

def area(shape):
    match shape:
        # match Circle(...) and Rectangle(...)
        ...
`,
          tests: [
            { name: "circle area = pi r^2", code: `import math as _m
assert abs(area(Circle(2)) - _m.pi * 4) < 1e-9` },
            { name: "rectangle area = w*h", code: `assert area(Rectangle(3, 4)) == 12` },
          ],
        },
        {
          id: "m12-l11", kind: "lesson", title: "Richer type hints",
          docs: [{ label: "typing", url: "https://docs.python.org/3/library/typing.html" }],
          content: `
<div class="lc-eyebrow">Lesson 6 · Modern Python</div>
<h1>Type hints that document intent</h1>
<p>Module 10 covered the basics. A few more tools make hints genuinely useful to
readers and tools like mypy (Python still doesn't enforce them at runtime).</p>

<h2>Unions and optionals</h2>
<pre><code>def parse(x: str) -&gt; int | None:   # may return an int or None
    return int(x) if x.isdigit() else None</code></pre>

<h2>Literal — an exact set of values</h2>
<pre><code>from typing import Literal

def move(direction: Literal["left", "right"]) -&gt; None:
    ...   # tools flag move("up") as wrong</code></pre>

<h2>Aliases, Callable, TypedDict</h2>
<pre><code>from typing import Callable, TypedDict

Vector = list[float]                     # a type alias
Reducer = Callable[[float, float], float]  # a function type

class User(TypedDict):
    name: str
    age: int</code></pre>

<div class="callout"><i class="fas fa-circle-info"></i><div>
Hints are annotations, not checks — they live in <code>func.__annotations__</code> and
help humans and linters. Use them where they clarify, not everywhere.</div></div>`,
          starter: `from typing import Literal, Callable

Reducer = Callable[[int, int], int]

def combine(a: int, b: int, how: Literal["add", "mul"]) -> int:
    return a + b if how == "add" else a * b

print(combine(3, 4, "add"))
print(combine(3, 4, "mul"))
print(combine.__annotations__["how"])`,
        },
        {
          id: "m12-l12", kind: "exercise", title: "Exercise: A typed event handler",
          tags: ["typing"],
          content: `
<div class="lc-eyebrow">Exercise · Modern Python</div>
<h1>Annotate a handler</h1>
<h3>Your task</h3>
<p>Write <code>handle(event, value)</code> and give it type hints:
<code>event</code> is <code>Literal["click", "scroll"]</code>, <code>value</code> is an
<code>int</code>, and it returns a <code>str</code>.</p>
<ul>
<li><code>"click"</code> → <code>"clicked at &lt;value&gt;"</code></li>
<li><code>"scroll"</code> → <code>"scrolled by &lt;value&gt;"</code></li>
</ul>
<p>Keep the annotations — the checks read them back.</p>`,
          starter: `from typing import Literal

def handle(event, value):
    # add hints: event: Literal["click","scroll"], value: int, -> str
    ...
`,
          tests: [
            { name: "click message", code: `assert handle("click", 10) == "clicked at 10"` },
            { name: "scroll message", code: `assert handle("scroll", 5) == "scrolled by 5"` },
            { name: "type hints are present", code: `assert "event" in handle.__annotations__ and handle.__annotations__.get("return") is str, "keep the annotations, including -> str"` },
          ],
        },
        {
          id: "m12-quiz", kind: "quiz", title: "Module 12 Check: Modern Python",
          intro: "Dataclasses, enums, namedtuples, pattern matching, and typing. Score 80% or more to mark it complete.",
          questions: [
            { q: "What does @dataclass generate for you?", options: ["A database table", "__init__, __repr__ and __eq__", "Only __init__", "Nothing until you add fields"], answer: 1, explain: "It writes the boilerplate init, repr and eq from your annotated fields." , tags: ["dataclasses"] },
            { q: "How do you give a dataclass field a mutable default like an empty list?", options: ["items: list = []", "items: list = field(default_factory=list)", "items = list()", "items: list = None"], answer: 1, explain: "A bare [] is shared across instances; default_factory builds a fresh list each time." , tags: ["dataclasses"] },
            { q: "What does @dataclass(frozen=True) do?", options: ["Speeds it up", "Makes instances immutable", "Hides the fields", "Forbids inheritance"], answer: 1, explain: "Frozen instances can't be reassigned after creation (and become hashable)." , tags: ["dataclasses"] },
            { q: "For a member Status.PENDING, what is .name?", options: ["its integer value", "the string 'PENDING'", "the class name", "None"], answer: 1, explain: ".name is the member's identifier; .value is the assigned value." , tags: ["enums"] },
            { q: "What does enum.auto() do?", options: ["Picks random values", "Assigns increasing integer values automatically", "Makes the enum mutable", "Imports the enum"], answer: 1, explain: "auto() numbers members for you, starting at 1." , tags: ["enums"] },
            { q: "p._replace(y=5) on a namedtuple…", options: ["mutates p in place", "returns a new namedtuple with y=5", "deletes y", "raises an error"], answer: 1, explain: "namedtuples are immutable, so _replace returns a modified copy." , tags: ["namedtuple"] },
            { q: "In match/case, what does `case _:` match?", options: ["only None", "an underscore variable", "anything (the default)", "empty lists"], answer: 2, explain: "_ is the wildcard — the catch-all, so put it last." , tags: ["pattern-matching"] },
            { q: "The pattern `case [a, b]:` matches…", options: ["any list", "a sequence of exactly two items", "a dict with keys a and b", "two separate values"], answer: 1, explain: "Sequence patterns match by length and bind each element." , tags: ["pattern-matching"] },
            { q: "What does Literal[\"click\", \"scroll\"] express?", options: ["any string", "the value must be exactly 'click' or 'scroll'", "a list of two strings", "a regex"], answer: 1, explain: "Literal restricts a value to a specific set of constants (checked by tools, not at runtime)." , tags: ["typing"] },
          ],
        },
      ],
    },
  ],

  /* ═══════════════ FRAMEWORK TRACKS ═══════════════ */
  frameworks: [
    /* ═══════════════ DATA · pandas ═══════════════ */
    {
      id: "fw-pandas", name: "pandas", icon: "fas fa-table", category: "Data",
      desc: "Load, clean, and analyze tabular data with DataFrames.",
      level: "Intermediate",
      note: "pandas runs right here in your browser, so every example computes for real.",
      lessons: [
        {
          id: "pandas-l01", kind: "lesson", title: "Series & DataFrame",
          docs: [{ label: "Intro to data structures", url: "https://pandas.pydata.org/docs/user_guide/dsintro.html" }],
          content: `
<div class="lc-eyebrow">pandas · Lesson 1</div>
<h1>The two core structures</h1>
<p>pandas gives you two objects. A <b>Series</b> is a labelled 1-D column. A
<b>DataFrame</b> is a 2-D table — think of a spreadsheet you can program.</p>
<pre><code>import pandas as pd

s = pd.Series([10, 20, 30], name="sales")
print(s.mean())     # 20.0

df = pd.DataFrame({
    "product": ["Pen", "Book", "Bag"],
    "price":   [2, 12, 30],
    "stock":   [100, 40, 7],
})
print(df)
print(df.shape)     # (3, 3)  rows, columns
print(df.columns.tolist())</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
A DataFrame column <i>is</i> a Series. Everything you learn about Series applies
to each column of a table.</div></div>`,
          starter: `import pandas as pd

df = pd.DataFrame({
    "city": ["Lisbon", "Oslo", "Cairo", "Tokyo"],
    "temp": [24, 9, 33, 18],
})
print(df)
print("Average temp:", df["temp"].mean())
print("Hottest:", df.loc[df["temp"].idxmax(), "city"])`,
        },
        {
          id: "pandas-l02", kind: "lesson", title: "Selecting & filtering",
          docs: [{ label: "Indexing & selecting data", url: "https://pandas.pydata.org/docs/user_guide/indexing.html" }],
          content: `
<div class="lc-eyebrow">pandas · Lesson 2</div>
<h1>Getting at your data</h1>
<p>Select a column with <code>df["name"]</code>. Filter rows with a boolean
condition inside the brackets.</p>
<pre><code>import pandas as pd

df = pd.DataFrame({
    "name": ["Ada", "Bo", "Cy", "Di"],
    "age":  [36, 19, 52, 28],
    "city": ["London", "Oslo", "London", "Cairo"],
})

print(df["age"])                 # one column (a Series)
print(df[df["age"] > 30])        # only rows where age > 30
print(df[df["city"] == "London"])

# combine conditions with & and | (wrap each in parentheses)
print(df[(df["age"] > 20) & (df["city"] == "London")])</code></pre>
<div class="callout"><i class="fas fa-triangle-exclamation"></i><div>
Use <code>&</code> and <code>|</code> (not <code>and</code>/<code>or</code>) for
row filters, and parenthesise each condition.</div></div>`,
          starter: `import pandas as pd

df = pd.DataFrame({
    "title": ["Dune", "1984", "It", "Emma"],
    "pages": [412, 328, 1138, 474],
    "year":  [1965, 1949, 1986, 1815],
})
long_books = df[df["pages"] > 400]
print(long_books)
print("Count over 400 pages:", len(long_books))
print("Newest:", df.loc[df["year"].idxmax(), "title"])`,
        },
        {
          id: "pandas-l03", kind: "lesson", title: "Grouping & aggregating",
          docs: [{ label: "Group by: split-apply-combine", url: "https://pandas.pydata.org/docs/user_guide/groupby.html" }],
          content: `
<div class="lc-eyebrow">pandas · Lesson 3</div>
<h1>Split, apply, combine</h1>
<p><code>groupby</code> is the heart of analysis: split rows into groups, then
compute a summary per group.</p>
<pre><code>import pandas as pd

df = pd.DataFrame({
    "region": ["N", "S", "N", "S", "N"],
    "sales":  [100, 200, 150, 50, 120],
})

# total sales per region
print(df.groupby("region")["sales"].sum())
# N -> 370, S -> 250

# several stats at once
print(df.groupby("region")["sales"].agg(["sum", "mean", "count"]))</code></pre>
<p>Add new columns by assigning to them:</p>
<pre><code>df["with_tax"] = df["sales"] * 1.2</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
"Group by X, sum Y" answers a huge fraction of real data questions — sales by
region, errors by day, revenue by customer.</div></div>`,
          starter: `import pandas as pd

df = pd.DataFrame({
    "team":  ["A", "B", "A", "C", "B", "A"],
    "goals": [2, 1, 3, 0, 2, 1],
})
totals = df.groupby("team")["goals"].sum()
print(totals)
print("Top team:", totals.idxmax(), "with", totals.max(), "goals")`,
        },
        {
          id: "pandas-l04", kind: "exercise", title: "Exercise: Sales analysis",
          content: `
<div class="lc-eyebrow">pandas · Exercise</div>
<h1>Analyze a sales table</h1>
<h3>Your task</h3>
<p>A DataFrame <code>df</code> with <code>product</code> and <code>sales</code>
columns is given. Compute:</p>
<ul>
  <li><code>total_sales</code> — the sum of the <code>sales</code> column.</li>
  <li><code>top_product</code> — the product with the highest total sales
      (group by product, sum, then find the largest).</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>df.groupby("product")["sales"].sum().idxmax()</code> gives the top product
in one line.</div></div>`,
          starter: `import pandas as pd

df = pd.DataFrame({
    "product": ["A", "B", "A", "C", "B", "A"],
    "sales":   [100, 200, 150, 50, 300, 120],
})

total_sales = 0
top_product = ""

print("Total:", total_sales)
print("Top product:", top_product)`,
          tests: [
            { name: "total_sales is correct", code: `assert int(total_sales) == 920, f"Expected 920, got {total_sales}"` },
            { name: "top_product is B", code: `assert top_product == "B", f"Expected 'B', got {top_product!r}"` },
          ],
        },
        {
          id: "pandas-quiz", kind: "quiz", title: "pandas Check",
          intro: "DataFrames, selection, and grouping.",
          questions: [
            { q: "A single column of a DataFrame is a…", options: ["DataFrame", "Series", "list", "dict"], answer: 1, explain: "Each column is a pandas Series." },
            { q: "How do you keep only rows where age > 30?", options: ["df.age > 30", "df[df[\"age\"] > 30]", "df.filter(30)", "df.where(age, 30)"], answer: 1, explain: "Pass a boolean condition into df[...]." },
            { q: "Which combines a per-group total?", options: ["df.sum()", "df.groupby(\"x\")[\"y\"].sum()", "df.total(\"x\")", "df.agg()"], answer: 1, explain: "groupby splits rows, then you aggregate each group." },
            { q: "For row filters you should use…", options: ["and / or", "& / | with parentheses", "&& / ||", "AND / OR"], answer: 1, explain: "pandas uses & and |, with each condition parenthesised." },
          ],
        },
      ],
    },

    /* ═══════════════ DATA · NumPy ═══════════════ */
    {
      id: "fw-numpy", name: "NumPy", icon: "fas fa-square-root-variable", category: "Data",
      desc: "Fast numerical arrays and the foundation of scientific Python.",
      level: "Intermediate",
      note: "NumPy runs in your browser, so these arrays compute for real.",
      lessons: [
        {
          id: "numpy-l01", kind: "lesson", title: "Arrays & vectorized math",
          docs: [{ label: "NumPy: the absolute basics", url: "https://numpy.org/doc/stable/user/absolute_beginners.html" }],
          content: `
<div class="lc-eyebrow">NumPy · Lesson 1</div>
<h1>The ndarray</h1>
<p>A NumPy <b>array</b> holds numbers in a grid and lets you do math on the whole
thing at once — no loops, and far faster than lists.</p>
<pre><code>import numpy as np

a = np.array([1, 2, 3, 4])
print(a * 10)        # [10 20 30 40]   element-wise
print(a + a)         # [2 4 6 8]
print(a ** 2)        # [1 4 9 16]

print(np.arange(0, 10, 2))   # [0 2 4 6 8]
print(np.zeros(3))           # [0. 0. 0.]
print(np.linspace(0, 1, 5))  # [0. 0.25 0.5 0.75 1.]</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Applying an operation to a whole array at once is called <b>vectorization</b>. It's
the reason NumPy (and pandas) are fast.</div></div>`,
          starter: `import numpy as np

prices = np.array([19.99, 5.50, 99.00, 14.75])
with_tax = prices * 1.2
print("With tax:", np.round(with_tax, 2))
print("Total:", prices.sum())
print("Most expensive:", prices.max())`,
        },
        {
          id: "numpy-l02", kind: "lesson", title: "Indexing, slicing & aggregation",
          docs: [{ label: "Indexing on ndarrays", url: "https://numpy.org/doc/stable/user/basics.indexing.html" }],
          content: `
<div class="lc-eyebrow">NumPy · Lesson 2</div>
<h1>Reaching into arrays</h1>
<p>Index and slice like lists, but you can also select with a <b>boolean mask</b>
— enormously useful.</p>
<pre><code>import numpy as np

a = np.array([5, 12, 7, 20, 3])
print(a[0], a[-1])      # 5 3
print(a[1:4])           # [12  7 20]

mask = a > 10
print(mask)             # [False  True False  True False]
print(a[mask])          # [12 20]   only the big ones
print(a[a > 10].sum())  # 32</code></pre>
<h2>Aggregations</h2>
<pre><code>print(a.mean(), a.std(), a.min(), a.max())
grid = np.array([[1, 2], [3, 4]])
print(grid.sum(axis=0))   # [4 6]  column sums
print(grid.sum(axis=1))   # [3 7]  row sums</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>array[array > x]</code> reads almost like English: "the elements where the
condition holds."</div></div>`,
          starter: `import numpy as np

scores = np.array([55, 82, 91, 47, 73, 88, 60])
print("Mean:", scores.mean())
print("Passing (>=60):", scores[scores >= 60])
print("How many passed:", (scores >= 60).sum())`,
        },
        {
          id: "numpy-l03", kind: "exercise", title: "Exercise: Array stats",
          content: `
<div class="lc-eyebrow">NumPy · Exercise</div>
<h1>Summarise an array</h1>
<h3>Your task</h3>
<p>An array <code>arr</code> is given. Compute:</p>
<ul>
  <li><code>total</code> — the sum of all elements.</li>
  <li><code>mean_val</code> — the mean.</li>
  <li><code>big</code> — an array of just the elements greater than 20 (use a
      boolean mask).</li>
</ul>`,
          starter: `import numpy as np

arr = np.array([4, 8, 15, 16, 23, 42])

total = 0
mean_val = 0
big = np.array([])

print(total, mean_val, big)`,
          tests: [
            { name: "total is 108", code: `assert int(total) == 108, f"Expected 108, got {total}"` },
            { name: "mean_val is 18.0", code: `assert abs(float(mean_val) - 18.0) < 1e-9, f"Expected 18.0, got {mean_val}"` },
            { name: "big selects elements > 20", code: `assert list(big) == [23, 42], f"Expected [23, 42], got {list(big)}"` },
          ],
        },
        {
          id: "numpy-quiz", kind: "quiz", title: "NumPy Check",
          intro: "Arrays, vectorization, and masks.",
          questions: [
            { q: "What does np.array([1,2,3]) * 2 give?", options: ["[1,2,3,1,2,3]", "[2,4,6]", "error", "[1,2,3,2]"], answer: 1, explain: "Math is element-wise (vectorized), not list repetition." },
            { q: "What is a[a > 5]?", options: ["The indices over 5", "The elements greater than 5", "True/False", "An error"], answer: 1, explain: "A boolean mask selects the matching elements." },
            { q: "Why use NumPy over Python lists for numbers?", options: ["Prettier output", "Vectorized, much faster math", "It can't do math", "Smaller files"], answer: 1, explain: "Vectorized operations on arrays are far faster than Python loops." },
          ],
        },
      ],
    },

    /* ═══════════════ DATA · Matplotlib ═══════════════ */
    {
      id: "fw-matplotlib", name: "Matplotlib", icon: "fas fa-chart-line", category: "Data",
      desc: "Turn data into charts and visualizations.",
      level: "Beginner",
      note: "Plots you create render right in the output panel — try Run on each lesson!",
      lessons: [
        {
          id: "mpl-l01", kind: "lesson", title: "Your first chart",
          docs: [{ label: "Matplotlib quick start", url: "https://matplotlib.org/stable/users/explain/quick_start.html" }],
          content: `
<div class="lc-eyebrow">Matplotlib · Lesson 1</div>
<h1>From numbers to a picture</h1>
<p>Matplotlib draws figures. In Pythoneer we render to an image you can see below
the editor. The pattern is: make a figure, plot data, save it.</p>
<pre><code>import matplotlib
matplotlib.use("Agg")            # render to an image, not a window
import matplotlib.pyplot as plt

x = [0, 1, 2, 3, 4]
y = [0, 1, 4, 9, 16]

fig, ax = plt.subplots()
ax.plot(x, y, marker="o")
ax.set_title("Squares")
ax.set_xlabel("x")
ax.set_ylabel("x squared")
fig.savefig("chart.png")         # Pythoneer shows any image you save</code></pre>
<div class="callout"><i class="fas fa-image"></i><div>
The <code>matplotlib.use("Agg")</code> line picks a non-window backend so plots
work on a server. Press <b>Run</b> and your chart appears below.</div></div>`,
          starter: `import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May"]
revenue = [120, 150, 90, 200, 170]

fig, ax = plt.subplots()
ax.plot(months, revenue, marker="o", color="#34d399")
ax.set_title("Monthly revenue")
fig.savefig("revenue.png")
print("Chart saved — see below!")`,
        },
        {
          id: "mpl-l02", kind: "lesson", title: "Bar charts & styling",
          docs: [{ label: "Axes.bar()", url: "https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.bar.html" }],
          content: `
<div class="lc-eyebrow">Matplotlib · Lesson 2</div>
<h1>Other chart types</h1>
<p>Swap <code>ax.plot</code> for <code>ax.bar</code>, <code>ax.scatter</code>, or
<code>ax.pie</code>. Style with colors, labels, and a grid.</p>
<pre><code>import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

langs = ["Python", "JS", "Go", "Rust"]
votes = [48, 30, 12, 22]

fig, ax = plt.subplots()
bars = ax.bar(langs, votes, color=["#34d399", "#fbbf24", "#22d3ee", "#f43f5e"])
ax.set_title("Favourite languages")
ax.set_ylabel("votes")
ax.bar_label(bars)                # number on top of each bar
fig.savefig("votes.png")</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Every chart follows the same rhythm: <code>fig, ax = plt.subplots()</code>, draw,
label, <code>savefig</code>. Learn it once, reuse it everywhere.</div></div>`,
          starter: `import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

fruit = ["Apples", "Bananas", "Cherries"]
sold = [54, 67, 31]

fig, ax = plt.subplots()
bars = ax.bar(fruit, sold, color="#22d3ee")
ax.bar_label(bars)
ax.set_title("Fruit sold today")
fig.savefig("fruit.png")
print("Done!")`,
        },
        {
          id: "mpl-l03", kind: "exercise", title: "Exercise: Plot the data",
          content: `
<div class="lc-eyebrow">Matplotlib · Exercise</div>
<h1>Draw and save a chart</h1>
<h3>Your task</h3>
<ul>
  <li>Using the given <code>days</code> and <code>steps</code>, draw any chart
      (a line or bar is fine).</li>
  <li>Save it to a file named <code>steps.png</code>.</li>
</ul>
<div class="callout"><i class="fas fa-flask"></i><div>
The checker confirms that <code>steps.png</code> was created. Your chart will also
appear below the editor.</div></div>`,
          starter: `import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
steps = [8200, 10400, 6100, 12000, 9800]

fig, ax = plt.subplots()
# draw a chart of steps by day, then save it as "steps.png"
`,
          tests: [
            { name: "steps.png was created", code: `from pathlib import Path\nassert Path("steps.png").exists(), "Save your figure as steps.png with fig.savefig(...)"` },
            { name: "the image is non-empty", code: `from pathlib import Path\nassert Path("steps.png").stat().st_size > 100, "The saved chart looks empty"` },
          ],
        },
      ],
    },

    /* ═══════════════ DATA · Streamlit (roadmap concept) ═══════════════ */
    {
      id: "fw-streamlit", name: "Streamlit", icon: "fas fa-wand-magic-sparkles", category: "Data",
      desc: "Turn Python scripts into shareable data apps with no front-end code.",
      level: "Beginner",
      note: "Streamlit runs as its own web app, so these lessons teach the concepts and code; run them on your machine with: pip install streamlit && streamlit run app.py",
      lessons: [
        {
          id: "st-l01", kind: "lesson", title: "What is Streamlit?",
          docs: [{ label: "Streamlit — Get started", url: "https://docs.streamlit.io/get-started" }],
          content: `
<div class="lc-eyebrow">Streamlit · Lesson 1</div>
<h1>Scripts become apps</h1>
<p>Streamlit turns a plain Python script into an interactive web app — no HTML,
CSS, or JavaScript. You write top-to-bottom Python; Streamlit renders it.</p>
<pre><code># app.py
import streamlit as st

st.title("My first app")
st.write("Hello, data!")

name = st.text_input("Your name")
if name:
    st.success(f"Welcome, {name}!")</code></pre>
<p>Run it from your terminal:</p>
<pre><code>pip install streamlit
streamlit run app.py     # opens in your browser</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Streamlit is its own server, so it can't run inside Pythoneer's snippet runner —
but the Python you've learned is exactly what you write in a Streamlit app.</div></div>`,
          starter: `# Streamlit runs as a separate app, so just explore the data logic here.
data = {"Mon": 8200, "Tue": 10400, "Wed": 6100}
best_day = max(data, key=data.get)
print(f"In a Streamlit app you'd st.write: Best day is {best_day}")`,
        },
        {
          id: "st-l02", kind: "lesson", title: "Widgets, charts & layout",
          docs: [{ label: "Streamlit API reference", url: "https://docs.streamlit.io/develop/api-reference" }],
          content: `
<div class="lc-eyebrow">Streamlit · Lesson 2</div>
<h1>Interactivity for free</h1>
<p>Each widget returns a value. When the user changes it, Streamlit re-runs your
script top to bottom with the new value — so your UI is just Python variables.</p>
<pre><code>import streamlit as st
import pandas as pd

st.header("Sales dashboard")

region = st.selectbox("Region", ["North", "South", "All"])
threshold = st.slider("Min sales", 0, 500, 100)

df = pd.read_csv("sales.csv")
if region != "All":
    df = df[df["region"] == region]
df = df[df["sales"] >= threshold]

st.dataframe(df)              # interactive table
st.bar_chart(df, x="month", y="sales")
st.metric("Total", f"\${df['sales'].sum():,}")</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Notice how everything you built in the pandas track plugs straight in — Streamlit
is the display layer on top of your data code.</div></div>`,
          starter: `# The data-prep logic you'd put in a Streamlit app:
rows = [
    {"month": "Jan", "sales": 120},
    {"month": "Feb", "sales": 340},
    {"month": "Mar", "sales": 90},
]
threshold = 100
visible = [r for r in rows if r["sales"] >= threshold]
print("Rows a slider(>=100) would show:", visible)`,
        },
      ],
    },

    /* ═══════════════ WEB · Flask ═══════════════ */
    {
      id: "fw-flask", name: "Flask", icon: "fas fa-flask", category: "Web",
      desc: "Build web apps and APIs with a lightweight, unopinionated framework.",
      level: "Intermediate",
      note: "Flask runs in your browser via its built-in test client — real routing, real responses, with no live server needed.",
      lessons: [
        {
          id: "flask-l01", kind: "lesson", title: "Your first app",
          docs: [{ label: "Flask — Quickstart", url: "https://flask.palletsprojects.com/en/stable/quickstart/" }],
          content: `
<div class="lc-eyebrow">Flask · Lesson 1</div>
<h1>A web app in ten lines</h1>
<p>Flask maps URLs to Python functions called <b>views</b>. You create an app,
decorate a function with a route, and whatever it returns becomes the response.</p>
<pre><code># app.py
from flask import Flask

app = Flask(__name__)

@app.get("/")
def home():
    return "Hello, Flask!"

@app.get("/about")
def about():
    return "A tiny web app."</code></pre>
<p>Normally you'd start the dev server with <code>flask run</code> and open a
browser. In Pythoneer we use Flask's <b>test client</b> to send requests without a
server — the same routing, visible right below.</p>
<pre><code>client = app.test_client()
print(client.get("/").get_data(as_text=True))     # Hello, Flask!
print(client.get("/about").status_code)           # 200</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
A view is just a function that returns a response. The <code>@app.get("/path")</code>
decorator connects a URL to it.</div></div>`,
          starter: `from flask import Flask

app = Flask(__name__)

@app.get("/")
def home():
    return "Hello, Flask!"

# Flask's test client sends requests with no server needed:
client = app.test_client()
res = client.get("/")
print("Status:", res.status_code)
print("Body:", res.get_data(as_text=True))`,
        },
        {
          id: "flask-l02", kind: "lesson", title: "Dynamic routes & methods",
          docs: [{ label: "Routing & variable rules", url: "https://flask.palletsprojects.com/en/stable/quickstart/#routing" }],
          content: `
<div class="lc-eyebrow">Flask · Lesson 2</div>
<h1>URLs with variables</h1>
<p>Put a <code>&lt;name&gt;</code> in the path and Flask passes it to your view.
Add a converter like <code>&lt;int:n&gt;</code> to validate and convert the type.</p>
<pre><code>from flask import Flask
app = Flask(__name__)

@app.get("/user/<username>")
def profile(username):
    return f"Profile: {username}"

@app.get("/square/<int:n>")
def square(n):
    return f"{n} squared is {n * n}"

client = app.test_client()
print(client.get("/user/ada").get_data(as_text=True))   # Profile: ada
print(client.get("/square/6").get_data(as_text=True))   # 6 squared is 36</code></pre>
<h2>Handling POST</h2>
<p>List the methods a view accepts; read submitted data from <code>request</code>.</p>
<pre><code>from flask import request

@app.post("/echo")
def echo():
    data = request.get_json()
    return {"you_sent": data}</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>&lt;int:n&gt;</code> means "only match numbers, and give me an int." A request
to <code>/square/abc</code> returns a 404 automatically.</div></div>`,
          starter: `from flask import Flask
app = Flask(__name__)

@app.get("/greet/<name>")
def greet(name):
    return f"Hello, {name}!"

@app.get("/double/<int:n>")
def double(n):
    return f"{n} doubled is {n * 2}"

client = app.test_client()
print(client.get("/greet/Pythoneer").get_data(as_text=True))
print(client.get("/double/21").get_data(as_text=True))
print("Bad type ->", client.get("/double/abc").status_code)  # 404`,
        },
        {
          id: "flask-l03", kind: "lesson", title: "Building a JSON API",
          docs: [{ label: "APIs with JSON", url: "https://flask.palletsprojects.com/en/stable/quickstart/#about-responses" }],
          content: `
<div class="lc-eyebrow">Flask · Lesson 3</div>
<h1>Returning JSON</h1>
<p>Return a <code>dict</code> (or use <code>jsonify</code>) and Flask sends JSON
with the right content-type — the foundation of a web API.</p>
<pre><code>from flask import Flask, jsonify
app = Flask(__name__)

TASKS = [{"id": 1, "title": "Learn Flask", "done": False}]

@app.get("/api/tasks")
def list_tasks():
    return jsonify(TASKS)        # a list of dicts -> JSON

@app.get("/api/tasks/<int:task_id>")
def get_task(task_id):
    for t in TASKS:
        if t["id"] == task_id:
            return t              # a dict -> JSON
    return {"error": "not found"}, 404   # body + status code

client = app.test_client()
print(client.get("/api/tasks").get_json())
print(client.get("/api/tasks/1").get_json())
print(client.get("/api/tasks/99").status_code)   # 404</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Return <code>(body, status_code)</code> as a tuple to set the HTTP status — e.g.
<code>return data, 201</code> for "created".</div></div>`,
          starter: `from flask import Flask, jsonify
app = Flask(__name__)

BOOKS = [
    {"id": 1, "title": "Dune"},
    {"id": 2, "title": "1984"},
]

@app.get("/api/books")
def books():
    return jsonify(BOOKS)

client = app.test_client()
res = client.get("/api/books")
print("Type:", res.headers["Content-Type"])
print("Data:", res.get_json())`,
        },
        {
          id: "flask-l04", kind: "lesson", title: "Templates & query strings",
          docs: [{ label: "Rendering templates", url: "https://flask.palletsprojects.com/en/stable/quickstart/#rendering-templates" }],
          content: `
<div class="lc-eyebrow">Flask · Lesson 4</div>
<h1>Rendering HTML</h1>
<p>For pages, Flask renders <b>Jinja templates</b>: HTML with
<code>{{ placeholders }}</code> and <code>{% logic %}</code>. Real apps keep
templates in files; here we use <code>render_template_string</code> to keep it in
one place.</p>
<pre><code>from flask import Flask, render_template_string, request
app = Flask(__name__)

PAGE = """
&lt;h1&gt;Hello, {{ name }}!&lt;/h1&gt;
&lt;ul&gt;
{% for item in items %}
  &lt;li&gt;{{ item }}&lt;/li&gt;
{% endfor %}
&lt;/ul&gt;
"""

@app.get("/hello")
def hello():
    name = request.args.get("name", "stranger")   # ?name=...
    return render_template_string(PAGE, name=name, items=["a", "b", "c"])

client = app.test_client()
print(client.get("/hello?name=Ada").get_data(as_text=True))</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
<code>request.args.get("name", default)</code> reads a query-string parameter. Jinja
loops and variables let HTML adapt to your data.</div></div>`,
          starter: `from flask import Flask, render_template_string, request
app = Flask(__name__)

@app.get("/welcome")
def welcome():
    name = request.args.get("name", "friend")
    return render_template_string("<h1>Welcome, {{ name }}!</h1>", name=name)

client = app.test_client()
print(client.get("/welcome?name=Mara").get_data(as_text=True))
print(client.get("/welcome").get_data(as_text=True))`,
        },
        {
          id: "flask-l05", kind: "exercise", title: "Exercise: A greeting endpoint",
          content: `
<div class="lc-eyebrow">Flask · Exercise</div>
<h1>Return JSON from a route</h1>
<h3>Your task</h3>
<p>Complete the <code>/greet/&lt;name&gt;</code> view so that a request to
<code>/greet/Ada</code> returns the JSON object
<code>{"greeting": "Hello, Ada!"}</code>.</p>
<div class="callout"><i class="fas fa-flask"></i><div>
Returning a <code>dict</code> makes Flask send JSON. The checker calls your app
with the test client.</div></div>`,
          starter: `from flask import Flask
app = Flask(__name__)

@app.get("/greet/<name>")
def greet(name):
    pass   # return a dict: {"greeting": "Hello, NAME!"}

client = app.test_client()
print(client.get("/greet/Ada").get_json())`,
          tests: [
            { name: "returns the right JSON for Ada", code: `r = app.test_client().get("/greet/Ada")\nassert r.get_json() == {"greeting": "Hello, Ada!"}, f"Got {r.get_json()}"` },
            { name: "uses the name from the URL", code: `assert app.test_client().get("/greet/Sam").get_json() == {"greeting": "Hello, Sam!"}, "The greeting should include the URL name"` },
            { name: "responds with status 200", code: `assert app.test_client().get("/greet/Ada").status_code == 200, "Route should return 200"` },
          ],
        },
        {
          id: "flask-l06", kind: "exercise", title: "Exercise: A calculator route",
          content: `
<div class="lc-eyebrow">Flask · Exercise</div>
<h1>Typed URL parameters</h1>
<h3>Your task</h3>
<p>Build a route <code>/add/&lt;int:a&gt;/&lt;int:b&gt;</code> that returns the JSON
<code>{"sum": a + b}</code>. Use the <code>int</code> converters so the values
arrive as numbers.</p>`,
          starter: `from flask import Flask
app = Flask(__name__)

@app.get("/add/<int:a>/<int:b>")
def add(a, b):
    pass   # return {"sum": ...}

client = app.test_client()
print(client.get("/add/2/3").get_json())`,
          tests: [
            { name: "2 + 3 returns sum 5", code: `assert app.test_client().get("/add/2/3").get_json() == {"sum": 5}, "Expected {'sum': 5}"` },
            { name: "10 + 90 returns sum 100", code: `assert app.test_client().get("/add/10/90").get_json() == {"sum": 100}, "Expected {'sum': 100}"` },
            { name: "values are added as integers", code: `r = app.test_client().get("/add/7/8").get_json()\nassert r == {"sum": 15} and isinstance(r["sum"], int), "Sum should be the integer 15"` },
          ],
        },
        {
          id: "flask-quiz", kind: "quiz", title: "Flask Check",
          intro: "Routes, views, JSON, and templates.",
          questions: [
            { q: "What connects a URL to a view function?", options: ["A template", "The @app.route / @app.get decorator", "jsonify", "request"], answer: 1, explain: "The route decorator maps a URL path to the function below it." },
            { q: "What does returning a dict from a view produce?", options: ["An error", "Plain text", "A JSON response", "An HTML page"], answer: 2, explain: "Flask serializes a returned dict to JSON automatically." },
            { q: "What does <int:n> in a route do?", options: ["Nothing", "Matches only numbers and passes an int", "Renames the route", "Sets a default"], answer: 1, explain: "The int converter validates and converts the URL segment." },
            { q: "How do you read ?name=Ada from the URL?", options: ["request.args.get(\"name\")", "request.name", "args[name]", "url.name"], answer: 0, explain: "Query-string values live in request.args." },
            { q: "How do you set a 404 status on a response?", options: ["return body, 404", "raise 404", "status(404)", "return 404only"], answer: 0, explain: "Return a (body, status_code) tuple, e.g. return data, 404." },
          ],
        },
      ],
    },

    /* ═══════════════ WEB · Django ═══════════════ */
    {
      id: "fw-django", name: "Django", icon: "fas fa-server", category: "Web",
      desc: "The batteries-included framework for database-backed web applications.",
      level: "Advanced",
      note: "Django runs as a full project with its own database, so these lessons teach the real code and patterns while the exercises drill the underlying Python logic. Build a project yourself with: pip install django && django-admin startproject site",
      lessons: [
        {
          id: "django-l01", kind: "lesson", title: "What is Django?",
          docs: [{ label: "Django at a glance", url: "https://docs.djangoproject.com/en/stable/intro/overview/" }],
          content: `
<div class="lc-eyebrow">Django · Lesson 1</div>
<h1>Batteries included</h1>
<p>Where Flask gives you the essentials, <b>Django</b> ships almost everything a
database-backed site needs: an ORM, an admin interface, authentication, forms,
and more. It favours convention over configuration.</p>
<p>Django uses the <b>MTV</b> pattern — Model, Template, View:</p>
<ul>
  <li><b>Model</b> — a Python class describing a database table.</li>
  <li><b>View</b> — a function/class that handles a request and returns a response.</li>
  <li><b>Template</b> — HTML with Django's template language.</li>
</ul>
<p>A new project has a recognisable shape:</p>
<pre><code>mysite/
  manage.py            # command-line tool
  mysite/
    settings.py        # configuration
    urls.py            # URL routing
  blog/                # an "app" inside the project
    models.py
    views.py
    urls.py
    templates/</code></pre>
<pre><code>pip install django
django-admin startproject mysite
python manage.py runserver</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
A Django <i>project</i> is the whole site; an <i>app</i> is a reusable feature
inside it (a blog, a shop, accounts). Projects contain many apps.</div></div>`,
          starter: `# Django runs as a full project, so explore the structure as data here.
project = {
    "manage.py": "CLI entry point",
    "settings.py": "configuration",
    "urls.py": "URL routing",
    "models.py": "database tables as classes",
}
for f, role in project.items():
    print(f"{f:14} -> {role}")`,
        },
        {
          id: "django-l02", kind: "lesson", title: "Models & the ORM",
          docs: [
            { label: "Models", url: "https://docs.djangoproject.com/en/stable/topics/db/models/" },
            { label: "Making queries", url: "https://docs.djangoproject.com/en/stable/topics/db/queries/" },
          ],
          content: `
<div class="lc-eyebrow">Django · Lesson 2</div>
<h1>Databases as Python classes</h1>
<p>A <b>model</b> is a class that subclasses <code>models.Model</code>. Each
attribute is a database column. Django's <b>ORM</b> then lets you query the
database in Python — no SQL required.</p>
<pre><code># blog/models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    published = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title</code></pre>
<h2>Querying with the ORM</h2>
<pre><code># Create
Post.objects.create(title="Hello", body="First post!")

# Read
Post.objects.all()                       # every row
Post.objects.filter(published=True)      # a filtered set
Post.objects.get(id=1)                   # a single row
Post.objects.filter(title__contains="Hi")
Post.objects.order_by("-created")[:5]    # newest five</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
After changing models you run <code>makemigrations</code> then <code>migrate</code>,
and Django updates the database schema for you.</div></div>`,
          starter: `# A tiny stand-in for what Post.objects.filter(...) does, in plain Python:
posts = [
    {"title": "Hello", "published": True},
    {"title": "Draft", "published": False},
    {"title": "News", "published": True},
]
published = [p for p in posts if p["published"]]
print("Published titles:", [p["title"] for p in published])`,
        },
        {
          id: "django-l03", kind: "lesson", title: "Views, URLs & templates",
          docs: [
            { label: "Writing views", url: "https://docs.djangoproject.com/en/stable/topics/http/views/" },
            { label: "URL dispatcher", url: "https://docs.djangoproject.com/en/stable/topics/http/urls/" },
          ],
          content: `
<div class="lc-eyebrow">Django · Lesson 3</div>
<h1>From request to page</h1>
<p>A <b>view</b> receives a request and returns a response. <b>URLconf</b> maps
paths to views. A <b>template</b> renders the HTML.</p>
<pre><code># blog/views.py
from django.shortcuts import render
from .models import Post

def post_list(request):
    posts = Post.objects.filter(published=True)
    return render(request, "blog/list.html", {"posts": posts})</code></pre>
<pre><code># blog/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.post_list, name="post_list"),
    path("post/&lt;int:pk&gt;/", views.post_detail, name="post_detail"),
]</code></pre>
<pre><code>&lt;!-- blog/templates/blog/list.html --&gt;
&lt;h1&gt;Blog&lt;/h1&gt;
{% for post in posts %}
  &lt;article&gt;&lt;h2&gt;{{ post.title }}&lt;/h2&gt;&lt;/article&gt;
{% endfor %}</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Notice the loop: <code>render(request, template, context)</code> hands your data
(the <code>context</code> dict) to the template, which loops over it.</div></div>`,
          starter: `# The view's job is to turn a request into a context dict for a template.
def post_list_view(all_posts):
    context = {"posts": [p for p in all_posts if p["published"]]}
    return context

posts = [
    {"title": "Hello", "published": True},
    {"title": "Draft", "published": False},
]
print(post_list_view(posts))`,
        },
        {
          id: "django-l04", kind: "lesson", title: "The admin & forms",
          docs: [
            { label: "The Django admin site", url: "https://docs.djangoproject.com/en/stable/ref/contrib/admin/" },
            { label: "Working with forms", url: "https://docs.djangoproject.com/en/stable/topics/forms/" },
          ],
          content: `
<div class="lc-eyebrow">Django · Lesson 4</div>
<h1>Django's superpowers</h1>
<h2>The automatic admin</h2>
<p>Register a model and Django generates a full management UI — list, search,
create, edit, delete — with no extra code.</p>
<pre><code># blog/admin.py
from django.contrib import admin
from .models import Post

admin.site.register(Post)
# visit /admin/ and manage your data in a polished interface</code></pre>
<h2>Forms</h2>
<p>A <code>ModelForm</code> builds an HTML form and validation straight from a
model.</p>
<pre><code># blog/forms.py
from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["title", "body", "published"]</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
The auto-generated admin is one of Django's most loved features — you get a working
back-office for your data in minutes.</div></div>`,
          starter: `# Form validation in spirit: required fields must be present and non-empty.
def validate_post(data, required=("title", "body")):
    missing = [f for f in required if not data.get(f)]
    return {"valid": not missing, "missing": missing}

print(validate_post({"title": "Hi", "body": "Hello"}))
print(validate_post({"title": "Hi"}))`,
        },
        {
          id: "django-l05", kind: "exercise", title: "Exercise: A queryset filter",
          content: `
<div class="lc-eyebrow">Django · Exercise</div>
<h1>Model the ORM in plain Python</h1>
<p>Django's <code>Post.objects.filter(published=True)</code> returns matching rows.
Build the same idea yourself.</p>
<h3>Your task</h3>
<p>Write <code>published_titles(posts)</code> that takes a list of post dicts and
returns a list of the <code>title</code>s where <code>published</code> is
<code>True</code>, in the original order.</p>`,
          starter: `def published_titles(posts):
    # return the titles of published posts
    pass

sample = [
    {"title": "Hello", "published": True},
    {"title": "Draft", "published": False},
    {"title": "News", "published": True},
]
print(published_titles(sample))   # ['Hello', 'News']`,
          tests: [
            { name: "returns only published titles", code: `sample = [{"title":"Hello","published":True},{"title":"Draft","published":False},{"title":"News","published":True}]\nassert published_titles(sample) == ["Hello", "News"], "Return titles where published is True"` },
            { name: "keeps original order", code: `data = [{"title":"C","published":True},{"title":"A","published":True},{"title":"B","published":False}]\nassert published_titles(data) == ["C", "A"], "Preserve the original order"` },
            { name: "empty when none published", code: `assert published_titles([{"title":"X","published":False}]) == [], "No published posts -> empty list"` },
          ],
        },
        {
          id: "django-quiz", kind: "quiz", title: "Django Check",
          intro: "Projects, models, views, and the ORM.",
          questions: [
            { q: "What does Django's MTV stand for?", options: ["Make-Test-Verify", "Model-Template-View", "Model-Transfer-View", "Module-Type-Value"], answer: 1, explain: "Model (data), Template (HTML), View (request handling)." },
            { q: "A Django model class represents…", options: ["A web page", "A database table", "A URL", "A CSS file"], answer: 1, explain: "Each model maps to a database table; attributes are columns." },
            { q: "How do you get all published posts with the ORM?", options: ["Post.all(published)", "Post.objects.filter(published=True)", "SELECT * FROM post", "Post.where(True)"], answer: 1, explain: "The ORM's .filter() returns matching rows as a queryset." },
            { q: "What maps a URL path to a view?", options: ["models.py", "settings.py", "urls.py (urlpatterns)", "admin.py"], answer: 2, explain: "URLconf in urls.py connects paths to views." },
            { q: "What is the difference between a project and an app?", options: ["They're the same", "A project is the whole site; an app is a feature within it", "An app is bigger", "A project has no code"], answer: 1, explain: "A project contains one or more reusable apps." },
            { q: "What generates a management UI for your models?", options: ["The Django admin", "manage.py runserver", "A template", "The ORM"], answer: 0, explain: "Register a model in admin.py to get the auto admin." },
          ],
        },
      ],
    },

    /* ═══════════════ APIs · FastAPI ═══════════════ */
    {
      id: "fw-fastapi", name: "FastAPI", icon: "fas fa-bolt", category: "APIs",
      desc: "Modern, fast APIs with automatic docs and type-driven validation.",
      level: "Intermediate",
      note: "Pydantic runs for real in your browser; a live API server can't, so we run the handler functions and Pydantic models directly — exactly the logic your API uses.",
      lessons: [
        {
          id: "fastapi-l01", kind: "lesson", title: "Your first API",
          docs: [{ label: "FastAPI — First steps", url: "https://fastapi.tiangolo.com/tutorial/first-steps/" }],
          content: `
<div class="lc-eyebrow">FastAPI · Lesson 1</div>
<h1>An API in a dozen lines</h1>
<p>FastAPI maps URLs to Python functions. You decorate a function with the HTTP
method and path; whatever it returns becomes JSON.</p>
<pre><code># main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello, API"}

@app.get("/health")
def health():
    return {"ok": True}</code></pre>
<p>Run it with an ASGI server and FastAPI gives you interactive docs for free at
<code>/docs</code>:</p>
<pre><code>pip install fastapi uvicorn
uvicorn main:app --reload</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
A handler is just a normal function returning a dict. Below, we define an app and
call the handler directly — no server needed to see what it returns.</div></div>`,
          starter: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello, API"}

# A handler is an ordinary function — call it to see its JSON body:
print(home())`,
        },
        {
          id: "fastapi-l02", kind: "lesson", title: "Path & query parameters",
          docs: [{ label: "Path & query parameters", url: "https://fastapi.tiangolo.com/tutorial/path-params/" }],
          content: `
<div class="lc-eyebrow">FastAPI · Lesson 2</div>
<h1>Reading input from the URL</h1>
<p>Type-hinted function parameters become request inputs. A name in the path is a
<b>path parameter</b>; extra ones become <b>query parameters</b>, and FastAPI
converts and validates them using your type hints.</p>
<pre><code>from fastapi import FastAPI
app = FastAPI()

@app.get("/items/{item_id}")
def get_item(item_id: int, q: str = ""):
    return {"item_id": item_id, "q": q}
# GET /items/42?q=shoes  ->  {"item_id": 42, "q": "shoes"}</code></pre>
<p>Because <code>item_id</code> is typed <code>int</code>, FastAPI rejects
<code>/items/abc</code> with a clear validation error automatically.</p>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Your type hints from Module 10 do real work here: they drive parsing, validation,
and the auto-generated documentation.</div></div>`,
          starter: `from fastapi import FastAPI
app = FastAPI()

@app.get("/items/{item_id}")
def get_item(item_id: int, q: str = ""):
    return {"item_id": item_id, "q": q}

# Call the handler directly with different inputs:
print(get_item(42, "shoes"))
print(get_item(7))`,
        },
        {
          id: "fastapi-l03", kind: "lesson", title: "Pydantic models & validation",
          docs: [
            { label: "Request Body", url: "https://fastapi.tiangolo.com/tutorial/body/" },
            { label: "Pydantic models", url: "https://docs.pydantic.dev/latest/concepts/models/" },
          ],
          content: `
<div class="lc-eyebrow">FastAPI · Lesson 3</div>
<h1>Request bodies with Pydantic</h1>
<p>For data sent in the request body, FastAPI uses <b>Pydantic models</b> —
classes that declare fields with types. Pydantic validates and converts incoming
data, raising a clear error if it's wrong.</p>
<pre><code>from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    in_stock: bool = True

# Pydantic parses and coerces:
item = Item(name="Pen", price="2.5")   # "2.5" -> 2.5
print(item.price)        # 2.5  (a float)
print(item.model_dump()) # {'name': 'Pen', 'price': 2.5, 'in_stock': True}</code></pre>
<p>In a FastAPI route you just annotate the parameter with the model:</p>
<pre><code>@app.post("/items")
def create(item: Item):
    return {"created": item.name}</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Bad input — like a non-numeric price — raises a <code>ValidationError</code>, so
your handler only ever sees clean, typed data.</div></div>`,
          starter: `from pydantic import BaseModel, ValidationError

class Item(BaseModel):
    name: str
    price: float
    in_stock: bool = True

print(Item(name="Pen", price="2.5"))     # price coerced to float
try:
    Item(name="Bad", price="not a number")
except ValidationError as e:
    print("Rejected:", e.error_count(), "error(s)")`,
        },
        {
          id: "fastapi-l04", kind: "exercise", title: "Exercise: A Pydantic model",
          content: `
<div class="lc-eyebrow">FastAPI · Exercise</div>
<h1>Model a user</h1>
<h3>Your task</h3>
<p>Define a Pydantic model <code>User</code> with:</p>
<ul>
  <li><code>name</code> — a <code>str</code></li>
  <li><code>age</code> — an <code>int</code></li>
  <li><code>active</code> — a <code>bool</code> defaulting to <code>True</code></li>
</ul>`,
          starter: `from pydantic import BaseModel

class User(BaseModel):
    pass   # declare name, age, and active

print(User(name="Ada", age=36))`,
          tests: [
            { name: "fields parse correctly", code: `u = User(name="Ada", age=36)\nassert u.name == "Ada" and u.age == 36, "name and age should be stored"` },
            { name: "active defaults to True", code: `assert User(name="x", age=1).active is True, "active should default to True"` },
            { name: "age is coerced to int", code: `assert User(name="x", age="25").age == 25, "Pydantic should coerce '25' to 25"` },
            { name: "bad age is rejected", code: `from pydantic import ValidationError\ntry:\n    User(name="x", age="abc"); raised = False\nexcept ValidationError:\n    raised = True\nassert raised, "A non-numeric age should raise ValidationError"` },
          ],
        },
        {
          id: "fastapi-l05", kind: "exercise", title: "Exercise: A handler function",
          content: `
<div class="lc-eyebrow">FastAPI · Exercise</div>
<h1>Build a JSON response</h1>
<h3>Your task</h3>
<p>Write a handler function <code>list_items(items)</code> that returns a dict
shaped like an API response:</p>
<ul>
  <li><code>"count"</code> — how many items there are</li>
  <li><code>"items"</code> — the list itself</li>
</ul>
<p>Example: <code>list_items(["a", "b"])</code> →
<code>{"count": 2, "items": ["a", "b"]}</code>.</p>`,
          starter: `def list_items(items):
    # return {"count": ..., "items": ...}
    pass

print(list_items(["pen", "book", "bag"]))`,
          tests: [
            { name: "returns count and items", code: `assert list_items(["a","b"]) == {"count": 2, "items": ["a","b"]}, "Shape should be {'count': N, 'items': [...]}"` },
            { name: "empty list works", code: `assert list_items([]) == {"count": 0, "items": []}, "Empty input should give count 0"` },
            { name: "count matches length", code: `r = list_items([1,2,3,4]); assert r["count"] == 4 and r["items"] == [1,2,3,4], "count must match the items length"` },
          ],
        },
        {
          id: "fastapi-quiz", kind: "quiz", title: "FastAPI Check",
          intro: "Routes, parameters, and Pydantic.",
          questions: [
            { q: "What does a FastAPI handler return to send JSON?", options: ["A string of HTML", "A dict (or Pydantic model)", "Nothing", "A file"], answer: 1, explain: "Return a dict/model and FastAPI serializes it to JSON." },
            { q: "What declares a request body's shape?", options: ["A dict literal", "A Pydantic BaseModel", "A FastAPI route", "A type alias"], answer: 1, explain: "Pydantic models declare and validate body fields." },
            { q: "In `def get(item_id: int)`, what does the hint do?", options: ["Nothing", "Parses and validates the value as an int", "Renames it", "Makes it optional"], answer: 1, explain: "FastAPI uses the hint to convert and validate the input." },
            { q: "What happens on invalid input to a typed parameter?", options: ["It crashes silently", "FastAPI returns a validation error automatically", "It becomes None", "It's ignored"], answer: 1, explain: "FastAPI/Pydantic reject it with a structured error." },
          ],
        },
      ],
    },

    /* ═══════════════ WEB · Requests ═══════════════ */
    {
      id: "fw-requests", name: "Requests", icon: "fas fa-globe", category: "APIs",
      desc: "Talk to web APIs and download data over HTTP, elegantly.",
      level: "Beginner",
      note: "Browsers can't make raw HTTP calls, so these lessons run against a built-in offline mock of requests — the same code you'd write, with deterministic responses.",
      lessons: [
        {
          id: "requests-l01", kind: "lesson", title: "Making a request",
          docs: [{ label: "Requests — Quickstart", url: "https://requests.readthedocs.io/en/latest/user/quickstart/" }],
          content: `
<div class="lc-eyebrow">Requests · Lesson 1</div>
<h1>HTTP made friendly</h1>
<p>The <code>requests</code> library fetches data from the web in one line. A
<code>GET</code> retrieves; the <b>response</b> has a status code and a body you
can read as text or JSON.</p>
<pre><code>import requests

r = requests.get("https://api.github.com")
print(r.status_code)     # 200 means OK
print(r.headers["content-type"])
data = r.json()          # parse a JSON body into a dict
print(data["current_user_url"])</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Always check <code>r.status_code</code> (or call <code>r.raise_for_status()</code>)
before trusting the body — the request may have failed.</div></div>`,
          starter: `import requests

try:
    r = requests.get("https://httpbin.org/json", timeout=6)
    print("Status:", r.status_code)
    print("Keys:", list(r.json().keys()))
except Exception as e:
    print("Network not available here:", type(e).__name__)
    print("That's fine — the next lessons work offline.")`,
        },
        {
          id: "requests-l02", kind: "lesson", title: "Params, headers & POST",
          docs: [{ label: "POST requests & params", url: "https://requests.readthedocs.io/en/latest/user/quickstart/#more-complicated-post-requests" }],
          content: `
<div class="lc-eyebrow">Requests · Lesson 2</div>
<h1>Sending data with your request</h1>
<h2>Query parameters</h2>
<p>Pass a dict as <code>params</code> and requests builds the <code>?a=1&b=2</code>
string for you.</p>
<pre><code>import requests
r = requests.get("https://httpbin.org/get",
                 params={"q": "python", "page": 2})
# requests sends:  /get?q=python&page=2</code></pre>
<h2>Headers and POST</h2>
<pre><code>r = requests.post(
    "https://httpbin.org/post",
    json={"name": "Ada", "role": "engineer"},   # JSON body
    headers={"Authorization": "Bearer TOKEN"},
)
print(r.status_code)
print(r.json()["json"])     # the body the server received</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Use <code>json=</code> to send a JSON body (it sets the right header
automatically). Use <code>data=</code> for form-encoded values.</div></div>`,
          starter: `from urllib.parse import urlencode

# requests builds query strings like this under the hood:
params = {"q": "python", "page": 2, "sort": "best"}
print("Query string:", urlencode(params))

# A typical response body, already parsed to a dict:
response = {"status": "ok", "results": [1, 2, 3]}
print("Result count:", len(response["results"]))`,
        },
        {
          id: "requests-l03", kind: "exercise", title: "Exercise: Read a response",
          content: `
<div class="lc-eyebrow">Requests · Exercise</div>
<h1>Process JSON from an API</h1>
<p>APIs return JSON that you parse into Python dicts and lists. Here's a typical
payload — work with it as you would <code>r.json()</code>.</p>
<h3>Your task</h3>
<ul>
  <li>From <code>payload</code>, build <code>titles_by_score</code>: a list of the
      article <code>title</code>s, sorted by <code>score</code> from highest to
      lowest.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>sorted(items, key=..., reverse=True)</code> sorts descending. The key is each
article's score.</div></div>`,
          starter: `payload = {
    "articles": [
        {"title": "Async Python", "score": 7},
        {"title": "Type Hints", "score": 12},
        {"title": "Pattern Matching", "score": 9},
    ]
}

titles_by_score = []
# sort the titles by score, highest first

print(titles_by_score)`,
          tests: [
            { name: "titles sorted by score (desc)", code: `assert titles_by_score == ["Type Hints", "Pattern Matching", "Async Python"], f"Got {titles_by_score}"` },
            { name: "it's a list of titles", code: `assert all(isinstance(t, str) for t in titles_by_score) and len(titles_by_score) == 3, "Should be the 3 title strings"` },
          ],
        },
        {
          id: "requests-l04", kind: "exercise", title: "Exercise: Build a query string",
          content: `
<div class="lc-eyebrow">Requests · Exercise</div>
<h1>Turn params into a query string</h1>
<h3>Your task</h3>
<p>Using <code>urllib.parse.urlencode</code>, turn the <code>params</code> dict
into a URL query string and store it in <code>query</code>.</p>
<p>For the given params the result should be
<code>"q=python&amp;page=2&amp;sort=best"</code>.</p>`,
          starter: `from urllib.parse import urlencode

params = {"q": "python", "page": 2, "sort": "best"}

query = ""
# build the query string from params

print(query)`,
          tests: [
            { name: "query string is correct", code: `assert query == "q=python&page=2&sort=best", f"Got {query!r}"` },
          ],
        },
        {
          id: "requests-quiz", kind: "quiz", title: "Requests Check",
          intro: "HTTP basics with requests.",
          questions: [
            { q: "Which status code means success?", options: ["404", "500", "200", "302"], answer: 2, explain: "200 OK means the request succeeded; 404 is not found, 500 a server error." },
            { q: "How do you parse a JSON response body?", options: ["r.text", "r.json()", "r.parse()", "json(r)"], answer: 1, explain: "r.json() decodes the JSON body into Python objects." },
            { q: "How do you add query parameters to a GET?", options: ["params=dict", "query=dict", "args=dict", "url+dict"], answer: 0, explain: "Pass params={...} and requests builds the ?a=1&b=2 string." },
            { q: "What sends a JSON request body in a POST?", options: ["data=", "body=", "json=", "files="], answer: 2, explain: "json={...} serializes the body and sets the JSON content-type." },
          ],
        },
      ],
    },

    /* ═══════════════ TOOLING · pytest ═══════════════ */
    {
      id: "fw-pytest", name: "pytest", icon: "fas fa-vial", category: "Tooling",
      desc: "Write tests that give you confidence to change your code.",
      level: "Intermediate",
      note: "pytest runs from a terminal, so we teach its style and grade with the same assert checks it uses. Install it to run pytest yourself: pip install pytest",
      lessons: [
        {
          id: "pytest-l01", kind: "lesson", title: "Why test? assert basics",
          docs: [{ label: "pytest — Using assert", url: "https://docs.pytest.org/en/stable/how-to/assert.html" }],
          content: `
<div class="lc-eyebrow">pytest · Lesson 1</div>
<h1>Tests catch your mistakes</h1>
<p>A test is code that checks other code. The atom of testing is
<code>assert</code>: it does nothing if the condition is true, and raises an
<code>AssertionError</code> if it's false.</p>
<pre><code>def add(a, b):
    return a + b

assert add(2, 3) == 5
assert add(-1, 1) == 0
print("All assertions passed!")</code></pre>
<p>If a function is wrong, the matching assert fails loudly instead of letting the
bug hide:</p>
<pre><code>def broken(a, b):
    return a - b        # oops

assert broken(2, 3) == 5   # AssertionError!</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Pythoneer's exercise checker is built on exactly this idea — each check you've
passed has been an <code>assert</code> against your code.</div></div>`,
          starter: `def to_celsius(f):
    return (f - 32) * 5 / 9

assert to_celsius(32) == 0
assert to_celsius(212) == 100
assert round(to_celsius(98.6), 1) == 37.0
print("to_celsius passes all assertions")`,
        },
        {
          id: "pytest-l02", kind: "lesson", title: "Test functions & running pytest",
          docs: [{ label: "pytest — Get started", url: "https://docs.pytest.org/en/stable/getting-started.html" }],
          content: `
<div class="lc-eyebrow">pytest · Lesson 2</div>
<h1>Organising tests</h1>
<p>pytest discovers functions whose names start with <code>test_</code> and runs
each one, reporting which passed. You put assertions inside them.</p>
<pre><code># test_math.py
from mymath import add

def test_add_positives():
    assert add(2, 3) == 5

def test_add_negatives():
    assert add(-2, -3) == -5

def test_add_zero():
    assert add(0, 0) == 0</code></pre>
<p>Run every test with one command:</p>
<pre><code>pip install pytest
pytest                 # finds and runs all test_*.py files
# ===== 3 passed in 0.01s =====</code></pre>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Small, well-named tests double as documentation: <code>test_add_negatives</code>
tells the next reader exactly what behaviour you rely on.</div></div>`,
          starter: `def is_even(n):
    return n % 2 == 0

# pytest would run these automatically; here we call them ourselves:
def test_even():
    assert is_even(4)

def test_odd():
    assert not is_even(7)

test_even()
test_odd()
print("2 passed")`,
        },
        {
          id: "pytest-l03", kind: "exercise", title: "Exercise: Implement & it gets tested",
          content: `
<div class="lc-eyebrow">pytest · Exercise</div>
<h1>Make the tests pass</h1>
<p>This is test-driven: the checks are written, your job is the code.</p>
<h3>Your task</h3>
<p>Implement <code>is_prime(n)</code> returning <code>True</code> when <code>n</code>
is a prime number (greater than 1, divisible only by 1 and itself).</p>`,
          starter: `def is_prime(n):
    # return True if n is prime, else False
    pass

print(is_prime(7))   # True
print(is_prime(8))   # False`,
          tests: [
            { name: "7 is prime", code: `assert is_prime(7) is True, "7 should be prime"` },
            { name: "8 is not prime", code: `assert is_prime(8) is False, "8 should not be prime"` },
            { name: "1 and 0 are not prime", code: `assert is_prime(1) is False and is_prime(0) is False, "0 and 1 are not prime"` },
            { name: "2 is prime", code: `assert is_prime(2) is True, "2 is the smallest prime"` },
            { name: "13 is prime, 15 is not", code: `assert is_prime(13) is True and is_prime(15) is False, "Check 13 (prime) and 15 (=3x5)"` },
          ],
        },
        {
          id: "pytest-l04", kind: "exercise", title: "Exercise: Write the tests",
          content: `
<div class="lc-eyebrow">pytest · Exercise</div>
<h1>Now you write the tests</h1>
<p>A function <code>reverse_words(sentence)</code> is provided — it reverses the
order of the words. Write at least <b>three</b> <code>assert</code> statements
that verify it, then set <code>tests_written</code> to how many you wrote.</p>`,
          starter: `def reverse_words(sentence):
    return " ".join(reversed(sentence.split()))

# Write at least 3 asserts about reverse_words, e.g.:
# assert reverse_words("a b c") == "c b a"

tests_written = 0   # how many asserts did you write?`,
          tests: [
            { name: "reverse_words behaves correctly", code: `assert reverse_words("hello world") == "world hello" and reverse_words("a b c") == "c b a", "It reverses word order"` },
            { name: "you wrote at least 3 asserts", code: `assert isinstance(tests_written, int) and tests_written >= 3, "Write 3+ asserts and set tests_written to that number"` },
          ],
        },
        {
          id: "pytest-quiz", kind: "quiz", title: "pytest Check",
          intro: "Assertions and the pytest workflow.",
          questions: [
            { q: "What does `assert x == 5` do when x is 3?", options: ["Prints 5", "Passes quietly", "Raises AssertionError", "Sets x to 5"], answer: 2, explain: "A false assert raises AssertionError — that's a failing test." },
            { q: "pytest automatically runs functions named…", options: ["check_*", "test_*", "main_*", "run_*"], answer: 1, explain: "pytest discovers test_* functions in test_*.py files." },
            { q: "Why write tests at all?", options: ["To slow development down", "To catch regressions and document behaviour", "Because Python requires it", "To make files bigger"], answer: 1, explain: "Tests catch breakages early and describe expected behaviour." },
            { q: "Which command runs your whole test suite?", options: ["python test", "pytest", "run tests", "assert all"], answer: 1, explain: "Just run `pytest` from your project root." },
          ],
        },
      ],
    },
  ],


  /* ═══════════════════════ CAPSTONE PROJECTS ═══════════════════════
     Multi-step guided builds. Each step carries the previous steps'
     solved code forward in its starter, so you build one real program
     across the project. Steps reuse the lesson/exercise schema.
     ═════════════════════════════════════════════════════════════════ */
  projects: [
    /* ───────── Project 1 · To-Do List Manager ───────── */
    {
      id: "proj-todo", title: "To-Do List Manager", icon: "fas fa-list-check",
      level: "Beginner", tagline: "Build a task manager from scratch",
      desc: "Combine lists, dictionaries, functions, and JSON files into a working to-do app — one function at a time.",
      skills: ["Lists", "Dictionaries", "Functions", "JSON files"],
      intro: "You'll build a small to-do manager step by step. Each task is a dictionary like <code>{\"title\": \"Buy milk\", \"done\": False}</code>, and the whole list lives in a Python list. By the end you'll be able to add tasks, complete them, list what's pending, and save everything to a file.",
      steps: [
        {
          id: "todo-s1", kind: "lesson", title: "The plan & data shape",
          content: `
<div class="lc-eyebrow">Project · To-Do List · Step 1</div>
<h1>How we'll model a task</h1>
<p>Before writing functions, decide on the data. We'll represent each task as a
small dictionary and keep all tasks in a list:</p>
<pre><code>tasks = [
    {"title": "Write report", "done": False},
    {"title": "Email Sam",    "done": True},
]</code></pre>
<p>Over the next steps you'll write functions that operate on that list:
<code>add_task</code>, <code>complete_task</code>, <code>pending_titles</code>,
then <code>save</code>/<code>load</code>, and finally tie it together.</p>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Run the example to see the shape. There's nothing to check on this step — press
<b>Next</b> when you're ready.</div></div>`,
          starter: `tasks = [
    {"title": "Write report", "done": False},
    {"title": "Email Sam", "done": True},
]
for t in tasks:
    mark = "[x]" if t["done"] else "[ ]"
    print(f"{mark} {t['title']}")`,
        },
        {
          id: "todo-s2", kind: "exercise", title: "Add a task",
          content: `
<div class="lc-eyebrow">Project · To-Do List · Step 2</div>
<h1>add_task</h1>
<h3>Your task</h3>
<p>Write <code>add_task(tasks, title)</code> that appends a new task dictionary
(<code>done</code> starts as <code>False</code>) to <code>tasks</code> and returns
the list.</p>`,
          starter: `def add_task(tasks, title):
    # append {"title": title, "done": False} and return tasks
    pass

print(add_task([], "Buy milk"))`,
          tests: [
            { name: "adds a task to an empty list", code: `assert add_task([], "Buy milk") == [{"title": "Buy milk", "done": False}], "New task should have done=False"` },
            { name: "appends to an existing list", code: `t = [{"title": "A", "done": True}]\nadd_task(t, "B")\nassert len(t) == 2 and t[1] == {"title": "B", "done": False}, "Append, don't replace"` },
            { name: "returns the list", code: `assert add_task([], "X") is not None, "Return the tasks list"` },
          ],
        },
        {
          id: "todo-s3", kind: "exercise", title: "Complete a task",
          content: `
<div class="lc-eyebrow">Project · To-Do List · Step 3</div>
<h1>complete_task</h1>
<p>Your <code>add_task</code> is included below. Now mark tasks done.</p>
<h3>Your task</h3>
<p>Write <code>complete_task(tasks, title)</code> that sets <code>done</code> to
<code>True</code> for the first task whose title matches, then returns the list.
If no task matches, leave the list unchanged.</p>`,
          starter: `def add_task(tasks, title):
    tasks.append({"title": title, "done": False})
    return tasks

def complete_task(tasks, title):
    # mark the matching task done=True, then return tasks
    pass

todo = []
add_task(todo, "Write report")
add_task(todo, "Email Sam")
complete_task(todo, "Write report")
print(todo)`,
          tests: [
            { name: "marks the matching task done", code: `t = [{"title": "A", "done": False}, {"title": "B", "done": False}]\ncomplete_task(t, "A")\nassert t[0]["done"] is True, "Task A should be done"` },
            { name: "leaves other tasks untouched", code: `t = [{"title": "A", "done": False}, {"title": "B", "done": False}]\ncomplete_task(t, "A")\nassert t[1]["done"] is False, "Only the matching task changes"` },
            { name: "unknown title changes nothing", code: `t = [{"title": "A", "done": False}]\ncomplete_task(t, "Z")\nassert t[0]["done"] is False, "No match -> no change"` },
          ],
        },
        {
          id: "todo-s4", kind: "exercise", title: "List what's pending",
          content: `
<div class="lc-eyebrow">Project · To-Do List · Step 4</div>
<h1>pending_titles</h1>
<h3>Your task</h3>
<p>Write <code>pending_titles(tasks)</code> that returns a list of the
<code>title</code>s of tasks that are <b>not</b> done, in order.</p>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
A list comprehension is perfect here:
<code>[t["title"] for t in tasks if not t["done"]]</code>.</div></div>`,
          starter: `def add_task(tasks, title):
    tasks.append({"title": title, "done": False})
    return tasks

def complete_task(tasks, title):
    for t in tasks:
        if t["title"] == title:
            t["done"] = True
            break
    return tasks

def pending_titles(tasks):
    # return the titles of tasks where done is False
    pass

todo = []
add_task(todo, "Write report")
add_task(todo, "Email Sam")
complete_task(todo, "Write report")
print(pending_titles(todo))   # ['Email Sam']`,
          tests: [
            { name: "returns only pending titles", code: `t = [{"title": "A", "done": True}, {"title": "B", "done": False}, {"title": "C", "done": False}]\nassert pending_titles(t) == ["B", "C"], "Only not-done titles"` },
            { name: "empty when all done", code: `assert pending_titles([{"title": "A", "done": True}]) == [], "All done -> empty list"` },
          ],
        },
        {
          id: "todo-s5", kind: "exercise", title: "Save & load with JSON",
          content: `
<div class="lc-eyebrow">Project · To-Do List · Step 5</div>
<h1>Persist to a file</h1>
<p>So your list survives between runs, save it as JSON and load it back.</p>
<h3>Your task</h3>
<ul>
  <li><code>save_tasks(tasks, path)</code> — write <code>tasks</code> to
      <code>path</code> as JSON.</li>
  <li><code>load_tasks(path)</code> — read and return the tasks from that file.</li>
</ul>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
Use <code>json.dump(tasks, f)</code> to write and <code>json.load(f)</code> to read,
each inside a <code>with open(...)</code> block.</div></div>`,
          starter: `import json

def save_tasks(tasks, path):
    # write tasks to path as JSON
    pass

def load_tasks(path):
    # read and return tasks from the JSON file at path
    pass

data = [{"title": "Ship it", "done": False}]
save_tasks(data, "tasks.json")
print(load_tasks("tasks.json"))`,
          tests: [
            { name: "save then load round-trips", code: `data = [{"title": "Ship it", "done": False}, {"title": "Rest", "done": True}]\nsave_tasks(data, "t.json")\nassert load_tasks("t.json") == data, "Loaded tasks should equal what you saved"` },
            { name: "writes a real JSON file", code: `from pathlib import Path\nimport json\nsave_tasks([{"title": "A", "done": False}], "check.json")\nassert json.loads(Path("check.json").read_text()) == [{"title": "A", "done": False}], "File should contain the JSON"` },
          ],
        },
        {
          id: "todo-s6", kind: "exercise", title: "Tie it together",
          content: `
<div class="lc-eyebrow">Project · To-Do List · Step 6 · Capstone</div>
<h1>The finished manager</h1>
<p>All your functions are below. Add one more for a summary line.</p>
<h3>Your task</h3>
<p>Write <code>summary(tasks)</code> that returns a string like
<code>"2 done, 1 pending"</code> using the counts of done and not-done tasks.</p>
<div class="callout"><i class="fas fa-trophy"></i><div>
Pass this and you've built a complete, persistent to-do app from scratch — nice
work!</div></div>`,
          starter: `def add_task(tasks, title):
    tasks.append({"title": title, "done": False})
    return tasks

def complete_task(tasks, title):
    for t in tasks:
        if t["title"] == title:
            t["done"] = True
            break
    return tasks

def pending_titles(tasks):
    return [t["title"] for t in tasks if not t["done"]]

def summary(tasks):
    # return "<done> done, <pending> pending"
    pass

todo = []
add_task(todo, "Write report")
add_task(todo, "Email Sam")
add_task(todo, "Book flights")
complete_task(todo, "Write report")
print("Pending:", pending_titles(todo))
print(summary(todo))`,
          tests: [
            { name: "summary counts correctly", code: `t = [{"title":"A","done":True},{"title":"B","done":False},{"title":"C","done":False}]\nassert summary(t) == "1 done, 2 pending", f"Got {summary(t)!r}"` },
            { name: "all done reads naturally", code: `assert summary([{"title":"A","done":True}]) == "1 done, 0 pending", "Count done and pending"` },
            { name: "empty list", code: `assert summary([]) == "0 done, 0 pending", "Empty list -> 0 done, 0 pending"` },
          ],
        },
      ],
    },

    /* ───────── Project 2 · Number Guessing Game ───────── */
    {
      id: "proj-guess", title: "Number Guessing Game", icon: "fas fa-dice",
      level: "Beginner", tagline: "Build a playable guessing game",
      desc: "Use conditionals, loops, functions, and random to build a game you can actually play at the end.",
      skills: ["Conditionals", "Loops", "Functions", "random", "input()"],
      intro: "You'll build the logic of a guessing game in testable pieces — comparing a guess, counting attempts, summarising a play — then assemble a version you can play right in the editor.",
      steps: [
        {
          id: "guess-s1", kind: "lesson", title: "The idea",
          content: `
<div class="lc-eyebrow">Project · Guessing Game · Step 1</div>
<h1>What we're building</h1>
<p>A classic game: the computer picks a secret number, you guess, and it tells you
"too high" or "too low" until you get it. We'll build the logic as small functions
so each piece is easy to test, then play it for real at the end.</p>
<pre><code>secret = 7
guess = 4
# we want: "too low"  (4 is below 7)</code></pre>
<div class="callout"><i class="fas fa-circle-info"></i><div>
Building the testable pieces first, then assembling them, is exactly how real
programs come together. Press <b>Next</b> to start.</div></div>`,
          starter: `secret = 7
for guess in [3, 9, 7]:
    if guess == secret:
        print(f"{guess}: correct!")
    elif guess > secret:
        print(f"{guess}: too high")
    else:
        print(f"{guess}: too low")`,
        },
        {
          id: "guess-s2", kind: "exercise", title: "Evaluate a guess",
          content: `
<div class="lc-eyebrow">Project · Guessing Game · Step 2</div>
<h1>evaluate_guess</h1>
<h3>Your task</h3>
<p>Write <code>evaluate_guess(secret, guess)</code> returning one of three strings:
<code>"correct"</code>, <code>"too high"</code>, or <code>"too low"</code>.</p>`,
          starter: `def evaluate_guess(secret, guess):
    # return "correct", "too high", or "too low"
    pass

print(evaluate_guess(7, 4))   # too low
print(evaluate_guess(7, 7))   # correct`,
          tests: [
            { name: "correct guess", code: `assert evaluate_guess(7, 7) == "correct", "Equal values are correct"` },
            { name: "too high", code: `assert evaluate_guess(7, 9) == "too high", "9 > 7 is too high"` },
            { name: "too low", code: `assert evaluate_guess(7, 2) == "too low", "2 < 7 is too low"` },
          ],
        },
        {
          id: "guess-s3", kind: "exercise", title: "Count the attempts",
          content: `
<div class="lc-eyebrow">Project · Guessing Game · Step 3</div>
<h1>count_attempts</h1>
<h3>Your task</h3>
<p>Write <code>count_attempts(secret, guesses)</code> that takes a list of guesses
and returns the <b>1-based position</b> of the first correct guess. If the secret
never appears, return the total number of guesses.</p>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
<code>enumerate(guesses, 1)</code> gives you (position, guess) pairs starting at 1.</div></div>`,
          starter: `def count_attempts(secret, guesses):
    # return the 1-based attempt of the first correct guess,
    # or len(guesses) if never correct
    pass

print(count_attempts(7, [3, 5, 7]))   # 3
print(count_attempts(7, [1, 2]))      # 2 (never found)`,
          tests: [
            { name: "found on first try", code: `assert count_attempts(7, [7, 9]) == 1, "Correct on attempt 1"` },
            { name: "found later", code: `assert count_attempts(7, [3, 5, 7]) == 3, "Correct on attempt 3"` },
            { name: "never found returns count", code: `assert count_attempts(7, [1, 2]) == 2, "Never found -> number of guesses"` },
          ],
        },
        {
          id: "guess-s4", kind: "exercise", title: "Summarise a game",
          content: `
<div class="lc-eyebrow">Project · Guessing Game · Step 4</div>
<h1>play_game</h1>
<p>Your earlier functions are included. Now report the outcome.</p>
<h3>Your task</h3>
<p>Write <code>play_game(secret, guesses)</code> that returns a dict
<code>{"won": bool, "attempts": int}</code> — <code>won</code> is True if the secret
is among the guesses, and <code>attempts</code> is the 1-based winning attempt (or
the number of guesses if it was never found).</p>`,
          starter: `def evaluate_guess(secret, guess):
    if guess == secret:
        return "correct"
    return "too high" if guess > secret else "too low"

def count_attempts(secret, guesses):
    for i, g in enumerate(guesses, 1):
        if g == secret:
            return i
    return len(guesses)

def play_game(secret, guesses):
    # return {"won": ..., "attempts": ...}
    pass

print(play_game(7, [3, 7, 9]))   # {'won': True, 'attempts': 2}
print(play_game(7, [1, 2]))      # {'won': False, 'attempts': 2}`,
          tests: [
            { name: "winning game", code: `assert play_game(7, [3, 7, 9]) == {"won": True, "attempts": 2}, "Won on attempt 2"` },
            { name: "losing game", code: `assert play_game(7, [1, 2]) == {"won": False, "attempts": 2}, "Not found in 2 guesses"` },
            { name: "win on first guess", code: `assert play_game(5, [5]) == {"won": True, "attempts": 1}, "Won immediately"` },
          ],
        },
        {
          id: "guess-s5", kind: "lesson", title: "Play it!",
          content: `
<div class="lc-eyebrow">Project · Guessing Game · Step 5 · Capstone</div>
<h1>A game you can play</h1>
<p>Here's the finished, interactive game built from your functions. Type your
guesses in the <b>Input</b> box (one per line) and press <b>Run</b>. The starter
already has three guesses queued — try changing them, or change the secret.</p>
<div class="callout"><i class="fas fa-gamepad"></i><div>
In a real program the secret would come from <code>random.randint(1, 10)</code> —
swap it in and play with a friend feeding the input!</div></div>`,
          starter: `def evaluate_guess(secret, guess):
    if guess == secret:
        return "correct"
    return "too high" if guess > secret else "too low"

secret = 7          # try: import random; secret = random.randint(1, 10)
max_tries = 3

for attempt in range(1, max_tries + 1):
    guess = int(input("Guess a number (1-10): "))
    result = evaluate_guess(secret, guess)
    print(f"Attempt {attempt}: {guess} -> {result}")
    if result == "correct":
        print(f"You won in {attempt} tries!")
        break
else:
    print(f"Out of tries — the number was {secret}.")`,
          stdin: "5\n9\n7",
        },
      ],
    },

    /* ───────── Project 3 · Bank Accounts (OOP) ───────── */
    {
      id: "proj-bank", title: "Bank Account System", icon: "fas fa-building-columns",
      level: "Intermediate", tagline: "Model accounts with classes & exceptions",
      desc: "An object-oriented capstone: build Account and Bank classes with deposits, withdrawals, a transaction history, custom exceptions, and transfers.",
      skills: ["Classes", "Methods", "Exceptions", "Encapsulation"],
      intro: "You'll design an <code>Account</code> class, protect it with a custom <code>InsufficientFunds</code> exception, give it a transaction history, and finally a <code>Bank</code> that manages many accounts and moves money between them.",
      steps: [
        {
          id: "bank-s1", kind: "exercise", title: "The Account class",
          content: `
<div class="lc-eyebrow">Project · Bank · Step 1</div>
<h1>Account with deposits</h1>
<h3>Your task</h3>
<p>Define an <code>Account</code> class:</p>
<ul>
  <li><code>__init__(self, owner, balance=0)</code> stores both.</li>
  <li><code>deposit(self, amount)</code> increases the balance and returns the new
      balance.</li>
</ul>`,
          starter: `class Account:
    def __init__(self, owner, balance=0):
        pass

    def deposit(self, amount):
        pass

a = Account("Ada")
print(a.deposit(100))   # 100
print(a.balance)        # 100`,
          tests: [
            { name: "stores owner and balance", code: `a = Account("Ada", 50)\nassert a.owner == "Ada" and a.balance == 50, "Store owner and starting balance"` },
            { name: "balance defaults to 0", code: `assert Account("Bo").balance == 0, "Default balance should be 0"` },
            { name: "deposit increases and returns balance", code: `a = Account("Ada")\nassert a.deposit(100) == 100 and a.balance == 100, "deposit returns the new balance"` },
          ],
        },
        {
          id: "bank-s2", kind: "exercise", title: "Safe withdrawals",
          content: `
<div class="lc-eyebrow">Project · Bank · Step 2</div>
<h1>withdraw + a custom exception</h1>
<p>Your class so far is below. Now stop people overdrawing.</p>
<h3>Your task</h3>
<ul>
  <li>Define an exception class <code>InsufficientFunds(Exception)</code>.</li>
  <li>Add <code>withdraw(self, amount)</code>: if <code>amount</code> exceeds the
      balance, <code>raise InsufficientFunds</code>; otherwise subtract it and
      return the new balance.</li>
</ul>`,
          starter: `class InsufficientFunds(Exception):
    pass

class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        # raise InsufficientFunds if amount > balance, else subtract and return balance
        pass

a = Account("Ada", 100)
print(a.withdraw(40))   # 60`,
          tests: [
            { name: "withdraw reduces balance", code: `a = Account("Ada", 100)\nassert a.withdraw(40) == 60 and a.balance == 60, "withdraw returns the new balance"` },
            { name: "InsufficientFunds is an Exception", code: `assert issubclass(InsufficientFunds, Exception), "It should subclass Exception"` },
            { name: "overdraw raises InsufficientFunds", code: `a = Account("Ada", 50)\ntry:\n    a.withdraw(999); raised = False\nexcept InsufficientFunds:\n    raised = True\nassert raised, "Overdrawing must raise InsufficientFunds"` },
            { name: "balance unchanged after a failed withdraw", code: `a = Account("Ada", 50)\ntry:\n    a.withdraw(999)\nexcept InsufficientFunds:\n    pass\nassert a.balance == 50, "A failed withdrawal must not change the balance"` },
          ],
        },
        {
          id: "bank-s3", kind: "exercise", title: "Transaction history",
          content: `
<div class="lc-eyebrow">Project · Bank · Step 3</div>
<h1>Remember every move</h1>
<h3>Your task</h3>
<p>Give <code>Account</code> a <code>history</code> list (start it empty in
<code>__init__</code>). Each successful <code>deposit</code> appends
<code>("deposit", amount)</code> and each successful <code>withdraw</code> appends
<code>("withdraw", amount)</code>.</p>`,
          starter: `class InsufficientFunds(Exception):
    pass

class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        # add an empty history list

    def deposit(self, amount):
        self.balance += amount
        # record ("deposit", amount)
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFunds(f"{self.owner} can't withdraw {amount}")
        self.balance -= amount
        # record ("withdraw", amount)
        return self.balance

a = Account("Ada")
a.deposit(100)
a.withdraw(30)
print(a.history)   # [('deposit', 100), ('withdraw', 30)]`,
          tests: [
            { name: "history starts empty", code: `assert Account("Bo").history == [], "history should start as an empty list"` },
            { name: "records deposits and withdrawals", code: `a = Account("Ada")\na.deposit(100)\na.withdraw(30)\nassert a.history == [("deposit", 100), ("withdraw", 30)], f"Got {a.history}"` },
            { name: "failed withdrawals aren't recorded", code: `a = Account("Ada", 10)\ntry:\n    a.withdraw(50)\nexcept InsufficientFunds:\n    pass\nassert a.history == [], "Only successful moves are recorded"` },
          ],
        },
        {
          id: "bank-s4", kind: "exercise", title: "The Bank & transfers",
          content: `
<div class="lc-eyebrow">Project · Bank · Step 4 · Capstone</div>
<h1>Many accounts, moving money</h1>
<p>The full <code>Account</code> is included. Build the bank around it.</p>
<h3>Your task</h3>
<p>Define a <code>Bank</code> class:</p>
<ul>
  <li><code>__init__</code> creates an empty <code>accounts</code> dict
      (owner → Account).</li>
  <li><code>open(self, owner)</code> creates an <code>Account</code>, stores it under
      <code>owner</code>, and returns it.</li>
  <li><code>transfer(self, src, dst, amount)</code> withdraws from the
      <code>src</code> owner's account and deposits into <code>dst</code>'s.</li>
</ul>
<div class="callout"><i class="fas fa-trophy"></i><div>
Because <code>transfer</code> reuses <code>withdraw</code>, an overdraw still raises
<code>InsufficientFunds</code> automatically — that's encapsulation paying off.</div></div>`,
          starter: `class InsufficientFunds(Exception):
    pass

class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.history = []

    def deposit(self, amount):
        self.balance += amount
        self.history.append(("deposit", amount))
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFunds(f"{self.owner} can't withdraw {amount}")
        self.balance -= amount
        self.history.append(("withdraw", amount))
        return self.balance

class Bank:
    def __init__(self):
        pass   # create an empty accounts dict

    def open(self, owner):
        pass   # make an Account, store it, return it

    def transfer(self, src, dst, amount):
        pass   # withdraw from src account, deposit into dst account

bank = Bank()
bank.open("Ada").deposit(100)
bank.open("Bo")
bank.transfer("Ada", "Bo", 40)
print(bank.accounts["Ada"].balance, bank.accounts["Bo"].balance)   # 60 40`,
          tests: [
            { name: "open creates and stores an account", code: `b = Bank()\nacc = b.open("Ada")\nassert isinstance(acc, Account) and b.accounts["Ada"] is acc, "open should store and return the Account"` },
            { name: "transfer moves money between accounts", code: `b = Bank()\nb.open("Ada").deposit(100)\nb.open("Bo")\nb.transfer("Ada", "Bo", 40)\nassert b.accounts["Ada"].balance == 60 and b.accounts["Bo"].balance == 40, "Money should move from Ada to Bo"` },
            { name: "overdrawn transfer raises", code: `b = Bank()\nb.open("Ada").deposit(10)\nb.open("Bo")\ntry:\n    b.transfer("Ada", "Bo", 999); raised = False\nexcept InsufficientFunds:\n    raised = True\nassert raised, "Transferring more than the balance must raise"` },
          ],
        },
      ],
    },

    /* ───────── Project 4 · Sales Data Analyzer ───────── */
    {
      id: "proj-sales", title: "Sales Data Analyzer", icon: "fas fa-chart-column",
      level: "Intermediate", tagline: "Analyze and chart real data",
      desc: "A data capstone: load records into a pandas DataFrame, aggregate them, draw a chart, and assemble a report — the Data track end to end.",
      skills: ["pandas", "Aggregation", "Matplotlib"],
      note: "pandas and matplotlib run in your browser, so this project runs for real — your chart appears right in the output.",
      intro: "You'll take a small table of sales, total it, group it by category, render a bar chart, and finally produce a one-call report — the whole data workflow in four steps.",
      steps: [
        {
          id: "sales-s1", kind: "exercise", title: "Total the sales",
          content: `
<div class="lc-eyebrow">Project · Sales Analyzer · Step 1</div>
<h1>Into a DataFrame</h1>
<p>The records are already loaded into <code>df</code>.</p>
<h3>Your task</h3>
<p>Set <code>total_sales</code> to the sum of the <code>amount</code> column.</p>`,
          starter: `import pandas as pd

df = pd.DataFrame({
    "product":  ["Widget", "Gadget", "Widget", "Gizmo", "Gadget", "Widget"],
    "category": ["A", "B", "A", "C", "B", "A"],
    "amount":   [100, 200, 150, 50, 300, 120],
})

total_sales = 0   # sum the amount column

print("Total sales:", total_sales)`,
          tests: [
            { name: "total_sales is 920", code: `assert int(total_sales) == 920, f"Expected 920, got {total_sales}"` },
          ],
        },
        {
          id: "sales-s2", kind: "exercise", title: "Group by category",
          content: `
<div class="lc-eyebrow">Project · Sales Analyzer · Step 2</div>
<h1>Aggregate per category</h1>
<h3>Your task</h3>
<ul>
  <li><code>by_category</code> — a Series of total <code>amount</code> per
      <code>category</code> (use <code>groupby</code>).</li>
  <li><code>top_category</code> — the category with the highest total
      (<code>idxmax()</code>).</li>
</ul>`,
          starter: `import pandas as pd

df = pd.DataFrame({
    "product":  ["Widget", "Gadget", "Widget", "Gizmo", "Gadget", "Widget"],
    "category": ["A", "B", "A", "C", "B", "A"],
    "amount":   [100, 200, 150, 50, 300, 120],
})

by_category = None   # group by category, sum amount
top_category = ""

print(by_category)
print("Top:", top_category)`,
          tests: [
            { name: "by_category totals are correct", code: `assert by_category["A"] == 370 and by_category["B"] == 500 and by_category["C"] == 50, "Sum amount within each category"` },
            { name: "top_category is B", code: `assert top_category == "B", f"Expected 'B', got {top_category!r}"` },
          ],
        },
        {
          id: "sales-s3", kind: "exercise", title: "Chart it",
          content: `
<div class="lc-eyebrow">Project · Sales Analyzer · Step 3</div>
<h1>Draw a bar chart</h1>
<p>The aggregation is included. Now visualise it.</p>
<h3>Your task</h3>
<p>Make a bar chart of <code>by_category</code> and save it as
<code>sales.png</code>. Your chart will appear below the editor.</p>
<div class="callout"><i class="fas fa-lightbulb"></i><div>
A pandas Series can plot itself: <code>by_category.plot(kind="bar", ax=ax)</code>,
then <code>fig.savefig("sales.png")</code>.</div></div>`,
          starter: `import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

df = pd.DataFrame({
    "category": ["A", "B", "A", "C", "B", "A"],
    "amount":   [100, 200, 150, 50, 300, 120],
})
by_category = df.groupby("category")["amount"].sum()

fig, ax = plt.subplots()
# plot by_category as a bar chart on ax, then save as "sales.png"
`,
          tests: [
            { name: "sales.png was created", code: `from pathlib import Path\nassert Path("sales.png").exists(), "Save the chart as sales.png"` },
            { name: "the chart is non-empty", code: `from pathlib import Path\nassert Path("sales.png").stat().st_size > 100, "The saved chart looks empty"` },
          ],
        },
        {
          id: "sales-s4", kind: "exercise", title: "Build the report",
          content: `
<div class="lc-eyebrow">Project · Sales Analyzer · Step 4 · Capstone</div>
<h1>One call, full report</h1>
<h3>Your task</h3>
<p>Write <code>build_report(df)</code> that returns a dict with:</p>
<ul>
  <li><code>"total"</code> — total of the <code>amount</code> column (an int),</li>
  <li><code>"top_category"</code> — the highest-selling category,</li>
  <li><code>"by_category"</code> — a plain dict of category → total.</li>
</ul>
<div class="callout"><i class="fas fa-trophy"></i><div>
That's the full data pipeline — load, aggregate, summarise — wrapped in one
reusable function. Capstone complete!</div></div>`,
          starter: `import pandas as pd

def build_report(df):
    # return {"total": ..., "top_category": ..., "by_category": {...}}
    pass

df = pd.DataFrame({
    "category": ["A", "B", "A", "C", "B", "A"],
    "amount":   [100, 200, 150, 50, 300, 120],
})
print(build_report(df))`,
          tests: [
            { name: "total is correct", code: `df = pd.DataFrame({"category":["A","B","A","C","B","A"],"amount":[100,200,150,50,300,120]})\nr = build_report(df)\nassert int(r["total"]) == 920, "total should be 920"` },
            { name: "top_category is B", code: `df = pd.DataFrame({"category":["A","B","A","C","B","A"],"amount":[100,200,150,50,300,120]})\nassert build_report(df)["top_category"] == "B", "B sells the most"` },
            { name: "by_category is a plain dict", code: `df = pd.DataFrame({"category":["A","B","A","C","B","A"],"amount":[100,200,150,50,300,120]})\nbc = build_report(df)["by_category"]\nassert isinstance(bc, dict) and bc.get("A") == 370 and bc.get("B") == 500, "by_category should be a dict of totals"` },
          ],
        },
      ],
    },
  ],
};
