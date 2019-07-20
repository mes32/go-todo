# Go Todo
To-do list web application

You can try out this app [here](https://pacific-atoll-49601.herokuapp.com) or build it locally using the instructions below.

## Utilized Technology Stack
- `User Interface`
- `Client`
- `Server` - Go
- `Database`

## Development Requirements
- Git
- Node
- Nodemon
- PostgreSQL
- Heroku CLI

## Setup and Run
```bash
# 1. Compile the project
go build -o bin/go-todo -v .

# 2. Run the project using Heroku CLI local option
heroku local web
```
**See:** [localhost:3000](http://localhost:3000)

## Deploying to Heroku

```bash
# 1. From the project directory run the following to setup Heroku
heroku create

# 2. Push the 'master' branch to the newly created 'heroku' remote
git push heroku master
```

## Features

### Completed Features


### Planned Features


## References
- [https://www.alexedwards.net/blog/organising-database-access](https://www.alexedwards.net/blog/organising-database-access)

## Author
Mike Stockman