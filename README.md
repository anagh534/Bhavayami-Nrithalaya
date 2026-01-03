# Bhavayami Nrithalaya - Dance Academy Website

A modern, SEO-friendly static website for Bhavayami Nrithalaya dance school in Trivandrum, Kerala.

## 🎭 About

Bhavayami Nrithalaya is a premier dance academy in Trivandrum offering expert training in:
- **Bharatanatyam** (Classical Dance)
- **Semi-Classical Dance**
- **Folk Dance**
- **Thiruvathira** (Traditional Kerala Dance)
- **Nrithyayoga** (Dance & Wellness)
- **Competition Training**

## ✨ Features

### 1. **Modern & User-Friendly Design**
- Clean, attractive layout with vibrant colors inspired by Indian classical dance
- Smooth animations and transitions
- Fully responsive design for all devices (mobile, tablet, desktop)
- Intuitive navigation with hamburger menu for mobile

### 2. **SEO Optimized**
- Comprehensive meta tags for search engines
- Location-based keywords targeting Trivandrum/Thiruvananthapuram
- Schema.org structured data for local business
- Open Graph tags for social media sharing
- Semantic HTML structure
- Fast loading performance

### 3. **Attractive Design & Animations**
- Gradient backgrounds with dance-themed colors
- Smooth scroll animations
- Parallax effects on hero section
- Hover effects on cards and buttons
- Fade-in animations for content
- Interactive gallery with lightbox effect
- Scroll-to-top button
- Animated scroll indicator

### 4. **Key Sections**
- **Hero Section**: Eye-catching introduction with call-to-action buttons
- **About**: Information about the academy and its features
- **Classes**: Detailed cards for each dance form offered
- **Gallery**: Placeholder for performance photos
- **Contact**: Form for enquiries with location details
- **Footer**: Quick links and additional information

## 📂 File Structure

```
dance_website/
├── index.html          # Main HTML file with SEO meta tags
├── styles.css          # All styling with modern CSS features
├── script.js           # Interactive features and animations
└── README.md           # This file
```

## 🚀 How to Use

### Option 1: Open Directly in Browser
1. Simply open `index.html` in any modern web browser
2. No server required - it's a static website!

### Option 2: Use Live Server (Recommended for Development)
1. Install Live Server extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The website will open with auto-reload on changes

### Option 3: Deploy Online
You can deploy this website to:
- **GitHub Pages** (Free)
- **Netlify** (Free)
- **Vercel** (Free)
- Any web hosting service

## 🎨 Customization Guide

### Colors
Edit the CSS variables in `styles.css` (lines 10-18):
```css
--primary-color: #D4145A;      /* Main pink/magenta */
--secondary-color: #FBB03B;    /* Gold/yellow */
--accent-color: #8B2F97;       /* Purple */
```

### Contact Information
Update in `index.html` (around line 300):
- Phone number
- Email address
- Exact location/address
- Class timings

### Adding Images
Replace the `.gallery-placeholder` divs with actual images:
```html
<div class="gallery-item">
    <img src="your-image.jpg" alt="Description">
</div>
```

For class card backgrounds, replace the gradient classes with actual images in `styles.css`.

### Form Integration
The contact form currently shows a success message. To connect it to a backend:
1. Use **Formspree** (easiest): Add action="https://formspree.io/f/YOUR_ID"
2. Use **Google Forms**: Embed Google Form
3. Use **Email.js**: For client-side email sending
4. Connect to your own backend server

## 🔧 Technical Details

### Technologies Used
- HTML5 (Semantic markup)
- CSS3 (Grid, Flexbox, Animations, Custom Properties)
- Vanilla JavaScript (No dependencies!)
- Google Fonts (Playfair Display, Poppins)

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance Features
- No external dependencies (except fonts)
- Optimized animations
- Lazy loading ready
- Accessibility considerations (prefers-reduced-motion)

## 📱 Responsive Breakpoints

- Desktop: > 768px
- Tablet: 481px - 768px
- Mobile: < 480px

## 🎯 SEO Keywords Included

- dance classes Trivandrum
- Bharatanatyam Trivandrum
- folk dance Kerala
- Thiruvathira classes
- dance school Thiruvananthapuram
- classical dance Kerala
- semi-classical dance
- competition dance training

## 🌟 Future Enhancements

Consider adding:
1. **Image Gallery**: Real photos of performances and classes
2. **Video Section**: Student performances, testimonials
3. **Blog**: Dance tips, event announcements
4. **Online Registration**: Full enrollment system
5. **Student Portal**: Login for registered students
6. **Events Calendar**: Upcoming performances and workshops
7. **Testimonials**: Student and parent reviews
8. **Faculty Profiles**: Detailed teacher information
9. **Social Media Integration**: Instagram feed, Facebook page
10. **Multi-language**: Add Malayalam translation

## 📞 Support

For questions or customization help, please contact the development team.

## 📄 License

This website is created for Bhavayami Nrithalaya. All rights reserved.

---

**Built with ❤️ for preserving and promoting Indian classical dance heritage**
