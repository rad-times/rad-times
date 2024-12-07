import {jwtDecode} from "jwt-decode";
import {DecodedTokenType} from '@/types/AuthToken';

export default function tokenIsExpired (token: string): boolean {
  const decoded: DecodedTokenType = jwtDecode(token);
  const now:Date = new Date();

  return decoded.exp < now.getMilliseconds();
}
