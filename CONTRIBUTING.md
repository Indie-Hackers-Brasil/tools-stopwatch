# Contributing to Indie Hacker Brasil Timer

Thank you for your interest in contributing to the Indie Hacker Brasil Timer project! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be considerate in your interactions with other contributors.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please create an issue with the following information:

- A clear, descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (browser, OS, device)

### Suggesting Features

We welcome feature suggestions! When creating a feature request:

- Use a clear, descriptive title
- Explain the use case and benefits of the feature
- Describe the proposed implementation if possible
- Include mockups or examples if relevant

### Pull Requests

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes with descriptive messages
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Pull Request Process

1. Ensure your code follows the project's style and architecture
2. Update documentation if necessary
3. Ensure all tests pass (if applicable)
4. Your PR will be reviewed by maintainers who may request changes
5. Once approved, your PR will be merged

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/Indie-Hackers-Brasil/tools-stopwatch
cd tools-stopwatch
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

## Project Structure

The project follows atomic design principles:

- **Atoms**: Basic building blocks (components/atoms/)
- **Molecules**: Groups of atoms (components/molecules/)
- **Organisms**: Groups of molecules and atoms (components/organisms/)
- **Templates**: Page layouts (components/templates/)

## Coding Standards

- Use TypeScript for all components and functions
- Follow existing naming conventions
- Write comments for complex logic
- Format code using the project's Prettier configuration
- Follow functional component patterns

## Commit Messages

Please use clear and descriptive commit messages that explain what changes were made and why. For example:

```
feat: add confetti animation when timer completes

This adds a celebratory confetti animation when a timer reaches zero,
providing visual feedback to the user that the timer has completed.
```

## Questions?

If you have any questions or need help, please open an issue or reach out to the maintainers.

Thank you for contributing to Indie Hacker Brasil Timer! 