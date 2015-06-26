define(['underscore', 'backbone'], function(_, Backbone) {

	// Emulate http and json for compatibility with our api
    // This makes sure everything is a GET or POST
    Backbone.emulateHTTP = true;

    // This uses forms for model attributes instead of JSON
    Backbone.emulateJSON = true;

    var GTV = {};

	GTV.Model = Backbone.Model.extend({});
	GTV.Collection = Backbone.Collection.extend({});
	GTV.View = Backbone.View.extend({});
	
    return GTV;
});