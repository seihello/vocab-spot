"use server";

export async function validatePasscode(input: string) {
  return input === process.env.ADMIN_PASSCODE;
}
