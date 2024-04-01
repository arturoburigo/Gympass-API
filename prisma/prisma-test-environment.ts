/* eslint-disable @typescript-eslint/no-var-requires */
const NodeEnvironment = require("jest-environment-node");
const { randomUUID } = require("node:crypto");
const { execSync } = require("node:child_process");
const { PrismaClient } = require("@prisma/client");
require("dotenv/config");

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);

  return url.toString();
}

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);
    
    process.env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy");

    this.global.teardown = async () => {
      await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
      await prisma.$disconnect();
    };
  }

  async teardown() {
    await this.global.teardown();
    await super.teardown();
  }
}

module.exports = CustomEnvironment;
