# Dianying

## What it is

Dianying is an intelligent media recommendation engine which gets smarter the more users it accommodates.

## How does it work

Dianying uses the [https://github.com/grahamjenson/ger](Good Enough Recommendation) NPM module.

On the client, the user selects what category of media it wants to be recommended by first entering media he or she has entered before. Before the data is analyzed, it is send to a database along with other users' liked media. The combined database is then retrieved by the Express server and processed through the GER engine to provide recommendations.
