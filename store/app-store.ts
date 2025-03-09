import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppState {
  firstName: string;
  lastName: string;
  notificationsEnabled: boolean;
  setUser: (firstName: string, lastName: string) => Promise<void>;
  setNotifications: (enabled: boolean) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  firstName: "",
  lastName: "",
  notificationsEnabled: false,

  setUser: async (firstName, lastName) => {
    await AsyncStorage.setItem("firstName", firstName);
    await AsyncStorage.setItem("lastName", lastName);
    set({ firstName, lastName });
  },

  setNotifications: async (enabled) => {
    await AsyncStorage.setItem("notificationsEnabled", JSON.stringify(enabled));
    set({ notificationsEnabled: enabled });
  },
}));
