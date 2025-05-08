export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
} as const;

export const MESSAGES = {
  itemNotFound: (id: number) => `Item with id ${id} not found`,
} as const;
