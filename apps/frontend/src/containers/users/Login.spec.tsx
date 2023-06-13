/* eslint-disable @typescript-eslint/no-use-before-define */
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  waitFor,
  screen,
  act,
} from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Login from './Login';

describe('LoginForm', () => {
  const handleLogin = vi.fn();

  beforeEach(() => {
    render(<Login handleLogin={handleLogin} />);
  });

  it('renders the form with initial values', () => {
    expect(getEmailInput()).toBeInTheDocument();
    expect(getPasswordInput()).toBeInTheDocument();
    expect(getLogarButton()).toBeInTheDocument();
  });

  it('should show error after blur inputs with wrong params', async () => {
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const submitButton = getLogarButton();
    // render(<Login/>);
    // const view = render(<Login/>);

    act(() => {
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
    });
    fireEvent.click(submitButton);

    await waitFor(async () => {
      const emailErrorDiv = screen.getByText(/o email é obrigatório/i);
      const passwordErrorDiv = screen.getByText(/o password é obrigatório/i);
      // logRoles(view.container);
      expect(emailErrorDiv).toBeVisible();
      expect(passwordErrorDiv).toBeVisible();
    });
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  it('should hide erros when get the right params', async () => {
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    act(() => {
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
      fireEvent.change(emailInput, { target: { value: 'adm@adm.com' } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: 'secrety' } });
      fireEvent.blur(passwordInput);
    });

    await waitFor(async () => {
      const emailErrorDiv = screen.getByText(/o email é obrigatório/i);
      const passwordErrorDiv = screen.getByText(/o password é obrigatório/i);
      expect(emailErrorDiv).toBeInTheDocument();
      expect(passwordErrorDiv).toBeInTheDocument();
    });
  });
  it('should not submit when have errors inside the inputs', async () => {
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const submitButton = getLogarButton();
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'admcom' } });
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
      fireEvent.click(submitButton);
    });

    await waitFor(async () => {
      expect(handleLogin).not.toHaveBeenCalled();
    });
  });
  it('should submit when get the right params', async () => {
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const submitButton = getLogarButton();
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'adm@adm.com' } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: 'secrety' } });
      fireEvent.blur(passwordInput);
      fireEvent.click(submitButton);
    });

    await waitFor(async () => {
      expect(handleLogin).toHaveBeenCalledOnce();
      expect(handleLogin).toHaveBeenCalledWith(
        {
          email: 'adm@adm.com',
          password: 'secrety',
        },
        expect.anything()
      );
    });
  });
});

function getEmailInput() {
  return screen.getByPlaceholderText('Email aqui...');
}
function getPasswordInput() {
  return screen.getByPlaceholderText('Password...');
}
function getLogarButton() {
  return screen.getByRole('button', {
    name: /logar/i,
  });
}
