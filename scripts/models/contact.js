App.Models.Contact = Backbone.Model.extend({
	defaults: {
		firstName: '',
		lastName: '',
		phoneNumber: '<UNLISTED>',
		email: '<UNLISTED>'
	},

	validate: function(attrs, options) {
		if (!attrs.firstName) {
			return "A valid contact must have a first name";
		}
	},

	initialize: function(attributes) {
		var firstName = attributes.firstName || '<EMPTY>';
		var lastName = attributes.lastName || '<EMPTY>';
		console.log("Initializing a new contact model for '" +
			firstName + " " + lastName + "'."
		);
	}
});
