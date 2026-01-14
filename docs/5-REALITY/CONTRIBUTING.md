# 🤝 Contributing to QANTUM

First off, thank you for considering contributing to **QANTUM**! It's people like you that make this framework such a great tool for the QA community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a friendly, safe, and welcoming environment for all contributors, regardless of:

- Age, body size, disability, ethnicity, sex characteristics
- Gender identity and expression, level of experience
- Education, socio-economic status, nationality
- Personal appearance, race, religion, or sexual identity and orientation

### Our Standards

**✅ Examples of behavior that contributes to a positive environment:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**❌ Unacceptable behavior includes:**

- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** v18.0.0 or higher
- **npm** v8.0.0 or higher (or yarn/pnpm)
- **Git** for version control
- A GitHub account

### Finding Issues to Work On

1. Check our [GitHub Issues](https://github.com/papica777-eng/QA-Framework/issues)
2. Look for issues labeled:
   - `good first issue` - Great for newcomers
   - `help wanted` - We'd love your help
   - `bug` - Something isn't working
   - `enhancement` - New feature or request
   - `documentation` - Improvements to docs

---

## 💻 Development Setup

### 1. Fork the Repository

Click the "Fork" button at the top right of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/QA-Framework.git
cd QA-Framework
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/papica777-eng/QA-Framework.git
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Verify Setup

```bash
# Run tests to verify everything works
npm test

# Check TypeScript compilation
npm run typecheck
```

---

## 🔧 Making Changes

### 1. Create a Branch

```bash
# Sync with upstream first
git fetch upstream
git checkout main
git merge upstream/main

# Create your feature branch
git checkout -b feature/your-feature-name
# or for bugs
git checkout -b fix/bug-description
```

### Branch Naming Convention

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/add-websocket-support` |
| Bug Fix | `fix/description` | `fix/api-timeout-error` |
| Documentation | `docs/description` | `docs/update-api-reference` |
| Performance | `perf/description` | `perf/optimize-reporter` |
| Refactor | `refactor/description` | `refactor/chronos-engine` |

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments where necessary
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run specific module tests
npm test -- --grep "Chronos"

# Check for TypeScript errors
npm run typecheck
```

### 4. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "type(scope): description"
```

**Commit Types:**

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Code style changes (formatting, etc.) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding missing tests |
| `chore` | Changes to build process or auxiliary tools |

**Examples:**

```bash
git commit -m "feat(api-sensei): add WebSocket testing support"
git commit -m "fix(chronos): resolve timeout issue in retry logic"
git commit -m "docs(readme): update installation instructions"
```

---

## 📤 Pull Request Process

### 1. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 2. Open a Pull Request

1. Go to the [repository](https://github.com/papica777-eng/QA-Framework)
2. Click "Pull requests" → "New pull request"
3. Select your branch
4. Fill in the PR template

### 3. PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
```

### 4. Code Review

- Address any feedback from reviewers
- Make requested changes
- Push updates to your branch

### 5. Merge

Once approved, your PR will be merged! 🎉

---

## 📝 Style Guidelines

### JavaScript/TypeScript

```javascript
// ✅ Good
const apiSensei = createApiSensei({
  baseURL: 'https://api.example.com',
  timeout: 5000
});

// ❌ Bad
const apisensei = createApiSensei({baseURL:'https://api.example.com',timeout:5000});
```

### General Rules

1. **Indentation**: 2 spaces
2. **Quotes**: Single quotes for strings
3. **Semicolons**: Required
4. **Line Length**: Max 100 characters
5. **Naming**:
   - `camelCase` for variables and functions
   - `PascalCase` for classes and types
   - `UPPER_SNAKE_CASE` for constants

### File Organization

```
module-name/
├── index.js          # Main entry point
├── lib/              # Internal utilities
├── tests/            # Module tests
└── README.md         # Module documentation
```

---

## 🧪 Testing

### Writing Tests

```javascript
const { createChronos } = require('qantum');

describe('Chronos Engine', () => {
  let chronos;

  beforeEach(() => {
    chronos = createChronos({
      timeout: 30000
    });
  });

  it('should schedule tasks correctly', async () => {
    const result = await chronos.schedule({
      name: 'test-task',
      fn: () => 'success'
    });
    
    expect(result.status).toBe('completed');
  });

  afterEach(async () => {
    await chronos.cleanup();
  });
});
```

### Test Coverage

We aim for **80%+ code coverage**. Run coverage report:

```bash
npm run test:coverage
```

---

## 📚 Documentation

### Documenting Code

Use JSDoc comments:

```javascript
/**
 * Creates a new API Sensei instance for REST/GraphQL testing.
 * 
 * @param {APIConfig} options - Configuration options
 * @param {string} options.baseURL - Base URL for API requests
 * @param {number} [options.timeout=30000] - Request timeout in ms
 * @returns {APISensei} Configured API testing instance
 * 
 * @example
 * const api = createApiSensei({
 *   baseURL: 'https://api.example.com',
 *   timeout: 5000
 * });
 */
function createApiSensei(options) {
  // ...
}
```

### Updating Documentation

When adding features:

1. Update relevant docs in `/docs`
2. Add examples to code comments
3. Update README if it's a significant feature
4. Add to CHANGELOG.md

---

## 🏆 Recognition

Contributors are recognized in several ways:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Added to GitHub contributors list

---

## 💬 Community

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Discord**: Coming soon!

### Stay Updated

- ⭐ Star the repository
- 👀 Watch for notifications
- 🐦 Follow updates on Twitter

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Thank you for contributing to QANTUM!** 🧠⚡

*Every contribution, no matter how small, makes a difference.*

</div>
