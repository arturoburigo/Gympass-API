module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "./prisma/prisma-test-environment.ts",
  testRegex: ".e2e-spec.ts$",
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
