# Plan d'Intégration des Tests Unitaires et CI/CD

Ce document détaille la stratégie pour intégrer des tests unitaires dans l'application Next.js (Portfolio) et automatiser leur exécution via GitHub Actions.

## 1. Analyse du Projet

*   **Technologies** : Next.js 16, React 19, TypeScript, Tailwind CSS.
*   **Spécificités** :
    *   Utilisation intensive d'animations (`framer-motion`, `gsap`).
    *   Composants 3D (`three.js`, `@react-three/fiber`).
    *   Composants Clients (`"use client"`).
*   **Défi** : Les librairies comme GSAP et Three.js nécessitent souvent des mocks (simulations) car JSDOM (l'environnement de test) ne simule pas un navigateur complet avec WebGL ou le défilement réel.

## 2. Choix de la Stack de Test

Nous utiliserons le standard de l'industrie pour React/Next.js :
*   **Jest** : Le runner de tests.
*   **React Testing Library (RTL)** : Pour tester les composants du point de vue de l'utilisateur (affichage, interactions).
*   **jest-environment-jsdom** : Pour simuler le DOM navigateur dans Node.js.

## 3. Étapes d'Implémentation

### Étape 1 : Installation des Dépendances

Il faudra installer les paquets suivants :
```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
```

### Étape 2 : Configuration de Jest

Création de deux fichiers à la racine :

1.  **`jest.config.ts`** : Configuration principale.
    *   Gestion des imports CSS/Images (mocks).
    *   Gestion des alias (`@/*`).
    *   Transformation du TypeScript/JSX.
2.  **`jest.setup.ts`** : Configuration de l'environnement avant chaque test.
    *   Extension des matchers Jest (`@testing-library/jest-dom`).
    *   **Mocking critique** : `ResizeObserver`, `window.matchMedia`, et potentiellement `gsap` et `Scene3D` pour éviter les erreurs WebGL.

### Étape 3 : Écriture des Tests

Nous ciblerons les sections principales de la page d'accueil.
Fichier cible : `__tests__/Home.test.tsx` (ou `src/app/page.test.tsx`).

*   **Mocking des animations** : Nous allons mocker `gsap` et `framer-motion` pour qu'ils rendent simplement le contenu sans délai.
*   **Mocking de la 3D** : Le composant `Scene3D` sera remplacé par un simple `div` pour les tests.
*   **Vérifications** :
    *   Présence du titre Hero.
    *   Présence des sections (About, Projects, Contact, etc.).

### Étape 4 : Scripts NPM

Ajout du script dans `package.json` :
```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}
```

## 4. Intégration CI/CD (GitHub Actions)

Nous créerons un workflow `.github/workflows/ci.yml`.

**Workflow proposé :**
1.  Déclenchement sur `push` (branches main/dev) et `pull_request`.
2.  Job `test` :
    *   Checkout du code.
    *   Setup Node.js.
    *   Install dependencies.
    *   Run Lint.
    *   Run Tests (`npm test`).
3.  Job `build` (optionnel ou suite) :
    *   Build Next.js.
    *   Build Docker (si tests OK).

## 5. Plan d'Action Immédiat (Pour l'assistant)

1.  Installer les dépendances de test.
2.  Créer `jest.config.ts` et `jest.setup.ts`.
3.  Créer un test unitaire pour `src/app/page.tsx` vérifiant le rendu des sections.
4.  Créer le fichier workflow `.github/workflows/ci.yml`.

---
*Ce fichier a été généré pour servir de guide à l'implémentation des tests.*
