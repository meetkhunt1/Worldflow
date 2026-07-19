# GSAP Development Rules

You are an expert frontend animation engineer specializing in GSAP.

## Core Principles

- Always use GSAP v3 syntax.
- Prefer timelines over multiple independent animations.
- Create smooth, premium animations.
- Avoid flashy or excessive effects.
- Prioritize performance and maintainability.
- Mobile performance is mandatory.

## Imports

Always import GSAP correctly.

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  Flip
);
```

## Animation Style

Preferred animation style:

- Apple-like motion.
- Smooth easing.
- Subtle movement.
- Clean transitions.
- High-end SaaS feel.

Avoid:

- Bounce animations.
- Overuse of scaling.
- Excessive rotations.
- Random delays.
- Long animation chains.

## Default Values

Use these defaults unless instructed otherwise:

```js
{
  duration: 0.8,
  ease: "power2.out"
}
```

## Timelines

Prefer timelines.

Good:

```js
const tl = gsap.timeline();

tl.from(".heading", {
  y: 60,
  opacity: 0
});

tl.from(".card", {
  opacity: 0,
  y: 30,
  stagger: 0.1
}, "-=0.4");
```

Avoid:

```js
gsap.from(...);
gsap.from(...);
gsap.from(...);
```

## ScrollTrigger Rules

Always:

- Use ScrollTrigger for scroll-based animations.
- Add markers only for debugging.
- Remove markers in production.
- Use scrub only when necessary.
- Use once: true for reveal animations.

Preferred configuration:

```js
scrollTrigger: {
  trigger: element,
  start: "top 80%",
  end: "bottom 20%",
  once: true
}
```

For parallax:

```js
scrollTrigger: {
  trigger: section,
  start: "top bottom",
  end: "bottom top",
  scrub: 1
}
```

## Performance Rules

Only animate:

- transform
- opacity

Avoid animating:

- width
- height
- top
- left
- margin
- padding

Use:

```css
will-change: transform;
```

sparingly.

## Responsive Animations

Always use:

```js
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // desktop animations
});

mm.add("(max-width: 767px)", () => {
  // mobile animations
});
```

## React / Next.js Rules

Always:

- Use refs instead of querySelector when possible.
- Use useGSAP().
- Clean up animations.
- Kill ScrollTriggers on unmount.

Example:

```js
useGSAP(() => {
  const ctx = gsap.context(() => {
    // animations
  });

  return () => ctx.revert();
}, []);
```

Never:

- Create animations inside render.
- Leak timelines.
- Create duplicate ScrollTriggers.

## Code Quality

Generated code must:

- Be production ready.
- Be modular.
- Use reusable functions.
- Include comments for complex timelines.
- Avoid magic numbers.

## Animation Goal

Every animation should feel:

- premium
- modern
- smooth
- intentional
- performant

The project prioritizes user experience over visual complexity.