# SE302 - Software Testing and Maintenance: Homework 02

## Project Overview
[cite_start]This project contains automated end-to-end tests for the **Sweet Shop** web application (https://sweetshop.netlify.app/)[cite: 9]. [cite_start]The primary goal of this assignment is to demonstrate critical thinking in software testing by identifying key features, writing manual test cases, and implementing them using **Playwright** with a **Page Object Model (POM)** structure [cite: 6-8, 56].

## Selected Features for Testing
[cite_start]Following the assignment requirements, the testing focus is on at least 3 key features [cite: 11-12]:
- [cite_start]**Login/Authentication**: Verifying form validation and user access[cite: 14].
- [cite_start]**Navigation & Product Display**: Ensuring menus and product lists work as expected [cite: 16-17].
- [cite_start]**Cart & Checkout**: Validating the shopping flow from adding items to form submission[cite: 13].

## Project Structure
[cite_start]The implementation follows the **Page Object Model (POM)** design pattern to ensure code maintainability and clarity[cite: 56]:



```text
├── pages/              # Page Object Classes [cite: 56]
│   ├── LoginPage.ts    # Locators and actions for the login form [cite: 49]
│   └── CartPage.ts     # Locators and actions for products and basket [cite: 50]
├── tests/              # Automated Test Scripts [cite: 41]
│   └── sweetshop.spec.ts # Test implementations using Playwright [cite: 40]
├── playwright.config.ts # Playwright project configuration
└── package.json        # Project metadata and dependencies

## How to Run the Tests

### 1\. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### 2\. Installation

Clone this repository and install the dependencies:

Bash
    npm install
    npx playwright install

### 3\. Execution

To run all tests in the terminal:

Bash
    npx playwright test

To run tests in **UI Mode** (recommended for evaluation):

  

Bash
    npx playwright test --ui

To view the generated **HTML Report**:

  

Bash
    npx playwright show-report

## Implementation Requirements Met

This project strictly follows the additional explanations provided in the assignment :

-   **Framework**:Uses Playwright with `test.describe()`, `test()`, and `expect()` .
    
-   **Interactions**:Includes at least one form interaction and one button/navigation element .
    
-   **Negative Scenario**:Includes a test case for incorrect input validation.
    
-   **Assertions**:Implements both locator and URL assertions.
    

***
**Student Name:** Dogukan Yurtturk
**Student ID:** 220302455