import fs from 'fs';
import { backups_dir } from '../../config/database-backups';

console.log("backups directory: " + backups_dir)

// create uploads directory if it doesn't exist
if (!fs.existsSync(backups_dir)) {
  console.log("creating backups directory ")
  fs.mkdirSync(backups_dir);
}
