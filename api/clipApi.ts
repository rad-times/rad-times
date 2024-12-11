import {Clip, NewClip} from "@/types/Clip";
import Constants from "expo-constants";

const API_URL:string = Constants.expoConfig?.extra?.API_URL_ROOT || '';

interface IgetClipsByStartDate {
  userId: number;
  sessionToken: string;
  startDateTime?: number | null;
  count?: number;
  filters?: string[];
}

interface IuploadNewClip {
  userId: number;
  sessionToken: string;
  newClipData: NewClip
}

export async function getClipsByStartDate({
  userId,
  sessionToken,
  startDateTime,
  count,
  filters
}:IgetClipsByStartDate): Promise<Clip[]> {
  const dateToSend: number = startDateTime ? startDateTime : new Date().getTime();
  try {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Accept', 'application/json');
    requestHeaders.set('Authorization', `Bearer ${sessionToken}`);
    requestHeaders.set('userId', `${userId}`);

    const resp = await fetch(`${API_URL}/api/footage?startDateTime=${dateToSend}`, {
      method: 'GET',
      headers: requestHeaders
    });
    return await resp.json();
  } catch (err) {
    throw new Error("Error fetching clips");
  }
}

export async function uploadNewClip({
  userId,
  sessionToken,
  newClipData
}:IuploadNewClip): Promise<void> {
  try {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Accept', 'application/json');
    requestHeaders.set('Authorization', `Bearer ${sessionToken}`);
    requestHeaders.set('userId', `${userId}`);

    const resp = await fetch(`${API_URL}/api/footage/upload`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(newClipData)
    });
    return await resp.json();

  } catch (err) {
    throw new Error("Error uploading clip");
  }
}
