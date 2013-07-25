App.Views.Contact = Backbone.View.extend({
	template: _.template($('#template-contact').html()),
	$container: null,

	events: {
		'click .delete': 'remove'
	},

	initialize: function(options) {
		_.bindAll(this, 'render', 'insert', 'remove');

		this.$container = options.$container;

		this.listenTo(this.model, 'change', this.render);
		this.insert();
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));

		return this;
	},

	insert: function() {
		this.$container.append(this.$el);
	},

	remove: function() {
		App.Browser.navigate('contacts/remove/' + this.model.get('id'));
		this.model.destroy();
	}
});
