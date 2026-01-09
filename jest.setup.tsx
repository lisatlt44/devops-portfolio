import '@testing-library/jest-dom'
import React from 'react';

// Mock de ResizeObserver qui n'existe pas dans JSDOM
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock global pour react-three/fiber et three pour éviter les erreurs WebGL
jest.mock('@react-three/fiber', () => ({
  ...jest.requireActual('@react-three/fiber'),
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="three-canvas">{children}</div>,
  useFrame: jest.fn(), // Mock useFrame pour éviter les erreurs hors contexte Canvas réel
}));

// Mock pour drei
jest.mock('@react-three/drei', () => ({
  Float: ({ children }: any) => <>{children}</>,
  Stars: () => <div data-testid="drei-stars" />,
}));

// Mock GSAP pour éviter les soucis d'animation
jest.mock('gsap', () => {
  return {
    registerPlugin: jest.fn(),
    context: jest.fn(() => ({ revert: jest.fn() })),
    to: jest.fn(),
    fromTo: jest.fn(),
    utils: {
      toArray: jest.fn(() => []),
    },
  };
});

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));
