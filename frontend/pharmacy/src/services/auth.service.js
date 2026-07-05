export const authService = {
  login: async (email, password) => {
    // FAKE MOCK LOGIN FOR TESTING
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      jwt: "fake-jwt-token-123",
      username: email,
      roles: ["ROLE_ADMIN"]
    };
  }
};