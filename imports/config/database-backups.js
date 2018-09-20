
// configure uploads directory using environment variable
const var_dir = process.env.RISIKOSCORES_VAR_DIR || process.env.PWD + '/var';
const mongo_url = process.env.MONGO_URL || "";

const backups_dir = var_dir + "/backups";

const url_prefix = "/backups";

const file_prefix = 'database-backup-';

const dateformat_backup = "yyyy-mm-dd-HH-MM-ss";

const collections = [
  'glossar',
  'graph',
  'popups',
  'questions',
  'rooms',
  'textFragments',
]

export {
  backups_dir,
  url_prefix,
  file_prefix,
  mongo_url,
  dateformat_backup,
  collections
}