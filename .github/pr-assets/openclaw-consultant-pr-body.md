## Summary
- publish the next scheduled content calendar post: **OpenClaw Consultant: When DIY Isn't Enough**
- add a dedicated long-form blog page with Article + FAQ schema
- update the blog registry and static build output

## What changed
- added `src/pages/blog/openclaw-consultant.tsx`
- added `openclaw-consultant` to `src/config/blogPosts.ts`
- excluded the new dedicated page from the generic `[slug]` renderer
- regenerated `docs/` with `make build`
- added a PR screenshot for review

## QA
- `npm run lint`
- `make build`

## Screenshot
![OpenClaw Consultant blog post](.github/pr-assets/openclaw-consultant-desktop.png)
