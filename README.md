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
