import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useStorage<T>() {
  const setStorageItemItem = (key: string, value: T) => {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  };

  // @TODO dont return any - work out what a proper types return is for "any object with any keys"
  const getStorageItemItem = async (key: string): Promise<any | null> => {
    try {
      const resp:string|null = await AsyncStorage.getItem(key);
      if (resp) {
        return JSON.parse(resp);
      }

      return {};
    } catch (err) {
      console.error('err', err);
      return {};
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
