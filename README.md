<h1>Journal</h1>

Journal is an app that lets you document your thoughts everyday, with inbuilt questions so you don't run out of what to document.

### Data model created with ceramic

<details open>
 <summary>Journal.json</summary>

```sh
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "Journal",
  "required": ["data"],
  "additionalProperties": false,
  "properties": {
    "data": {
      "type": "array",
      "description": "journal entries",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "required": ["title", "cid", "createdAt"],
        "additionalProperties": false,
        "properties": {
          "title": { "type": "string", "description": "journal entry title" },
          "cid": { "type": "string", "description": "journal IPFS CID" },
          "createdAt": {
            "type": "integer",
            "description": "date journal was created"
          }
        }
      }
    }
  }
}
```

</details>

### Use of Web3.storage

<details >
 <summary>for storing journal data</summary>

```sh
{
    const cidData = {
      journal: journal,
    };

    const token = process.env.NEXT_PUBLIC_TOKEN;
    const storage = new Web3Storage({ token: token || "" });
    const buffer = Buffer.from(JSON.stringify(cidData));
    const file = [new File([buffer], "journal.json")];

    //get cid from web3.storage
    const cid = await storage.put(file, { wrapWithDirectory: false });
}
```

</details>

<details >
 <summary>for retrieving journal data</summary>

```sh
{
  useEffect(() => {
    try {
      fetch(`https://${journal && journal.journalCID}.ipfs.w3s.link/`)
        .then((results) => results.json())
        .then((data) => {
          setJournalEntry(data);
        });
    } catch (error) {
      alert(error);
    }
  }, []);
}
```

</details>

### Screenshots

![Alt text](screenshots/1.png?raw=true "1")
![Alt text](screenshots/2.png?raw=true "2")
![Alt text](screenshots/3.png?raw=true "3")

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```


qwertyuioplkjhgfdsazxcvbnmmnbvcx