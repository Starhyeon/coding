// ═══════════════════════════════════════
// KIDOYO LAUNCHPAD_ — DATA v3
// Concept → Challenge → Hint flow
// ═══════════════════════════════════════

const TRACKS = [
  {
    id: "hatch", name: "Hatch", icon: "H", iconClass: "track-icon-hatch",
    meta: "Visual foundations · Block-based", levels: ["L1", "L2"],
    lessons: [
      {
        num: "01", title: "Your First Program", level: "L1",
        concept: {
          title: "Programs Run Top to Bottom",
          body: "A program is a set of instructions the computer follows in order — top to bottom, one at a time. In Hatch, each block is one instruction. The computer never skips a step and never runs them out of order.\n\nThis is called sequential execution. It's the foundation of ALL programming.",
          code: "When [green flag] clicked:\n    say \"Hello!\" for 2 seconds\n    move 100 steps\n    say \"I moved!\" for 2 seconds"
        },
        challenges: [
          {
            id: "hatch-01-a", title: "Say and Move", difficulty: "easy",
            prompt: "Write a Hatch program that makes the sprite:\n1. Say your name for 2 seconds\n2. Move 150 steps\n3. Say \"Done!\" for 1 second\n\nWrite it as pseudocode — one block per line.",
            expected: "When [green flag] clicked:\n    say \"[your name]\" for 2 seconds\n    move 150 steps\n    say \"Done!\" for 1 second",
            starter: "When [green flag] clicked:\n    ",
            hints: [
              "Start with the \"When [green flag] clicked\" block — that's your event listener.",
              "The \"say\" block needs text in quotes and a time. The \"move\" block needs a number of steps.",
              "Remember: order matters. The sprite says your name FIRST, then moves, then says \"Done!\""
            ],
            solution: "When [green flag] clicked:\n    say \"Alex\" for 2 seconds\n    move 150 steps\n    say \"Done!\" for 1 second"
          },
          {
            id: "hatch-01-b", title: "Draw an L Shape", difficulty: "medium",
            prompt: "Make the sprite trace the shape of the letter L.\n\nYou'll need: <code>move</code> and <code>turn</code> blocks.\n\nThink about it: how many moves and turns does an L need?",
            expected: "The sprite moves down, turns, then moves right — making an L shape.",
            starter: "When [green flag] clicked:\n    point in direction 180\n    ",
            hints: [
              "An L shape has two segments: one going down, then one going right.",
              "After moving down, you need to turn. Which direction? Left 90° or right 90°?",
              "Try: move 100 steps (down), turn right 90°, move 80 steps (right)"
            ],
            solution: "When [green flag] clicked:\n    point in direction 180\n    move 100 steps\n    turn right 90 degrees\n    move 80 steps"
          }
        ]
      },
      {
        num: "02", title: "Events & Listeners", level: "L1",
        concept: {
          title: "Events Make Programs Interactive",
          body: "An event is something that happens — a click, a key press, a timer. An event listener WAITS for a specific event and runs code when it fires.\n\nWithout events, your program runs once and stops. Events make programs respond to you.\n\nYou can have MULTIPLE listeners running independently. Pressing space doesn't affect the click listener — they're separate.",
          code: "When [green flag] clicked:\n    say \"Game ready!\" for 2 seconds\n    set [score] to 0\n\nWhen [space] key pressed:\n    change [score] by 1\n    say join(\"Score: \", [score])"
        },
        challenges: [
          {
            id: "hatch-02-a", title: "Two Listeners", difficulty: "easy",
            prompt: "Create TWO event listeners:\n1. <code>When green flag clicked</code> → say \"Welcome!\" for 2 seconds\n2. <code>When space pressed</code> → say \"You pressed space!\" for 1 second\n\nThey should work independently.",
            starter: "When [green flag] clicked:\n    \n\nWhen [space] key pressed:\n    ",
            hints: [
              "You need two separate \"When\" blocks. Each one is its own listener.",
              "The green flag listener says one thing. The space listener says another.",
              "They don't interact — that's the point. Two independent triggers."
            ],
            solution: "When [green flag] clicked:\n    say \"Welcome!\" for 2 seconds\n\nWhen [space] key pressed:\n    say \"You pressed space!\" for 1 second"
          },
          {
            id: "hatch-02-b", title: "Score Counter", difficulty: "medium",
            prompt: "Build a score counter with THREE listeners:\n1. Green flag → set score to 0, say \"Press space to score!\"\n2. Space key → add 1 to score, display the score\n3. Sprite clicked → reset score to 0, say \"Reset!\"\n\nWhat variable do you need?",
            starter: "When [green flag] clicked:\n    \n\nWhen [space] key pressed:\n    \n\nWhen [this sprite] clicked:\n    ",
            hints: [
              "You need ONE variable: [score]. Create it first.",
              "Green flag initializes score to 0. Space adds to it. Click resets it.",
              "Use join() to display \"Score: 5\" — that's join(\"Score: \", [score])"
            ],
            solution: "When [green flag] clicked:\n    set [score] to 0\n    say \"Press space to score!\" for 2 seconds\n\nWhen [space] key pressed:\n    change [score] by 1\n    say join(\"Score: \", [score])\n\nWhen [this sprite] clicked:\n    set [score] to 0\n    say \"Reset!\" for 1 second"
          }
        ]
      },
      {
        num: "03", title: "Variables & State", level: "L1",
        concept: {
          title: "Variables Give Your Program Memory",
          body: "A variable stores a value that can change. Without variables, your program has amnesia — it can't track scores, count lives, or know if a game is over.\n\nThree operations:\n• SET: write a value\n• CHANGE: read, compute, write back\n• READ: check the current value\n\nThe combination of ALL your variables at any moment is called the program's STATE.",
          code: "set [lives] to 3\nset [game_over] to false\n\n// Guard pattern:\nif [game_over] = false then\n    change [score] by 10"
        },
        challenges: [
          {
            id: "hatch-03-a", title: "Life Tracker", difficulty: "easy",
            prompt: "Create a program that:\n1. Starts with 3 lives\n2. When you press <code>space</code>, lose 1 life and display remaining\n3. When lives reach 0, say \"Game Over!\"\n\nWhat variables do you need? What's the guard condition?",
            starter: "When [green flag] clicked:\n    set [lives] to \n\nWhen [space] key pressed:\n    ",
            hints: [
              "You need one variable: [lives]. Set it to 3 in the green flag listener.",
              "In the space listener: change [lives] by -1, then display with say join(\"Lives: \", [lives])",
              "After changing lives, check: if [lives] = 0 then say \"Game Over!\""
            ],
            solution: "When [green flag] clicked:\n    set [lives] to 3\n    say join(\"Lives: \", [lives])\n\nWhen [space] key pressed:\n    change [lives] by -1\n    say join(\"Lives: \", [lives])\n    if [lives] = 0 then\n        say \"Game Over!\" for 3 seconds\n        stop [all]"
          },
          {
            id: "hatch-03-b", title: "Shield Power-Up", difficulty: "hard",
            prompt: "Add a shield system to the life tracker:\n• Press <code>s</code> to activate shield (one-time use)\n• When shield is active and you press space, you DON'T lose a life — but the shield turns off\n• Display shield status\n\nHow many variables do you need now?",
            starter: "When [green flag] clicked:\n    set [lives] to 3\n    set [shield] to false\n\nWhen [space] key pressed:\n    \n\nWhen [s] key pressed:\n    ",
            hints: [
              "You need TWO variables: [lives] and [shield] (true/false).",
              "In the space listener: first check if [shield] = true. If yes, set shield to false instead of losing a life.",
              "The 's' listener just sets [shield] to true and displays \"Shield active!\""
            ],
            solution: "When [green flag] clicked:\n    set [lives] to 3\n    set [shield] to false\n    say \"Press S for shield, space to take damage\"\n\nWhen [space] key pressed:\n    if [shield] = true then\n        set [shield] to false\n        say \"Shield absorbed hit!\" for 1 second\n    else\n        change [lives] by -1\n        say join(\"Lives: \", [lives])\n        if [lives] = 0 then\n            say \"Game Over!\" for 3 seconds\n\nWhen [s] key pressed:\n    set [shield] to true\n    say \"Shield activated!\" for 1 second"
          }
        ]
      },
      {
        num: "04", title: "Loops & Repetition", level: "L2",
        concept: {
          title: "Loops Do the Repetitive Work",
          body: "A loop repeats code. Instead of copying blocks 100 times, write them once and loop.\n\nThree types:\n• repeat N — runs exactly N times\n• forever — runs until the program stops\n• repeat until [condition] — runs until something becomes true\n\nThe efficiency of what's INSIDE the loop determines speed. A slow operation looped 1000 times = very slow program.",
          code: "set [timer] to 10\nrepeat until [timer] = 0:\n    say [timer] for 1 second\n    change [timer] by -1\nsay \"Launch!\""
        },
        challenges: [
          {
            id: "hatch-04-a", title: "Countdown", difficulty: "easy",
            prompt: "Build a countdown from 5 to 1 that says each number, then says \"Go!\" at the end.\n\nUse a <code>repeat until</code> loop.",
            starter: "When [green flag] clicked:\n    set [timer] to 5\n    repeat until [timer] = :\n        ",
            hints: [
              "Set [timer] to 5. Loop until [timer] = 0.",
              "Inside the loop: say [timer], then change [timer] by -1.",
              "After the loop ends, say \"Go!\" — this runs ONCE after the loop exits."
            ],
            solution: "When [green flag] clicked:\n    set [timer] to 5\n    repeat until [timer] = 0:\n        say [timer] for 1 second\n        change [timer] by -1\n    say \"Go!\" for 2 seconds"
          },
          {
            id: "hatch-04-b", title: "Accelerating Sprite", difficulty: "hard",
            prompt: "Make a sprite that moves across the screen in a loop, getting FASTER each time.\n\nYou need a <code>[speed]</code> variable that increases each loop iteration. The sprite should move <code>[speed]</code> steps per iteration.",
            starter: "When [green flag] clicked:\n    go to x: -200 y: 0\n    set [speed] to 2\n    repeat 30:\n        ",
            hints: [
              "Inside the loop: move [speed] steps, then change [speed] by some amount.",
              "Try changing speed by 1 each time. The sprite starts slow and accelerates.",
              "After the loop, try saying the final speed value — it should be 32 if you started at 2 and added 1 for 30 iterations."
            ],
            solution: "When [green flag] clicked:\n    go to x: -200 y: 0\n    set [speed] to 2\n    repeat 30:\n        move [speed] steps\n        change [speed] by 1\n    say join(\"Final speed: \", [speed])"
          }
        ]
      },
      {
        num: "05", title: "Conditionals", level: "L2",
        concept: {
          title: "Conditionals Let Your Program Decide",
          body: "A conditional checks a true/false condition and runs different code based on the result.\n\nPattern:\n1. Evaluate condition → true or false\n2. If true → run the \"then\" block\n3. If false → run the \"else\" block (or skip)\n\nA condition is checked ONCE when the program reaches it. To keep checking, put it inside a loop.",
          code: "if (answer) = \"kidoyo\" then\n    say \"Access granted!\"\n    broadcast [start-game]\nelse\n    say \"Wrong password.\"\n    stop [all]"
        },
        challenges: [
          {
            id: "hatch-05-a", title: "Password Gate", difficulty: "medium",
            prompt: "Build a password checker:\n1. Ask \"What's the password?\"\n2. If the answer is \"kidoyo\" → say \"Welcome!\"\n3. If wrong → say \"Access denied\" and stop the program\n\nHandle both cases with <code>if/else</code>.",
            starter: "When [green flag] clicked:\n    ask \"What's the password?\" and wait\n    ",
            hints: [
              "After the ask block, the answer is stored in the special (answer) variable.",
              "Use: if (answer) = \"kidoyo\" then ... else ...",
              "In the else block: say \"Access denied\" and use stop [all] to end the program."
            ],
            solution: "When [green flag] clicked:\n    ask \"What's the password?\" and wait\n    if (answer) = \"kidoyo\" then\n        say \"Welcome!\" for 2 seconds\n    else\n        say \"Access denied\" for 2 seconds\n        stop [all]"
          },
          {
            id: "hatch-05-b", title: "Quiz Game", difficulty: "hard",
            prompt: "Build a 3-question quiz:\n• Each question uses <code>ask</code> and checks the answer with <code>if</code>\n• Track score with a variable\n• At the end, give feedback based on score:\n  - 3/3 = \"Perfect!\"\n  - 2/3 = \"Almost!\"\n  - 1/3 = \"Keep trying\"\n  - 0/3 = \"Study more!\"\n\nHow many variables do you need? What's the structure?",
            starter: "When [green flag] clicked:\n    set [score] to 0\n    \n    ask \"What language uses blocks?\" and wait\n    ",
            hints: [
              "You need one variable: [score]. Set to 0 at start.",
              "For each question: ask, check answer with if, change [score] by 1 if correct.",
              "At the end, use nested if/else or multiple if blocks to check score = 3, score = 2, etc."
            ],
            solution: "When [green flag] clicked:\n    set [score] to 0\n    ask \"What language uses blocks?\" and wait\n    if (answer) = \"Hatch\" then\n        change [score] by 1\n    ask \"What does a loop do?\" and wait\n    if (answer) = \"repeat\" then\n        change [score] by 1\n    ask \"What stores a value?\" and wait\n    if (answer) = \"variable\" then\n        change [score] by 1\n    if [score] = 3 then\n        say \"Perfect!\" for 2 seconds\n    else\n        if [score] = 2 then\n            say \"Almost!\" for 2 seconds\n        else\n            if [score] = 1 then\n                say \"Keep trying\" for 2 seconds\n            else\n                say \"Study more!\" for 2 seconds"
          }
        ]
      }
    ]
  },

  // ═══════════ PYTHON ═══════════
  {
    id: "python", name: "Python", icon: "Py", iconClass: "track-icon-python",
    meta: "Build real software · Dynamic typed", levels: ["L1", "L2", "L3", "L4"],
    lessons: [
      {
        num: "01", title: "Print, Input & Your First Script", level: "L1",
        concept: {
          title: "From Blocks to Text",
          body: "In Python, you type instructions as text. print() displays output (like Hatch's \"say\" block). input() asks for user input (like \"ask and wait\").\n\nIMPORTANT: input() always returns text. To do math, convert with int() or float().",
          code: "print(\"Hello, world!\")\nname = input(\"What's your name? \")\nprint(\"Welcome,\", name)\n\nage = input(\"Age? \")\nprint(\"In 10 years:\", int(age) + 10)"
        },
        challenges: [
          {
            id: "py-01-a", title: "Hello World", difficulty: "easy",
            prompt: "Write a program that prints <code>\"Hello from Kidoyo!\"</code> on one line, then <code>\"Let's code.\"</code> on the next line.",
            expected: "Hello from Kidoyo!\nLet's code.",
            starter: "# Your first Python program\n",
            hints: [
              "Use print() to display text. Each print() makes a new line.",
              "Text goes in quotes: print(\"Hello from Kidoyo!\")",
              "You need two print() calls — one for each line."
            ],
            solution: "print(\"Hello from Kidoyo!\")\nprint(\"Let's code.\")"
          },
          {
            id: "py-01-b", title: "Personal Intro", difficulty: "medium",
            prompt: "Ask the user for their name and age, then print:\n<code>\"[name] is [age] years old and was born around [year]\"</code>\n\nCalculate the birth year from the age (use 2025 as current year).\n\nRemember: <code>input()</code> returns text — you'll need <code>int()</code>.",
            expected: "Alex is 15 years old and was born around 2010",
            starter: "name = input(\"What's your name? \")\n",
            hints: [
              "Get age with: age = input(\"How old are you? \")",
              "Convert to number and calculate: year = 2025 - int(age)",
              "Use an f-string to format: print(f\"{name} is {age} years old and was born around {year}\")"
            ],
            solution: "name = input(\"What's your name? \")\nage = input(\"How old are you? \")\nyear = 2025 - int(age)\nprint(f\"{name} is {age} years old and was born around {year}\")"
          },
          {
            id: "py-01-c", title: "Temperature Converter", difficulty: "medium",
            prompt: "Build a Fahrenheit to Celsius converter.\n1. Ask for temperature in °F\n2. Convert: <code>celsius = (fahrenheit - 32) * 5/9</code>\n3. Print the result rounded to 1 decimal place\n\nExample: 98.6°F → 37.0°C",
            expected: "98.6°F = 37.0°C",
            starter: "# Temperature Converter\nf = float(input(\"Enter °F: \"))\n",
            hints: [
              "Use float() instead of int() since temperatures can be decimal.",
              "Apply the formula: c = (f - 32) * 5/9",
              "Round with round(c, 1) to get 1 decimal place."
            ],
            solution: "f = float(input(\"Enter °F: \"))\nc = (f - 32) * 5/9\nprint(f\"{f}°F = {round(c, 1)}°C\")"
          }
        ]
      },
      {
        num: "02", title: "Variables & Memory", level: "L1",
        concept: {
          title: "Variables Are Labels, Not Boxes",
          body: "In Python, a variable is a label stuck to an object in memory. When you write y = x with a list, both labels point to the SAME list. Changing one changes the other.\n\nTo make an independent copy: y = x.copy() or y = x[:]\n\n== checks same VALUE. 'is' checks same OBJECT.",
          code: "x = [1, 2, 3]\ny = x           # same list!\ny.append(4)\nprint(x)        # [1, 2, 3, 4] ← changed!\n\na = [1, 2, 3]\nb = a.copy()    # independent copy\nb.append(4)\nprint(a)        # [1, 2, 3] ← safe"
        },
        challenges: [
          {
            id: "py-02-a", title: "Reference vs Copy", difficulty: "easy",
            prompt: "Create a list called <code>original</code> with values [10, 20, 30].\nMake a TRUE COPY called <code>backup</code>.\nAppend 40 to <code>backup</code>.\nPrint both lists — original should be unchanged.",
            expected: "Original: [10, 20, 30]\nBackup: [10, 20, 30, 40]",
            starter: "original = [10, 20, 30]\n",
            hints: [
              "Use .copy() to make an independent copy: backup = original.copy()",
              "After appending to backup, original should still be [10, 20, 30]",
              "Print both: print(\"Original:\", original) and print(\"Backup:\", backup)"
            ],
            solution: "original = [10, 20, 30]\nbackup = original.copy()\nbackup.append(40)\nprint(\"Original:\", original)\nprint(\"Backup:\", backup)"
          },
          {
            id: "py-02-b", title: "Type Detective", difficulty: "medium",
            prompt: "Write a program that asks for a value, then tells the user what type it is:\n• If it's all digits → \"That's an integer\"\n• If it has a decimal point → \"That's a float\"\n• Otherwise → \"That's a string\"\n\nHint: strings have <code>.isdigit()</code> and you can check for '.' with <code>'.' in value</code>.",
            expected: "42 → That's an integer\n3.14 → That's a float\nhello → That's a string",
            starter: "value = input(\"Enter a value: \")\n",
            hints: [
              "input() returns a string. Check its content to guess the type.",
              "Use value.isdigit() to check for integers. Use '.' in value for floats.",
              "Check digits first, then decimal, then fall back to string."
            ],
            solution: "value = input(\"Enter a value: \")\nif value.isdigit():\n    print(\"That's an integer\")\nelif '.' in value and value.replace('.', '', 1).isdigit():\n    print(\"That's a float\")\nelse:\n    print(\"That's a string\")"
          }
        ]
      },
      {
        num: "03", title: "Functions & Scope", level: "L2",
        concept: {
          title: "Functions = Reusable, Isolated Code",
          body: "A function takes inputs, does work, returns output. Variables inside a function are LOCAL — they don't exist outside.\n\nIf you write the same code twice, it should be a function. Each function should do ONE thing.",
          code: "def calculate_score(hits, misses):\n    total = hits + misses\n    if total == 0:\n        return 0\n    accuracy = hits / total\n    bonus = 50 if accuracy > 0.9 else 0\n    return (hits * 10) + bonus\n\nprint(calculate_score(18, 2))  # 230"
        },
        challenges: [
          {
            id: "py-03-a", title: "Greeting Function", difficulty: "easy",
            prompt: "Write a function called <code>greet(name, team)</code> that RETURNS the string:\n<code>\"Welcome, [name]! You're on team [team].\"</code>\n\nThen call it twice with different arguments and print the results.",
            expected: "Welcome, Aisha! You're on team Alpha.\nWelcome, Ben! You're on team Beta.",
            starter: "def greet(name, team):\n    \n\nprint(greet(\"Aisha\", \"Alpha\"))\nprint(greet(\"Ben\", \"Beta\"))",
            hints: [
              "Use return, not print, inside the function.",
              "Use an f-string: return f\"Welcome, {name}! You're on team {team}.\"",
              "The function returns a value — print() is called OUTSIDE."
            ],
            solution: "def greet(name, team):\n    return f\"Welcome, {name}! You're on team {team}.\"\n\nprint(greet(\"Aisha\", \"Alpha\"))\nprint(greet(\"Ben\", \"Beta\"))"
          },
          {
            id: "py-03-b", title: "Score Validator", difficulty: "hard",
            prompt: "Write a function <code>validate_score(score)</code> that:\n• Returns <code>True</code> if score is between 0 and 100 (inclusive)\n• Returns <code>False</code> otherwise\n• Also handles non-integer inputs gracefully (use try/except)\n\nTest with: 85, -5, 101, \"banana\"",
            expected: "85 → True\n-5 → False\n101 → False\nbanana → False",
            starter: "def validate_score(score):\n    \n\n# Tests\nprint(validate_score(85))\nprint(validate_score(-5))\nprint(validate_score(101))\nprint(validate_score(\"banana\"))",
            hints: [
              "Wrap the check in try/except to handle non-numbers.",
              "Inside try: convert to int, then check 0 <= int(score) <= 100",
              "In the except block: return False"
            ],
            solution: "def validate_score(score):\n    try:\n        s = int(score)\n        return 0 <= s <= 100\n    except (ValueError, TypeError):\n        return False\n\nprint(validate_score(85))      # True\nprint(validate_score(-5))      # False\nprint(validate_score(101))     # False\nprint(validate_score(\"banana\")) # False"
          }
        ]
      },
      {
        num: "04", title: "Lists & Loops", level: "L2",
        concept: {
          title: "Process Collections with Loops",
          body: "Lists store multiple values in order. Loops let you process every item.\n\nfor item in list: → goes through each item\nfor i in range(n): → loops 0 to n-1\n\nList comprehension: [x*2 for x in list if x > 5] — transform + filter in one line.",
          code: "teams = [\"Alpha\", \"Beta\", \"Gamma\"]\nscores = [85, 92, 78]\n\nfor i, team in enumerate(teams):\n    print(f\"#{i+1}: {team} — {scores[i]}\")\n\nhigh = [s for s in scores if s >= 90]\nprint(\"High scores:\", high)  # [92]"
        },
        challenges: [
          {
            id: "py-04-a", title: "Team Roster", difficulty: "easy",
            prompt: "Given a list of team members, print each one numbered:\n<code>1. Aisha</code>\n<code>2. Ben</code>\n<code>3. Carlos</code>\n\nUse <code>enumerate()</code>.",
            expected: "1. Aisha\n2. Ben\n3. Carlos",
            starter: "members = [\"Aisha\", \"Ben\", \"Carlos\"]\n",
            hints: [
              "enumerate() gives you both the index and the value.",
              "for i, name in enumerate(members): — then i starts at 0.",
              "Print with f\"{i+1}. {name}\" to start numbering from 1."
            ],
            solution: "members = [\"Aisha\", \"Ben\", \"Carlos\"]\nfor i, name in enumerate(members):\n    print(f\"{i+1}. {name}\")"
          },
          {
            id: "py-04-b", title: "Average & Filter", difficulty: "medium",
            prompt: "Given scores = [85, 92, 78, 95, 88, 70, 99]:\n1. Calculate the average\n2. Find all scores ABOVE the average\n3. Print the average and the above-average scores\n\nUse <code>sum()</code>, <code>len()</code>, and a list comprehension.",
            expected: "Average: 86.7\nAbove average: [92, 95, 88, 99]",
            starter: "scores = [85, 92, 78, 95, 88, 70, 99]\n",
            hints: [
              "Average = sum(scores) / len(scores)",
              "Use a list comprehension: above = [s for s in scores if s > avg]",
              "Round the average: round(avg, 1)"
            ],
            solution: "scores = [85, 92, 78, 95, 88, 70, 99]\navg = sum(scores) / len(scores)\nabove = [s for s in scores if s > avg]\nprint(f\"Average: {round(avg, 1)}\")\nprint(f\"Above average: {above}\")"
          }
        ]
      },
      {
        num: "05", title: "Data Structures & Big-O", level: "L3",
        concept: {
          title: "The Right Container Changes Everything",
          body: "List = ordered, O(n) search\nSet = unordered, O(1) lookup\nDict = key-value, O(1) access\n\nWith 1,000,000 items: list search = ~500k operations. Set lookup = 1.\n\nRule: if you use 'in' on a list repeatedly, switch to a set.",
          code: "\"bob\" in [\"alice\", \"bob\"]   # O(n)\n\"bob\" in {\"alice\", \"bob\"}   # O(1)\nscores.get(\"dave\", 0)       # O(1), safe"
        },
        challenges: [
          {
            id: "py-05-a", title: "Duplicate Finder", difficulty: "medium",
            prompt: "Write a function <code>find_dupes(lst)</code> that returns a list of all duplicate values.\n\nUse a SET for O(n) performance — don't use nested loops.\n\nTest: <code>[1, 2, 3, 2, 4, 3, 5]</code> → <code>[2, 3]</code>",
            expected: "[2, 3]",
            starter: "def find_dupes(lst):\n    seen = set()\n    dupes = []\n    \n\nprint(find_dupes([1, 2, 3, 2, 4, 3, 5]))",
            hints: [
              "Loop through the list. For each item, check if it's in 'seen'.",
              "If it IS in seen, it's a duplicate — add to dupes. If not, add to seen.",
              "Use 'if item in seen' — this is O(1) because seen is a set."
            ],
            solution: "def find_dupes(lst):\n    seen = set()\n    dupes = []\n    for item in lst:\n        if item in seen:\n            if item not in dupes:\n                dupes.append(item)\n        else:\n            seen.add(item)\n    return dupes\n\nprint(find_dupes([1, 2, 3, 2, 4, 3, 5]))"
          },
          {
            id: "py-05-b", title: "Word Frequency Counter", difficulty: "hard",
            prompt: "Write a function <code>word_freq(text)</code> that returns a dictionary mapping each word to how many times it appears.\n\nTest: <code>\"the cat sat on the mat the cat\"</code>\n→ <code>{\"the\": 3, \"cat\": 2, \"sat\": 1, \"on\": 1, \"mat\": 1}</code>\n\nUse <code>.split()</code> and a dict.",
            expected: "{'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1}",
            starter: "def word_freq(text):\n    freq = {}\n    \n\nprint(word_freq(\"the cat sat on the mat the cat\"))",
            hints: [
              "Split the text into words: words = text.split()",
              "Loop through words. For each word, use freq.get(word, 0) + 1",
              "Or: if word in freq: freq[word] += 1 else: freq[word] = 1"
            ],
            solution: "def word_freq(text):\n    freq = {}\n    for word in text.split():\n        freq[word] = freq.get(word, 0) + 1\n    return freq\n\nprint(word_freq(\"the cat sat on the mat the cat\"))"
          }
        ]
      },
      {
        num: "06", title: "OOP — Classes", level: "L4",
        concept: {
          title: "Classes Model Real Things",
          body: "A class is a blueprint. An object is an instance. Each object has its own data (attributes) and behaviors (methods).\n\n__init__ is the constructor — runs when you create an object.\nself refers to THIS specific object.",
          code: "class Team:\n    def __init__(self, name):\n        self.name = name\n        self.members = []\n        self.score = 0\n\n    def add_member(self, name):\n        self.members.append(name)\n\nalpha = Team(\"Alpha\")\nalpha.add_member(\"Aisha\")"
        },
        challenges: [
          {
            id: "py-06-a", title: "Build a Team Class", difficulty: "hard",
            prompt: "Create a <code>Team</code> class with:\n• <code>__init__(self, name)</code> — sets name, empty members list, score = 0\n• <code>add_member(self, name)</code> — adds to members\n• <code>set_score(self, points)</code> — validates 0-100, sets score\n• <code>__str__(self)</code> — returns \"Team [name]: [n] members, score: [score]\"\n\nCreate two teams, add members, set scores, print them.",
            expected: "Team Alpha: 3 members, score: 87\nTeam Beta: 2 members, score: 92",
            starter: "class Team:\n    def __init__(self, name):\n        \n\n    def add_member(self, name):\n        \n\n    def set_score(self, points):\n        \n\n    def __str__(self):\n        ",
            hints: [
              "In __init__: self.name = name, self.members = [], self.score = 0",
              "set_score should check: if 0 <= points <= 100, then set. Otherwise raise ValueError.",
              "__str__ returns an f-string: f\"Team {self.name}: {len(self.members)} members, score: {self.score}\""
            ],
            solution: "class Team:\n    def __init__(self, name):\n        self.name = name\n        self.members = []\n        self.score = 0\n\n    def add_member(self, name):\n        self.members.append(name)\n\n    def set_score(self, points):\n        if not (0 <= points <= 100):\n            raise ValueError(\"Score must be 0-100\")\n        self.score = points\n\n    def __str__(self):\n        return f\"Team {self.name}: {len(self.members)} members, score: {self.score}\"\n\nalpha = Team(\"Alpha\")\nalpha.add_member(\"Aisha\")\nalpha.add_member(\"Ben\")\nalpha.add_member(\"Carlos\")\nalpha.set_score(87)\n\nbeta = Team(\"Beta\")\nbeta.add_member(\"Diana\")\nbeta.add_member(\"Eve\")\nbeta.set_score(92)\n\nprint(alpha)\nprint(beta)"
          }
        ]
      }
    ]
  },

  // ═══════════ JAVA ═══════════
  {
    id: "java", name: "Java", icon: "Ja", iconClass: "track-icon-java",
    meta: "Engineering discipline · Static typed", levels: ["L2", "L3", "L4"],
    lessons: [
      {
        num: "01", title: "Types & Compilation", level: "L2",
        concept: {
          title: "Java Catches Bugs Before You Run",
          body: "Every variable declares its type. The compiler checks BEFORE the program runs.\n\nThis feels restrictive at first — but it catches errors immediately instead of hiding them until runtime.",
          code: "int score = 0;\nString team = \"Alpha\";\nboolean active = true;\n\nscore = \"ten\";  // ❌ COMPILE ERROR"
        },
        challenges: [
          {
            id: "java-01-a", title: "Declare & Print", difficulty: "easy",
            prompt: "Declare these variables with the correct Java types:\n• team name (text) = \"Kidoyo\"\n• member count (whole number) = 4\n• average score (decimal) = 87.5\n• has submitted (true/false) = true\n\nPrint each one using <code>System.out.println()</code>.",
            starter: "public class Main {\n    public static void main(String[] args) {\n        \n    }\n}",
            hints: [
              "String for text, int for whole numbers, double for decimals, boolean for true/false.",
              "String teamName = \"Kidoyo\"; — note the capital S in String.",
              "System.out.println(teamName); prints the value."
            ],
            solution: "public class Main {\n    public static void main(String[] args) {\n        String teamName = \"Kidoyo\";\n        int memberCount = 4;\n        double avgScore = 87.5;\n        boolean submitted = true;\n\n        System.out.println(teamName);\n        System.out.println(memberCount);\n        System.out.println(avgScore);\n        System.out.println(submitted);\n    }\n}"
          }
        ]
      },
      {
        num: "02", title: "Classes & Constructors", level: "L3",
        concept: {
          title: "Everything Lives in a Class",
          body: "In Java, ALL code lives inside a class. Fields hold data. Methods define behavior. Constructors initialize new objects.\n\n'private' = only this class can access. 'public' = anyone can call. 'this' = this specific object.",
          code: "public class Project {\n    private String name;\n    private int lines;\n\n    public Project(String name) {\n        this.name = name;\n        this.lines = 0;\n    }\n\n    public void addCode(int n) {\n        if (n > 0) this.lines += n;\n    }\n}"
        },
        challenges: [
          {
            id: "java-02-a", title: "Build a Judge Class", difficulty: "hard",
            prompt: "Create a <code>Judge</code> class with:\n• Private fields: name (String), scores (ArrayList&lt;Integer&gt;)\n• Constructor: takes name\n• <code>addScore(int score)</code>: validates 1-10, adds to list\n• <code>getAverage()</code>: returns the average as double\n\nAll fields private. Why?",
            starter: "import java.util.ArrayList;\n\npublic class Judge {\n    \n}",
            hints: [
              "Declare: private String name; and private ArrayList<Integer> scores;",
              "In the constructor: this.scores = new ArrayList<>();",
              "In addScore: if (score >= 1 && score <= 10) scores.add(score);",
              "In getAverage: loop through scores, sum them, divide by size. Check for empty list!"
            ],
            solution: "import java.util.ArrayList;\n\npublic class Judge {\n    private String name;\n    private ArrayList<Integer> scores;\n\n    public Judge(String name) {\n        this.name = name;\n        this.scores = new ArrayList<>();\n    }\n\n    public void addScore(int score) {\n        if (score >= 1 && score <= 10) {\n            scores.add(score);\n        }\n    }\n\n    public double getAverage() {\n        if (scores.isEmpty()) return 0.0;\n        int sum = 0;\n        for (int s : scores) {\n            sum += s;\n        }\n        return (double) sum / scores.size();\n    }\n}"
          }
        ]
      },
      {
        num: "03", title: "Inheritance & Polymorphism", level: "L3",
        concept: {
          title: "One Interface, Multiple Behaviors",
          body: "A child class inherits from a parent. It can override methods with its own version.\n\nPolymorphism: store a Coder in a Participant variable — Java calls the Coder's method at runtime. You can add new types without changing existing code.",
          code: "Participant p = new Coder(\"Aisha\", \"Python\");\np.getRole();  // \"Coder (Python)\" — dynamic dispatch"
        },
        challenges: [
          {
            id: "java-03-a", title: "Role Hierarchy", difficulty: "hard",
            prompt: "Build:\n1. <code>Participant</code> class with name and <code>getRole()</code> returning \"Participant\"\n2. <code>Coder</code> extends Participant, adds language field, overrides getRole()\n3. <code>Designer</code> extends Participant, adds tool field, overrides getRole()\n4. Create an array of Participant, add both types, loop and print roles\n\nPolymorphism should call the right method automatically.",
            starter: "public class Participant {\n    \n}\n\npublic class Coder extends Participant {\n    \n}",
            hints: [
              "Participant has: protected String name, constructor, getRole() returning \"Participant\"",
              "Coder has: private String language, calls super(name), overrides getRole()",
              "Use Participant[] team = { new Coder(...), new Designer(...) }; and loop"
            ],
            solution: "public class Participant {\n    protected String name;\n    public Participant(String name) { this.name = name; }\n    public String getRole() { return \"Participant\"; }\n}\n\npublic class Coder extends Participant {\n    private String language;\n    public Coder(String name, String language) {\n        super(name);\n        this.language = language;\n    }\n    @Override\n    public String getRole() { return \"Coder (\" + language + \")\"; }\n}\n\npublic class Designer extends Participant {\n    private String tool;\n    public Designer(String name, String tool) {\n        super(name);\n        this.tool = tool;\n    }\n    @Override\n    public String getRole() { return \"Designer (\" + tool + \")\"; }\n}\n\n// Usage:\nParticipant[] team = {\n    new Coder(\"Aisha\", \"Python\"),\n    new Designer(\"Ben\", \"Figma\")\n};\nfor (Participant p : team) {\n    System.out.println(p.name + \" — \" + p.getRole());\n}"
          }
        ]
      }
    ]
  }
];

