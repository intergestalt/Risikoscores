export function getId(id) {
  id = id.toLowerCase();
  id = id.replace(new RegExp(' ', 'g'), '_');
  return id;
}
