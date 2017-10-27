export function getInitialQuestions() {
  const questions = [
    {
      roomId: 'framingham',
      text:
        'Wie wurden die Datenerhebungen aus einer Kleinstadt in Massachusetts zu <<<Link:Wissen;framingham;tab1>>> mit transnationaler Wirksamkeit?'
    },
    {
      roomId: 'framingham',
      originRoomId: 'bioprobenlager',
      image: '01_question.png',
      text:
        'Woher stammt das Konzept des <<<Link:Risikofaktors;framingham;tab1>>> und wie konnte es so einflussreich werden?'
    },
    {
      roomId: 'framingham',
      originRoomId: 'bioprobenlager',
      text:
        'Wie haben sich die Ergebnisse der <<<Link:Framingham Heart Studie;framingham;tab1>>> verbreitet?'
    },
    {
      roomId: 'framingham',
      text:
        'Wofür werden die Daten der <<<Link:Framingham Heart Studie;framingham;tab1>>> genutzt und wohin wandern sie? '
    },
    {
      roomId: 'bioprobenlager',
      text:
        'Warum friert man <<<Link:Blut, Urin und Speichel;bioprobenlager;tab1>>> ein?'
    },
    {
      roomId: 'bioprobenlager',
      originRoomId: 'framingham',
      text: 'Veralten <<<Link:Biobanken;bioprobenlager;tab1>>>? '
    },
    {
      roomId: 'bioprobenlager',
      image: 'example.png',
      text:
        'Welches <<<Link:Verfallsdatum;bioprobenlager;tab1>>> haben biologische Proben?'
    }
  ];
  return questions;
}
