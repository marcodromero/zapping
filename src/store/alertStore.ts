import { create } from 'zustand';

type alertType = 'success' | 'error' | undefined;

type AlertStore = {
  type: alertType;
  message: string;
  timeOutId: number | null;
  showAlert: (type: alertType, message: string) => void;
};

export const useAlertStore = create<AlertStore>((set, get) => ({
  type: undefined,
  message: '',
  timeOutId: null,
  showAlert: (type, message) => {
    const currentTimeOut = get().timeOutId;
    if (currentTimeOut) clearTimeout(currentTimeOut);
    set({ type, message });
    const id = setTimeout(() => {
      set({ type: undefined });
      set({ message: '' });
      set({ timeOutId: null });
    }, 6000);
    set({ timeOutId: id });
  },
}));
