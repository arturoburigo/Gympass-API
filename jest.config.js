module.exports = {
  preset: "ts-jest",
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
