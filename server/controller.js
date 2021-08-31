const { homedir } = require('os');
const houses = require('../server/db.json');
let id = 4;

module.exports = {
    getAllHouses: (req,res) => {
        res.status(200).send(houses);
    },
    deleteHouse: (req,res) => {
        let index = houses.findIndex(elem => elem.id === +req.params.id)
        houses.splice(index, 1);
        res.status(200).send(houses);
    },
    createHouse: (req, res) => {
        let { address, price, imageURL} = req.body;
        console.log(address, price, imageURL)

        const newHouse = {
            id, 
            address,
            price,
            imageURL
        }
        houses.push(newHouse)
        id++;
        res.status(200).send(houses);
    },
    updateHouse: (req, res) => {
        let { id } = req.params;
        let { type } = req.body;
        let index = houses.findIndex(elem => +elem.id === +id);
        console.log(houses[index]);
        if(houses[index].price === 10000 && type === 'plus') {
            res.status(400).send('cannot go above 10000')
        } else if (houses[index].price === 70000 && type === 'minus') {
            res.status(400).send('cannot go below 70,000');
        } else if (type === 'plus') {
            +houses[index].price++;
            res.status(200).send(houses)
        } else if (type === 'minus') {
            +houses[index].price--;
            res.status(200).send(houses);
        } else {
            res.sendStatus(400);
        }
    }

    // updateHouse: (req,res) => {
    //     let { type } = req.body;
    //     let { id } = req.param;
    //     const index = houses.findIndex((house) => {
    //         return homedir.id === +id;
    //     });

    //     if(type === 'plus') {
    //         houses[index].price = +houses[index].price + 10000;
    //         res.status(200).send(houses);
    //     } else if (type === 'minus' && houses[index].price > 70000) {
    //         houses[index].price = houses[index].price - 10000;
    //         res.status(200).send(houses);
    //     }
    // }
}
