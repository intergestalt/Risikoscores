function renderSpecial(special) {
  console.log(special);
  return '<a href="#">' + special + '</a>';
}

export function diyMarkdown(text) {
  console.log(text);
  var index = text.indexOf('{{');
  var result = '';
  while (index !== -1) {
    var index2 = text.indexOf('}}', index);
    if (index2 !== -1) {
      var special = text.substring(index + 2, index2);
      special = renderSpecial(special);
      text = text.substring(0, index) + special + text.substring(index2 + 2);
      index = text.indexOf('{{');
    } else {
      index = -1;
    }
  }
  return text;
}
