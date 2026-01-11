# How to Run InspireNest Locally

## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** (version 14 or higher)
  - Download from: https://nodejs.org/
  - Verify installation by running: `node --version`
  
- **npm** (comes with Node.js)
  - Verify installation by running: `npm --version`

## Step-by-Step Instructions

### 1. Install Dependencies

Open your terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all required packages:
- React
- React DOM
- React Router DOM
- React Scripts

**Note:** This may take a few minutes on first run.

### 2. Start the Development Server

Once dependencies are installed, run:

```bash
npm start
```

This will:
- Start the development server
- Automatically open your browser at `http://localhost:3000`
- Enable hot-reload (changes will automatically refresh in the browser)

### 3. Access the Application

The application will be available at:
- **Local:** http://localhost:3000
- **Network:** http://[your-ip]:3000 (accessible from other devices on your network)

## Using the Application

### First Time Setup

1. **Landing Page**: You'll see the InspireNest landing page
2. **Registration**: Click "Get Started" or "Sign In" to create an account
3. **User Types**: Choose either:
   - **Child**: For the child's learning interface
   - **Parent/Therapist**: For monitoring dashboard

### Test Accounts

Since this is a demo application using localStorage:
- You can create any email/password combination
- Data persists in browser's local storage
- Clear browser data to reset

### Navigation

**For Children:**
- Home Dashboard
- Learning Modules (IQ & EQ challenges)
- Games (Focus, Motor Skills, Speech)
- Emotional Wellness (Mood tracking)
- Creativity Zone (Drawing & Writing)
- Self-Care Tutorials
- Progress Tracking

**For Parents/Therapists:**
- Dashboard with child's progress
- Activity analysis
- Mood insights
- Badge tracking

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is occupied, you can:
1. Stop the other application using port 3000
2. Or set a different port:
   ```bash
   set PORT=3001 && npm start
   ```
   (On Mac/Linux: `PORT=3001 npm start`)

### Module Not Found Errors

If you see module errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear Cache

If you encounter caching issues:
```bash
npm start -- --reset-cache
```

### Browser Compatibility

The app works best with:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Tips

- **Hot Reload**: Changes to code automatically refresh the browser
- **Console**: Open browser DevTools (F12) to see any errors
- **Data Storage**: Data is stored in browser's localStorage (cleared if you clear browser data)

## File Structure

```
IN-project/
├── public/
│   └── index.html
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── App.js          # Main app with routing
│   └── index.js        # Entry point
├── package.json        # Dependencies
└── README.md          # Project documentation
```

## Need Help?

Check the main README.md for more details about features and architecture.



