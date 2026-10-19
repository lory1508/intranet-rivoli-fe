import { Client } from "ldapts";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  if (!config.ldapUrl || !config.ldapBindUser || !config.ldapBindPassword) {
    throw createError({
      statusCode: 500,
      statusMessage: "Configurazione LDAP incompleta.",
    });
  }

  const client = new Client({
    url: config.ldapUrl,
    timeout: 5000,
    connectTimeout: 5000,
    tlsOptions: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.bind(config.ldapBindUser, config.ldapBindPassword);

    return {
      success: true,
      message: "Connessione LDAP e bind tecnico riusciti.",
    };
  } catch (error) {
    // Dettagli diagnostici solo nel terminale del server.
    // console.error("Test LDAP fallito:", error.message);
    console.error("Test LDAP fallito:", {
      name: error.name,
      code: error.code,
      message: error.message,
    });

    throw createError({
      statusCode: 503,
      statusMessage: "Connessione LDAP o autenticazione tecnica fallita.",
    });
  } finally {
    await client.unbind().catch(() => {});
  }
});
