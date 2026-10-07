# Automation Exercise - Cypress

A hands-on testing project built to practice and master end-to-end (E2E) automation workflows using **Cypress**. This repository focuses on writing stable, maintainable automation scripts against real-world web elements and user journeys.

## What This Project Covers
*   **Locating Elements:** Working with diverse DOM selectors, prioritizing robust strategies (like `data-cy` attributes and structured IDs) over fragile CSS paths.
*   **Form Automation:** Simulating realistic user inputs, checking checkboxes, toggling radio buttons, handling dropdown configurations, and verifying form submission flags.
*   **UI Validations:** Writing clear implicit and explicit assertions to confirm page states, visibility conditions, text matches, and element properties.
*   **Advanced Browser Behaviors:** Managing dynamic components, navigation workflows, data tables, and interactive alerts.

---

## Repository Structure

```text
automation-exercise-cypress/
├── automation-exercise-cypress/    # Core test suites, specifications, and configurations
├── node_modules/                  # Project tracking dependencies
├── package-lock.json              # Version locked dependency configuration
└── package.json                   # Project scripts and package configuration manifest
```

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd automation-exercise-cypress
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

---

## Running the Automation Tests

You can execute the test suites using either the graphical interactive test dashboard runner or straight from the command line terminal:

*   **Launch Cypress UI Runner:**
    ```bash
    npx cypress open
    ```
    *This opens the browser runner interface where you can pick and watch individual test suites execute step-by-step.*

*   **Run Headless CLI Mode:**
    ```bash
    npx cypress run
    ```
    *This executes all automation suites entirely within the terminal window background.*
