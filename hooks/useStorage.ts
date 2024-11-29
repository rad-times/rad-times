import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useStorage<T>() {
  const setItem = (key: string, value: T) => {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = async (key: string): Promise<string | null> => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  const removeItem = (key: string) => {
    return AsyncStorage.removeItem(key);
  };

  return {
    setItem,
    getItem,
    removeItem
  }
}
