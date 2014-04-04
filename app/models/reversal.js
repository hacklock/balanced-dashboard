require('app/models/transaction');

Balanced.Reversal = Balanced.Transaction.extend({
	credit: Balanced.Model.belongsTo('credit', 'Balanced.Credit'),

	type_name: function() {
		return "Reversal";
	}.property(),

	route_name: function() {
		return "reversals";
	}.property(),

	last_four: Ember.computed.alias('credit.last_four'),
	funding_instrument_name: Ember.computed.alias('credit.funding_instrument_name'),

	funding_instrument_description: function() {
		return this.get('credit.funding_instrument_description');
	}.property('credit.funding_instrument_description'),

	customer: function() {
		return this.get('credit.customer');
	}.property('credit.customer')
});

Balanced.TypeMappings.addTypeMapping('reversal', 'Balanced.Reversal');
