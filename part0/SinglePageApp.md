0.5 Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server->>browser: Returns the requested HTML file at that address
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: Return css styling
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server->>browser: Return JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the spa.js, which does a GET request likely to a rest endpoint of the server.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: Status 200: returns JSON file
    Note right of browser: The browser updates the DOM with the returned JSON file.

```
