## Install
`
git clone https://github.com/intergestalt/Risikoscores
cd Risikoscores
meteor npm install -g yarn
meteor yarn install
`
## Run
```
meteor
```
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
