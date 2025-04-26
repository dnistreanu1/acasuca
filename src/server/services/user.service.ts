import { db } from '../db';

const getUserById = async (id: string) => {
  const listing = await db.query.userTable.findFirst({
    where: (userTable, { eq }) => eq(userTable.id, id),
  });
  return listing;
};

export const userService = {
  getUserById,
};
