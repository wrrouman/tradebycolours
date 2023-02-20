- write some functions that allow reading and writing to local storage API
- keyed off user email 
- inside would be an array of stock symbols
DONE

- watchlist
- search
    - lightweight query to get all stock symbols
        from twelvedata
    - feed that into the search to have autocomplete suggestion
    - when added we write to localStorage
    - check for duplicates to stop user from adding
    - same ticket more than once
- watchlist display
    - stockcards
        - optional onDelete prop
        - make watchlist cards removable
        - home page cards unaffected 