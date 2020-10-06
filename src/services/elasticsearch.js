const elasticsearch = require('../adapter/elasticsearch');

class ElasticsearchService {
	async save (index, docId, content) {
		if(content) {
			await elasticsearch.index({
				index: index,
				id: docId,
				body: content
			});
		}
	}
	async searchProducts (index, searchText) {
		let fuzziness = searchText.length > 3 ?  "AUTO" : 0;
		let searchResult =  await elasticsearch.search({
			index: index,
			body: {
				"query": {
					"bool": {
						"must": [
							{
								"fuzzy": {
									"name": {
										"value": searchText,
										"fuzziness": fuzziness
									}
								}
							},
							{
								"term": {
									"is_deleted": 0
								}
							}
						]
					}
				},
				"sort": [
					"_score",
					{
						"display_priority": {
							"order": "desc"
						}
					},
					{
						"sales_count": {
							"order": "desc"
						}
					},
					{
						"rating": {
							"order": "desc"
						}
					},
					{
						"updated_at": {
							"order": "desc"
						}
					},
					{
						"created_at": {
							"order": "desc"
						}
					}
				]
			}
		});
		return searchResult['hits']['hits'].map(doc => doc['_source']);
	}
	async remove (index, docId) {
		await elasticsearch.delete({
			index: index,
			id: docId
		});
	}
}
module.exports = new ElasticsearchService();