/*
  Name:    iTunesInjectGuids.js
  Desc:    Creates GUIDs and writes them to the Grouping field of each track.
           I don't trust the filename to remain constant after a mass export
           from iTunes, so I'm using this script to give each track a unique ID
           in order to match up the metadata from the XML library file with the
           track's file itself.

           This script will overwrite any existing data present in the Grouping
           field.  Be careful.
  Usage:   cscript iTunesInjectGuids.js
  Created: 2015-02-23
  Author:  flight16
*/

var typeLib   = WScript.CreateObject("Scriptlet.TypeLib");
var iTunes    = WScript.CreateObject("iTunes.Application")
var tracks    = iTunes.SelectedTracks;
var numTracks = tracks.Count;

function createGuid() {
    return typeLib.Guid.substr(1,36);
}

var i;
for(i = 0; i < numTracks; i++) {
    var track = tracks.Item(i + 1);

    // If the location is missing, the file can't be found and we can't write
    // to any tags.
    if(track.Location == "") {
        continue;
    }

    track.Grouping = createGuid();

    if(i % 500 == 0) { 
        WScript.Echo("Processed " + i + " tracks...");
    }
}

WScript.Echo("Processed " + numTracks + " tracks...");
