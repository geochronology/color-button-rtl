import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color and updates when clicked', () => {
  render(<App />);

  // find an el with role of button and text 'Change to blue'
  const colorButton = screen.getByRole('button', {
    name: 'Change to blue',
  });

  // expect be to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  // click button
  fireEvent.click(colorButton);

  // expect bg to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

  // expect button text to be 'Change to red'
  expect(colorButton).toHaveTextContent('Change to red');
});

test('button turns blue when clicked', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
});

test('initial conditions', () => {
  render(<App />);

  // check that button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toBeEnabled();

  // check that checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});
