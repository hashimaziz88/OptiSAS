/**
 * Invitation code utilities.
 *
 * A code is a URL-safe base64 encoding of "{tenantId}|{YYYY-MM-DD}" (UTC date).
 * It changes every UTC midnight, giving a ~24-hour validity window.
 * Decoding also accepts yesterday's date to handle clock/timezone edge cases.
 *
 * No backend storage required — the code is deterministic from the tenant ID.
 */

const utcDateString = (offset = 0): string => {
  const d = new Date(Date.now() - offset * 86_400_000);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
};

const toUrlSafeBase64 = (str: string): string =>
  btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

const fromUrlSafeBase64 = (code: string): string => {
  const padded = code.replace(/-/g, "+").replace(/_/g, "/");
  const padding =
    padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return atob(padded + padding);
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Generate today's invitation code for the given tenant ID.
 */
export const generateInvitationCode = (tenantId: string): string =>
  toUrlSafeBase64(`${tenantId}|${utcDateString()}`);

/**
 * Decode an invitation code.
 * Returns the tenant ID when valid, or null when the code is malformed / expired.
 */
export const decodeInvitationCode = (code: string): string | null => {
  try {
    const raw = fromUrlSafeBase64(code.trim());
    const sep = raw.lastIndexOf("|");
    if (sep === -1) return null;

    const tenantId = raw.slice(0, sep);
    const dateStr = raw.slice(sep + 1);

    if (!UUID_RE.test(tenantId)) return null;

    // Accept today or yesterday to tolerate clock/timezone differences
    if (dateStr !== utcDateString(0) && dateStr !== utcDateString(1))
      return null;

    return tenantId;
  } catch {
    return null;
  }
};
