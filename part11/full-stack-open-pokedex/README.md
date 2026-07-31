# Full Stack open CI/CD exercises

My personal submissions to the course Full Stack open: CI/CD

## Commands

Start by running `npm install` inside the project folder

`npm start` to run the webpack dev server.
`npm test` to run tests.
`npm run eslint` to run eslint.
`npm run build` to make a production build.
`npm run start-prod` to run your production build.

## CI/CD Pipeline

Commits are pushed to development branches in GitHub that then read the commit message. If `#skip` is present, no new version/tag is created. If `#patch`, `#minor`, or `#major` are included in the message, the relevant version number is incremented in GitHub. When a pull request is opened, automatic tests run to check for bugs in the code. Once the PR is accepted, a new build of the project is automatically created and pushed to production. At the end, a notification of the commit is automatically sent to Discord.
