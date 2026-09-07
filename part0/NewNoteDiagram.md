0.4 New note diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST new note to https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: The browser's POST request contains a body that has the note to be posted.

    activate server
    server->>browser: Status 302: redirects browser to /exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes

    activate server
    server->>browser: Status 200: returns the HTML document at that address
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css

    activate server
    server->>browser: Status 304 Not Modifed: No need to retransmit requested resource (because it was fetched on initial load of the website)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js

    activate server
    server->>browser: Status 304: same response
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Note right of browser: The browser starts executing the JavaScript file received from the server, which triggers this GET request.

    activate server
    server->>browser: Status 200: The server send the requested JSON file with the added note

```
