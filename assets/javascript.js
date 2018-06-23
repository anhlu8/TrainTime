$(document).ready(function () {
    // Initialize Firebase:
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBXQ7aZJuYBbDVWQGWkWFddvogPNV7YTO4",
        authDomain: "test-26fa7.firebaseapp.com",
        databaseURL: "https://test-26fa7.firebaseio.com",
        projectId: "test-26fa7",
        storageBucket: "test-26fa7.appspot.com",
        messagingSenderId: "862999934989"
    };
    firebase.initializeApp(config);
    var database = firebase.database();


    // Capture user's input & push new data to Firebase:
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#trainTime").val().trim();
        var frequency = $("#frequency").val().trim();

        var newSchedule = {
            TrainName: trainName,
            Destination: destination,
            firstTrainTime: trainTime,
            Frequency: frequency
        }

        database.ref().push(newSchedule);
    });


    // Download data from Firebase & append to HTML:
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().TrainName;
        var destination = childSnapshot.val().Destination;
        var frequency = childSnapshot.val().Frequency;
        var firstTrainTime = childSnapshot.val().firstTrainTime;

        // Create functionality that formats the time in the way you want it displayed.
        // moment(variable, format) "HH:mm A"
        var convertedTime = moment(firstTrainTime, "HH:mm A").subtract(1, "year")
        console.log(convertedTime);
        // The difference between the converted time and the current time (.diff() in moment)

        var timeDifference= moment().diff(moment(convertedTime),"minutes");
        console.log(timeDifference);

        // Remainder between the time difference and the train frequency
        var timeRemainder = timeDifference % frequency;
        console.log(timeRemainder);

        var minutesAway = frequency - timeRemainder;
        console.log(minutesAway);

        var nextArrival = moment().add(minutesAway,"m").format("HH:mm A");
        console.log(nextArrival);

        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minutesAway),
        );

        // Append the new row to the table
        $("#trainTbl > tbody").append(newRow);
    });

});
