import NodeEnvironment from "jest-environment-node";

class PrismaTestEnvironment extends NodeEnvironment {
  // Definindo explicitamente a propriedade 'name'
  name: string;

  constructor(config, context) {
    super(config, context);
    this.name = "prisma"; // Inicializando a propriedade 'name'
  }

  async setup() {
    console.log("Executed - Setting up Prisma Test Environment");
    // Inclua aqui sua lógica de configuração
    await super.setup();
  }

  async teardown() {
    console.log("Teardown - Cleaning up Prisma Test Environment");
    // Inclua aqui sua lógica de limpeza
    await super.teardown();
  }
}

export default PrismaTestEnvironment;
