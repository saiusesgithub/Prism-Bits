<!-- Title format: feat(component): <framework>/<slug> -->

## Component

Closes #<!-- issue number you were assigned -->

**Name:**
**Route:** `/components/<category>/<slug>`

## Screenshot / GIF

<!-- Required for visual components. Drag & drop an image here.
     Use a GIF or short video if the component is animated. -->

## Checklist

- [ ] I was assigned the linked issue before opening this PR
- [ ] One component only; nothing changed outside `src/components/registry/<framework>/<category>/<slug>/`
- [ ] Folder names match `framework`, `category`, and `slug` in `meta.json` exactly
- [ ] All required files for my framework are present (see CONTRIBUTING.md table)
- [ ] `npm run validate:registry` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] The preview renders my real component locally at the route above
- [ ] Responsive at 360 px width and keyboard-accessible
- [ ] No external scripts, network calls, or new npm dependencies
- [ ] This is my original work (or attribution + license is stated below)

## Notes for reviewers

<!-- Anything worth knowing: design decisions, browser quirks, attribution, etc. -->
