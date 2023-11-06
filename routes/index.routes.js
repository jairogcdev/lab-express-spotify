const express = require("express");
const router = express.Router();

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");

// Retrieve an access token
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});
// setting the spotify-api goes here:
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );
// Our routes go here:

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/artist-search", async (req, res, next) => {
  let dataArtist = await spotifyApi.searchArtists(req.query.artist);
  res.render("artist-search-results", {
    dataArtist: dataArtist.body.artists.items,
  });
});

router.get("/albums/:artistId", async (req, res, next) => {
  // .getArtistAlbums() code goes here
  let dataAlbums = await spotifyApi.getArtistAlbums(req.params.artistId);
  res.render("albums", {
    dataAlbums: dataAlbums.body.items,
  });
});

router.get("/tracks/:albumId", async (req, res, next) => {
  let dataTracks = await spotifyApi.getAlbumTracks(req.params.albumId);
  res.render("tracks", {
    dataTracks: dataTracks.body,
    songs: dataTracks.body.items,
  });
});
module.exports = router;
