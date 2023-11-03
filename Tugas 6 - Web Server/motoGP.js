const express = require('express');
const app = express();

var motoGP = [
    {
        circuit: 'Losail',
        location: 'Qatar',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy'
        }
    },
    {
        circuit: 'Autodromo',
        location: 'Argentine',
        winner: {
            firstName: 'Cal',
            lastName: 'Crutchlow',
            country: 'UK'
        }
    },
    {
        circuit: 'De Jerez',
        location: 'Spain',
        winner: {
            firstName: 'Valentino',
            lastName: 'Rossi',
            country: 'Italy'
        }
    },
    {
        circuit: 'Mugello',
        location: 'Italy',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy'
        }
    }
];

app.get('/', (req, res) => {
    res.json(motoGP);
});

app.get('/country', (req, res) => {
    const countries = motoGP.map(race => race.winner.country);
    const uniqueCountries = [...new Set(countries)];
    const result = uniqueCountries.map(country => ({
        country,
        races: motoGP.filter(race => race.winner.country === country)
        }));
    res.json(result);
});

app.get('/name', (req, res) => {
    const winners = motoGP.map(race => race.winner);
    const uniqueWinners = Array.from(new Set(winners.map(JSON.stringify)), JSON.parse);
    const result = uniqueWinners.map(winner => ({
        firstName: winner.firstName,
        lastName: winner.lastName,
        country: winner.country,
        races: motoGP.filter(race => race.winner.firstName === winner.firstName && race.winner.lastName === winner.lastName)
    }));
    res.json(result);
});

app.use((req, res) => {
    res.status(400).send('Bad Request');
});

app.listen(5000, () => {
    console.log('Server berjalan pada http://localhost:5000');
});