const BRIDGE = [
  { hatch: "Event listener block", python: "Callback / event handler", java: "ActionListener interface" },
  { hatch: "Variable block", python: "x = value", java: "int x = value;" },
  { hatch: "Loop block", python: "for / while", java: "for / while / enhanced for" },
  { hatch: "Conditional block", python: "if / elif / else", java: "if / else if / else" },
  { hatch: "Say block", python: "print()", java: "System.out.println()" },
  { hatch: "Ask and wait", python: "input()", java: "Scanner.nextLine()" },
  { hatch: "Custom block (My Blocks)", python: "def function():", java: "public void method() {}" },
  { hatch: "Broadcast message", python: "Function call / signal", java: "Method call / observer" }
];

const PROTOCOL = [
  { idx: "01", title: "Problem Framing", desc: "Define your problem in one sentence. What's the MVP — the smallest thing that works? What do judges care about: novelty, depth, polish, or impact?" },
  { idx: "02", title: "System Design", desc: "Map Input → Processing → Output. Frontend vs backend. In-memory vs database. Every function does one thing. Sketch on paper first." },
  { idx: "03", title: "Speed + Structure", desc: "Pseudocode first. Core logic before UI. Test every 10 lines. Save working states. Working ugly beats broken beautiful." },
  { idx: "04", title: "Debug Under Pressure", desc: "Strategic prints. Read the stack trace. Isolate variables. Minimal failing case. Stay calm — panic creates more bugs." },
  { idx: "05", title: "Competitive Edge", desc: "Meaningful names. Comments explain WHY. Always ask: \"What about 10x the data?\" Ship working, then polish what judges see." }
];

