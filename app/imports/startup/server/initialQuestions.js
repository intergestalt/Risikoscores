export function getInitialQuestions() {
  const questions = [
    {
      roomId: 'framingham',
      text:
        'Wie wurden die Datenerhebungen aus einer Kleinstadt in Massachusetts zu Wissen mit transnationaler Wirksamkeit?'
    },
    {
      roomId: 'framingham',
      originRoomId: 'bioprobenlager',
      image: '01_question.jpg',
      text:
        'Woher stammt das Konzept des Risikofaktors und wie konnte es so einflussreich werden?'
    },
    {
      roomId: 'framingham',
      originRoomId: 'bioprobenlager',
      text:
        'Wie haben sich die Ergebnisse der Framingham Heart Studie verbreitet?'
    },
    {
      roomId: 'framingham',
      text:
        'Wofür werden die Daten der Framingham Heart Studie genutzt und wohin wandern sie? '
    },
    {
      roomId: 'bioprobenlager',
      text: 'Warum friert man Blut, Urin und Speichel ein?'
    },
    {
      roomId: 'bioprobenlager',
      originRoomId: 'framingham',
      text: 'Veralten Biobanken? '
    },
    {
      roomId: 'bioprobenlager',
      text: 'Welches Verfallsdatum haben biologische Proben?'
    }
  ];
  return questions;
}
