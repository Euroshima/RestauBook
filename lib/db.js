import { Pool } from "pg";

console.log("🔌 Initialisation PostgreSQL...");
console.log("📡 DATABASE_URL =", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

pool.on("connect", () => {
  console.log("✅ Connexion PostgreSQL établie !");
});

pool.on("error", (err) => {
  console.error("❌ Erreur PostgreSQL :", err.message);
});

export async function query(text, params) {
  console.log("📝 SQL =>", text);
  console.log("📦 PARAMS =>", params);

  const client = await pool.connect();
  console.log("🔐 Client connecté");

  try {
    const start = Date.now();
    const res = await client.query(text, params);
    const duration = Date.now() - start;

    console.log(`⏱️ Requête exécutée en ${duration}ms, ${res.rowCount} lignes`);
    return res;
  } catch (err) {
    console.error("💥 ERREUR SQL :", err.message);
    throw err;
  } finally {
    client.release();
    console.log("🔓 Client relâché");
  }
}
