import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

export const keystaticReader = createReader(process.cwd(), keystaticConfig);
