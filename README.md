# Go Todo
To-do list web application

You can try out this app [here](https://pacific-atoll-49601.herokuapp.com) or build it locally using the instructions below.

## Technology Stack
- `User Interface` - React.js, styled-components
- `Client` - React.js
- `Server` - Go
- `Database` - PostgreSQL

## Development Requirements
- Git
- Node
- PostgreSQL
- Heroku CLI

## Setup and Run
```bash
# 1. Compile the client-side React.js
npm run-script build

# 2. Compile the server-side Go
go build -o bin/go-todo -v .

# 3. Run the project using Heroku CLI local option
heroku local web
```
**See:** [localhost:5000](http://localhost:5000)

## Deploying to Heroku

```bash
# 1. From the project directory run the following to setup Heroku
heroku create

# 2. Add Heroku buildpack for Node.js
heroku buildpacks:add --index 1 heroku/nodejs

# 3. Add Heroku addon for PostgreSQL database
heroku addons:create heroku-postgresql:hobby-dev

# 4. Push the 'master' branch to the newly created 'heroku' remote
git push heroku master
```

## Features

### Completed Features


### Planned Features


## References
- [https://www.alexedwards.net/blog/organising-database-access](https://www.alexedwards.net/blog/organising-database-access)

## Author
Mike Stockman