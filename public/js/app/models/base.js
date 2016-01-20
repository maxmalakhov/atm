/**
 * Created by max on 1/20/16.
 */
var BaseCollection = Backbone.Collection.extend({
},{
    db_collection: null,
    __fetchCollection:function(filter, collection){
        var deferred = new Deferred();

        function collectionReady(err, collection){
            collection.find(filter).toArray(function(err, items) {
                deferred.resolve(items);
            }.bind(this));
        }

        db.getCollection(collection_db, collectionReady, this);
        return deferred.promise;
    }
});