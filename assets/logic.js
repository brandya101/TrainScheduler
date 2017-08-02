  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB6ggl9U846CWXcXNQMN0ipUjgGUt23M7E",
    authDomain: "new-project-e8ee4.firebaseapp.com",
    databaseURL: "https://new-project-e8ee4.firebaseio.com",
    projectId: "new-project-e8ee4",
    storageBucket: "new-project-e8ee4.appspot.com",
    messagingSenderId: "1047257259625"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $("#add-train").on("click", function(event){


  	event.preventDefault();
	var trainName = $("#trainName").val().trim();
	var destination = $("#destination").val().trim();
	var firstTrain = $("#firstTrain").val().trim();
	var frequency  = $("#trainFrequency").val().trim();

	console.log(trainName);

	var data = {
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,

		dateAdded: firebase.database.ServerValue.TIMESTAMP
	}
  	
		database.ref().push(data);

  });

  database.ref().on("child_added",  function(snapshot){

	console.log(snapshot.val().trainName);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().firstTrain);
	console.log(snapshot.val().frequency);

	$("#trainTable").append("<tr><td>" + snapshot.val().trainName + " </td><td> " + snapshot.val().destination + " </td><td> " + snapshot.val().frequency + "</td><td>" + snapshot.val().firstTrain + " </td></tr>");

}, function(errorObject){
	console.log("Errors Handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){

	$("#display-name").html(snapshot.val().trainName);
	$("#display-role").html(snapshot.val().destination);
	$("#startDate-display").html(snapshot.val().firstTrain);
	$("#rate-display").html(snapshot.val().frequency);

	//get the value of dateAdded
	var newTime= snapshot.val().dateAdded;
	console.log(snapshot.val().trainName);

	var tFrequency = snapshot.val().frequency;
	console.log(tFrequency)
	//initial time 
	var firstTimeConverted = moment(newTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	

});

//trainName + frequency = new time
//I need to parse time stamp of when the information is put in 
//add frequency in minutes then return new time and when that frequency passes by again reset timer. 
//add minutes away (countdown)

//Lets get the time information is putting into chart. 


