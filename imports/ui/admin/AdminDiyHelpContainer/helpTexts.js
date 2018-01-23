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
    Switch scrolling of the Tab content off (Required for Timeline Component):
    [[[{"disableScrolling":"true"}]]]

    Glossar Links:
    <<<Glossar:Kohortenstudie;die Kohortenstudie>>>

    Available special components for Tab:
    Timeline: {...}

    AssetList
    <<<AssetList: {"rows":[
      {"asset":{"type":"image","name":"01_arriba.jpg","text": "", "source":""}},
      {"asset":{"type":"image","name":"02_arriba.png","text": "", "source":""}},
      {"asset":{"type":"image","name":"03_procam.jpg","text": "", "source":""}}
      ],
      "context":{"room":"arztpraxis", "tab":"tab2"}}
      >>>

    <<<Quote: {
      "text": "Ich glaube, solche Scores…",
      "audio": "Abschnitt_11.2.mp3",
      "source": "Müller-Riemenschneider 1999"
    }>>>
    `
}

export default helpTexts;
