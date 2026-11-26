export interface AuthUser {
  id: string;
  name: string;
  email: string;
  initials: string;
}

interface StoredUser extends AuthUser {
  passwordHash: string;
}

export type AuthResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string };

const USERS_KEY = 'codepulse.users';
const SESSION_KEY = 'codepulse.session';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initialsOf = (name: string) => {
  const letters = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
  return letters || 'U';
};

const toPublicUser = ({ id, name, email, initials }: StoredUser): AuthUser => ({
  id,
  name,
  email,
  initials,
});

const readUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredUser[]) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

/**
 * Хеш пароля. Web Crypto доступен в защищённом контексте (localhost/https).
 * Это демо-хранилище в localStorage, а не продакшн-аутентификация.
 */
const hashPassword = async (email: string, password: string): Promise<string> => {
  const source = `${email.trim().toLowerCase()}:${password}`;
  if (globalThis.crypto?.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(source));
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  let hash = 5381;
  for (let i = 0; i < source.length; i += 1) {
    hash = (hash * 33) ^ source.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
};

const createId = () =>
  globalThis.crypto?.randomUUID?.() ?? `u_${Date.now()}_${Math.random().toString(16).slice(2)}`;

export const validateRegistration = (
  name: string,
  email: string,
  password: string,
  confirm: string,
): string | null => {
  if (name.trim().length < 2) return 'Введите имя: минимум 2 символа.';
  if (!EMAIL_RE.test(email.trim())) return 'Введите корректный e-mail.';
  if (password.length < 6) return 'Пароль должен быть не короче 6 символов.';
  if (password !== confirm) return 'Пароли не совпадают.';
  return null;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  confirm: string,
): Promise<AuthResult> => {
  const validationError = validateRegistration(name, email, password, confirm);
  if (validationError) return { ok: false, error: validationError };

  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();
  if (users.some((user) => user.email === normalizedEmail)) {
    return { ok: false, error: 'Пользователь с таким e-mail уже зарегистрирован.' };
  }

  const stored: StoredUser = {
    id: createId(),
    name: name.trim(),
    email: normalizedEmail,
    initials: initialsOf(name),
    passwordHash: await hashPassword(normalizedEmail, password),
  };

  writeUsers([...users, stored]);
  localStorage.setItem(SESSION_KEY, stored.id);
  return { ok: true, user: toPublicUser(stored) };
};

export const loginUser = async (email: string, password: string): Promise<AuthResult> => {
  if (!EMAIL_RE.test(email.trim())) return { ok: false, error: 'Введите корректный e-mail.' };
  if (!password) return { ok: false, error: 'Введите пароль.' };

  const normalizedEmail = email.trim().toLowerCase();
  const user = readUsers().find((item) => item.email === normalizedEmail);
  const passwordHash = await hashPassword(normalizedEmail, password);

  if (!user || user.passwordHash !== passwordHash) {
    return { ok: false, error: 'Неверный e-mail или пароль.' };
  }

  localStorage.setItem(SESSION_KEY, user.id);
  return { ok: true, user: toPublicUser(user) };
};

export const getSessionUser = (): AuthUser | null => {
  try {
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) return null;
    const user = readUsers().find((item) => item.id === id);
    return user ? toPublicUser(user) : null;
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
};
