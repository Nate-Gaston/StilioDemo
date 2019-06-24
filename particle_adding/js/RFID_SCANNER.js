/*>>>>>>DOCUMENT FOR RFID SCANNER<<<<<<<<<<*/

var phid;

//connect to a new phidget rfid reader
$(document).ready(function() {
  var conn = new phidget22.Connection(8989, 'localhost');
  var ch = new phidget22.RFID();

  ch.onAttach = onAttach;

  conn.connect().then(function () {
		console.log('connected');
		ch.open().then(function (ch) {
			console.log('channel open');
		}).catch(function (err) {
			console.log('failed to open the channel:' + err);
		});
	}).catch(function (err) {
		alert('failed to connect to server:' + err);
	});;
});

function onAttach(ch) {
  console.log(ch + ' attached');
  phid = ch;


  //lock.onchange = confirmLock;
  phid.onTag = tagEvent;
  phid.onTagLost = tagLostEvent;
  //phid.onError = onError;
  //phid.onPropertyChange = propChange;

  phid.setAntennaEnabled(1);

  //$('#count').text(particleCount);

}




function tagEvent(tag, protocol) {

    setEmotion(tag);
    useEmotion();



}

function tagLostEvent(tag, protocol) {
  //Currently nothing happens after the token passes through.
}