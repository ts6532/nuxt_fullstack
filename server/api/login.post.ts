import { authSchema, type AuthSchema } from "~~/shared/schemas/authSchema";

export default defineEventHandler<{ body: AuthSchema }>(async (event) => {
  const res = await readValidatedBody(event, authSchema.safeParse);

  const { login, password } = res?.data ?? {};

  if (login == "1" && password == "1") {
    await setUserSession(event, {
      user: {
        name: "Super Admin",
      },
    });
    return {};
  }

  throw createError({
    statusCode: 401,
    message: "Bad credentials",
    data: {
      message: "Wrong login or password",
    },
  });
});
