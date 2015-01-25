(function(){

    Titanium.API.info("[Starting app]");

    if (Titanium.Geolocation.locationServicesEnabled) {
        var mainMod = require("/mainWindow");
        var mainWin = mainMod();
        mainWin.open();
    }else{
        alert('Please enable location services');
        exit();
    }

})();
