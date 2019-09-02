# Go Todo
To-do list web app. Built using Golang and React.js.

You can try this out this here: [https://pacific-atoll-49601.herokuapp.com](https://pacific-atoll-49601.herokuapp.com)

Build it locally using the instructions below.

## Technology Stack
- `User Interface` - React.js, styled-components
- `Client` - React.js, moment
- `Server` - Go
- `Database` - PostgreSQL

## Development Requirements
- Git
- NPM
- Go
- PostgreSQL
- Heroku CLI

## Setup and Run
```bash
# 1. Compile the client-side React.js
npm run-script build

# 2. Compile the server-side Go
go build -o bin/go-todo -v .

# 3. Setup database
createdb go_todo
psql -E -d go_todo -f ./database_schema.sql
psql -E -d go_todo -f ./database_mockup.sql

# 4. Run the project using Heroku CLI local option
heroku local web
```
**See:** [localhost:5000](http://localhost:5000)

## Deploying to Heroku (with MongoLab)

```bash
# 1. From the project directory run the following to setup Heroku
heroku create

# 2. Add Heroku buildpack for Node.js
heroku buildpacks:add --index 1 heroku/nodejs

# 3. Create Heroku addon for PostgreSQL database
heroku addons:create heroku-postgresql:hobby-dev

# 4. Initialize database on Heroku
heroku pg:psql DATABASE_URL -f ./database_schema.sql
heroku pg:psql DATABASE_URL -f ./database_mockup.sql

# 5. Set GOVERSION environment variable
heroku config:set GOVERSION=go1.12.7

# 6. Push the 'master' branch to the newly created 'heroku' remote
git push heroku master
```

## Features

### Completed Features
- [x] Toggle task status complete/incomplete
- [x] Add new task groups

### Planned Features
- [ ] Toggle edit mode for a task group. Edit button conditionally switches to cancel/save.
- [ ] Allow user to add new tasks to a task group
- [ ] Allow user to delete existing tasks from group
- [ ] Allow user to delete task groups
- [ ] Allow user to edit task descriptions
- [ ] Allow user to move tasks up and down to reorder tasks within a group
- [ ] Allow the user to scroll forward and backward through dates
- [ ] Make ModalDialog modular and reusuable as a component

## References
- [https://www.alexedwards.net/blog/organising-database-access](https://www.alexedwards.net/blog/organising-database-access)

## Author
Mike Stockman