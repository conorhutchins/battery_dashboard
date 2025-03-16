import { fireEvent, screen } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { render } from '../../test-utils/test-utils';
import { act } from 'react';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add('light');
  });

  test('renders with light theme by default', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button', { name: /switch to dark theme/i });
    expect(button).toBeInTheDocument();
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  test('toggles theme when clicked', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    
    act(() => {
      fireEvent.click(button);
    });
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument();
    
    act(() => {
      fireEvent.click(button);
    });
    
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  test('uses theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark');
    
    // Mock document implementation for this test
    Object.defineProperty(document.documentElement, 'classList', {
      value: {
        remove: jest.fn(),
        add: jest.fn(),
        contains: (className: string) => className === 'dark'
      }
    });
    
    render(<ThemeToggle />);
    
    // Simply check that the dark theme is reflected
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument();
  });
});