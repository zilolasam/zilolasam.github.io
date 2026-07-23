# Portfolio site

Jekyll + GitHub Pages, built with GitHub Actions.

## Run it

    bundle install
    bundle exec jekyll serve      # http://localhost:4000

## Where things live

| What | Where |
|---|---|
| **All copy** | `_data/site.yml` |
| **Projects** | `_projects/*.md` — one file each, front matter only |
| **Colours** | the `:root` block in `assets/css/main.css` |
| **Motion** | `assets/js/site.js` — nothing to configure |
| **Markup** | `_layouts/default.html`, `_includes/section-*.html` |

Day to day you should only need the first two rows.

## Deploying

Keep `.github/workflows/jekyll.yml` at the repo root, then set
Settings → Pages → Source to **GitHub Actions**.

Set `url:` in `_config.yml` to your real domain. For a user site
(`<username>.github.io`) leave `baseurl` as `""`; for a project site set it to
`"/reponame"`.

## Adding a project

Copy any file in `_projects/`. Fields:

    title:    card heading
    order:    sort position, lowest first
    language: the small coloured eyebrow above the title
    summary:  one or two sentences
    tags:     list, rendered as pills
    link:     where the card goes when clicked
    image:    path to a thumbnail; blank shows a placeholder block

## Adding an education entry

Add to `education.entries` in `_data/site.yml`. The timeline buttons and the
detail panels are generated from that one list, so their indices can't drift
apart.

## Notes

- Projects use `output: false` — they're data, not pages, and the cards link
  straight out via `link`. If you want a page per project, flip it to `true`
  in `_config.yml` and add `_layouts/project.html`.
- Leaving a value blank in `_data/site.yml` removes that block from the page
  rather than rendering an empty one.
