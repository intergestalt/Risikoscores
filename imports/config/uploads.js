
// configure uploads directory using environment variable
var_dir = process.env.RISIKOSCORES_VAR_DIR || process.env.PWD + '/var';

uploads_dir = var_dir + "/uploads";
cache_dir = var_dir + "/cache";

url_prefix = "/uploads";

export {
  uploads_dir,
  cache_dir,
  url_prefix,
}