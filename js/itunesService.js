var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here

    this.getData = function(artist) {

      var deferred = $q.defer();
    /*   $http.jsonp("https://itunes.apple.com/lookup", {
          params: {
            'callback': 'JSON_CALLBACK',
            'id': 'some-app-id'
          }
      }).success(function(data) {
          console.log(data);
      }); */
      // var url = 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK';
      var url = 'https://itunes.apple.com/search?term=' + artist;
      $http.jsonp(url, {
        params: {
          'callback': 'JSON_CALLBACK',
          'id': 'some-app-id',
        }
      })
      .then(function(response) {
  //        console.log(response);
          if (response.data.results) {
            var respArray = response.data.results;
            deferred.resolve(respArray)
          } else {
            var respArray;
          }
      })
      .catch(function(err) {
          deferred.reject(err);
      })
      return deferred.promise;

    }

});
