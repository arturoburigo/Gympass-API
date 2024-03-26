module.exports = {
  preset: "ts-jest",
  testEnvironment: "./prisma/prisma-test-environment.ts",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        // Configurações específicas do ts-jest aqui
        tsconfig: {
          esModuleInterop: true,
        },
      },
    ],
  },
};
