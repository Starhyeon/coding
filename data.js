// ═══════════════════════════════════════
// KIDOYO LAUNCHPAD_ — DATA
// ═══════════════════════════════════════

const TRACKS = [
  {
    id: "hatch", name: "Hatch", icon: "H", iconClass: "track-icon-hatch",
    meta: "Visual foundations · Block-based", levels: ["L1", "L2"],
    lessons: [
      { num: "01", title: "Events & Listeners", level: "L1", steps: [
        { label: "DEFINITION", title: "What is an Event?", body: "An event is a signal that something happened — a click, a key press, a timer. An event listener waits for a specific event and runs code when it fires. In Hatch: the \"When [event] happens\" block." },
        { label: "MECHANISM", title: "The Event Loop", body: "Hatch runs a continuous loop checking: \"Did anything happen?\" When you snap a \"When green flag clicked\" block, you register a listener. The runtime stores a reference to your code and triggers it when the matching event fires. Multiple listeners can exist for the same event — they all run." },
        { label: "REAL-WORLD", title: "Production Use", body: "Every app is event-driven. Tapping your phone fires a touch event. A server receiving a request is an event. Game engines run thousands of event checks per second. This isn't a beginner concept — it's a production concept you're learning early." },
        { label: "BUILD IT", title: "Hatch Example", code: "// Hatch Blocks (pseudocode)\nWhen [green flag] clicked:\n    say \"Welcome!\" for 2 seconds\n    set [score] to 0\n\nWhen [space] key pressed:\n    change [score] by 1\n    say join(\"Score: \", [score])", body: "Two independent listeners, two independent triggers. The first initializes state, the second modifies it." },
        { label: "FAILURE CASES", title: "Where This Breaks", list: ["Race condition: Two events modify the same variable simultaneously — unpredictable results.", "Missing initialization: Pressing space before green flag — score might not exist.", "Infinite loop in listener: A \"forever\" block inside a listener blocks everything else."] },
        { label: "THINK", title: "Guided Questions", body: "❶ What happens if you press space before clicking the green flag?\n❷ What if TWO \"When green flag\" blocks both set score — one to 0, one to 10?\n❸ How would you respond to BOTH space AND up-arrow?" },
        { label: "CHALLENGE", title: "Build This", body: "Create a project with THREE event listeners: green flag (setup), key press (action), sprite click (different action). Each modifies a shared variable. Write down what you predict will happen before building." }
      ]},
      { num: "02", title: "Variables & State", level: "L1", steps: [
        { label: "DEFINITION", title: "What is a Variable?", body: "A variable is a named container that stores a value which can change during execution. In Hatch: \"Make a Variable.\" It holds one value at a time — number, string, or boolean." },
        { label: "MECHANISM", title: "Memory Under the Hood", body: "Creating a variable allocates a memory slot. \"Set [score] to 5\" writes 5 into that slot. \"Change [score] by 1\" reads the current value, adds 1, writes back. Every read and write is a separate operation — order matters." },
        { label: "BUILD IT", title: "Game State", code: "When [green flag] clicked:\n    set [lives] to 3\n    set [score] to 0\n    set [game_over] to false\n\nWhen [space] pressed:\n    if [game_over] = false then\n        change [score] by 10\n\nWhen I receive [hit]:\n    change [lives] by -1\n    if [lives] = 0 then\n        set [game_over] to true\n        say \"Game Over!\"", body: "Three variables track entire game state. The game_over flag acts as a guard — prevents score changes after death. This pattern appears in every language." },
        { label: "FAILURE CASES", list: ["Uninitialized variable: Using score before setting it to 0 gives unpredictable results.", "Wrong type: Setting lives to \"three\" instead of 3 — then \"change by -1\" breaks.", "Missing guard: Without the game_over check, players keep scoring after dying."] },
        { label: "CHALLENGE", title: "Build This", body: "Add a shield power-up: a new variable that, when true, prevents lives from decreasing on [hit]. Shield turns off after one use. Plan the logic flow before building." }
      ]},
      { num: "03", title: "Loops & Repetition", level: "L2", steps: [
        { label: "DEFINITION", body: "A loop repeats code: fixed count (repeat n), forever, or until a condition (repeat until). The efficiency of what's INSIDE determines whether your program takes 1 second or 1 hour." },
        { label: "BUILD IT", title: "Countdown Timer", code: "When [green flag] clicked:\n    set [timer] to 10\n    repeat until [timer] = 0:\n        say [timer] for 1 second\n        change [timer] by -1\n    say \"Launch!\"", body: "Trace it: timer=10 → display \"10\", wait 1s, timer=9 → display \"9\" ... → timer=0, loop exits → \"Launch!\" Exactly 10 iterations." },
        { label: "FAILURE CASES", list: ["Infinite loop: Forgot \"change timer by -1\" — timer stays at 10 forever.", "Off-by-one: Does this display 0? Trace carefully. (It doesn't — exits when timer reaches 0 before displaying.)", "Performance: Complex calculations inside a forever loop when they only need to run once."] },
        { label: "THINK", body: "❶ How many times does \"say\" execute if timer starts at 10?\n❷ What if you change \"= 0\" to \"< 0\"?\n❸ What happens if timer starts at -5?" },
        { label: "CHALLENGE", body: "Build a Hatch animation that moves a sprite across the screen in a loop, but ACCELERATES. What variable tracks speed? Plan before building." }
      ]},
      { num: "04", title: "Conditionals & Branching", level: "L2", steps: [
        { label: "DEFINITION", body: "A conditional evaluates a boolean expression and executes different code paths. Hatch: \"if...then\", \"if...then...else\". Conditions are evaluated once per encounter — they don't \"watch\" continuously unless inside a loop." },
        { label: "BUILD IT", title: "Access Control", code: "When [green flag] clicked:\n    ask \"What's the password?\" and wait\n    if (answer) = \"kidoyo\" then\n        say \"Access granted!\"\n        broadcast [start-game]\n    else\n        say \"Wrong password.\"\n        stop [all]", body: "Two completely different outcomes from one boolean check. The else path terminates the program. This is an access control pattern used in real security systems." },
        { label: "FAILURE CASES", list: ["Case sensitivity: \"Kidoyo\" ≠ \"kidoyo\" — fails even though the user \"meant\" the right thing.", "No else branch: Wrong password does nothing — program silently continues.", "Nested spaghetti: Three levels of if/else becomes unreadable fast."] },
        { label: "CHALLENGE", body: "Build a 3-question quiz with score tracking. Nested conditionals for feedback: 3/3 = \"Perfect!\", 2/3 = \"Almost!\", 1/3 = \"Keep trying\", 0/3 = \"Let's review.\" Plan variable flow first." }
      ]}
    ]
  },
  {
    id: "python", name: "Python", icon: "Py", iconClass: "track-icon-python",
    meta: "Build power · Dynamic typed", levels: ["L1", "L2", "L3", "L4"],
    lessons: [
      { num: "01", title: "Variables, Types & Memory", level: "L1", steps: [
        { label: "DEFINITION", body: "In Python, a variable is a name that references an object in memory. Unlike Hatch where a variable IS the box, in Python the variable is a label stuck to a box. Multiple labels can point to the same box." },
        { label: "MECHANISM", title: "References & Identity", code: "x = [1, 2, 3]\ny = x              # y points to SAME list\ny.append(4)\nprint(x)           # [1, 2, 3, 4] ← x changed too!\n\na = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b)      # True  — same value\nprint(a is b)      # False — different objects", body: "Python stores all values as objects on the heap. Assignment copies the reference, not the value. This is why 'is' (identity) and '==' (equality) are different." },
        { label: "REAL-WORLD", body: "Bugs caused by shared references crash production systems. When you pass a list to a function and it modifies it, the caller's data changes too. Understanding this prevents an entire category of bugs." },
        { label: "FAILURE CASES", list: ["Mutable default: def add(item, lst=[]) — default list shared across ALL calls.", "String immutability: s[0] = \"H\" → TypeError. Strings can't be modified in place.", "Integer caching: 256 is 256 → True. 257 is 257 → may be False."] },
        { label: "THINK", body: "❶ What does x = [1,2]; y = x[:]; y.append(3) do to x? Why?\n❷ Is a string mutable or immutable? How do you know?\n❸ Why does Python use references instead of always copying?" },
        { label: "CHALLENGE", body: "Write a function that takes a list, returns a NEW list with duplicates removed, WITHOUT modifying the original. Verify with 'is'. Which data structure gives O(1) duplicate checking?" }
      ]},
      { num: "02", title: "Functions & Scope", level: "L2", steps: [
        { label: "DEFINITION", body: "A function takes inputs, performs computation, returns output. It creates its own scope — local variables don't leak out." },
        { label: "MECHANISM", title: "Stack Frames", code: "def calculate_score(hits, misses):\n    accuracy = hits / (hits + misses) if (hits + misses) > 0 else 0\n    bonus = 50 if accuracy > 0.9 else 0\n    return (hits * 10) + bonus\n\nscore = calculate_score(18, 2)  # 230\nprint(accuracy)  # NameError! — scope ended", body: "On call, Python creates a new stack frame — a private workspace. Parameters are local. When the function returns, the frame is destroyed." },
        { label: "FAILURE CASES", list: ["Forgetting return: Function computes but returns None.", "Modifying mutable argument: def f(lst): lst.append(1) modifies caller's list.", "Division by zero: The guard above prevents a crash when both inputs are 0."] },
        { label: "CHALLENGE", body: "Build a hackathon scoring system: score_technical(features, bugs), score_design(ui, ux), total_score() that calls both with weights. Validate inputs. Plan signatures first." }
      ]},
      { num: "03", title: "Data Structures & Big-O", level: "L3", steps: [
        { label: "DEFINITION", body: "A data structure organizes data for efficient access. Big-O describes how time grows with data size. O(1) = constant, O(n) = linear, O(n²) = quadratic." },
        { label: "MECHANISM", title: "Choosing the Right Container", code: "# LIST — ordered, O(n) search\nusers = [\"alice\", \"bob\", \"carol\"]\n\"bob\" in users    # O(n) — checks each element\n\n# SET — unordered, O(1) lookup\nuser_set = {\"alice\", \"bob\", \"carol\"}\n\"bob\" in user_set  # O(1) — hash lookup\n\n# DICT — key:value, O(1) access\nscores = {\"alice\": 95, \"bob\": 87}\nscores.get(\"dave\", 0)  # 0 — safe, no crash", body: "With 1,000,000 users: list search = ~500k comparisons. Set = 1. Same answer, massively different speed." },
        { label: "FAILURE CASES", list: ["Nested loops on lists: O(n²). Convert one to a set first = O(n).", "List when order doesn't matter: Set is always faster for membership.", "Dict KeyError: scores[\"dave\"] crashes. Use .get(\"dave\", 0)."] },
        { label: "CHALLENGE", body: "Hackathon scenario: duplicate event detector for 10,000 timestamps. Write it O(n²) and O(n). Time both. Which ships?" }
      ]},
      { num: "04", title: "OOP — Classes & Systems", level: "L4", steps: [
        { label: "DEFINITION", body: "OOP organizes code into classes (blueprints) and objects (instances). A class defines attributes (data) and methods (behavior). This lets you model real-world entities." },
        { label: "MECHANISM", title: "Building Systems", code: "class HackathonTeam:\n    def __init__(self, name, members):\n        self.name = name\n        self.members = members\n        self.submissions = []\n        self.score = 0\n\n    def submit_project(self, project_name, demo_url):\n        if not project_name or not demo_url:\n            raise ValueError(\"Both required\")\n        self.submissions.append({\n            \"name\": project_name,\n            \"url\": demo_url\n        })\n\nalpha = HackathonTeam(\"Alpha\", [\"Aisha\", \"Ben\"])\nalpha.submit_project(\"EcoTrack\", \"https://eco.demo\")", body: "HackathonTeam(\"Alpha\", ...) allocates on the heap. 'self' references THAT specific object. Each instance is independent." },
        { label: "CHALLENGE", body: "Design: Team, Judge, Hackathon classes. Judges score teams, Hackathon ranks by total. Class diagram BEFORE code." }
      ]}
    ]
  },
  {
    id: "java", name: "Java", icon: "Ja", iconClass: "track-icon-java",
    meta: "Engineering discipline · Static typed", levels: ["L2", "L3", "L4"],
    lessons: [
      { num: "01", title: "Types, Compilation & Safety", level: "L2", steps: [
        { label: "DEFINITION", body: "Java is statically typed and compiled. Every variable declares its type. The compiler checks correctness BEFORE the program runs." },
        { label: "MECHANISM", title: "Compile-Time Safety", code: "int score = 0;              // 4 bytes, stack\nString teamName = \"Alpha\";  // reference → heap\nboolean isActive = true;\n\nscore = \"ten\";  // ❌ COMPILE ERROR\n\n// Python: runs fine, crashes later\n// score = \"ten\" → score + 1 → TypeError at RUNTIME", body: "Java's compiler reads your entire program, verifying types match everywhere. Mismatches caught BEFORE execution. Python checks at runtime — bugs hide until that line runs." },
        { label: "FAILURE CASES", list: ["Narrowing: int x = 3.14; → error. Need cast: (int) 3.14 — loses .14.", "Null reference: String s = null; s.length(); → compiles, crashes at runtime.", "Integer overflow: MAX_VALUE + 1 wraps negative. No error."] },
        { label: "CHALLENGE", body: "Declare hackathon entry variables with wrong types. Read compiler errors. Write same in Python — which caught more?" }
      ]},
      { num: "02", title: "Classes, Objects & Constructors", level: "L3", steps: [
        { label: "DEFINITION", body: "A class defines fields (data) and methods (behavior). An object is an instance. A constructor initializes new objects." },
        { label: "MECHANISM", title: "Encapsulation", code: "public class Project {\n    private String name;\n    private String[] techStack;\n    private int linesOfCode;\n\n    public Project(String name, String[] techStack) {\n        this.name = name;\n        this.techStack = techStack;\n        this.linesOfCode = 0;\n    }\n\n    public void addCode(int lines) {\n        if (lines > 0) this.linesOfCode += lines;\n    }\n\n    public int getLinesOfCode() {\n        return this.linesOfCode;\n    }\n}\n\nProject p = new Project(\"EcoTrack\", new String[]{\"Python\", \"Flask\"});\np.addCode(150);", body: "'new' allocates on heap. 'private' = only Project methods touch fields. This is encapsulation." },
        { label: "FAILURE CASES", list: ["No constructor: Project p; then p.addCode(10) → NullPointerException.", "Missing 'this': Same-name parameter and field — assigns to itself.", "Public fields: Any code can set linesOfCode = -999."] },
        { label: "CHALLENGE", body: "Design Judge class: name, expertise, scores list. addScore validates 1-10. getAverage computes mean. All fields private. Why?" }
      ]},
      { num: "03", title: "Inheritance & Polymorphism", level: "L3", steps: [
        { label: "DEFINITION", body: "Inheritance: child class gets parent's fields/methods. Polymorphism: treat children as parent type — correct method runs based on actual object." },
        { label: "MECHANISM", title: "Dynamic Dispatch", code: "public class Participant {\n    protected String name;\n    public Participant(String name) { this.name = name; }\n    public String getRole() { return \"Participant\"; }\n}\n\npublic class Coder extends Participant {\n    private String language;\n    public Coder(String name, String language) {\n        super(name);\n        this.language = language;\n    }\n    @Override\n    public String getRole() {\n        return \"Coder (\" + language + \")\";\n    }\n}\n\nParticipant p = new Coder(\"Aisha\", \"Python\");\np.getRole();  // \"Coder (Python)\" — not \"Participant\"!", body: "Declared as Participant, actual object is Coder. Java calls the Coder's method at runtime. One interface, multiple behaviors." },
        { label: "CHALLENGE", body: "Build: Participant → Coder, Designer, Presenter. Each overrides contribute(). Polymorphic array loop. Class diagram first." }
      ]},
      { num: "04", title: "Encapsulation & System Design", level: "L4", steps: [
        { label: "DEFINITION", body: "Encapsulation hides internal state, requiring interaction through methods. Abstraction exposes only what's necessary. Together: components change internally without breaking the system." },
        { label: "MECHANISM", title: "Defensive Patterns", code: "public class Scoreboard {\n    private Map<String, Integer> scores = new HashMap<>();\n\n    public void addScore(String team, int points) {\n        if (points < 0 || points > 100)\n            throw new IllegalArgumentException(\"0-100\");\n        scores.put(team, scores.getOrDefault(team, 0) + points);\n    }\n\n    public Map<String, Integer> getScores() {\n        return new HashMap<>(scores);  // defensive copy!\n    }\n}", body: "Returning 'this.scores' directly lets callers bypass validation. Defensive copy prevents this — a critical production pattern." },
        { label: "CHALLENGE", body: "Design Hackathon Platform: Hackathon, Team, Submission, Scoreboard. All private fields. Justify access modifiers. Architecture diagram → then code." }
      ]}
    ]
  }
];

