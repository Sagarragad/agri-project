# Agricultural Slideshow - Next.js

A modern, responsive slideshow application built with Next.js, featuring automatic image transitions with an agricultural theme.

## Features

- ✅ **Next.js 14** with React 18
- ✅ **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- ✅ **Auto-Slide**: Images automatically advance every 5 seconds
- ✅ **Modern UI**: Beautiful agricultural-themed interface with smooth animations
- ✅ **Touch Swipe**: Swipe left/right on mobile devices
- ✅ **Keyboard Navigation**: Arrow keys and spacebar support
- ✅ **Background Music**: Optional agricultural-themed music
- ✅ **Image Optimization**: Next.js Image component for optimal performance
- ✅ **Lightweight**: Fast loading on mobile devices

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Copy Images**:
   - Ensure the `ilovepdf_pages-to-jpg` folder is in the `public` directory
   - The images should be accessible at `/ilovepdf_pages-to-jpg/RAGAD SIR_page-XXXX.jpg`

3. **Background Music (Optional)**:
   - Add `agricultural-music.mp3` or `agricultural-music.ogg` to the `public` folder
   - The website works perfectly without it

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Main slideshow component
│   ├── page.module.css      # Component styles
│   └── globals.css          # Global styles
├── public/
│   ├── ilovepdf_pages-to-jpg/  # Image files
│   └── agricultural-music.mp3  # Background music (optional)
├── package.json
├── next.config.js
└── tsconfig.json
```

## Controls

- **Play/Pause Button**: Toggle auto-slide functionality
- **Mute Button**: Toggle background music
- **Arrow Keys**: Navigate slides manually (left/right)
- **Spacebar**: Go to next slide
- **Touch Swipe**: Swipe left/right on mobile devices
- **Navigation Arrows**: Click the arrow buttons on sides

## Image Requirements

The application expects images named:
- `RAGAD SIR_page-0001.jpg` through `RAGAD SIR_page-0032.jpg`
- Located in `public/ilovepdf_pages-to-jpg/`

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Next.js Image component with lazy loading
- Preloading next image for smooth transitions
- Optimized CSS with minimal animations
- Responsive image sizing
- Efficient state management

## Color Palette

The website uses an agricultural color scheme:
- Primary Green: #4a7c59
- Secondary Green: #6b9b7a
- Earth Brown: #8b6f47
- Wheat Gold: #d4a574
- Sky Blue: #87ceeb
- Cream: #f5f5dc

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## License

MIT
