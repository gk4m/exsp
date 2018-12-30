# exsp
This app allow you to export your Spotify songs, albums, artists or playlists and import them in other Spotify account.

![preview](https://media.giphy.com/media/9xpkqIZyu0cBKTlJe1/giphy.gif)

## Export format
Data is exported in json format. Below you can see example of exported file.
```
{
  "songs": [
    "1Oc6LH83W9huJq6u4ZcWIH",
    "2NPqVa1uGpeplqt60ISgr9"
  ],
  "albums": [
    "01sfgrNbnnPUEyz6GZYlt9",
    "0obMz8EHnr3dg6NCUK4xWp"
  ],
  "artists": [
    "0SfsnGyD8FpIN4U4WCkBZ5"
  ],
  "playlists": [
    {
      "name": "Dance Party",
      "public": true,
      "tracks": [
        {
          "track": {
            "id": "0M0FvSNRZmDz0Z769rewlI",
            "name": "Fire In My Soul (feat. Shungudzo)",
            "uri": "spotify:track:0M0FvSNRZmDz0Z769rewlI"
          }
        },
        {
          "track": {
            "id": "0sfbunyd3a7IFoWwEt8dsk",
            "name": "Don't Leave Me Alone (feat. Anne-Marie) - Oliver Heldens Remix",
            "uri": "spotify:track:0sfbunyd3a7IFoWwEt8dsk"
          }
        }
      ]
    }
  ]
}

```
## Read more
* [Spotify web API](https://developer.spotify.com/documentation/web-api/)