const BRIDGE = [
  { hatch: "Event listener block", python: "Callback function", java: "ActionListener / interface" },
  { hatch: "Variable block", python: "Dynamic assignment", java: "Typed declaration" },
  { hatch: "Loop block", python: "for / while loop", java: "for / while / enhanced for" },
  { hatch: "Conditional block", python: "if / elif / else", java: "if / else if / else" },
  { hatch: "State change", python: "Instance variable mutation", java: "Field update via setter" },
  { hatch: "Broadcast message", python: "Function call / signal", java: "Method / observer pattern" }
];

const PROTOCOL = [
  { idx: "01", title: "Problem Framing", desc: "One-sentence problem definition. Technical or UX? What's the MVP — the smallest working thing that impresses judges? Novelty, depth, polish, or impact?" },
  { idx: "02", title: "System Design", desc: "Think in systems before code. Input → Processing → Output. Frontend vs backend. In-memory vs database. Every function does one thing. Sketch on paper first." },
  { idx: "03", title: "Speed + Structure", desc: "Pseudocode first. Core logic before UI. Test in small increments. Save working states. A working ugly prototype beats a broken beautiful one." },
  { idx: "04", title: "Debug Under Pressure", desc: "Strategic print statements. Read the stack trace — it tells you where. Isolate variables. Minimal failing case. Stay calm — panic creates more bugs." },
  { idx: "05", title: "Competitive Edge", desc: "Clean code, meaningful names. Comments explain WHY. Algorithmic optimization. Always ask: \"What happens with 10x the data?\" Ship working, then polish." }
];

