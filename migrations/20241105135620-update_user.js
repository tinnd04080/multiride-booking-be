export async function up(db, client) {
  await db.collection('users').updateMany(
    { role: { $exists: false } },
    { $set: { role: "CUSTOMER" } }
  );
}
export async function down(db, client) {
  await db.collection('users').updateMany(
    {},
    { $unset: { role: "" } }
  );
}
