/*
  Name:    iTunesReporter.js
  Desc:    Dumps information about selected iTunes tracks to stodut.  The
           "Location" column of missing tracks will be empty.
  Usage:   cscript //noheader iTunesReporter.js > report.tsv
  Created: 2015-02-23
  Author:  flight16
  Notes:   Reference https://everythingitunes.wordpress.com/scripts
*/

var delim = "\t";

var iTunes    = WScript.CreateObject("iTunes.Application")
var tracks    = iTunes.SelectedTracks;
var numTracks = tracks.Count;

WScript.Echo("Location" + delim
    + "Artist"          + delim
    + "Album"           + delim
    + "TrackNumber"     + delim
    + "Name"            + delim
    + "Grouping");

var i;
for(i = 0; i < numTracks; i++) {
    var track = tracks.Item(i + 1);
    WScript.Echo(track.Location + delim
	+ track.Artist          + delim
	+ track.Album           + delim
	+ track.TrackNumber     + delim
	+ track.Name            + delim
	+ track.Grouping);
}
