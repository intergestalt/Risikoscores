## Install
```
git clone https://github.com/intergestalt/Risikoscores
cd Risikoscores
meteor npm install -g yarn
meteor yarn install
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

Die Framingham Heart Studie ist die weltweit  [[Link: Tab2, framingham,tab2]] erste groß angelegte Kohortenstudie [[Link: Tab3, framingham,tab3]]  von Herz-Kreislauferkrankungen. Ihr Name geht auf ihren Entstehungsort Framingham zurück – eine Kleinstadt im US-Bundesstaat Massachussetts. 1948 dort 2/3 aller X [[Link: Einwohnermeldeamt, einwohnermeldeamt,reiter1]] X **Gesundheitszustand** und ihrer Lebensweisen untersucht und befragt. Diese Gruppe, ihre Nachkommen sowie ein später erweiterter Kreis an Teilnehmenden (Framingham Omni-Cohort; Link Flyer) *werden* bis heute weiter untersucht. Ziel der Initiatoren war es herauszufinden, welche Faktoren die Entstehung von Krankheiten begünstigen. In einer Publikation aus [[ExternalLink: {"text":"der Framingham-Studie", "url":"www.studie.de"}]] wurde um ca. [[Glossar: 1970,quantitativ]] der Begriff des Risikofaktors zum ersten Mal genutzt. Die Forscher betrachteten das Auftreten von Herz-Kreislauferkrankungen als Ereignisse, die durch präventive Maßnahmen von Einzelnen vermieden werden können. Bis heute beeinflusst die Studie weit über Framingham hinaus unser tägliches Leben. Allgemein bekannte Ernährungsempfehlungen „Viel Obst und Gemüse!“ aber auch ärztliche Berechnungen unseres Herz-Kreislauferkrankungs-Risikos sind auch auf die Studie zurückzuführen.


Subsection1

identifier timeline

Die Framingham Heart Studie ist die weltweit erste groß angelegte [[Glossar: Kohortenstudie, kohortenstudie]] von Herz-Kreislauferkrankungen.

[[Timeline: {"title":"This is the Timeline","rows":[
{"year": "2002", "text": "Das was so im Jahr <<Glossar: 2002,quantitativ>>!", "image":"03_timeline_2002.jpg"},
{"year": "2001", "text": "Das was so im Jahr 2001", "image":"04_timeline_2001.jpg"},
{"year": "2000", "text": "<<ExternalLink:der Framingham-Studie,www.studie.de>> ", "image":"05_timeline_2000.jpg"},
{"year": "1900", "text": "Das was so im Jahr 1900"}],
"context":{"room":"framingham", "tab":"timeline"}}
]]

Sau interessant: [[Glossar: Krankheit,  biobank]].


Subsection  und 3

identifier tab2,tab3


2. Einwohnermeldeamt

Haupttext [[Link: Framingham Tab2, framingham,tab2]]

Tabs mit identifier: reiter1, reiter2, reiter3