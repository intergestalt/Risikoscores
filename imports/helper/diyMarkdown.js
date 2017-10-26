import React, { createElement } from 'react';
import Remarkable from 'remarkable';

import {
  ExternalLink,
  Link,
  GlossarLink,
  Timeline
} from '../ui/components/content';
import { exists, existsString } from '../helper/global';
import { getId } from '../helper/admin';

const SPECIAL_BEGIN = '<<<';
const SPECIAL_END = '>>>';
const SPECIAL_SEPARATOR = ':';
const SPECIAL_OPTIONS_SPLIT = ';';

//Params for some special components with a simple syntax
var simpleParams = {
  ExternalLink: ['text', 'url'],
  Link: ['text', 'room', 'tab'],
  Glossar: ['text', 'entry'],
  Timeline: ['data']
};

function createDangerHtml(text, prefix, postfix) {
  return { __html: prefix + text + postfix };
}

function getSpecialComponent(specialComponent) {
  const index = specialComponent.indexOf(SPECIAL_SEPARATOR);
  var optionsStr = '';
  var name = '';
  if (index !== -1) {
    name = specialComponent.substring(0, index).trim();
    optionsStr = specialComponent.substring(index + 1).trim();
  }

  var options = null;
  if (optionsStr.startsWith('{')) {
    options = JSON.parse(optionsStr);
    var test = JSON.stringify(options);
  } else {
    alternativeOptions = optionsStr.split(SPECIAL_OPTIONS_SPLIT);
    options = {};
    for (var j = 0; j < alternativeOptions.length; j++) {
      var params = simpleParams[name];
      if (exists(params)) {
        if (params.length >= j + 1) {
          const key = params[j];
          options[key] = alternativeOptions[j].trim();
        }
      }
    }
  }
  return { name: name, options: options };
}

export function findGlossarComponents(text, nested = false) {
  var result = {};
  /*var SEP_END = SPECIAL_END;
  var SEP_BEGIN = SPECIAL_BEGIN;
  if (nested) {
    var SEP_END = NESTED_SPECIAL_END;
    var SEP_BEGIN = NESTED_SPECIAL_BEGIN;
  }*/
  var index = text.indexOf(SPECIAL_BEGIN + 'Glossar:');
  while (index !== -1) {
    var index2 = text.indexOf(SPECIAL_END, index);
    if (index2 !== -1) {
      var special = text.substring(index + 3, index2);
      const operation = getSpecialComponent(special);
      result[operation.options.entry.toLowerCase()] = true;

      text = text.substring(index2 + 3);
      index = text.indexOf(SPECIAL_BEGIN + 'Glossar:');
    } else {
      index = -1;
    }
  }
  return result;
}

function renderSpecialComponent(specialComponent, id, glossar) {
  const operation = getSpecialComponent(specialComponent);
  const name = operation.name.toLocaleLowerCase();
  const options = operation.options;
  if (name === 'externallink') {
    return (
      <ExternalLink key={'_' + id} text={options.text} url={options.url} />
    );
  } else if (name === 'link') {
    return (
      <Link
        key={'_' + id}
        text={options.text}
        room={options.room}
        tab={options.tab}
      />
    );
  } else if (name === 'glossar') {
    if (glossar) {
      return (
        <GlossarLink
          key={'_' + id}
          text={options.text}
          entry={getId(options.entry)}
          highlighted={false}
        />
      );
    } else {
      return <span key={'_' + id}>{options.text}</span>;
    }
  } else if (name === 'timeline') {
    return <Timeline key={'_' + id} data={options} />;
  }
}

function getSpanComponent(md, text, id) {
  var prefix = '';
  var postfix = '';
  if (text.startsWith(' ')) {
    prefix = ' ';
  }
  if (text.endsWith(' ')) {
    postfix = ' ';
  }
  text = md.render(text);
  text = stripOuterP(text);
  return (
    <span
      key={'_' + id}
      dangerouslySetInnerHTML={createDangerHtml(text, prefix, postfix)}
    />
  );
}

function stripOuterP(block) {
  block = block.trim();
  if (block.startsWith('<p>')) {
    block = block.substring(3);
  }
  if (block.endsWith('</p>')) {
    block = block.substring(0, block.length - 4);
  }
  return block;
}
function getSpecialEnd(text) {
  var open = 0;
  index = 0;
  var indexEnd = -1;
  var indexBegin = -1;
  var start = true;
  while (start || open > 0) {
    start = false;
    indexBegin = text.indexOf(SPECIAL_BEGIN, index);
    indexEnd = text.indexOf(SPECIAL_END, index);
    if (indexBegin != -1) {
      if (indexBegin <= indexEnd) {
        open++;
        index = indexBegin + 1;
      } else {
        open--;
        index = indexEnd + 1;
      }
    } else {
      open--;
      index = indexEnd + 1;
    }
  }

  return indexEnd;
}
function diyMarkdownBlock(text, blockId, glossar = true) {
  var md = new Remarkable({ html: true, xhtmlOut: true, breaks: true });

  const compontentsForBlock = [];
  text = text.trim();
  var index = text.indexOf(SPECIAL_BEGIN);
  var result = '';
  var id = 0;
  var onlySpecial = true;
  while (index !== -1) {
    var index2 = getSpecialEnd(text);
    if (index2 !== -1) {
      var before = text.substring(0, index);
      if (existsString(before)) {
        var componentBefore = getSpanComponent(md, before, id);
        id++;
        onlySpecial = false;
        compontentsForBlock.push(componentBefore);
      }

      var special = text.substring(index + 3, index2);
      specialComponent = renderSpecialComponent(special, id, glossar);
      compontentsForBlock.push(specialComponent);
      id++;

      text = text.substring(index2 + 3);
      index = text.indexOf(SPECIAL_BEGIN);
    } else {
      index = -1;
    }
  }
  if (existsString(text)) {
    var lastComponent = getSpanComponent(md, text, id);
    id++;
    onlySpecial = false;
    compontentsForBlock.push(lastComponent);
  }
  if (onlySpecial) {
    return compontentsForBlock;
  }
  return <p key={'_' + blockId}>{compontentsForBlock}</p>;
}

export function diyMarkdown(text, glossar = true) {
  const blocks = text.split('\n\n');
  const components = [];
  for (var i = 0; i < blocks.length; i++) {
    const compontentsForBlock = diyMarkdownBlock(blocks[i], i, glossar);
    components.push(compontentsForBlock);
  }
  return components;
}
