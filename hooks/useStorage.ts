import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useStorage<T>() {
  const setStorageItemItem = (key: string, value: T) => {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const getStorageItemItem = async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (err) {
      console.error('err', err);
      return "";
    }

  };

  const removeStorageItem = (key: string) => {
    return AsyncStorage.removeItem(key);
  };

  return {
    setStorageItemItem,
    getStorageItemItem,
    removeStorageItem
  }
}
