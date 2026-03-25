const revokedTokens = new Set();

export function revokeToken(token) {
  revokedTokens.add(token);
}

export function isRevoked(token) {
  return revokedTokens.has(token);
}
