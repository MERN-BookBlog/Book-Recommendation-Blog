import { hash } from "bcrypt";
const SALT_ROUNDS = 12;

async function hashPassword(plainPassword) {
  if (!plainPassword) throw new Error("No password provided");
  return await hash(plainPassword, SALT_ROUNDS);
}

export default hashPassword;
