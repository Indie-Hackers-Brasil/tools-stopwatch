# Indie Hacker Brasil Timer

A professional dual-timer application designed for timed pitches, presentations, and discussions. Perfect for meetups, hackathons, and business contexts where time management is crucial.

![Timer Screenshot](https://via.placeholder.com/800x400?text=Indie+Hacker+Brasil+Timer)

## Features

- **Dual Timers**: 5-minute and 3-minute timers running simultaneously
- **Fullscreen Mode**: Maximize either timer for better visibility
- **Visual Feedback**: Dynamic background colors that intensify as time runs out
- **Confetti Effects**: Celebratory animations when timers start and finish
- **Splash Screen**: Professional countdown with animated effects
- **Auto-hiding Controls**: UI elements disappear during presentations for distraction-free viewing
- **Responsive Design**: Works on all devices and screen sizes

## Technology Stack

- Next.js 14+ with App Router
- TypeScript
- React with modern Hooks
- Tailwind CSS for styling
- Framer Motion for animations
- Atomic Design architecture
- Canvas Confetti for celebration effects

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or pnpm package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Indie-Hackers-Brasil/tools-stopwatch.git
cd tools-stopwatch
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

The project follows an atomic design methodology:

```
components/
├── atoms/         # Smallest UI components (TimerDisplay, TimerLabel, MaximizeButton)
├── molecules/     # Composite components (TimerControls, SplashScreen)
├── organisms/     # Complex UI sections (TimerPanel)
├── templates/     # Page layouts (DualTimer)
├── ui/            # Shadcn UI components
└── magicui/       # Special effect components (Confetti)
```

## Usage

1. **Starting a Timer**: Click the START button to begin a countdown with a professional splash screen
2. **Pausing**: Click PAUSE to temporarily stop a timer
3. **Resetting**: Click RESET to restore a timer to its original value
4. **Fullscreen Mode**: Click the maximize icon to expand a timer to fill the entire screen

## Contributing

Contributions are welcome! Here's how you can help:

### Development Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit with descriptive messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Standards

- Follow the existing code style and architecture
- Use TypeScript typing for all components and functions
- Add appropriate comments for complex logic
- Write meaningful commit messages

### Feature Requests & Bug Reports

- Use the GitHub Issues section to report bugs or suggest features
- Include detailed steps to reproduce bugs
- For feature requests, explain the use case and benefits

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Indie Hacker Brasil community for inspiration
- [Shadcn UI](https://ui.shadcn.com/) for the component library
- [Framer Motion](https://www.framer.com/motion/) for animations