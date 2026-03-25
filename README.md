# HTML-CSS-JS

A collection of web development projects, exercises, and experiments I've built over time while learning and practicing front-end development. It's a mix of everything — algorithm challenges, visual effects, UI components, and good old trial-and-error.

If you're browsing this repo, the most interesting stuff is probably in `projects/` and `exercises/`.

## Tech Stack

Vanilla JavaScript (ES6+), HTML5, CSS3, jQuery, Three.js, GSAP, WebGL, Canvas API, SCSS, Jest

## Repository Structure

```
├── projects/              Interactive demos and visual experiments
├── exercises/             Algorithm challenges, DP problems, UI components
│   ├── Academy/           Coding academy algorithm challenges
│   ├── Dynamic Programming/  Classic DP problems with multiple approaches
│   ├── Useful/            Practical UI components
│   └── Not so Useful/     Misc small exercises
├── OOP/                   Object-oriented JavaScript examples
├── JQ stuff/              jQuery-based components
└── first steps/           Beginner HTML/CSS/JS tutorials
```

---

## projects/

Standalone interactive demos and visual experiments.

| Project | Description | Tech |
|---------|-------------|------|
| **TouchEvents** | Mobile touch event handling demo | Vanilla JS |
| **animated-svg-demo-main** | SVG triangles that change colors on click with randomized animation | SVG, JS |
| **cursor follow** | Multi-layer image that tracks cursor position with parallax depth | jQuery, CSS |
| **dots** | Animated collision detection simulation — 50 dots with catcher/runner AI and pathfinding | Vanilla JS, requestAnimationFrame |
| **glassmorphism** | Frosted glass UI effect using `backdrop-filter`, animated with GSAP | CSS, GSAP |
| **hexagon particles** | Canvas-based hexagon particle visualization | Canvas API, JS |
| **intersectionObserver** | 26 cards that animate in on scroll using the Intersection Observer API | Vanilla JS, CSS animations |
| **parallax scrolling** | Text sections with different scroll speeds creating a depth effect | Vanilla JS, CSS |
| **particles** | WebGL particle system | Three.js, WebGL |
| **random walker** | Random walk algorithm visualization | JS |
| **shader-3d-image-transition** | 3D image transitions with GLSL shaders and mouse-controlled orbit | Three.js, GLSL (BAS.js), TweenMax |
| **testing-with-jest** | Unit testing examples with coverage — sum, subtract, cloneArray | Jest, Node.js |
| **text animations** | Collection of text effects: typewriter (CSS/SCSS), line reveal, scramble text, letter-by-letter | CSS animations, JS |

---

## exercises/

### Academy

Algorithm challenges from a coding academy. All vanilla JavaScript.

- **Minesweeper** — Full interactive Node.js minesweeper game with difficulty levels and recursive reveal
- **Green vs. Red** — Conway's Game of Life variant with 4 cellular automaton rules
- **Spiral Matrix** — Generates an NxN spiral matrix using directional iteration
- **Anagrams** — Groups anagrams together using Set deduplication, with performance comparisons
- **Enigma** — Binary encoding algorithm based on positional rules
- **Alpha Students** — Linked list manipulation with filtering and node swaps
- **Bracket expressions** — Extracts matching bracket pairs from equations
- **Page Calculator** — Calculates keyword page positions given words-per-page
- **Primes to N** — Prime number generator with `isPrime` utility
- **Prime Triangle, Kangaroo, Scrooge McDuck, Combinations, matrixMaxSum** — Various algorithm exercises
- **Longest Block in String, Longest Sequence of Equal** — String/sequence problems

### Dynamic Programming

Classic DP problems, each implemented with up to 3 approaches: naive recursion, memoization, and tabulation. Includes performance comparisons (e.g., `gridTraveller` 18x18: 50 sec naive vs 0.09 sec memoized).

- **fibonacci** — The classic, three ways
- **canSum / howSum / bestSum** — Sum combination problems with increasing complexity
- **canConstruct / countConstruct / allConstruct** — String construction from word bank
- **gridTraveller** — Count paths on a 2D grid (down/right only)

### Useful

Practical UI components and JS concepts.

- **slider** — Image carousel with prev/next arrows, dot indicators, and fade transitions
- **login form** — Animated login form with styled inputs and submit button
- **neonBtn** — Neon glow button effect with animated CSS borders
- **profile block** — Profile card component with image, name, and close button
- **email verif** — Email verification UI component
- **closure** — JavaScript closures demo: banking balance with deposit/withdraw, plus currying

### Not so Useful

Miscellaneous small exercises — nothing groundbreaking, but they were fun to write.

- Roman numeral converters (two implementations)
- Quadratic equation solver with form UI
- Character counter with subscription plan picker
- Text censoring filter
- Custom sorting, balanced numbers, reduce examples

---

## OOP/

Object-oriented JavaScript examples using ES6 classes.

- **class & methods** — Class definition, constructors, instance methods, and `this` binding pitfalls
- **overloading overwriting** — Inheritance with `extends`/`super()`, method overriding across Person, Doctor, Engineer, and Janitor classes

---

## JQ stuff/

jQuery-powered UI components.

- **jQ panels** — Tabbed panel navigation with active/inactive state switching
- **jQ slider** — Image slider with jQuery animation transitions

---

## first steps/

Where it all started. Beginner tutorials and practice pages for learning the fundamentals.

- **html example** — Covers headings, paragraphs, links, lists, tables, forms, semantic markup
- **css example** — Layout practice: containers, flexbox, borders, padding, colors
- **js** — Variables, objects, arrays, functions — the basics
- **trash site** — A full beginner page layout with header, nav, content, sidebar, and footer
