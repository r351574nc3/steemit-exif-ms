# Steemit Exif Microservice

Microservice that reports exif data on images in steemit posts

## Usage

You can use this microservice in a couple ways:
1. Run the microservice locally and offer it to other users
1. Use the microservice via a client

### Running 

This describes how to run the microservice locally

To install and use this bot, you will be required to install [Docker](https://www.docker.com/community-edition#/download).

When [Docker](https://www.docker.com/community-edition#/download)  is installed and the environment variables are set, installation and execution are a single docker command: 

```
docker run --rm -p 3000:3000 r351574nc3/steem-exif-spider-bot:latest
```

**Running on a different port**


```
export PORT=8090
docker run --rm -e PORT=$PORT -p $PORT:$PORT r351574nc3/steem-exif-spider-bot:latest
```

### Getting records with curl

The url is made up of the `author` and `permlink` of the post you want exif details about. For example, for an author (alexanderfluke) and permlink (quarry-5-pics), my command is:

```
curl https://steemit-exif-ms.herokuapp.com/alexanderfluke/quarry-5-pics
```

### Using JQ

**Pretty Printing**
```
curl https://steemit-exif-ms.herokuapp.com/alexanderfluke/quarry-5-pics | jq .
```

**Fetch Make and Model**
```
curl https://steemit-exif-ms.herokuapp.com/alexanderfluke/quarry-5-pics | jq '.[] | { make: .Make.description, model: .Model.description }'
{
  "make": "Canon",
  "model": "Canon EOS 450D"
}
{
  "make": "Canon",
  "model": "Canon EOS 450D"
}
{
  "make": "Canon",
  "model": "Canon EOS 450D"
}
{
  "make": "Canon",
  "model": "Canon EOS 450D"
}
```