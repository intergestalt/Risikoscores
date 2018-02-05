const helpTexts = {
  'intro': `
    ### Help
  `,
  'diyMarkdownIntro': `
    General Syntax: 
    <<< >>> for components
    [[[ ]]] for configuration
  `,
  'diyMarkdownRoom': `

    Interner Link:
    <<<Link:TEXT;RAUMNAME;TABNAME>>>
    <<<Link:Behandlungsabläufe;arztpraxis;tab2>>>

    Glossar Link:
    <<<Glossar:ZIELBEGRIFF;TEXT>>>
    <<<Glossar:Kohortenstudie;die Kohortenstudie>>>

    <<<Quote: {
      "text": "Ich glaube, solche Scores…",
      "audio": "Abschnitt_11.2.mp3",
      "source": "Müller-Riemenschneider 1999"
    }>>>

    AssetList
    <<<AssetList: {"rows":[
      {"asset":{"type":"image","name":"01_arriba.jpg","text": "", "source":""}},
      {"asset":{"type":"image","name":"02_arriba.png","text": "", "source":""}},
      {"asset":{"type":"image","name":"03_procam.jpg","text": "", "source":""}}
      ],
      "context":{"room":"arztpraxis", "tab":"tab2"}}
    >>>

    Available special components for Tab:
    Timeline: {...}

    Switch scrolling of the Tab content off (Required for Timeline Component):
    [[[{"disableScrolling":"true"}]]]    
    `
}

export default helpTexts;
