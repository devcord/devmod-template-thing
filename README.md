## Devmod

### Usage

#### Development
Copy `.env` to `.env.local` and adjust values.
Then run `npm run dev` to start typescript watcher and nodemon.

#### Scripts
To run a script use `npm run` followed by a script name, IE.: `npm run dev`

| Script | Usage |
| --- | --- |
|`build`|Builds typescript into the dist folder|
|`dev`|Starts typescript compiler in watch mode and nodemon for development hot reloading|
|`lint`|Runs eslint and shows errors|
|`lint-fix`|Runs eslint and attempts to fix errors|

#### Production
TBA, probably just inject env vars into docker-compose and done.
