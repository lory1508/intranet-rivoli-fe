import { Client } from "ldapts";

function escapeLdapFilter(value) {
  return value.replace(/[\\*()\0]/g, (char) => {
    const escaped = {
      "\\": "\\5c",
      "*": "\\2a",
      "(": "\\28",
      ")": "\\29",
      "\0": "\\00",
    };

    return escaped[char];
  });
}

function getString(value) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }

  return null;
}

function createLdapClient(url) {
  return new Client({
    url,
    timeout: 5000,
    connectTimeout: 5000,
    tlsOptions: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Autentica un utente di rete tramite Active Directory.
 *
 * username: username aziendale, ad esempio "mrossi"
 * password: password di rete inserita dall'utente
 *
 * Restituisce i dati dell'utente se autenticato,
 * altrimenti null in caso di credenziali non valide.
 */
export async function authenticateLdapUser(username, password) {
  const config = useRuntimeConfig();

  const url = config.ldapUrl;
  const baseDn = config.ldapBaseDn;
  const bindUser = config.ldapBindUser;
  const bindPassword = config.ldapBindPassword;
  const configuredFilter = config.ldapUserFilter;

  if (
    typeof url !== "string" ||
    !url.startsWith("ldaps://") ||
    typeof baseDn !== "string" ||
    !baseDn ||
    typeof bindUser !== "string" ||
    !bindUser ||
    typeof bindPassword !== "string" ||
    !bindPassword ||
    typeof configuredFilter !== "string" ||
    !configuredFilter.includes("{username}")
  ) {
    throw new Error("Configurazione LDAP non valida");
  }

  // Cerca l'utente usando il suo username di rete.
  const filter = configuredFilter.replace(
    "{username}",
    escapeLdapFilter(username),
  );

  const searchClient = createLdapClient(url);
  let entries;

  try {
    // Bind con l'account tecnico rivoli\Ldap_intranet.
    await searchClient.bind(bindUser, bindPassword);

    const result = await searchClient.search(baseDn, {
      scope: "sub",
      filter,
      attributes: ["sAMAccountName", "displayName", "mail"],
      sizeLimit: 2,
    });

    entries = result.searchEntries;
  } finally {
    await searchClient.unbind().catch(() => {});
  }

  // Rifiuta utenti non trovati o risultati ambigui.
  if (entries.length !== 1) {
    return null;
  }

  const entry = entries[0];
  const userDn = getString(entry.dn);

  if (!userDn) {
    return null;
  }

  // Verifica la password di rete dell'utente.
  const authClient = createLdapClient(url);

  try {
    await authClient.bind(userDn, password);
  } catch {
    // Password errata o bind utente non riuscito.
    return null;
  } finally {
    await authClient.unbind().catch(() => {});
  }

  // Restituisce soltanto i dati necessari all'applicazione.
  return {
    username: getString(entry.sAMAccountName) || username,
    displayName: getString(entry.displayName),
    email: getString(entry.mail),
  };
}
