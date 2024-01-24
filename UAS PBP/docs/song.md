# Song API Spec

## Create Song API

Endpoint : POST /api/songs

Headers :

- Authorization : token

Request Body :

```json
{
  "title": "Love Epiphany",
  "singer": "Reality Club",
  "album": "Reality Club Present...",
  "year": "2023",
  "label": "Dominion Records",
  "songwriter": "Faiz Novascotia Saripudin"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "title": "Love Epiphany",
    "singer": "Reality Club",
    "album": "Reality Club Present...",
    "year": "2023",
    "label": "Dominion Records",
    "songwriter": "Faiz Novascotia Saripudin"
  }
}
```

Response Body Error :

```json
{
  "errors": "Year is invalid"
}
```

## Update Song API

Endpoint : PUT /api/songs/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "title": "Love Epiphany",
  "singer": "Reality Club",
  "album": "Reality Club Present...",
  "year": "2023",
  "label": "Dominion Records",
  "songwriter": "Faiz Novascotia Saripudin"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "title": "Love Epiphany",
    "singer": "Reality Club",
    "album": "Reality Club Present...",
    "year": "2023",
    "label": "Dominion Records",
    "songwriter": "Faiz Novascotia Saripudin"
  }
}
```

Response Body Error :

```json
{
  "errors": "Year is invalid"
}
```

## Get Song API

Endpoint : GET /api/songs/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "title": "Love Epiphany",
    "singer": "Reality Club",
    "album": "Reality Club Present...",
    "year": "2023",
    "label": "Dominion Records",
    "songwriter": "Faiz Novascotia Saripudin"
  }
}
```

Response Body Error :

```json
{
  "errors": "Song is not found"
}
```

## Search Songs API

Endpoint : GET /api/songs

Headers :

- Authorization : token

Query params :

- title : Search by title using like, optional
- singer : Search by singer using like, optional
- year : Search by year using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "title": "Love Epiphany",
      "singer": "Reality Club",
      "album": "Reality Club Present...",
      "year": "2023",
      "label": "Dominion Records",
      "songwriter": "Faiz Novascotia Saripudin"
    },
    {
      "id": 2,
      "title": "Love Epiphany",
      "singer": "Reality Club",
      "album": "Reality Club Present...",
      "year": "2023",
      "label": "Dominion Records",
      "songwriter": "Faiz Novascotia Saripudin"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

## Remove Profile API

Endpoint : DELETE /api/songs/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Songs is not found"
}
```
