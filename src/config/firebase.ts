// This file will now provide a mock auth service instead of Firebase

// Mock auth interface to maintain compatibility with existing code
export const auth = {
  // Mock methods that return promises to simulate async behavior
  currentUser: null,
  signOut: async () => Promise.resolve(),
};

// Export a dummy app object to maintain compatibility
export default {};