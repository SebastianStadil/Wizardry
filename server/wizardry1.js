// Load JS & CSS
var serverUrl = "http://wzy-server/";
document.write('<link rel="stylesheet" type="text/css" href="' + serverUrl + 'ext-4.0.0/resources/css/ext-all.css">');
document.write('<link rel="stylesheet" type="text/css" href="' + serverUrl + 'style.css">');
loadScript(serverUrl + "ext-4.0.0/ext-all-debug.js", function() {
	loadScript(serverUrl + "Spotlight.js", function() {
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
	
	/*var conn = new Ext.data.Connection();
	conn.request({
		url: serverUrl + 'test',
		method: 'GET',
		params: {},
		success: function(responseObject) {
			alert(responseObject.responseText);
		},
		failure: function() {
			alert("failure");
		}
	});*/
	
	Ext.Ajax.request({
	    url: 'test-demo',
	    params: {},
	    success: function(response){
	        var text = response.responseText;
	        alert(text);
	    },
		failure: function() {
			console.log("failure");
		}
	});
	
	
	Ext.QuickTips.init();
	var spot = Ext.create('Ext.ux.Spotlight');
	var tooltip;
	
	function showStep(args) {
		spot.show(args[0]);
		var textAdded = "<br><a href='#' id='next-steps'>Next</a> | <a href='#' id='skip-steps'>Skip</a>";
		if (!tooltip) {
			console.log("creating...");
			tooltip = Ext.create('Ext.tip.ToolTip', {
				target: args[0],
				anchor: "top",
				html: args[3] + textAdded,
				title: args[2],
				autoShow: true,	
				autoHide: false,
				closable: true
			});

		} else {
			console.log(args[0]);
			tooltip.setTarget(args[0]);
			tooltip.setTitle(args[2]);
			tooltip.update(args[3] + textAdded);
			tooltip.show();
		}
		Ext.get('skip-steps').on('click', function() {
			spot.destroy();
			tooltip.destroy();
		});
		Ext.get('next-steps').on('click', function() {
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