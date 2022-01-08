# theprojectmeded.org

## Reqs:
- [git](https://git-scm.com/downloads)
- [node](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install)

## Development
```
git clone https://github.com/project-meded/client.git
cd client
npm i
NEXT_PUBLIC_SERVER=https://projectmeded.herokuapp.com yarn dev
```
The website runs in `localhost:3000`

## Build website
if you've already `git clone ...`, `cd client`, and `npm i` then you don't need to repeat those steps
```
git clone https://github.com/project-meded/client.git
cd client
npm i

NEXT_PUBLIC_SERVER=https://projectmeded.herokuapp.com yarn deploy
```

or, you can run:
```
NEXT_PUBLIC_SERVER=https://projectmeded.herokuapp.com yarn build
```
and then copy the files in /out/ to the pages branch