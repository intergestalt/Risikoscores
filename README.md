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
<<<ExternalLink: {"text":"der Framingham-Studie", "url":"www.studie.de"}>>>
<<<Link: Hier drücken, framingham,timeline>>>
<<<Glossar: 1970,quantitativ>>>

Ansonsten werden unsere Specialkomponenten wie folgt eingeführt:

(Name, DatenObject)

##Bilder, Assets
RoomId und TabId wird auch für die Verzeichnisse benutzt, auf die sich die Bildnamen beziehen. Sie liegen in public, assets und es gibt pro Raum und ind diesen pro Tab einen Ordner

Einige Bilder liegen da schon und man kann sie für die Timeline und die Slideshows benutzen.01_slide_history.png ...
