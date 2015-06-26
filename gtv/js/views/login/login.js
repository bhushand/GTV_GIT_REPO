define(['gtv', 'hbs!templates/login/login', 'views/login/register'], function(GTV, template, RegisterView) {
	return GTV.View.extend({
		tagName: "div",
		id: 'login-wrapper',
		initialize: function() {

		},
		events: {
			'click #login-button': 'login',
			'click #register-button': 'register'
		},
		render: function() {
			this.$el.html(template({}));
			return this;
		},
		login: function() {
			alert("Logged In");
		},
		register: function() {
			var registerView = new RegisterView();
		}
	});
});