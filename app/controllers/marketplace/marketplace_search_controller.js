Balanced.MarketplaceSearchController = Balanced.ObjectController.extend({
	needs: ['marketplace'],

	displayResults: true,

	isResultsOpen: function() {
		var queryLength = this.get("resultsLoader.query.length");
		return (queryLength > 0) && this.get("displayResults");
	}.property("resultsLoader.query", "displayResults"),

	queryChanged: function(a, value) {
		this.set("displayResults", true);
	}.observes("resultsLoader.query"),

	resultsLoader: function() {
		var marketplace = this.get("marketplace");
		return marketplace.getSearchLoader({});
	}.property("marketplace"),

	selectedTabType: "transaction",

	// UI properties
	isOrdersTabSelected: Ember.computed.equal("selectedTabType", "order"),
	isTransactionsTabSelected: Ember.computed.equal("selectedTabType", "transaction"),
	isCustomersTabSelected: Ember.computed.equal("selectedTabType", "customer"),
	isFundingInstrumentsTabSelected: Ember.computed.equal("selectedTabType", "funding_instrument"),

	totalOrders: Ember.computed.oneWay("resultsLoader.results.total_orders"),
	totalTransactions: Ember.computed.oneWay("resultsLoader.results.total_transactions"),
	totalCustomers: Ember.computed.oneWay("resultLoader.results.total_customers"),
	totalFundingInstruments: Ember.computed.oneWay("resultsLoader.results.total_funding_instruments"),

	displayResults: false,

	actions: {
		closeSearch: function() {
			this.set("displayResults", false);
		},
		changeTypeFilter: function(type) {
			this.set("selectedTabType", type);
			this.get("resultsLoader").set("searchType", type);
		},
		changeSortOrder: function(column) {
			this.get("resultsLoader").setSortField(column);
		},
		changeDateFilter: function(startTime, endTime) {
			this.get("resultsLoader").setProperties({
				endTime: endTime,
				startTime: startTime
			});
		},
		changeTransactionsSort: function(column) {
			this.get("resultsLoader").setSortField(column);
		},
	}
});
