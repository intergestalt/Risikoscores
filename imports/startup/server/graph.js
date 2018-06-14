export function getGraph() {
  const graph = [
    {
      _id: 'arriba',
      pseudo: false,
      x: 90,
      y: 60,
      neighbours: 'programmierbüro;teilnehmermanagement;arztpraxis;framingham'
    },
    {
      _id: 'framingham',
      pseudo: false,
      x: 60,
      y: 10,
      neighbours:
        'arriba;untersuchungszentrum;bioprobenlager;arztpraxis;programmierbüro'
    },
    {
      _id: 'einwohnermeldeamt',
      pseudo: false,
      x: 80,
      y: 25,
      neighbours: 'teilnehmermanagement'
    },
    {
      _id: 'bioprobenlager',
      pseudo: false,
      x: 57,
      y: 90,
      neighbours:
        'framingham;untersuchungszentrum;serverraum;teilnehmermanagement'
    },
    {
      _id: 'programmierbuero',
      pseudo: false,
      x: 10,
      y: 60,
      neighbours: 'arriba;framingham'
    },
    {
      _id: 'www',
      pseudo: false,
      x: 12,
      y: 45,
      neighbours: 'arztpraxis'
    },
    {
      _id: 'teilnehmermanagement',
      pseudo: false,
      x: 90,
      y: 35,
      neighbours: 'einwohnermeldeamt;arriba;serverraum;bioprobenlager'
    },
    {
      _id: 'untersuchungszentrum',
      pseudo: false,
      x: 80,
      y: 80,
      neighbours: 'bioprobenlager;framingham;serverraum'
    },
    {
      _id: 'serverraum',
      pseudo: false,
      x: 45,
      y: 80,
      neighbours: 'bioprobenlager;teilnehmermanagement;untersuchungszentrum'
    },
    {
      _id: 'arztpraxis',
      pseudo: false,
      x: 25,
      y: 77,
      neighbours: 'arriba;framingham;www'
    }
  ];
  return graph;
}
