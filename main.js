
MyCollection = new Meteor.Collection('myCollection');

if (Meteor.isServer) {

    MyCollection.remove({});
    for (var i=0; i<10000; ++i)
        MyCollection.insert({ v1: i, v2: i });

    Meteor.publish('myCollectionV1', function() { return MyCollection.find({}, { fields: { v1: 1 } }); });
    Meteor.publish('myCollectionV2', function() { return MyCollection.find({}, { fields: { v2: 1 } }); });
}

if (Meteor.isClient) {

	Template.body.helpers({
        getValues: function() { return MyCollection.find(); }
    });

	Template.body.events({
        'click #v1': function(event, template) { Meteor.subscribe('myCollectionV1'); },
        'click #v2': function(event, template) { Meteor.subscribe('myCollectionV2'); }
	});

    MyCollection.find().observeChanges({
        added:   function(id, doc)    { console.log('Added');   },
        changed: function(id, fields) { console.log('Changed'); },
        removed: function(id)         { console.log('Removed'); }
    });
}
