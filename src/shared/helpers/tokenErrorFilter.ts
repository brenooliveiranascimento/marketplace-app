export const isTokenRelatedError = (message: string): boolean => {
  const tokenRelatedErrors = ["Token expirado"];

  return tokenRelatedErrors.some((tokenError) =>
    message.toLowerCase().includes(tokenError.toLowerCase())
  );
};
