export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  CONFLICT: 409,
} as const;

export const MESSAGES = {
  incorrectForm: "incorrect form submission",
  loginExists: "login already exists",
  userNotFound: (id: number) => `User with id ${id} not found`,
  userDeleted: (id: number) => `User with id ${id} deleted successfully`,
} as const;
