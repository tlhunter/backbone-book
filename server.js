var http = require('http');
var filesystem = require('fs');

// Our Contacts "Database"
var contacts = [{
	id: '1',
	firstName: 'Thomas',
	lastName: 'Hunter',
	phoneNumber: '9895135499',
	email: 'me@thomashunter.name'
},
{
	id: '2',
	firstName: 'Rupert',
	lastName: 'Styx',
	phoneNumber: '9895551212',
	email: 'rupertstyx@example.com'
}];

http.createServer(function (req, res) {
	console.log(req.method + ' ' + req.url);

	if (req.url === '/' && req.method === 'GET') {
		// Requesting HTML Document
		filesystem.readFile(__dirname + '/index.html',
			function(err, data) {
			if (err) throw err;
			res.end(data);
		});

		return;
	} else if (req.url.indexOf('/contacts') === 0) {
		// Backbone requesting some data
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		if (req.method == 'GET') {
			// Backbone wants a list of all Contacts
			res.end(JSON.stringify(contacts));
		} else if (req.method == 'POST') {
			// Backbone is creating a new Contact
			var body = '';
			req.on('data', function(data) {
				body += data;
			});
			req.on('end', function() {
				var contact = JSON.parse(body);
				// Here we make up a unique ID
				contact.id = Math.random()
					.toString(36).substr(2);
				// The contact is stored in the DB
				contacts.push(contact);
				// Now we send the updated contact
				// (which has an ID) back to the
				// Backbone application
				res.end(JSON.stringify(contact));
				console.log("CONTACT ADD: ",
					contact);
			});
		} else if (req.method == 'DELETE') {
			// Backbone is deleting a Contact
			var id = req.url.split('/')[2];
			console.log("DELETE CONTACT: ", id);
			for (var index in contacts) {
				if (contacts[index].id === id) {
					// Delete Contact from DB
					contacts.splice(index, 1);
					break;
				}
			}
			res.end();
		}

		return;
	} else {
		// Browser probably requesting JavaScript
		var filename = __dirname + req.url;

		filesystem.lstat(filename,
				function(err, stats) {
			if (err || !stats.isFile()) {
				if (req.url != '/favicon.ico') {
					console.log("404: " + filename);
				}
				res.writeHead(404, {
					'Content-Type': 'text/plain'
				});
				res.write('404 Not Found\n');
				res.end();
				return;
			}

			filesystem.readFile(filename,
				function(err, data) {
				res.writeHead(200, {
					'Content-Type': 'text/javascript'
				});
				res.end(data);
			});
		});
		return;
	}

}).listen(1337);

console.log('http://localhost:1337/');
