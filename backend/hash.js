const bcrypt = require('bcryptjs');
bcrypt.hash('supermotdepasse', 10).then(hash => console.log(hash));
