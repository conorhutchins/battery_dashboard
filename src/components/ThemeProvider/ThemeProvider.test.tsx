import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="test-child">Child Component</div>
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  test('adds appropriate class to document element', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <div>Test</div>
      </ThemeProvider>
    );
    
    // Theme should be applied to document element
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('persists theme to localStorage', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <div>Test</div>
      </ThemeProvider>
    );
    
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test('uses system preference when theme is system', () => {
    // Mock system preference to be dark
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query.includes('dark'),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});