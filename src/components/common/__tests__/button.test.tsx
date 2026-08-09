import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';

describe('Button component', () => {
  it('renders a button element by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders an anchor element when href is provided', () => {
    render(<Button href="/test">Link me</Button>);
    const link = screen.getByRole('link', { name: /link me/i });
    expect(link).toHaveAttribute('href', '/test');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    // disabled elements don't receive click events normally,
    // but just to be sure we can attempt to click
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies variant classes', () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-white/58'); // ghost variant class
  });
});
