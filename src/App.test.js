import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';
import { replaceCamelWithSpaces } from './App';

test('button has correct initial color and updates when clicked', () => {
  render(<App />);

  // find an el with role of button and text 'Change to blue'
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  // expect be to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  // click button
  fireEvent.click(colorButton);

  // expect bg to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });

  // expect button text to be 'Change to red'
  expect(colorButton).toHaveTextContent('Change to Medium Violet Red');
});

test('initial conditions', () => {
  render(<App />);

  // check that button starts out enabled
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  expect(colorButton).toBeEnabled();

  // check that checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('disables button when checkbox is checked', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  // check checkbox
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  // uncheck checkbox
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test('button gray when disabled', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  // gray <> red
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  // gray <> blue
  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

describe('spaces before camel case-capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiple inner captial letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
