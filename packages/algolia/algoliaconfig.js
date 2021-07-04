// For the default version 
import algoliasearch from 'algoliasearch'; 

// For the search only version 
var searchClient = algoliasearch('0Z5J6B61BT','a298ec04554ffe5a8bdd490352dd474e');
var søkeIndex = searchClient.initIndex("jobbifijobs");

export default søkeIndex;