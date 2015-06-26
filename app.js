var win = Ti.UI.createWindow();
var webview = Ti.UI.createWebView({
	width : Ti.UI.FILL,
	height: Ti.UI.FILL,
	backgroundColor : '#F0F0F0',
	url: '/gtv/gtv.html'
});

/*var button = Ti.UI.createButton({
	title : 'fromTitanium',
	height : '50dp',
	width : '130dp'
});
button.addEventListener('click', function(e) {
	Ti.App.fireEvent('app:fromTitanium', {
		message : 'event fired from Titanium, handled in WebView'
	});
});
Ti.App.addEventListener('app:fromWebView', function(e) {
	alert(e.message);
});*/
win.add(webview);
//win.add(button);
win.open(); 