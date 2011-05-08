// Load JS & CSS
var serverUrl = "http://wizardryapp.com/server/";
document.write('<link rel="stylesheet" type="text/css" href="' + serverUrl + 'ext-4.0.0/resources/css/ext-all.css">');
document.write('<link rel="stylesheet" type="text/css" href="' + serverUrl + 'style.css">');
loadScript(serverUrl + "ext-4.0.0/ext-all-debug.js", function() {
	loadScript(serverUrl + "Spotlight.js", function() {
		Ext.onReady(startApp);
	});
});

// Params
// Format is [id, trigger id, tooltip title, tooltip text]
var	steps = [
	['question', 'question', 'Step 0', 'This is the Poll question'],
	['answers', 'answers', 'Step 1', 'Click on this 1'],
	['submit', 'submit', 'Step 2', 'Click on this 2']
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
				html: args[3] + "<br><a href='#' id='skip-steps'>Skip</a>",
				title: args[2],
				autoShow: true,	
				autoHide: false,
				closable: true
			});

		} else {
			console.log(args[0]);
			tooltip.setTarget(args[0]);
			tooltip.setTitle(args[2]);
			tooltip.update(args[3] + "<br><a href='#' id='skip-steps'>Skip</a>");
			tooltip.show();
		}
		Ext.get('skip-steps').on('click', function() {
			spot.destroy();
			tooltip.destroy();
		});
	}
	
	
	// Add listener to alls to buttons
	for (i = 0; i < steps.length - 1; i++) {
		Ext.get(steps[i][1]).on('click', 
			(function(x) {
				return function() {
					showStep(steps[x + 1]);
				};
			})(i)
		);
	};
	
	// Destroy the spotlight and tooltip on the last step
	Ext.get(steps[steps.length - 1][1]).on('click', function() {
		spot.destroy();
		tooltip.destroy();
	});
	
	// Start with the first step
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