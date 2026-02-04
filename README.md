# See_theShow! - Peter F. Wingard Portfolio

A Jekyll-powered portfolio website featuring astrophotography, web applications, musings, and more.

---

## 🚀 iOS App Development Plan - Moondance

**Status:** Planning Phase
**Target:** Convert Moondance web app to paid iOS app
**Pricing:** $5/year subscription
**Development Approach:** Native Swift/SwiftUI

### Why iOS App?
- **Subscription Management:** Apple handles all payments, renewals, refunds via StoreKit
- **Beta Testing:** TestFlight for up to 10,000 testers
- **Professional Result:** Native iOS experience
- **Market Opportunity:** 300-500k astrophotographers worldwide, targeting 3% adoption

### Revenue Projections
- Target: 15,000 users (3% of 500k astrophotographers)
- Annual Revenue: $75,000
- After Apple's cut: $52,500 (Year 1 at 30%), $63,750 (Year 2+ at 15%)

### Development Workflow with Claude Code
1. **Mac Setup:** Transfer project to Mac, install Claude Code
2. **Claude Code creates:** All Swift/SwiftUI files directly in project folder
3. **You open:** Project in Xcode (double-click `.xcodeproj`)
4. **You build/run:** Click "Build and Run" to test
5. **Iterate:** Claude Code can read/modify files, fix errors

### Before Starting Development
- [ ] Check "Moondance" name availability on App Store
- [ ] Backup name options: "Moondance Pro", "LunarDance", "MoonTracker"
- [ ] Search USPTO.gov for trademark availability
- [ ] Set up Apple Developer account ($99/year)
- [ ] Install Xcode on Mac

### What Moondance Does
Moon tracking tool for astrophotographers:
- Lunar phases
- Rise/set times
- Celestial position tracking

### Current Web App
- Live at: https://moondance.pfwingard.com
- Will be rebuilt as native iOS app

---

## Setup

### Prerequisites
- Ruby (2.7 or higher)
- Bundler gem

### Local Development

1. Install dependencies:
```bash
bundle install
```

2. Run the Jekyll server:
```bash
bundle exec jekyll serve
```

3. View the site at `http://localhost:4000`

## Content Management

Content is managed through YAML data files in the `_data/` directory. Simply edit these files to add or update content.

### Adding Videos (Musings)

Edit `_data/musings.yml`:

```yaml
- title: "My Video Title"
  description: "Video description"
  video_url: "https://www.youtube.com/embed/VIDEO_ID"
  date: 2026-01-31
  thumbnail: "/assets/thumbnails/video1.jpg"
```

**Getting the YouTube embed URL:**
1. Go to your YouTube video
2. Click "Share" → "Embed"
3. Copy the URL from `src="..."` in the iframe code

### Adding Astrophotography

Edit `_data/photos.yml`:

```yaml
- name: "M45 The Pleiades"
  subdomain: "m45"
  url: "https://m45.pfwingard.com"
  description: "The Seven Sisters star cluster"
  thumbnail: "/assets/thumbnails/m45-thumb.jpg"
  date: 2026-01-31
```

Each photo should have its own subdomain that displays the full artwork.

### Adding Web Applications

Edit `_data/webapps.yml`:

```yaml
- name: "Sky Calculator"
  subdomain: "skycalc"
  url: "https://skycalc.pfwingard.com"
  description: "Calculate celestial positions"
  thumbnail: "/assets/thumbnails/skycalc.jpg"
  tags: ["astronomy", "calculator"]
```

### Adding Web Tools

Edit `_data/tools.yml`:

```yaml
- name: "Image Processor"
  url: "/tools/image-processor"
  description: "Process and optimize images"
  thumbnail: "/assets/thumbnails/tool.jpg"
  tags: ["images", "utility"]
```

### Adding Books

Edit `_data/books.yml`:

```yaml
- title: "Stargazer's Guide"
  url: "/books/stargazers-guide"
  description: "A beginner's guide to astronomy"
  cover: "/assets/covers/book1.jpg"
  status: "In Progress"
  year: 2026
```

### Adding Social Media Links

Edit `_data/social.yml`:

```yaml
- name: "GitHub"
  url: "https://github.com/pwingard"
  icon: "github"
```

## GitHub Pages Deployment

### One-time Setup

1. Go to your GitHub repository settings
2. Navigate to "Pages" section
3. Set Source to "Deploy from a branch"
4. Select branch: `main`
5. Select folder: `/ (root)`
6. Click "Save"

### Publishing Changes

Simply commit and push your changes:

```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Pages will automatically build and deploy your site within a few minutes.

## File Structure

```
pfwingard.com/
├── _config.yml           # Jekyll configuration
├── _layouts/             # HTML layouts
│   ├── default.html      # Base layout
│   └── page.html         # Page layout with navigation
├── _data/                # Content data files (YAML)
│   ├── musings.yml       # Video content
│   ├── photos.yml        # Astrophoto listings
│   ├── webapps.yml       # Web app listings
│   ├── tools.yml         # Web tools
│   ├── books.yml         # Books
│   └── social.yml        # Social media links
├── index.html            # Homepage
├── musings.html          # Video gallery page
├── astrophotos.html      # Photo listings page
├── webapps.html          # Web apps page
├── tools.html            # Tools page
├── books.html            # Books page
├── styles.css            # All styles
├── script.js             # Navigation and animations
└── pleiades.jpg          # Background image

Generated by Jekyll (ignored by git):
├── _site/                # Built static site
└── .jekyll-cache/        # Jekyll cache
```

## Managing Content

### Option 1: Edit on GitHub
- Navigate to the file in GitHub's web interface
- Click the pencil icon to edit
- Commit changes directly

### Option 2: Use Claude Code
- Tell Claude to "add a new video to musings" or similar
- Claude will edit the appropriate YAML file and commit

### Option 3: Edit Locally
- Clone the repo
- Edit YAML files
- Test with `bundle exec jekyll serve`
- Commit and push

## Tips

- Keep thumbnail images under 200KB for fast loading
- Use consistent image dimensions for thumbnails (e.g., 400x300px)
- Store images in an `assets/` directory (you may need to create this)
- YouTube embeds are free and handle video hosting for you

## Troubleshooting

### Site not updating on GitHub Pages
- Check the "Actions" tab for build errors
- Ensure Jekyll build completes successfully locally
- GitHub Pages may take 2-5 minutes to reflect changes

### Videos not displaying
- Verify the YouTube embed URL is correct
- Check that the URL starts with `https://www.youtube.com/embed/`
- Ensure the video is not private

### Images not loading
- Check that image paths are correct
- Verify images are committed to the repository
- Use relative paths starting with `/`

## License

© 2026 Peter F. Wingard
