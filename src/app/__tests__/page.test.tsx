import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock du composant Scene3D car il utilise WebGL (non supporté par JSDOM)
// et on veut isoler le test de la page d'accueil
jest.mock('@/components/Scene3D', () => {
  return function MockScene3D() {
    return <div data-testid="scene-3d-mock">Scene 3D Placeholder</div>;
  };
});

// Mock de Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
  useMotionTemplate: () => '',
  useMotionValue: () => ({ set: jest.fn(), get: () => 0 }),
}));

describe('Home Page', () => {
  it('renders the main scene placeholder', async () => {
    render(<Home />);
    // On utilise findByTestId car next/dynamic est asynchrone
    const scene = await screen.findByTestId('scene-3d-mock');
    expect(scene).toBeInTheDocument();
  });

  it('renders key sections', async () => {
    render(<Home />);
    const heading = await screen.findByText(/Architecte digitale/i);
    expect(heading).toBeInTheDocument();
  });
});
