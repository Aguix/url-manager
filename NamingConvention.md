## Naming convention for Git :
### Branches
- Branch names written in lowercase
- Branch prefix can be `feat`, `fix`, `ref`, `opti`, `core`, `docs`
- Branch tree : 
    - Main branch : `main`
        - Dev branch : `dev`
            - <prefix>/<branchname>


### Commit
> Inspired by [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) & [Angular Commits Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

| Case                      | Type  | Usage                                      | Scopes examples                              |
|---------------------------|-------|--------------------------------------------|----------------------------------------------|
| Adding a feature          | FEAT  | `FEAT : <feature>`                         | /                                            |
| Resolving an issue        | FIX   | `FIX : <feature> : <issue resolved>`       | /                                            |
| Code refactoring          | REF   | `REF : <feature> : <what was refactored>`  | /                                            |
| Code optimization         | OPTI  | `OPTI : <feature> : <what was optimized>`  | /                                            |
| Project structure changes | CORE  | `CORE : <scope> : <changes made>`          | `config`, `deps`, `env`, `linter`, `scripts` |
| Documentation changes     | DOCS  | `DOCS : <scope> : <changes made>`          | `readme`, `conventions`, `<feature>`         |
| Other                     | OTHER | `OTHER : <precise explanation of changes>` | /                                            |


## Code :
> Following [Nuxt ESLint rules](https://nuxt.com/docs/guide/concepts/code-style)

| Element               | Convention           | Example          |
| --------------------- | -------------------- | ---------------- |
| Constants             | SCREAMING_SNAKE_CASE | `BASE_URL`       |
| Variable names        | camelCase            | `currentUser`    |
| Function names        | camelCase            | `getCurrentUser` |
| Component names       | PascalCase           | `MyButton`       |
| Typescript types      | PascalCase           | `User`           |
| Typescript interfaces | PascalCase           | `User`           |
| Typescript interfaces | PascalCase           | `User`           |


## Directory structure :
> Following [Nuxt directory rules](https://nuxt.com/docs/guide/directory-structure)

| Element           | Convention        | Example                   |
| ----------------- | ----------------- | ------------------------- |
| Folders           | kebab-case        | `components/`, `layouts/` |
| .vue files        | PascalCase        | `MyButton.vue`           |
| Composables files | camelCase + `use` | `useAuth.ts`              |