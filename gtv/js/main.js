require.config({
	 baseUrl: rootDir+'js/',
	 paths: {
	 	gtv: 'gtv',
	 	jquery: 'libs/jquery/jquery.2.1.3.min',
	 	underscore: 'libs/underscore/underscore.1.8.2.min',
	 	backbone: 'libs/backbone/backbone.1.1.2.min',
	 	handlebars: 'libs/handlebars/handlebars',
	 	hbs: 'libs/hbs/hbs',
	 	json2: 'libs/hbs/json2',
	 	i18nprecompile: 'libs/hbs/i18nprecompile',
	 },
	 shim: {
	 	gtv: {
	 		exports: "GTV"
	 	},
	 	jquery: {
	 		exports: "$"
	 	},
	 	backbone: {
	 		deps: ['underscore', 'jquery'],
	 		exports: "Backbone"
	 	},
 	 	underscore: {
            exports: '_'
        },
        handlebars: {
            exports: 'Handlebars'
        }
	 },
	 hbs: {
        disableI18n: true,
        disableHelpers: true,
        templateExtension: 'html'
    }
});

require(['gtv', 'router'], function (GTV, Router) {
	GTV.router = new Router();
	Backbone.history.start();
});