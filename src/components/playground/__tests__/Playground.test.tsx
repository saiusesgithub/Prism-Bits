import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Playground } from '../Playground';
import type { PlaygroundConfig } from '../types';

describe('Playground component', () => {
  const mockConfig: PlaygroundConfig = {
    componentName: 'TestComponent',
    defaults: {
      text: 'Hello World',
      isActive: false,
    },
    controls: {
      text: { type: 'text', label: 'Test Label' },
      isActive: { type: 'boolean', label: 'Is Active' },
    },
  };

  it('renders correctly with required props', () => {
    render(<Playground config={mockConfig} render={(props) => <div data-testid="mock-render">{props.text}</div>} />);
    expect(screen.getByTestId('mock-render')).toHaveTextContent('Hello World');
  });

  it('updates state when controls are changed', async () => {
    const user = userEvent.setup();
    render(<Playground config={mockConfig} render={(props) => <div data-testid="mock-render">{props.text}</div>} />);
    
    const input = screen.getByDisplayValue('Hello World');
    await user.clear(input);
    await user.type(input, 'New Text');
    
    expect(screen.getByTestId('mock-render')).toHaveTextContent('New Text');
  });

  it('resets to defaults when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<Playground config={mockConfig} render={(props) => <div data-testid="mock-render">{props.text}</div>} />);
    
    const input = screen.getByDisplayValue('Hello World');
    await user.clear(input);
    await user.type(input, 'New Text');
    expect(screen.getByTestId('mock-render')).toHaveTextContent('New Text');
    
    const resetBtn = screen.getByRole('button', { name: /reset/i });
    await user.click(resetBtn);
    
    expect(screen.getByTestId('mock-render')).toHaveTextContent('Hello World');
  });
});
