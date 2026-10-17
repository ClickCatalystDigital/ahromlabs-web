// `node scripts/search-console.check.mjs` — the service-account JWT verifies against
// its key and carries the claims Google's token endpoint expects. No network.
import crypto from "node:crypto";
import assert from "node:assert";
import { signedJwt } from "./search-console.mjs";

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const key = { client_email: "bot@x.iam.gserviceaccount.com", private_key: privateKey.export({ type: "pkcs8", format: "pem" }) };
const [h, c, s] = signedJwt(key, "https://www.googleapis.com/auth/webmasters", 1000).split(".");
assert.ok(crypto.createVerify("RSA-SHA256").update(`${h}.${c}`).verify(publicKey, s, "base64url"), "signature");
assert.deepEqual(JSON.parse(Buffer.from(h, "base64url")), { alg: "RS256", typ: "JWT" });
assert.deepEqual(JSON.parse(Buffer.from(c, "base64url")), {
  iss: key.client_email,
  scope: "https://www.googleapis.com/auth/webmasters",
  aud: "https://oauth2.googleapis.com/token",
  iat: 1000,
  exp: 4600,
});
console.log("search-console: jwt ok");
