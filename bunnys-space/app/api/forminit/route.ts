import { createForminitProxy } from "forminit/next";

const apiKey = process.env.FORMINIT_API_KEY;
if (!apiKey) {
  throw new Error("Missing FORMINIT_API_KEY in environment variables");
}

const forminit = createForminitProxy({ apiKey });

export const POST = forminit.POST;
