import bcrypt from 'bcryptjs';

export const createHash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};
