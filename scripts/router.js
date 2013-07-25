App.Routers.Contact = Backbone.Router.extend({
	routes: {
		'contacts': 'contacts',
		'contacts/add': 'contactsAdd',
		'contacts/remove/:id': 'contactsRemove'
	},

	contacts: function() {
		App.Directory.render();
		App.Directory.addFormHide();
	},

	contactsAdd: function() {
		App.Directory.addForm();
	},

	contactsRemove: function(id) {
		var contact = App.Contacts.get(id);
		if (contact) {
			contact.destroy();
		}
		App.Directory.addFormHide();
	}
});
