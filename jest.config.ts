import type { Config } from "@jest/types";
const config: Config.InitialOptions = {
  preset: "ts-jest",
  verbose: false,
  testEnvironment: "node",
  rootDir: "src",
};
export default config;
