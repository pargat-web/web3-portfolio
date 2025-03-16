# Cyberpunk Portfolio Website

A stylish, modern portfolio website with a cyberpunk theme showcasing my projects, skills, and experience as a full-stack developer and blockchain enthusiast.

![Portfolio Screenshot](screenshot.png)

## 🚀 Features

- **Stunning Cyberpunk Design**: Neon colors, glitch effects, and futuristic elements
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Elements**: 3D hover effects, smooth animations, and dynamic content
- **Dynamic GitHub Integration**: Automatically fetches and displays my latest GitHub repositories
- **Project Filtering**: Filter projects by category (Web, Blockchain, Frontend, Backend)
- **Smooth Animations**: GSAP-powered animations for smooth scrolling and element transitions
- **3D Background Effects**: Three.js powered background effects in the hero section
- **Form Validation**: Client-side validation for the contact form
- **SEO Optimized**: Meta tags and semantic HTML for better search engine rankings

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS variables, flexbox, and grid
- **JavaScript**: Vanilla JS for interactivity and functionality
- **GSAP**: For advanced animations
- **Three.js**: For 3D background effects
- **GitHub API**: For fetching project data dynamically

## 📋 Sections

1. **Home**: Introduction and hero section with animated elements
2. **About**: Personal information, skills, and background
3. **Education**: Timeline of educational background and certifications
4. **Experience**: Work history and professional experience
5. **Projects**: Showcase of portfolio projects with filtering capability
6. **Contact**: Contact form and social media links

## 🔧 Installation & Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/pargat-web/web3-portfolio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd web3-portfolio
   ```

3. Open `index.html` in your browser to view the website

## 🖼️ Adding Your Own Projects

The portfolio website fetches projects directly from GitHub. If GitHub fetching fails, it falls back to local projects defined in `js/projects.js`. To add your own projects:

1. Create repositories on GitHub with meaningful names and descriptions
2. For the best display, add project images with the same name as your repository (e.g., `project-name.jpg`) in the `assets/images/projects/` folder
3. Customize the `getProjectCategory` and `getProjectTechnologies` functions in `js/projects.js` to match your projects

## 📱 Responsive Design

This portfolio is designed to look great on all devices:
- **Desktop**: Full experience with all animations and effects
- **Tablet**: Optimized layout for medium-sized screens
- **Mobile**: Streamlined design with a mobile-friendly navigation

## 🎨 Customization

You can easily customize the portfolio by modifying:
- **CSS Variables**: Change colors, fonts, and spacing in `css/styles.css`
- **Content**: Update your personal information in `index.html`
- **Projects**: Modify the project data in `js/projects.js` if not using GitHub integration
- **Animations**: Adjust animation parameters in `js/animations.js`

## 🔗 Connect

- **GitHub**: [pargat-web](https://github.com/pargat-web)
- **LinkedIn**: [Pargat Singh](https://linkedin.com/in/pargat-singh)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

⭐ Built with 💻 and ❤️ by [Pargat Singh](https://github.com/pargat-web) ⭐ 