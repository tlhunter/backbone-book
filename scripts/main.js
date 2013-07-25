var App = {
	Models: {},
	Collections: {},
	Views: {},
	Contacts: null,
	Directory: null,
	Routers: {},
	Browser: null
};

$(function() { // Run this code when the DOM is ready
	App.Contacts = new App.Collections.Contact();

	App.Directory = new App.Views.Directory({
		el: $('#display')
	});

	App.Directory.render();

	App.Contacts.on('add remove', function() {
		App.Directory.render();
	});

	App.Browser = new App.Routers.Contact;
	Backbone.history.start();

	App.Contacts.fetch();
});
