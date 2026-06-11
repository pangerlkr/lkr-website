```markdown
# lkr-website Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `lkr-website` JavaScript codebase. It covers file naming, import/export styles, commit message patterns, and testing conventions. While no frameworks or automated workflows were detected, this guide provides best practices for maintaining consistency and quality in the project.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userProfile.js`, `mainHeader.js`

### Import Style
- Use **relative imports** for modules within the project.
  - Example:
    ```javascript
    import { getUserData } from './userData';
    ```

### Export Style
- Use **named exports** for functions, constants, and components.
  - Example:
    ```javascript
    // In userData.js
    export function getUserData() { ... }
    export const USER_ROLE = 'admin';
    ```

### Commit Messages
- Commit messages are **freeform** (no strict prefixes).
- Average commit message length is **~29 characters**.
  - Example:  
    ```
    fix nav bar alignment on mobile
    ```

## Workflows

### Adding a New Module
**Trigger:** When you need to add new functionality or a feature.
**Command:** `/add-module`

1. Create a new file using camelCase (e.g., `featureName.js`).
2. Implement your logic using named exports.
3. Import the module where needed using a relative path.
4. Write a corresponding test file (`featureName.test.js`).
5. Commit changes with a clear, concise message.

### Updating an Existing Feature
**Trigger:** When you need to modify or improve existing code.
**Command:** `/update-feature`

1. Locate the relevant file.
2. Make necessary changes, maintaining code style.
3. Update or add tests as needed.
4. Commit with a descriptive message.

### Writing Tests
**Trigger:** When adding or updating code that requires validation.
**Command:** `/write-test`

1. Create or update a test file matching the pattern `*.test.js`.
2. Write tests for all named exports in the module.
3. Run your test suite (see Testing Patterns).
4. Commit your test changes.

## Testing Patterns

- Test files use the pattern: `*.test.js`
- Testing framework is **unknown**; check existing test files for structure.
- Place test files alongside the modules they test or in a dedicated `tests` directory.
- Example test file:
  ```javascript
  // userData.test.js
  import { getUserData } from './userData';

  test('should return correct user data', () => {
    expect(getUserData()).toEqual({ name: 'Alice' });
  });
  ```

## Commands
| Command         | Purpose                                      |
|-----------------|----------------------------------------------|
| /add-module     | Add a new module with proper conventions     |
| /update-feature | Update an existing feature/module            |
| /write-test     | Create or update tests for a module          |
```
