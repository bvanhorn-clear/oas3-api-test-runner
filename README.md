#API Tester

Wouldn't it be cool if you could do an automated integration test on your API using nothing more than your OAS 3 document?

I think so!

This program takes your OAS 3.x (formerly known as Swagger) documentation and it uses it to test your endpoints.
It requires you to have examples for your input and output on each of your supported response codes.

I've just started this project but I think it's useful because I can have most of my integration
testing handled, and it kind of forces me to keep my OAS document up to date which can be used to generate the API documentation too, so it's two birds with one stone.

## Contributing
I'm not really ready for that yet.  This is very much "throw-away" code right now.  It has no real architecture.  Once
I get the basics working I can refactor it with patterns and a proper architecture, then I'll be ready for help.

## Trying It Out
Want to try it out?  You need NodeJS.  Clone the repo, run ```npm install``` and run with: 

```node index.js <path-to-doc.yaml> <environment>```

Where 
* __path-to-doc.yaml__ is the file path to the document.  It needs to be in either .yaml or .json format per the OAS 3 specifications.
* __envrionment__ matches the description for one of the servers.

## Example

Given an OAS doc called open-api-spec.yaml that has a servers section that looks like this (example is in YAML):
```yaml
servers:
  - url: https://vsi5.visualstorageintelligence.com/api
    description: prod
  - url: http://vsi5-front-end-dev.cleartechnologies.net/api
    description: dev
  - url: http://vsi5-front-end-stage.cleartechnologies.net/api
    description: stage
```

You could use this command:
```node index.js open-api-spec.yaml dev```

