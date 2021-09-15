// For the default version 
import algoliasearch from 'algoliasearch'; 

// For the search only version 
var searchClient = algoliasearch(process.env.VUE_APP_ALGOLIA_KEY_1,process.env.VUE_APP_ALGOLIA_KEY_2);
var søkeIndex = searchClient.initIndex("jobbifijobs");

export default søkeIndex;