// Load JS & CSS
document.write('<link rel="stylesheet" type="text/css" href="ext-4.0.0/resources/css/ext-all.css">');
loadScript("ext-4.0.0/ext-all-debug.js", function() {
	loadScript("Spotlight.js", function() {
		Ext.onReady(startApp);
	});
});

// Params
var	path = [
	['box0', 'box0-trigger', 'Click on this'],
	['box1', 'box1-trigger', 'Click on this'],
	['box2', 'box2-trigger', 'Click on this'],
	['box3', 'box3-trigger', 'Click on this']
];


// Main function
function startApp() {
	var spot = Ext.create('Ext.ux.Spotlight');

	for (i = 0; i < (path.length - 1); i++) {
		Ext.get(path[i][1]).on('click', 
			(function(x) {
				return function() {
					spot.show(path[x + 1][0]);
				};
			})(i)
		);
	};

	Ext.get(path[path.length - 1][1]).on('click', function() {
		spot.destroy();
	});
	
	spot.show(path[0][0]);
};

//
// Utilities
//

function loadScript(sScriptSrc, callbackfunction)  {
	var oHead = document.getElementsByTagName('head')[0];
	if(oHead) {
		var oScript = document.createElement('script');
				
		oScript.setAttribute('src',sScriptSrc);
		oScript.setAttribute('type','text/javascript');

		oScript.onreadystatechange = function() {
			if (this.readyState == 'complete' || this.readyState == 'loaded')
				callbackfunction(); 
		};
		oScript.onload = callbackfunction;
		oHead.appendChild(oScript);
	}
};