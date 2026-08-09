import { render } from '@testing-library/react';
import Prism from '../Prism';

// Mock ogl to prevent webgl errors in jsdom
jest.mock('ogl', () => {
  return {
    Renderer: jest.fn().mockImplementation(() => {
      const canvas = document.createElement('canvas');
      return {
        gl: {
          disable: jest.fn(),
          canvas: canvas,
        },
        setSize: jest.fn(),
        render: jest.fn(),
      };
    }),
    Program: jest.fn().mockImplementation(() => ({
      uniforms: {
        uPxScale: { value: 0 },
        uUseBaseWobble: { value: 0 },
        uRot: { value: 0 },
        iTime: { value: 0 },
      },
    })),
    Mesh: jest.fn(),
    Triangle: jest.fn(),
  };
});

describe('Prism component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Prism />);
    expect(container.firstChild).toHaveClass('prism-container');
  });

  it('accepts custom props', () => {
    const { container } = render(
      <Prism
        height={4}
        baseWidth={6}
        animationType="hover"
        glow={0.8}
        noise={0.3}
        transparent={false}
      />
    );
    expect(container.firstChild).toHaveClass('prism-container');
  });
});
