// Format is [id, trigger id, tooltip title, tooltip text]
{% if all_wizards %}
	var	steps = [
		{% for wizard in all_wizards %}
			['{{ wizard.target_id }}', ' {{ wizard.trigger_id }}', ' {{ wizard.tooltip_title }}', ' {{ wizard.tooltip_text }}'],
		{% endfor %}
	];
{% else %}
    var	steps = []
{% endif %}

// Load JS & CSS
var serverUrl = "http://127.0.0.1:8000/";
loadCSS(serverUrl + 'static/ext-4.0.0/resources/css/ext-all.css');
loadCSS(serverUrl + 'static/style.css');

loadScript(serverUrl + "static/ext-4.0.0/ext-all-debug.js", function() {
	loadScript(serverUrl + "static/Spotlight.js", function() {
		Ext.onReady(startApp);
	});
});


// Main function
function startApp() {
	Ext.QuickTips.init();
	var spot = Ext.create('Ext.ux.Spotlight');
	var tooltip;
	var tooltipButton;

	function terminateWizard() {
		spot.destroy();
		tooltip.destroy();
	}
	
	function showStep(i) {
		var args = steps[i]
		spot.show(args[0]);
		
		if (!tooltip) {
			tooltip = Ext.create('Ext.tip.ToolTip', {
				target: args[0],
				anchor: "top",
				title: args[2],
				autoShow: true,	
				html: args[3],
				autoHide: false,
				closable: true,
				height: 70,
				closeAction: 'hide',
				listeners: {
					render: function(c) {
						c.on('hide', function() {
							terminateWizard();
						});
					}
				}
			});
			
			tooltipButton = Ext.create('Ext.Button',{
				text: 'Next',
				renderTo: tooltip.getEl().first().first(),
				id: 'tooltip-button'
			});

		} else {
			tooltip.setTarget(args[0]);
			tooltip.setTitle(args[2]);
			tooltip.update(args[3]);
			tooltip.show();
		}
		
		if (args[1] == "") {
			tooltipButton.show();
		} else {
			tooltipButton.hide();
			tooltip.setHeight();
		}
				
		if (i < steps.length - 1) {
			Ext.get('tooltip-button').on('click', function() {
				showStep(i + 1);
			});
		} else {
			tooltipButton.setText("OK");
			Ext.get('tooltip-button').on('click', function() {
				terminateWizard();
			});
			Ext.get('terminate-steps').on('click', function() {
				terminateWizard();
			});
		}
	}
	
	// Add listener to alls to buttons
	for (i = 0; i < steps.length - 1; i++) {
		if (steps[i][1] != "") {
			Ext.get(steps[i][1]).on('click', 
				(function(x) {
					return function() {
						showStep(x + 1);
					};
				})(i)
			);
		}
	};
	
	// Destroy the spotlight and tooltip on the last step
	if (steps[steps.length - 1][1] != "") {
		Ext.get(steps[steps.length - 1][1]).on('click', function() {
			terminateWizard();
		});
	}
	
	// Start with the first step
	showStep(0);
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

function loadCSS(filename) {
	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);
	document.getElementsByTagName("head")[0].appendChild(fileref)
}