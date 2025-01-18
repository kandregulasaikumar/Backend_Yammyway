const mongoose = require('mongoose');
const Product = require('./Product');

const firmSchema = mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true,
    },
    area: {
        type: String,
        required: true,
    },
    category: {
        // Allows multiple categories with predefined values
        type: [
            {
                type: String,
                enum: ['veg', 'non-veg'], 
            },
        ],
    },
    region: {
        // Allows multiple regions with predefined values
        type: [
            {
                type: String,
                enum: ['south-indian', 'north-indian', 'chinese', 'bakery'], 
            },
        ],
    },
    offer: {
        type: String, 
    },
    image: {
        type: String, 
    },
// now reletion vendor kin ee firm ki cheyyali ante ee schemalani kalapali 
// enduku ante ettitho patu id kuda save avuthundi ala ayithe fliter out cheyyadaniki use aviuthundi .
    vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor', // Reference to the Vendor schema
        },
    ],

    //.............
    products:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:'Product'
        }
       ]
    
});

const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm;
