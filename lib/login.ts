import { API_TOKEN, API_URL, LOGIN_CONFIG } from './constants';

export interface UserSession {
  [key: string]: any;
}

export interface LoginResponse {
  status: number;
  total: number;
  error: string;
  error_num: number;
  results: Record<string, any>;
}

export async function loginUser(email: string, password: string): Promise<UserSession> {
  const formdata = new FormData();
  formdata.append(LOGIN_CONFIG.campo_email, email);
  formdata.append(LOGIN_CONFIG.campo_password, password);
  formdata.append('tabla', LOGIN_CONFIG.tabla);

  const response = await fetch(`${API_URL}/${LOGIN_CONFIG.endpoint}?token=${API_TOKEN}`, {
    method: 'POST',
    body: formdata,
  });

  const data: LoginResponse = await response.json();

  if (data.status !== 200 || data.total !== 1) {
    throw new Error(data.error || 'Credenciales incorrectas');
  }

  if (data.results[LOGIN_CONFIG.campo_activo] !== 1) {
    throw new Error('Usuario inactivo');
  }

  const session = Object.fromEntries(
    Object.entries(data.results).filter(([key]) => !LOGIN_CONFIG.campos_excluir.includes(key))
  ) as UserSession;

  return session;
}