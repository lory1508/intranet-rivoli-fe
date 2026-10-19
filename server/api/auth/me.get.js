export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Non autenticato.",
    });
  }

  return {
    authenticated: true,
    user: session.user,
  };
});
