# AI Career Progress Tracker

A modern, visually appealing, and fully functional website for an AI-powered career progress tracking application. This project demonstrates a complete career development platform with gamification, AI features, and community elements.

## 🚀 Features

### Core Features
- **Achievement Tracking**: Track daily and weekly achievements with AI-powered insights
- **AI Resume Generator**: Transform achievements into compelling resume bullets
- **Interview Preparation**: Practice with AI-powered mock interviews
- **AI Career Coach**: 24/7 AI-powered career guidance and personalized advice

### Technical Features
- **Modern React Architecture**: Built with React 18, Vite, and modern tooling
- **Responsive Design**: Mobile-first design that works on all devices
- **Animations**: Smooth animations and micro-interactions using Framer Motion
- **Mock Data System**: Complete mock data structure for development and testing
- **Authentication**: User authentication with mock login system
- **Real-time Features**: Interactive comments, likes, and community features

## 🎨 Design & UX

- **Clean, Modern Design**: Professional color palette with blues, whites, and accent colors
- **Gamification Elements**: Badges, streaks, levels, and progress tracking
- **Micro-interactions**: Hover effects, button animations, and smooth transitions
- **Glassmorphism**: Modern design trends with subtle shadows and rounded corners
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 📁 Project Structure

```
carogress/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── common/
│   │       └── AIChatbot.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── FeaturesPage.jsx
│   │   ├── PricingPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── DashboardPage.jsx
│   
│   │   └── auth/
│   │       ├── SignInPage.jsx
│   │       └── SignUpPage.jsx
│   ├── services/
│   │   └── mockDataService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── mocked/
│   ├── users.json
│   ├── achievements.json
│   ├── job-applications.json
│   ├── notifications.json
│   └── comments.json
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd carogress
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`



## 📊 Mock Data Structure

The application uses a comprehensive mock data system located in the `mocked/` directory:

### Users (`users.json`)
- User profiles with authentication data
- Career information and progress stats
- Achievement tracking and gamification data

### Achievements (`achievements.json`)
- Achievement definitions and categories
- Point systems and level progression
- Badge and streak tracking

### Job Applications (`job-applications.json`)
- Application tracking with status updates
- Company and position information
- Notes and follow-up tracking

### Notifications (`notifications.json`)
- Real-time notification system
- Achievement alerts and AI suggestions
- Community and system notifications



## 🎯 Key Features Explained

### AI Career Coach
- Floating chatbot interface
- Contextual responses based on user queries
- Quick question suggestions
- Real-time conversation simulation

### Gamification System
- **Levels**: 10 career progression levels
- **Badges**: Achievement-based reward system
- **Streaks**: Daily activity tracking
- **Points**: Comprehensive scoring system

### Dashboard Analytics
- Progress visualization with charts
- Skill distribution analysis
- Weekly activity tracking
- Achievement showcase



## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ... more shades
  },
  accent: {
    50: '#fef7ee',
    // ... more shades
  }
}
```

### Animations
Custom animations are defined in the Tailwind config and can be extended for additional effects.

### Mock Data
All mock data is easily replaceable with real API endpoints by updating the `mockDataService.js` file.

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized navigation for mobile devices

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Code Structure

- **Components**: Reusable UI components
- **Pages**: Route-specific page components
- **Contexts**: Global state management
- **Services**: Data fetching and API simulation
- **Mocked**: Static data for development

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload build files to S3 bucket
- **GitHub Pages**: Configure for static hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Unsplash** for beautiful stock photos
- **Lucide** for the icon library
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for career development and growth**
