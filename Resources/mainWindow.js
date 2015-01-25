// Require the modules
var utils = require("/utils");

module.exports = function(){

    /*
     *
     *  D I F E R E N T    G R A P H I C S    E L E M E N T S
     *
     */

    // this sets the background color of the master UIView (when there are no windows/tab groups on it)
    Titanium.UI.setBackgroundColor('#000');

    var win = Titanium.UI.createWindow({
        title:'Test',
        backgroundColor:'#fff'
    });

    var testBtnView = Titanium.UI.createView({
        backgroundColor: "#aaa",
        top: "50%",
        height: '50dp',
        width: "225dp"
    });
    win.add(testBtnView);

    var testBtn = Titanium.UI.createButton({
        color:  'white',
        backgroundColor: '#aaa',
        title: "TEST",
        font: {fontSize:'18dp',fontFamily:'Helvetica Neue',fontWeight:'bold'},
        textAlign: 'center'
    });
    testBtnView.add(testBtn);

    var fontLabel = {fontSize:'16dp',fontFamily:'Helvetica Neue',fontWeight:'bold'};
    var fontData = {fontSize:'36dp',fontFamily:'Helvetica Neue',fontWeight:'bold'};

    var labelLongitude = Titanium.UI.createLabel({
        color:      'black',
        text:       'Longitud',
        top:        '25dp',
        font:       fontLabel,
        textAlign:  'center',
        width:      '50%',
        left:       0,
        zIndex:     100,
        backgroundColor: '#7faaaaaa'
    });
    win.add(labelLongitude);

    var dataLongitude = Ti.UI.createLabel({
        font        : fontData,
        color       : 'black',
        top         : '45dp',
        left        : 0,
        width       : '50%',
        textAlign   : 'center',
        height      : '40dp',
        zIndex      : 110,
        backgroundColor: '#7faaaaaa'
    });
    win.add(dataLongitude);

    var labelLatitude = Titanium.UI.createLabel({
        color:      'black',
        text:       'Latitud',
        top:        '25dp',
        font:       fontLabel,
        textAlign:  'center',
        width:      '50%',
        left:       '50%',
        zIndex:     100,
        backgroundColor: '#7faaaaaa'
    });
    win.add(labelLatitude);

    var dataLatitude = Ti.UI.createLabel({
        font        : fontData,
        color       : 'black',
        top         : '45dp',
        left        : '50%',
        width       : '50%',
        textAlign   : 'center',
        height      : '40dp',
        zIndex      : 110,
        backgroundColor: '#7faaaaaa'
    });
    win.add(dataLatitude);

    var location = require('/location/location');
    var gps, activity;

    Titanium.Geolocation.purpose = 'Determine Current Location';

    function getLocalization(){
        location.start({
            action: function(responseLocation) {
                gps = responseLocation;
                Titanium.API.info("[location] "+responseLocation);
                dataLatitude.text = gps.latitude;
                dataLongitude.text = gps.longitude;
                location.stop();
                activity.destroy();
            },
            error: function() {
                console.error('Error: Trying to get location');
                activity.destroy();
            }
        });
    }

    function testBtnHandler(){
        console.info("test button clicked");
        activity = utils.animateGradient(testBtnView);
        getLocalization();
        // simulate an action that lasts 5 seconds
        /*setTimeout(function(){
            activity.destroy();
        }, 5000);*/
    }

    win.addEventListener('open',function(){
        testBtn.addEventListener('click', testBtnHandler );
    });


    win.addEventListener('close',function(){
        testBtn.removeEventListener('click', testBtnHandler );
    });

    return win;

};


