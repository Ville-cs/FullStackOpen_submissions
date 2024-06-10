0.4 new note diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST new note to https://studies.cs.helsinki.fi/exampleapp/notes
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>browser HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server->>browser JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code
    that adds the new note to an unordered list

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate servere
    server->>browser: json file with the added note

```
