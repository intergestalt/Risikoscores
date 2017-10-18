import React, { createElement } from 'react';
import Remarkable from 'remarkable';

import {
  ExternalLink,
  Link,
  GlossarLink,
  Timeline
} from '../ui/components/content';
import { exists, existsString } from '../helper/global';

const SPECIAL_BEGIN = '[[';
const SPECIAL_END = ']]';
const SPECIAL_SEPARATOR = ':';
const SPECIAL_OPTIONS_SPLIT = ',';
const NESTED_SPECIAL_BEGIN = '<<';
const NESTED_SPECIAL_END = '>>';

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
  var SEP_END = SPECIAL_END;
  var SEP_BEGIN = SPECIAL_BEGIN;
  if (nested) {
    var SEP_END = NESTED_SPECIAL_END;
    var SEP_BEGIN = NESTED_SPECIAL_BEGIN;
  }
  var index = text.indexOf(SEP_BEGIN + 'Glossar:');
  while (index !== -1) {
    var index2 = text.indexOf(SEP_END, index);
    if (index2 !== -1) {
      var special = text.substring(index + 2, index2);
      const operation = getSpecialComponent(special);
      result[operation.options.entry.toLowerCase()] = true;

      text = text.substring(index2 + 2);
      index = text.indexOf(SEP_BEGIN + 'Glossar:');
    } else {
      index = -1;
    }
  }
  return result;
}

function renderSpecialComponent(specialComponent, id) {
  const operation = getSpecialComponent(specialComponent);
  const name = operation.name;
  const options = operation.options;
  if (name === 'ExternalLink') {
    return (
      <ExternalLink key={'_' + id} text={options.text} url={options.url} />
    );
  } else if (name === 'Link') {
    return (
      <Link
        key={'_' + id}
        text={options.text}
        room={options.room}
        tab={options.tab}
      />
    );
  } else if (name === 'Glossar') {
    return (
      <GlossarLink
        key={'_' + id}
        text={options.text}
        entry={options.entry}
        highlighted={false}
      />
    );
  } else if (name === 'Timeline') {
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

function diyMarkdownBlock(text, blockId, nested) {
  var md = new Remarkable({ html: true, xhtmlOut: true, breaks: true });
  var SEP_END = SPECIAL_END;
  var SEP_BEGIN = SPECIAL_BEGIN;
  if (nested) {
    var SEP_END = NESTED_SPECIAL_END;
    var SEP_BEGIN = NESTED_SPECIAL_BEGIN;
  }
  const compontensForBlock = [];
  text = text.trim();
  var index = text.indexOf(SEP_BEGIN);
  var result = '';
  var id = 0;
  var onlySpecial = true;
  while (index !== -1) {
    var index2 = text.indexOf(SEP_END, index);
    if (index2 !== -1) {
      var before = text.substring(0, index);
      if (existsString(before)) {
        var componentBefore = getSpanComponent(md, before, id);
        id++;
        onlySpecial = false;
        compontensForBlock.push(componentBefore);
      }

      var special = text.substring(index + 2, index2);
      specialComponent = renderSpecialComponent(special, id);
      compontensForBlock.push(specialComponent);
      id++;

      text = text.substring(index2 + 2);
      index = text.indexOf(SEP_BEGIN);
    } else {
      index = -1;
    }
  }
  if (existsString(text)) {
    var lastComponent = getSpanComponent(md, text, id);
    id++;
    onlySpecial = false;
    compontensForBlock.push(lastComponent);
  }
  if (onlySpecial) {
    return compontensForBlock;
  }
  return <p key={'_' + blockId}>{compontensForBlock}</p>;
}

export function diyMarkdown(text, nested) {
  const blocks = text.split('\n\n');
  const components = [];
  for (var i = 0; i < blocks.length; i++) {
    compontenForBlock = diyMarkdownBlock(blocks[i], i, nested);
    components.push(compontenForBlock);
  }
  return components;
}
