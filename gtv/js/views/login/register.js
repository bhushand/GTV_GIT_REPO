define(['gtv', 'hbs!templates/login/register'], function(GTV, template) {
	return GTV.View.extend({
		tagName: 'div',
		id: 'register-wrapper',
		initialize: function() {

		},
		events: function() {
			
		},
		render: function() {
			console.log("register view render function called");
			return this;
		},
	});
});