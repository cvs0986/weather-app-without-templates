const yargs = require('yargs');
const chalk = require('chalk');

const map = require('./utils/geocode');
const weather = require('./utils/weather');

yargs.command({
  command: 'forcast',
  describe: 'get forcast',
  builder: {
    address: {
      describe: 'forcast address',
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    map.geocode(argv.address, (error, data) => {
      if (error) {
        return console.log(chalk.red.inverse('Error: ', error));
      }

      weather.getWeather(data, (error, forcastData) => {
        if (error) {
          return console.log(chalk.red.inverse('Error: ', error));
        }
          console.log(chalk.blue.inverse(data.place));
          console.log(chalk.green.inverse(forcastData));
      });

    });
  }
  
});

yargs.parse();