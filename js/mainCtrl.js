var app = angular.module('itunes');

app.controller('mainCtrl', function($scope, itunesService){
  //This is setting up the default behavior of our ng-grid. The important thing to note is
  //the 'data' property. The value is 'songData'. That means ng-grid is looking for songData on $scope and is putting whatever songData is into the grid.
  //this means when you make your iTunes request, you'll need to get back the information, parse it accordingly, then set it to songData on the scope -> $scope.songData = ...
    $scope.gridOptions = {
        data: 'songData',
        /* height: '110px', */
        rowHeight: 50,
        /* sortInfo: {fields: ['song', 'artist', 'collection', 'Type'], directions: ['asc']}, */
        columnDefs: [
          {field: 'play', displayName: 'Play', enableHiding: false, width: '50', cellTemplate: '<div class="ui-grid-cell-contents"><a target="_blank" href="{{COL_FIELD}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
    //      {field: 'play', displayName: 'Play', enableHiding: false, width: '50', cellTemplate: '<div class="ui-grid-cell-contents"><audio controls><src="{{COL_FIELD}}" type="audio/mp4"></audio></div>'},
          {field: 'song', displayName: 'Song', width: '150', enableHiding: false},
          {field: 'artist',  displayName: 'Artist', enableHiding: false},
          {field: 'collection', displayName: 'Collection', enableHiding: false, width: '200'},
          {field: 'albumArt',  displayName: 'Album Art', enableHiding: false, width: '90', cellTemplate: '<div class="ui-grid-cell-contents"><img ng-src="{{COL_FIELD}}"></div>'},
          {field: 'type', displayName: 'Type', enableHiding: false},
          {field: 'singlePrice', displayName: 'Single Price', enableHiding: false,},
          {field: 'collectionPrice', displayName: 'Collection Price', enableHiding: false,},
        ]
    };



  //Our controller is what's going to connect our 'heavy lifting' itunesService with our view (index.html) so our user can see the results they get back from itunes.

  //First inject itunesService into your controller.

    //code here


  //Now write a function that will call the method on the itunesService that is responsible for getting the data from iTunes, whenever the user clicks the submit button
  //*remember, that method should be expecting an artist name. The artist name is coming from the input box on index.html, head over there and check if that input box is tied to any specific model we could use.
  //Also note that that method should be retuning a promise, so you could use .then in this function.

    //Code here

    $scope.getSongData = function (artistName) {

      itunesService.getData(artistName)
      .then(function(response) {
          console.log('FROM MY CONTROLLER', response);
          if (!response.length)
            $scope.noResults = true;
          else
            $scope.noResults = false;
            $scope.convertArray(response);
      })
      .catch(function(err) {
        console.log(err);
      })
    };

    //If everything worked you should see a huge array of objects inside your console. That's great! But unfortunately that's not what ng-grid is expecting. What you need to do now
    //is sort the data you got back to be an object in the following format.
      /*
        AlbumArt: "http://a3.mzstatic.com/us/r30/Features4/v4/22/be/30/22be305b-d988-4525-453c-7203af1dc5a3/dj.srlprmuo.100x100-75.jpg"
        Artist: "Nelly"
        Collection: "Nellyville"
        CollectionPrice: 11.99
        Play: "http://a423.phobos.apple.com/us/r1000/013/Music4/v4/4a/ab/7c/4aab7ce2-9a72-aa07-ac6b-2011b86b0042/mzaf_6553745548541009508.plus.aac.p.m4a"
        Type: "song"
    */
    //the iTunes API is going to give you a lot more details than ng-grid wants. Create a new array and then loop through the iTunes data pushing into your new array objects that look like the above data.

      //Code here
    $scope.convertArray = function(arrayIn) {

        var newArtistArray = [];
        for (var i = 0; i < arrayIn.length; i++) {
            newArtistArray.push({
              "play": arrayIn[i].previewUrl,
              "song": arrayIn[i].trackName,
              "artist": arrayIn[i].artistName,
              "collection": arrayIn[i].collectionName,
              "albumArt": arrayIn[i].artworkUrl30,
              "type": arrayIn[i].kind,
              "singlePrice": arrayIn[i].trackPrice,
              "collectionPrice": arrayIn[i].collectionPrice
            })
        }
    //Once you have that final data array, you simply need to put it on the scope (or more specifically on the scope as songData). Once you do this ($scope.songData = myFinalArray) then ng-grid will see that and populate the page.
    //Code here
        $scope.songData = newArtistArray;
    };
  //Check that the above method is working by entering a name into the input field on your web app, and then console.log the result

    //Code here


});
