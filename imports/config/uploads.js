
// configure uploads directory using environment variable
const var_dir = process.env.RISIKOSCORES_VAR_DIR || process.env.PWD + '/var';

const uploads_dir = var_dir + "/uploads";
const cache_dir = var_dir + "/cache";

const url_prefix = "/uploads";

export {
  uploads_dir,
  cache_dir,
  url_prefix,
}