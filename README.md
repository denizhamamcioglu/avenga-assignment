# Deniz Hamamcioglu - Avenga API Automation Assignment

## Notes for the Reviewer

Hi! 👋

Here are a few notes that might be helpful before you start reviewing the project:

1. If you check the GitHub Actions execution history, you’ll notice a few tests are failing. This is intentional and due to actual bugs in the Fake Books API implementation. The reasons for these failures are documented as comments within the corresponding tests.
2. Some tests (such as author and books smoke tests) include comments explaining my approach. These are not leftover code blocks, but intentional notes.
3. Test reports are deployed to GitHub Pages and can be accessed here: <https://denizhamamcioglu.github.io/avenga-assignment/>
4. The .env file is included in the repository for convenience, as it contains only a URL and no sensitive data. I’m aware that normally .env files should not be committed to a repository.

And here are more details about the project as part of the requirements.

## Features

1. **Playwright-based** – Chosen for future-proofing in case UI testing is needed later. Playwright is fast, feature-rich, and works well for API testing too.
2. **Schema validation** – Ensures API responses match expected structures.
3. **Parallel execution** – Uses GitHub Actions and Playwright’s sharding to run multiple shards and threads, keeping execution time under 1 minute for 27 tests.
4. **CI-friendly reporting** – Deploys test reports to GitHub Pages and includes a direct link in the GitHub Actions summary.
5. **Code quality enforcement** – ESLint setup for consistent coding standards.
6. **Automated linting** – Husky hooks run lint checks before every push.
7. **Organized test structure** – Tests are grouped both by domain (books, authors) and by type (smoke/happy path, regression/edge cases).
8. **Balanced abstraction** – Modular structure with optimal abstraction levels for maintainability.
9. **Centralized configuration** – Test data and config values are stored centrally for easier maintenance and scalability.

## Installation

1. Install NodeJS from the [Official NodeJS Downloads Page](https://nodejs.org/it/download/current).
2. Install Git code versioning system from the [Official GIT website](https://git-scm.com/downloads).
3. Clone the repository from <https://github.com/denizhamamcioglu/avenga-assignment>
4. Run `npm install` to install the project dependencies.
5. Run `npx playwright install` to install the Playwright related dependencies.

## Execution

1. Using npm scripts: `npm run api-tests`.
2. Using Playwright CLI (for more control): `npx playwright test`

## Test Reports

1. **Local executions** – Reports are generated in the playwright-report directory.
2. **CI executions** – Reports are available at: <https://denizhamamcioglu.github.io/avenga-assignment/>