const LEVELS = [
  { num: "1", name: "Syntax Mastery", desc: "You write correct programs without looking things up. Variables, types, I/O, control flow. You predict output for straightforward code.", color: "var(--hatch)" },
  { num: "2", name: "Logical Thinking", desc: "You trace execution in your head. You spot logical errors. You understand scope, functions, return values. You explain WHY code does what it does.", color: "var(--python)" },
  { num: "3", name: "Algorithmic Reasoning", desc: "You pick the right algorithm. You understand Big-O. You compare approaches. You know search, sort, and core data structures. You optimize.", color: "var(--java)" },
  { num: "4", name: "Systems & Competition", desc: "You design multi-class systems. Encapsulation, polymorphism, architecture. You build hackathon MVPs under pressure with planning and confidence.", color: "var(--hack)" }
];

const REVIEW = [
  { title: "Correctness", desc: "Right output for ALL inputs — edge cases, empty, max values, unexpected types." },
  { title: "Time Complexity", desc: "What's the Big-O? Could a different data structure reduce it?" },
  { title: "Structure", desc: "Modular? Single-purpose functions? Each explained in one sentence?" },
  { title: "Readability", desc: "Meaningful names? Teammate could follow without explanation?" },
  { title: "One Improvement", desc: "Exactly ONE concrete, actionable next step." },
  { title: "One Scale Question", desc: "\"What happens with 10x the data?\"" }
];
