## Install
```
git clone https://github.com/intergestalt/Risikoscores
cd Risikoscores
meteor npm install -g yarn
meteor yarn install
meteor yarn run install:public
```
## Run
```
meteor
```
Visit `localhost:3000`. Page updates automatically when files change.

## Add Rooms
Edit array in `meteor/imports/startup/server/fixtures`

## Reset database (loose all data)
`meteor reset`

## get live database

`bin/download-db-from-uberspace`

## deploy to production

`bin/deploy-to-uberspace`

## environment variables

RISIKOSCORES_VAR_DIR sets the path to the var directory which contains uploads. it is not required on a dev system, only when running a bundled version. should point to a directory outside of the bundle, writable by node.

## Routes
```
/
/admin/rooms
/admin/rooms/:_id
/rooms/:_id
```

## Auto Format
create a file in .vscode. 
Name it settings.json.
Copy the following settings into it:

{
  "prettier.singleQuote": true,
  "editor.formatOnSave": true
}

## Syntax für Textblöcke

Allgemein sind unsere BEfehle in [[...]] eingebettet. Außer sie sind ihrerseits in einer Datenstruktur enthalten wie unten in der Timeline. Dann müssen sie bis jetzt mit <<...>> Ummantelt werden, da sonst der Parser durcheinanderkommt. Kann man aber nochmal überlegen. :)

Es gibt 
Glossarlinks (Text, GlossarId)
ExternalLinks (Text, url)
Links (Text, roomId, tabId)

Die Tabid ist der identifier unter den subsections

Beispiele für SpecialMarkup
[[ExternalLink: {"text":"der Framingham-Studie", "url":"www.studie.de"}]]
[[Link: Hier drücken, framingham,timeline]]
[[Glossar: 1970,quantitativ]]

Ansonsten werden unsere Specialkomponenten wie folgt eingeführt:

(Name, DatenObject)

Ein Beispielobject gibt es schon: Timeline

[[Timeline: {"title":"This is the Timeline","rows":[
{"year": "2002", "text": "Das was so im Jahr <<Glossar: 2002,quantitativ>>!", "image":"03_timeline_2002.jpg"},
{"year": "2001", "text": "Das was so im Jahr 2001", "image":"04_timeline_2001.jpg"},
{"year": "2000", "text": "<<ExternalLink:der Framingham-Studie,www.studie.de>> ", "image":"05_timeline_2000.jpg"},
{"year": "1900", "text": "Das was so im Jahr 1900"}],
"context":{"room":"framingham", "tab":"timeline"}}
]]

##Bilder, Assets
RoomId und TabId wird auch für die Verzeichnisse benutzt, auf die sich die Bildnamen beziehen. Sie liegen in public, assets und es gibt pro Raum und ind diesen pro Tab einen Ordner

Einige Bilder liegen da schon und man kann sie für die Timeline und die Slideshows benutzen.01_slide_history.png ...

#Beispieleinträge

1. Framingham

Die Framingham Heart Studie ist die weltweit erste groß angelegte <<<Glossar:Kohortenstudie;Kohortenstudie>>> von Herz-Kreislauferkrankungen. Ihr Name geht auf ihren Entstehungsort Framingham zurück – eine Kleinstadt im US-Bundesstaat Massachussetts. 1948 wurden dort 2/3 aller Erwachsenen auf ihren Gesundheitszustand und ihrer Lebensweisen untersucht und befragt. Diese Gruppe, ihre Nachkommen sowie ein später erweiterter Kreis an Teilnehmenden (Framingham Omni-Cohort; Link Flyer) werden bis heute weiter untersucht. Ziel der Initiatoren war es herauszufinden, welche Faktoren die Entstehung von Krankheiten begünstigen. In einer Publikation aus Daten der Framingham-Studie wurde um ca. 1970 der Begriff des <<<Glossar:Risikofaktors;Risikofaktor>>> zum ersten Mal genutzt. Die Forscher betrachteten das Auftreten von Herz-Kreislauferkrankungen als Ereignisse, die durch präventive Maßnahmen von Einzelnen vermieden werden können. Bis heute beeinflusst die Studie weit über Framingham hinaus unser tägliches Leben. Allgemein bekannte Ernährungsempfehlungen „Viel Obst und Gemüse!“ aber auch ärztliche Berechnungen unseres Herz-Kreislauferkrankungs-Risikos sind auch auf die Studie zurückzuführen.


Subsection1

identifier timeline

