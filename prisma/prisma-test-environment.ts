import NodeEnvironment from "jest-environment-node";
import { randomUUID } from "crypto";
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string): string {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);
  return url.toString();
}

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string; // Declarando a propriedade 'schema'

  constructor(config, context) {
    super(config, context);
    this.schema = randomUUID(); // Inicializando a propriedade 'schema'
  }

  async setup() {
    console.log("Setting up Prisma Test Environment");
    const databaseURL = generateDatabaseURL(this.schema);

    process.env.DATABASE_URL = databaseURL;
    execSync("npx prisma migrate deploy"); // Executando migrações do Prisma

    await super.setup();
  }

  async teardown() {
    console.log("Tearing down Prisma Test Environment");
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await prisma.$disconnect();

    await super.teardown();
  }
}

