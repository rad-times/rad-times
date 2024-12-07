export type DecodedTokenType = {
  sub: string,
  languageCode: string,
  exp: number
};

export type TokenPairType = {
  accessToken: string,
  refreshToken: string
};