[[[{"disableScrolling":"true"}]]]
<<<Timeline: {"rows":[
{"year": "2017", "asset":{"type":"image","name":"01_timeline_2017_b.jpg", "text": "Text 1", "source":"Source 1"}},
{"year": "2016", "asset":{"type":"image","name":"02_timeline_2016_a.jpg", "text": "Text 2", "source":"Source 2"}},
{"year": "2002", "asset":{"type":"image","name":"03_timeline_2002.jpg", "text": "Text 3", "source":"Source 3"}},
{"year": "2001", "asset":{"type":"image","name":"04_timeline_2001.jpg", "text": "Text 4", "source":"Source 4"}},
{"year": "2000", "asset":{"type":"image","name":"05_timeline_2000.jpg", "text": "Text 5", "source":"Source 5"}},
{"year": "1998", "asset":{"type":"image","name":"06_timeline_1998_g.jpg", "text": "Text 6", "source":"Source 6"}},
{"year": "1998", "asset":{"type":"image","name":"07_timeline_1998_f.jpg", "text": "Text 7", "source":"Source 7"}},
{"year": "1998", "asset":{"type":"image","name":"08_timeline_1998_e.jpg", "text": "Text 8", "source":"Source 8"}},
{"year": "1998", "asset":{"type":"image","name":"09_timeline_1998_b.jpg", "text": "Text 9", "source":"Source 9"}},
{"year": "1997", "asset":{"type":"image","name":"10_timeline_1997.jpg", "text": "Text 10", "source":"Source 10"}},
{"year": "1995", "asset":{"type":"image","name":"11_timeline_1995.jpg", "text": "Text 11", "source":"Source 11"}},
{"year": "1988", "asset":{"type":"image","name":"12_timeline_1988.jpg", "text": "Text 12", "source":"Source 12"}},
{"year": "1987", "asset":{"type":"image","name":"13_timeline_1987.jpg", "text": "Text 13", "source":"Source 13"}},
{"year": "1982", "asset":{"type":"image","name":"14_timeline_1982_a.jpg", "text": "Text 14", "source":"Source 14"}},
{"year": "1956", "asset":{"type":"image","name":"15_timeline_1956.jpg", "text": "Text 15", "source":"Source 15"}}
],
"context":{"room":"framingham", "tab":"tab1"}}
>>>


2. Bioprobenlager 

 Die Untersuchung biologischer Proben hat eine lange Geschichte in der Medizin. Blut, Speichel oder Urin lagerten früher dezentral und in haushaltsüblichen Kühlschränken. Es geht darum, körperliche Substanzen haltbar zu  machen, weil sich manchmal erst später Forschungsfragen ergeben, die zum Zeitpunkt der Studie noch nicht gedacht wurde. Manchmal gibt es auch erst später die Technologien, um bestimmte Fragen zu untersuchen. Im Zuge der Genomforschung entstanden dann große Biobanken (Link: UK Biobank, National Biobanks). Seit den 1990er Jahren unterhält nahezu jede größere epidemiologische Studie ein eigenes Lager für biologische Proben. Diese sollen zunächst für die Krankheitsursachenforschung und für Diagnostik und Therapie neue Wege eröffnen. Als Forschungsinfrastrukturen verkörpern die Bioproben immense gesellschaftliche Erwartungen und – derzeit – ein großes Forschungskapital. 

 <<<AssetList: {"rows":[
{"asset":{"type":"image","name":"01_tab1.jpg","text": "Text 1", "source":"Source 1"}},
{"asset":{"type":"image","name":"02_tab1.jpg","text": "Text 2", "source":"Source 2"}},
{"asset":{"type":"image","name":"03_tab1.jpg","text": "Text 3", "source":"Source 3"}},
{"asset":{"type":"image","name":"04_tab1.jpg","text": "Text 4", "source":"Source 4"}},
{"asset":{"type":"image","name":"05_tab1.jpg","text": "Text 5", "source":"Source 5"}}
],
"context":{"room":"bioprobenlager", "tab":"tab1"}}
>>>

<<<AssetList: {"rows":[
{"asset":{"type":"image","name":"01_tab2.jpg","text": "Text 1", "source":"Source 1"}},
{"asset":{"type":"image","name":"02_tab2.jpg","text": "Text 2", "source":"Source 2"}},
{"asset":{"type":"image","name":"03_tab2.jpg","text": "Text 3", "source":"Source 3"}},
{"asset":{"type":"image","name":"04_tab2.jpg","text": "Text 4", "source":"Source 4"}},
{"asset":{"type":"image","name":"05_tab2.jpg","text": "Text 5", "source":"Source 5"}},
{"asset":{"type":"image","name":"06_tab2.jpg","text": "Text 6", "source":"Source 6"}}
],
"context":{"room":"bioprobenlager", "tab":"tab2"}}
>>>