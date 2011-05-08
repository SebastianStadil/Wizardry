// Load JS & CSS
document.write('<link rel="stylesheet" type="text/css" href="ext-4.0.0/resources/css/ext-all.css">');
loadScript("ext-4.0.0/ext-all-debug.js", function() {
	loadScript("Spotlight.js", function() {
		Ext.onReady(startApp);
	});
});

// Params
var	path = [
	['box0', 'box0-trigger', 'Step 0', 'Click on this 0', 'left'],
	['box1', 'box1-trigger', 'Step 1', 'Click on this 1', 'right'],
	['box2', 'box2-trigger', 'Step 2', 'Click on this 2', 'top'],
	['box3', 'box3-trigger', 'Step 3', 'Click on this 3', 'bottom']
];

function showToolTip(args) {
	var params = Ext.apply({}, args, {
		autoShow: true,
		autoHide: false,
		closable: true
	});
	console.log(params);
	Ext.create('Ext.tip.ToolTip', params);
}

// Main function
function startApp() {
	var spot = Ext.create('Ext.ux.Spotlight');

	for (i = 0; i < (path.length - 1); i++) {
		Ext.get(path[i][1]).on('click', 
			(function(x) {
				return function() {
					spot.show(path[x + 1][0]);
					showToolTip({
						target: path[x + 1][0],
						anchor: path[x + 1][4],
						html: path[x + 1][3],
						title: path[x + 1][2]
					});

				};
			})(i)
		);
	};

	Ext.get(path[path.length - 1][1]).on('click', function() {
		spot.destroy();
	});
	
	spot.show(path[0][0]);
	showToolTip({
		target: path[0][0],
		anchor: path[0][4],
		html: path[0][3],
		title: path[0][2]
	});
	

	Ext.QuickTips.init();


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