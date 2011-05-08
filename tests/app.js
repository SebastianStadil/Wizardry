// Register namespaces and their corresponding paths to Ext.Loader
Ext.Loader.setPath({
    'AppName': 'app',
    // Other namespaces
});

// Specify a list of classes your application your application needs
Ext.require([

]);

// Application's initialization
Ext.onReady(function() {
alert("Hello World !");

});