import { getId } from '../../helper/admin';

export function getInitialGlossar() {
  const glossar = [
    {
      id: getId('Kohortenstudie'),
      name: 'Kohortenstudie',
      text:
        'Kohortenstudien bezeichnen eine Studienart, in der Wissenschaftler Daten zu einer Gruppe von Menschen über einen längeren Zeitraum erheben. Meist aus öffentlichen Mitteln finanziert sammeln Kohortenstudien neben medizinischen Daten Informationen zu Lebensstil, Umweltbelastungen und sozialer Lage, die dann statistisch auf Zusammenhänge mit Erkrankungshäufigkeiten untersucht werden. Die Ergebnisse gelten als wissenschaftliche Grundlage für Gesundheitspolitik und Prävention.'
    },
    {
      id: getId('Quantitativ'),
      name: 'Quantitativ',
      text:
        'Gegensatz zu <<<Glossar:Qualitativ;Qualitativ>>>. Ist man normalerweise gewöhnt, die Dinge unter qualitativen Aspekten zu betrachten und etwa zu sagen, etwas sei schön oder häßlich, gut oder schlecht, so kann man ach versuchen diese Eigenschaften in Quantitäten, letztlich Zahlen aufzulösen. Ein Fieberkranker mag immer noch schwitzen, zittern und allerlei qualitative Symptome haben, worauf es nunmehr ankommt ist die Temperatur seines Körpers auf ei er Skala von 0 bis 100. Eine gelbe Butterblume mag noch so kräftig leuchten und sogar Aspekte anderer Farben in sich tragen: Quantitativ sind Farben einfach ein Spektrum verschiedener Wellenlängen unterschiedlicher Gewichtung. Die moderne Wissenschaft ist letztlich der Versuch unsere Welt in ihrer Mannigfaltigkeit zu quantifizieren, sie verschiedenen Formeln, Tabellen und Kalkülen gleichzumachen und letztlich zu vermessen.'
    },
    {
        id: getId('Qualitativ'),
        name: 'Qualitativ',
        text:
          'Gegensatz zu <<<Glossar:Quantitativ;Quantitativ>>>. Begreift man die einzelnen Gegenstände nach ihren konkreten Eigenschaften und betrachtet man die Welt ihrem Zusammenhang, so sieht man sie unter qualitativen Gesichtspunkten. Das Herz rast dann in Panik, während es unter <<<Glossar:Quantitativ;quantitativen>>> Gesichtspunkten einfach einen Puls von 150 hätte.'
      },
      {
      id: getId('Risikofaktoren-Epidemiologie'),
      name: 'Risikofaktoren-Epidemiologie',
      text:
        'Ein <<<Glossar:Risikofaktor;Risikofaktor>>> ist eine bestimmte Eigenschaft, die statistisch zu einer höheren Wahrscheinlichkeit etwa einer Erkrankung führen. Jemand der Raucht, bekommt leichter Krebs. Die Epidemiologie beschäftigt sich nicht mit der Erkrankung einzelner Individuen sonder mit der Erkrankung ganzer Bevölkerungen: Z.B. die spanische Grippe nach dem ersten Weltkrieg, Ebola, die Vogelgrippe. Die Risikofaktoren-Epidemiologie wiederum versucht durch vergleich zweier Bevölkerungen mit unterschiedlichen Merkmalen, die Faktoren herauszubekommen, die mit Epidemien zusammenhängen. Etwa hat eine Population, die viel Olivenöl isst weniger Hämoriden oder eine kriegsgepeinigte Population neigt eher zur spanischen Grippe.'
    },
    {
      id: getId('Mediterrane Diät'),
      name: 'Mediterrane Diät',
      text:
        'Die Mediterrane Diät, auch bekannt als die Kreta oder Mittelmeer Diät soll zu den gesündesten, derzeit bekannten Ernährungsweisen gehören. Sie basiert auf dem reichhaltigen Konsum von Gemüse, Obst Vollkornprodukten, Hülsenfrüchten, Fisch, Nüssen in Maßen und Olivenöl als Hauptfettquelle. Die Ernährungsweise gilt als besonders gesund, da mehrere Studien in den vergangenen Jahrzehnten ergeben haben, dass die Bewohner der Mittelmeer-Regionen seltener an Herz-Kreislauf-Erkrankungen leiden und gerade die Menschen auf der Insel Kreta eine über dem europäischen Durchschnitt liegende Lebenserwartung haben.'
    },
    {
      id: getId('Risikofaktor'),
      name: 'Risikofaktor',
      text:
        'Möglichst <<<Glossar:Quantitativ;quantitativ>>> bestimmbare Faktoren, die mit dem Risiko etwa einer bestimmten Erkrankung korrelieren, sei es, dass sie dieselbe begünstigen oder auch deren Risiko mindern. Jemand der Bach auf dem Klavier spielt könnte z.B. seltener Alzheimer bekommen oder jemand der jeden Tag drei Rührei ißt, statistisch öfter einen Herzinfarkt bekommen.'
    },
    {
      id: getId('Molekularbiologie'),
      name: 'Molekularbiologie',
      text:
        'Man kann in der Biologie auf <<<Glossar:Qualitativ;qualitative>>> Aspekte achten und etwa den Blutkreislauf, das Atmungssystem oder die Nervenströme in ihrer Durchdringung betrachten. Man kann aber auch das Mikroskop und andere oft chemische Verfahren benutzen und sich die ganze Organik auf zellularer oder gar atomarer Ebene anschauen, die Molekülverbindingen unserer DNA kartographieren oder die verschiedenen Proteine analysieren. Diese Methode verspricht sehr in die Tiefe zu gehen, aber genauso wird ihre Vermittlung mit dem, was man eigentlich sieht schwieriger, da sich Lebewesen mithin schwer tun, sich als Ansammlung von komplex organisierten Atomen, Molekülen, Zellen und anderen Kleinstbauteilen zu begreifen.'
    },
    {
      id: getId('Genomforschung'),
      name: 'Genomforschung',
      text:
        'Wichtiger Teil der <<<Glossar:Molekularbiologie;Molekularbiologie>>> ist die Genomforschung. In den Zellen der Lebewesen befinden sich lange Fadenmoleküle, doppelt angelegt, seltsam verknotet und durchaus dafür verantwortlich die verschiedensten Stoffwechselprozesse auszuführen oder gar zu steuern. Wenn man diese kleinen Strukturen gut analysiert, kann man gezielt in sie eingreifen und was früher jahrelange Zucht vermochte ist dann in einem Handstrich vollbracht: Tomaten deren Haut der Erntemaschine standhält, Erdbeeren, die zwar einiges an Geschmack verloren hanen, dafür aber groß und rot sind, etc. Mittels genome editing kann man schnell, präzise und kostengünstig Veränderungen im Erbgut von Pflanzen, Tieren und Menschen vornehmen lassen.'
    },
    {
      id: getId('Biobank'),
      name: 'Biobank',
      text:
        'Ansammlung von biologischen Stoffen, etwa Blutproben, Gewebeproben oder ähnliches. Diese physischen Proben sind verbunden mit einer Reihe von Daten einerseits über die Quelle der Probe wie Alter, Geschlecht der Person von der sie entnommen wurde oder auch das Datum ihrer Entnahme und andererseits Daten die der Analyse der jeweiligen Proben entstammen. Sie dienen der Forschung, wobei der Zweck und Inhalt dieser Forschung noch gar nicht bekannt sein muß und in der Zukunft liegen kann.'
    },
    {
      id: getId('Informierte Zustimmung'),
      name: 'Informierte Zustimmung (informed consent)',
      text:
        'Freundlicherweise muß ein Patient einwilligen, wenn eine bestimmte Operation an ihm vorgenommen wird. Genauso muß jemand, der an einer etwa nationalen Kohortenstudie teilnimmt, einwilligen, dass seine Proben und Daten in einer <<<Glossar:Biobank;Biobank>>> gespeichert und in bestimmtem Rahmen auch weitergegeben werden. Da die Zusammenhänge in diesem Bereichen oft sehr komplex sind, muß der Einzelne vor dieser Einwilligung git informiert werden und man spricht dann von informierter Zustimmung oder, da der Begriff aus dem Englischen kommt, von **informed consens**'
    },
    {
      id: getId('Assoziationsstudien'),
      name: 'Assoziationsstudien',
      text:
        'In solchen Studien wird versucht bestimmte Merkmale, oft eine Krankheit, mit der molekularen Struktur unserer DNA zu korrelieren. Bestimmte einfache Muster in der Abfolge der Nukleotide einer Nukleinsäure unseres Erbguts — die berühmten Gene — werden mit den sichtbaren Erscheinungen einer Krankheit in Verbindung gebracht. Dazu analysiert und man z.B. mit Gensequenzern je eine Population mit diesem Merkmal und eine Population, ohne dieses Merkmal und schließt aus der Vergleichung auf den Zusammenhang bestimmter Gene mit dem Symptom.'
    },
    {
      id: getId('Biomarker'),
      name: 'Biomarker',
      text:
        'Ein charakteristisches Merkmal irgendwo in unserer Biologie, welches auf einen normalen oder krankhaften biologischen Prozess verweist. Dies können Gene, Zellen, Enzyme oder ähnliches sein. Am bekanntesten dürfte die der Analyse des Blutbildes entnommenen Biomarker sein, die sogenannten Blutwerte. Denen kann die Medizin Information über allerlei Erkrankungen entnehmen und etwa Krebs diagnostizieren.'
    }
  ];
  return glossar;
}
