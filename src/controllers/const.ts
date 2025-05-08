export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
} as const;

export const MESSAGES = {
  itemNotFound: (id: number) => `Item with id ${id} not found`,
  userNotFound: (id: number) => `User with id ${id} not found`,
  userDeleted: (id: number) => `User with id ${id} deleted successfully`,
} as const;
