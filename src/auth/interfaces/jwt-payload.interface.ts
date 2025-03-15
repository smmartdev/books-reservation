export interface JwtPayload {
    sub: number;      // The 'sub' field holds the user ID (usually a number or string)
    username: string; // The username of the authenticated user
    // role: string;     // The role of the user (e.g., 'admin', 'user', etc.)
  }