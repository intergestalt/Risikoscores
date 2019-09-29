## Install

```
git clone https://github.com/intergestalt/Risikoscores
cd Risikoscores
meteor npm install
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

## uberspace 6
### get live database

`bin/download-db-from-uberspace`

### deploy to production

`bin/deploy-to-uberspace`

## dokku
###setup

````
dokku apps:create risiko
#dokku config:set risiko ROOT_URL="https://wegedeswissens.net"
dokku config:set risiko ROOT_URL="https://risiko.intergestalt.monster"

#sudo dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo
dokku mongo:create mongo_risiko
dokku mongo:link mongo_risiko risiko
dokku config:set risiko BUILDPACK_URL="https://github.com/AdmitHub/meteor-buildpack-horse"  DISABLE_WEBSOCKETS=1 RISIKOSCORES_VAR_DIR=/app/var
dokku config:set risiko NODEJS_PARAMS="--optimize_for_size\ --max_old_space_size=460\ --gc_interval=100"
dokku storage:mount risiko /var/lib/dokku/data/storage/risiko:/app/var

git remote add dokku dokku@intergestalt.dev:risiko
git push dokku

dokku letsencrypt risiko
````
### upload database to live
````
export OLD_DB=mongo_risiko_blue
export NEW_DB=mongo_risiko_red  # choose a new color
export DUMP=mongodb-backups-uberspace/2019-09-24-23-24-27/dump.gz

# prepare new db
dokku mongo:create $NEW_DB
dokku mongo:import $NEW_DB < $DUMP

# swap
dokku ps:stop risiko
dokku mongo:unlink $OLD_DB risiko
dokku mongo:link $NEW_DB risiko
dokku ps:start risiko

# clean up
dokku mongo:destroy $OLD_DB
````

### upload var files
````
scp -r var/* root@intergestalt.monster:/var/lib/dokku/data/storage/risiko/
````

### install cloudcmd
note: `"postinstall": "madrun heroku-postbuild"` added to package.json as a workaround to install on dokku

````
dokku apps:create risiko-uploads
dokku storage:mount risiko-uploads /var/lib/dokku/data/storage/risiko:/app/var
dokku config:set risiko-uploads CLOUDCMD_ONE_FILE_PANEL=true CLOUDCMD_ROOT=/app/var/uploads NPM_CONFIG_PRODUCTION=false CLOUDCMD_AUTH=true CLOUDCMD_USERNAME=admin CLOUDCMD_PASSWORD=$PASSWORD
dokku proxy:ports-set risiko-uploads http:80:5000
# sudo dokku plugin:install https://github.com/Zeilenwerk/dokku-nginx-max-upload-size.git
dokku config:set risiko-uploads MAX_UPLOAD_SIZE=20M
dokku letsencrypt risiko-uploads
````


## environment variables

`RISIKOSCORES_VAR_DIR` sets the path to the var directory which contains uploads. it is not required on a dev system, only when running a bundled version. should point to a directory outside of the bundle, writable by node.

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
