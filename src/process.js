const converter = require('iconv-lite');
const { exec } = require('child_process');

// Execute the net user command
const performNetUserCommand = (callback) => {
  exec('net user', { encoding: "buffer" },
    (error, stdout, stderr) => {
      if (error) return callback(stderr, null);
      callback(null, converter.decode(stdout, 'CP866'));
    }
  );
}

// Create an array with the list of users
const netUsers = (callback) => {
  performNetUserCommand((err, res) => {
    if (err) return console.log(`Error: ${err}`);
    callback(res.match(/[A-Za-zА-Яа-я0-9_]+/g));
  });
}


module.exports = netUsers;
