# Design Guidelines: Izzy & Zé Wedding RSVP Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern wedding websites (Joy, Zola, Minted) combined with nostalgic home video aesthetics. The design balances minimalist elegance with warm, personal touches to complement the homemade video feel.

## Core Design Principles
1. **Nostalgic Minimalism**: Clean, uncluttered layouts that let the emotional video content shine
2. **Readable Elegance**: Text must remain legible over dynamic video backgrounds
3. **Effortless Navigation**: Smooth, intuitive user journey from hero to RSVP
4. **Multi-language Harmony**: Consistent visual language across all three locales

## Color Palette

### Current Phase (Black & White)
- **Primary Text**: 0 0% 10% (near black, softer than pure black)
- **Secondary Text**: 0 0% 40% (medium gray for supporting info)
- **Background**: 0 0% 98% (off-white, easier on eyes than pure white)
- **Accent Elements**: 0 0% 20% (dark gray for buttons/borders)
- **Video Overlay**: 0 0% 0% with 40% opacity (to ensure text readability)

### Future Color Considerations
Reserve flexibility for warm, romantic tones (soft blushes, sage greens, or warm earth tones) that complement nostalgic video footage.

## Typography

**Primary Font**: Cormorant Garamond (Google Fonts)
- Hero Names: 400 weight, 4rem to 6rem (responsive)
- Section Headings: 500 weight, 2.5rem to 3rem

**Secondary Font**: Inter (Google Fonts)  
- Body Text: 400 weight, 1rem to 1.125rem
- Event Details: 500 weight, 1.125rem
- Form Labels: 400 weight, 0.875rem
- Navigation: 500 weight, 0.875rem

**Hierarchy**: Serif for emotional, romantic elements; Sans-serif for functional, informational content

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 24, and 32
- Micro spacing (between related elements): 4 units
- Component padding: 8-12 units  
- Section gaps: 16-24 units
- Major section padding: 24-32 units

**Container Strategy**:
- Hero: Full-width viewport (w-full)
- Content sections: max-w-4xl centered
- Form container: max-w-2xl centered
- Mobile padding: px-6
- Desktop padding: px-8

## Component Library

### Hero Section with Video Background
- **Full viewport height** (min-h-screen) with video as background layer
- **Video overlay**: Dark gradient from top-bottom (opacity 40-60%) ensuring text contrast
- **Content positioning**: Centered vertically and horizontally
- **Text stack**: 
  - Couple names in large serif (60-96px responsive)
  - Location/Date details in caps, spaced tracking (tracking-widest)
  - CTA button with subtle border, glass-morphism effect
- **Language selector**: Top-right corner, minimal flag icons or text links

### Navigation
- **Fixed top bar** (only on scroll past hero): Minimal, translucent background with blur effect
- **Language switcher**: Flags with country codes, 12px size, hover scale effect
- **Links**: Underline on hover, smooth color transition

### RSVP Form Section  
- **Form container**: Embedded Airtable iframe with 1px subtle border
- **Section padding**: py-24 to py-32 for breathing room
- **Background**: Maintain off-white background (0 0% 98%)
- **Frame styling**: Remove default Airtable border, apply subtle shadow

### Event Details Section
- **Layout**: Single column, centered text alignment
- **Information blocks**: 
  - Icon or emoji (✈️) paired with text
  - Date/Location formatted with em-dashes (—)
  - Travel info in slightly muted text color
- **Spacing**: Generous vertical rhythm (space-y-8 to space-y-12)

### Buttons & CTAs
- **Primary CTA**: 
  - Pill-shaped (rounded-full) or soft rounded (rounded-lg)
  - Border-only style (variant="outline") with backdrop-blur
  - px-8 py-4 for comfortable tap target
  - Hover: Subtle scale (scale-105) and background fill
- **Link style**: Underline offset, fade-in animation

## Responsive Behavior

**Breakpoints**:
- Mobile (base): Single column, stacked layout, 20px side padding
- Tablet (md: 768px): Maintain single column for simplicity, increase padding to 32px
- Desktop (lg: 1024px): Max-width containers, 40px side padding

**Video Background**:
- Desktop: Full 16:9 aspect ratio video
- Mobile: Cover with object-fit, ensure faces remain visible at center
- Always maintain text readability with overlay gradient

## Animations & Interactions

**Sparingly Applied**:
- Smooth scroll behavior for CTA button (scroll-smooth utility)
- Hero text: Subtle fade-in on page load (opacity 0 to 100, duration 1000ms)
- Language switch: Cross-fade transition between content (200ms)
- Form appearance: Fade up on scroll into view (intersection observer)

**Video Behavior**:
- Auto-play, muted, looped (no user controls visible)
- Preload metadata for faster initial render
- Mobile: Consider poster frame for bandwidth consideration

## Accessibility Considerations

- **Text Contrast**: Minimum 4.5:1 ratio against video overlay
- **Video Alternatives**: Meaningful text content doesn't rely on video understanding
- **Form Labels**: Properly associated with Airtable iframe (title attribute)
- **Language Switching**: Clear aria-labels for language links
- **Keyboard Navigation**: All interactive elements focusable with visible focus states

## Multi-Language Implementation

**Route Structure**: 
- /en (English - U.S.)
- /pt (Português - Portugal)  
- /mx (Español - México)

**Content Strategy**:
- Identical visual hierarchy across all languages
- Adjust typography sizing if needed for Portuguese/Spanish longer text
- Flag icons for instant language recognition
- Maintain exact text provided by client for each locale

## Special Considerations

**Nostalgic Video Integration**:
- Video should evoke warm, personal memories (grainy film texture expected)
- Overlay ensures readability without diminishing video emotional impact
- Consider subtle vignette effect to further focus attention on central text

**Future Color Integration Points**:
- Hero overlay gradient (can shift from black to warm color)
- Button accent colors (currently border-only, can add fill)
- Form section background (can add subtle tint)
- Typography color shifts for hierarchy

**Performance**:
- Lazy load video below-fold sections
- Optimize video file size (target <5MB for hero video)
- Compress with H.264 for broad compatibility

This design creates an intimate, elegant digital invitation that honors the couple's story while providing a seamless RSVP experience across three languages.