const LEVELS = [
  { num: "1", name: "Syntax Mastery", desc: "Writes correct programs without references. Variables, types, I/O, basic control flow. Predicts output for straightforward programs.", color: "var(--hatch)" },
  { num: "2", name: "Logical Thinking", desc: "Traces execution mentally. Predicts complex output. Identifies logical errors. Understands scope and function calls. Explains WHY.", color: "var(--python)" },
  { num: "3", name: "Algorithmic Reasoning", desc: "Selects appropriate algorithms. Big-O. Compares approaches by efficiency. Searching, sorting, data structures. Optimizes working solutions.", color: "var(--java)" },
  { num: "4", name: "Systems & Competition", desc: "Multi-class systems. Encapsulation, polymorphism, architecture. Hackathon MVPs with planning, time pressure, and execution. Ready to ship.", color: "var(--hack)" }
];

const REVIEW = [
  { title: "Correctness", desc: "Right output for ALL inputs — edge cases, empty, max values, unexpected types." },
  { title: "Time Complexity", desc: "What's the Big-O? Could a different data structure drop it?" },
  { title: "Structure", desc: "Modular? Single-purpose functions? Explain each in one sentence?" },
  { title: "Readability", desc: "Meaningful names? Easy to follow? Teammate could understand?" },
  { title: "One Improvement", desc: "Exactly ONE concrete, actionable next step." },
  { title: "One Scale Question", desc: "\"What happens with 10,000 users? 1 million records?\"" }
];
