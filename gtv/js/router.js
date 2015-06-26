define(['underscore', 'backbone'], function(_, Backbone) {
	return Backbone.Router.extend({
		routes: {
			'': 'home',
			'login': 'login',
			'register': 'register'
		},
		home: function() {
			var self = this;
			$('#application-main-container').html('Click Here to login').click(function(){
				self.navigate('login', true);
			});
		},
		login: function() {
			require(['views/login/login'], function (LoginView) {
				var loginView = new LoginView();
				$('#application-main-container').html(loginView.render().el);
			});
		},
		register: function() {
			require(['views/login/register'], function(RegisterView) {
				var registerView = new RegisterView();
				t$('#application-main-container').html(registerView.render().el);
			});
		}
	});
});