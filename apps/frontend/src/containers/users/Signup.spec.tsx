/* eslint-disable @typescript-eslint/no-use-before-define */
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  waitFor,
  screen,
  act,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Signup } from './Signup';

describe('SignupForm', () => {
  const handleSignup = vi.fn();

  beforeEach(() => {
    render(<Signup handleSignup={handleSignup} />);
  });

  it('renders the form with initial inputs and button', () => {
    expect(getEmailInput()).toBeInTheDocument();
    expect(getNameInput()).toBeInTheDocument();
    expect(getCnpjInput()).toBeInTheDocument();
    expect(getPasswordInput()).toBeInTheDocument();
    expect(getLogarButton()).toBeInTheDocument();
  });

  it('should show error after blur inputs with wrong params', async () => {
    const nameInput = getNameInput();
    const cnpjInput = getCnpjInput();
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const submitButton = getLogarButton();

    act(() => {
      fireEvent.blur(nameInput);
      fireEvent.blur(cnpjInput);
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
    });
    fireEvent.click(submitButton);

    await waitFor(async () => {
      const cnpjErrorDiv = screen.getByText(/O CPF\/CNPJ é obrigatório/i);
      const nameErrorDiv = screen.getByText(/O nome é obrigatório/i);
      const emailErrorDiv = screen.getByText(/o email é obrigatório/i);
      const passwordErrorDiv = screen.getByText(/o password é obrigatório/i);
      expect(nameErrorDiv).toBeVisible();
      expect(cnpjErrorDiv).toBeVisible();
      expect(emailErrorDiv).toBeVisible();
      expect(passwordErrorDiv).toBeVisible();
    });
    expect(nameInput).toHaveValue('');
    expect(cnpjInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
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
      expect(handleSignup).not.toHaveBeenCalled();
    });
  });
  it('should not submit when get the too easy password or wrong cnpj', async () => {
    const nameInput = getNameInput();
    const cnpjInput = getCnpjInput();
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const submitButton = getLogarButton();
    act(() => {
      fireEvent.change(nameInput, { target: { value: 'adm' } });
      fireEvent.change(cnpjInput, { target: { value: '00000012' } });
      fireEvent.change(emailInput, { target: { value: 'adm@adm.com' } });
      fireEvent.change(passwordInput, { target: { value: 'secrety2@' } });
      fireEvent.click(submitButton);
    });

    await waitFor(async () => {
      const cnpjErrorDiv = screen.queryByText(
        /O campo aceita cnpj\/cpf com ou sem /i
      );
      const passwordErrorDiv = screen.queryByText(
        /A senha deve conter letras/i
      );
      expect(cnpjErrorDiv).toBeInTheDocument();
      expect(passwordErrorDiv).toBeInTheDocument();
      expect(handleSignup).not.toHaveBeenCalled();
    });
  });
  it('should submit when get the right params', async () => {
    const nameInput = getNameInput();
    const cnpjInput = getCnpjInput();
    const emailInput = getEmailInput();
    const passwordInput = getPasswordInput();
    const submitButton = getLogarButton();
    act(() => {
      fireEvent.change(nameInput, { target: { value: 'adm' } });
      fireEvent.change(cnpjInput, { target: { value: '00000000012' } });
      fireEvent.change(emailInput, { target: { value: 'adm@adm.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Secrety2@' } });
      fireEvent.click(submitButton);
    });

    await waitFor(async () => {
      expect(handleSignup).toHaveBeenCalledOnce();
      expect(handleSignup).toHaveBeenCalledWith(
        {
          name: 'adm',
          cnpj: '00000000012',
          email: 'adm@adm.com',
          password: 'Secrety2@',
        },
        expect.anything()
      );
    });
  });
});

function getNameInput() {
  return screen.getByPlaceholderText('Nome aqui...');
}
function getCnpjInput() {
  return screen.getByPlaceholderText('CNPJ aqui...');
}
function getEmailInput() {
  return screen.getByPlaceholderText('Email aqui...');
}
function getPasswordInput() {
  return screen.getByPlaceholderText('Password...');
}
function getLogarButton() {
  return screen.getByRole('button', {
    name: /Cadastrar/i,
  });
}
