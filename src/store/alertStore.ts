import { create } from 'zustand';

type AlertStore = {
  type: alertType;
  showAlert: (type: alertType) => void;
};

type alertType = 'success' | 'error' | undefined;

export const useAlertStore = create<AlertStore>((set) => ({
  type: undefined,
  showAlert: (type) => {
    set({ type });
    setTimeout(() => set({ type: undefined }), 6000);
  },
}));
