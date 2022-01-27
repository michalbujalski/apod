export const save = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const get = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const PersistantStore = {
  save,
  get
};
