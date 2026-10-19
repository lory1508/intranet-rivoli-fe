import { authenticateLdapUser } from "../../utils/ldap";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const username = body?.username?.trim();
  const password = body?.password;

  if (
    typeof username !== "string" ||
    !username ||
    typeof password !== "string" ||
    !password
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Inserisci username e password.",
    });
  }

  let user;

  try {
    user = await authenticateLdapUser(username, password);
  } catch (error) {
    console.error("Errore durante l'autenticazione LDAP:", error);

    throw createError({
      statusCode: 503,
      statusMessage:
        "Servizio di autenticazione temporaneamente non disponibile.",
    });
  }

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Username o password non validi.",
    });
  }

  await setUserSession(event, {
    user: {
      username: user.username,
      displayName: user.displayName,
      email: user.email,
    },
  });

  return {
    success: true,
    user: {
      username: user.username,
      displayName: user.displayName,
      email: user.email,
    },
  };
});
