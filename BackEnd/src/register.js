import moduleAlias from "module-alias";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

moduleAlias.addAliases({
  "~": `${__dirname}/src`,
});
