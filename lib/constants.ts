export const API_URL = process.env.EXPO_PUBLIC_API_URL!;
export const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN!;

export const LOGIN_CONFIG = {
  endpoint: 'login.php',
  tabla: 'link_users',
  campo_email: 'users_email',
  campo_password: 'users_pw',
  campo_activo: 'users_activo',
  campos_excluir: ['users_password_hash', 'DATE_UPDATE'],
};