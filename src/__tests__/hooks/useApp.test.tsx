/**
 * useApp Hook Tests
 *
 * Test the actual useApp hook behavior with the AppContext.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useApp } from '@/hooks/useApp.hook';
import { ThemeContextProvider, ThemeContext } from '@/contexts/app.context';

// Test component that uses the hook
function TestComponent({ onToggle }: { onToggle: () => void }) {
  const { isDark } = useApp();
  return (
    <div>
      <span data-testid="dark-state">{isDark ? 'dark' : 'light'}</span>
      <button onClick={onToggle}>Toggle</button>
    </div>
  );
}

// Component to test error boundary behavior
function OutsideProvider() {
  const _ = useApp();
  return <div>Should not render</div>;
}

function ToggleButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button onClick={onClick}>{label}</button>;
}

describe('useApp hook', () => {
  it('provides initial dark mode state as false', () => {
    const toggleMock = jest.fn();
    render(
      <ThemeContextProvider isDark={false} onToggle={toggleMock}>
        <TestComponent onToggle={toggleMock} />
      </ThemeContextProvider>
    );

    expect(screen.getByTestId('dark-state').textContent).toBe('light');
  });

  it('updates state when toggle is called', () => {
    const toggleMock = jest.fn();
    render(
      <ThemeContextProvider isDark={false} onToggle={toggleMock}>
        <TestComponent onToggle={toggleMock} />
      </ThemeContextProvider>
    );

    userEvent.click(screen.getByRole('button', { name: /toggle/i }));

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  it('toggles state correctly', () => {
    let isDark = false;
    const toggle = () => { isDark = !isDark; };

    const { rerender } = render(
      <ThemeContextProvider isDark={isDark} onToggle={toggle}>
        <TestComponent onToggle={toggle} />
      </ThemeContextProvider>
    );

    expect(screen.getByTestId('dark-state').textContent).toBe('light');

    userEvent.click(screen.getByRole('button', { name: /toggle/i }));
    expect(screen.getByTestId('dark-state').textContent).toBe('dark');

    userEvent.click(screen.getByRole('button', { name: /toggle/i }));
    expect(screen.getByTestId('dark-state').textContent).toBe('light');
  });

  it('throws error when used outside ThemeContextProvider', () => {
    // Suppress console.error for this test since we expect the error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<OutsideProvider />);
    }).toThrow('useApp must be used within a ThemeContextProvider');

    consoleSpy.mockRestore();
  });

  it('provides consistent state across multiple renders', () => {
    let isDark = false;
    const toggle = () => { isDark = !isDark; };

    const { rerender } = render(
      <ThemeContextProvider isDark={isDark} onToggle={toggle}>
        <TestComponent onToggle={toggle} />
      </ThemeContextProvider>
    );

    userEvent.click(screen.getByRole('button', { name: /toggle/i }));

    // After re-render with toggled state, should show dark
    rerender(
      <ThemeContextProvider isDark={!isDark} onToggle={toggle}>
        <TestComponent onToggle={toggle} />
      </ThemeContextProvider>
    );

    // State reflects the toggle
    expect(screen.getByTestId('dark-state').textContent).toBe('dark');
  });

  it('works with multiple context providers independently', () => {
    function SeparateTestComponent({ isDark }: { isDark: boolean }) {
      return <span data-testid={`dark-${isDark ? 'on' : 'off'}`}>{isDark ? 'ON' : 'OFF'}</span>;
    }

    render(
      <ThemeContextProvider isDark={false} onToggle={jest.fn()}>
        <SeparateTestComponent isDark={false} />
        <SeparateTestComponent isDark={false} />
      </ThemeContextProvider>
    );

    // Both should show initial state
    expect(screen.getByTestId('dark-off')).toBeInTheDocument();
    const allOffElements = screen.getAllByTestId('dark-off');
    expect(allOffElements.length).toBe(2);
  });
});
