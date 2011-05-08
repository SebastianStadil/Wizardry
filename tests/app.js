// Load JS & CSS
document.write('<link rel="stylesheet" type="text/css" href="ext-4.0.0/resources/css/ext-all.css">');
loadScript("ext-4.0.0/ext-all-debug.js", function() {
	loadScript("Spotlight.js", function() {
		Ext.onReady(startApp);
	});
});

// Params
var	steps = [
	['box0', 'box0-trigger', 'Step 0', 'Click on this 0'],
	['box1', 'box1-trigger', 'Step 1', 'Click on this 1'],
	['box2', 'box2-trigger', 'Step 2', 'Click on this 2'],
	['box3', 'box3-trigger', 'Step 3', 'Click on this 3']
];


// Main function
function startApp() {
	Ext.QuickTips.init();
	var spot = Ext.create('Ext.ux.Spotlight');
	var tooltip;
	
	function showStep(args) {
		spot.show(args[0]);
		
		if (!tooltip) {
			console.log("creating...");
			tooltip = Ext.create('Ext.tip.ToolTip', {
				target: args[0],
				anchor: "top",
				html: args[3],
				title: args[2],
				autoShow: true,	
				autoHide: false,
				closable: true,
			});
		} else {
			console.log(args[0]);
			tooltip.setTarget(args[0]);
			tooltip.setTitle(args[2]);
			tooltip.update(args[3]);
			tooltip.show();
		}
	}
	
	for (i = 0; i < steps.length - 1; i++) {
		Ext.get(steps[i][1]).on('click', 
			(function(x) {
				return function() {
					showStep(steps[x + 1]);
				};
			})(i)
		);
	};
	
	Ext.get(steps[steps.length - 1][1]).on('click', function() {
		spot.destroy();
		tooltip.destroy();
	});
	
	showStep(steps[0]);

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