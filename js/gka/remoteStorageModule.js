define([
	"remotestorage"
], function(remoteStorage){

var moduleName = "gruppenkasse"

RemoteStorage.defineModule(moduleName, function(privateClient, publicClient){

	return {
		
		name: moduleName,
		
		exports: {

			init: function() {
				privateClient.cache("", true)
			},

			// remoteStorage.gruppenkasse.on("change", function(changeEvent){
			//   if(changeEvent.newValue && changeEvent.oldValue){
			//    changeEvent.origin:
			//      * window - event come from current window
			//            -> ignore it
			//      * device - same device, other tab (/window/...)
			//      * remote - not related to this app's instance, some other app updated something on remoteStorage
			//   }
			// })
			on: privateClient.on,
			
			getTransactions: function(){
				return privateClient.getAll("transactions/")
			},
			
			saveTransaction: function(key, data){
				privateClient.storeObject("transaction", "transactions/" + key, data)
			},
			
			removeTransaction: function(key){
				privateClient.remove("transactions/" + key)
			}
		}
	}

})

return remoteStorage[moduleName]

})
