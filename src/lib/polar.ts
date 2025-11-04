import { Polar } from "@polar-sh/sdk";

if (!process.env.POLAR_ACCESS_TOKEN) {
  throw new Error("POLAR_ACCESS_TOKEN environment variable is not set");
}

if (!process.env.POLAR_ORGANIZATION_ID) {
  throw new Error("POLAR_ORGANIZATION_ID environment variable is not set");
}

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
});

export const POLAR_ORGANIZATION_ID = process.env.POLAR_ORGANIZATION_ID;

