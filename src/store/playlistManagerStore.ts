import { create } from 'zustand';
import type { playlistType } from '../types/channelTypes';
import { isM3UPlaylist } from '../utils/validators';
import { useChannelStore } from './channelStore';

type alertStyleType = 'success' | 'error' | undefined;

type PlaylistManagerStore = {
  isActive: boolean;
  isValidUrl: boolean;
  playlists: playlistType[];
  openPlaylistManager: () => void;
  closePlaylistManager: () => void;
  deletePlaylist: (name: string) => void;
  savePlaylist: ({ url, name }: playlistType) => void;
  alertStyle: alertStyleType;
  message: string;
  timeOutId: number | null;
  showAlert: (alert: alertStyleType, message: string) => void;
  validateUrl: (url: string) => Promise<boolean>;
};

export const usePlaylistManagerStore = create<PlaylistManagerStore>(
  (set, get) => ({
    isActive: false,
    isValidUrl: false,
    alertStyle: undefined,
    message: '',
    timeOutId: null,
    playlists: JSON.parse(localStorage.getItem('playlists') || '[]'),
    openPlaylistManager: () => set(() => ({ isActive: true })),
    closePlaylistManager: () => set(() => ({ isActive: false })),
    savePlaylist: async ({ url, name }: playlistType) => {
      if (!name || name.trim() === '') name = url;
      const updatedPlaylists = [...get().playlists, { url, name }];
      localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
      get().showAlert('success', '¡La Playlist fue cargada con exito!');
      set({ playlists: updatedPlaylists });
      useChannelStore.getState().fetchChannels();
    },
    deletePlaylist: async (name: string) => {
      const updatedPlaylists = get().playlists.filter(
        (playlist) => playlist.name !== name,
      );
      localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
      set({ playlists: updatedPlaylists });
      useChannelStore.getState().fetchChannels();
    },
    showAlert: (alertType, message) => {
      const currentTimeOut = get().timeOutId;
      if (currentTimeOut) clearTimeout(currentTimeOut);
      set({ alertStyle: alertType, message });
      const id = setTimeout(() => {
        set({ alertStyle: undefined, message: '', timeOutId: null });
      }, 6000);
      set({ timeOutId: id });
    },
    validateUrl: async (url: string) => {
      console.log('validacion:', url);
      set({ alertStyle: undefined, message: '', isValidUrl: false });
      const isDuplicate = get().playlists.some(
        (playlist) => playlist.url === url,
      );
      if (isDuplicate) {
        get().showAlert('error', 'Este enlace ya está en tu lista.');
        return false;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          get().showAlert('error', 'No se obtuvo respuesta del enlace.');
          return false;
        }

        const content = await response.text();
        if (!isM3UPlaylist(content)) {
          get().showAlert(
            'error',
            'El enlace no entrega ninguna playlist o la playlist no tiene el formato M3U/M3U8.',
          );
          return false;
        }
        return true;
      } catch (error) {
        if (error instanceof Error) {
          get().showAlert('error', 'Error de red o enlace no accesible,');
        }
        return false;
      }
    },
  }),
);
