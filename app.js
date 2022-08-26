const express = require('express');
const ExpressError = require("./expressError");

const app = express();

app.use(express.json()); 

app.get('/mean', (req, res, next) => {
    try {
        //used solution to figure out how to access the nums from a query string
        const nums = req.query.nums
        let split_nums = []
        let converted_nums = []
        if (!req.query.nums || req.query.nums.length === 1) {
            throw new ExpressError('Please enter at least 2 numbers', 400)
        } else {
            split_nums = nums.split(',')
        }
        for (let x=0; x < split_nums.length; x++) {
            if (!parseInt(split_nums[x])) {
                throw new ExpressError('Please enter all valid numbers', 400)
            } else {
                converted_nums.push(parseInt(split_nums[x]))
            }
        }
        let total = 0;
        for (n of converted_nums) {
            total += n;
        }
        let mean = total / converted_nums.length
        return res.json({'operation': 'mean', 'value': mean})
    } catch(e) {
        next(e)
    }
});

app.get('/median', function calculateMedian(req, res, next) {
    try {
        const nums = req.query.nums
        let split_nums = []
        let converted_nums = []
        if (!req.query.nums || req.query.nums.length === 1) {
            throw new ExpressError('Please enter at least 2 numbers', 400)
        } else {
            split_nums = nums.split(',')
        }
        for (let x=0; x < split_nums.length; x++) {
            if (!parseInt(split_nums[x])) {
                throw new ExpressError('Please enter all valid numbers', 400)
            } else {
                converted_nums.push(parseInt(split_nums[x]))
            }
        }
        //copied function from one of the links in helpfullinks doc
        let ordered_nums = converted_nums.sort(function(a, b){return a - b});
        
        if (ordered_nums.length % 2 !== 0) {
            let idx = (ordered_nums.length + 1) / 2
            median = ordered_nums[idx-1]
            return res.json({'operation': 'median', 'value': median})
        } else {
            let idx = (ordered_nums.length + 1) / 2
            let idxUp = Math.round(idx)
            let idxDown = Math.floor(idx)
            median = (ordered_nums[idxUp-1] + ordered_nums[idxDown-1]) / 2
            return res.json({'operation': 'median', 'value': median})
        }
    } catch(e) {
        next(e)
    }
})

app.get('/mode', function calculateMode(req, res, next) {
    try {
        const nums = req.query.nums
        let split_nums = []
        let converted_nums = []
        if (!req.query.nums || req.query.nums.length === 1) {
            throw new ExpressError('Please enter at least 2 numbers', 400)
        } else {
            split_nums = nums.split(',')
        }
        for (let x=0; x < split_nums.length; x++) {
            if (!parseInt(split_nums[x])) {
                throw new ExpressError('Please enter all valid numbers', 400)
            } else {
                converted_nums.push(parseInt(split_nums[x]))
            }
        }
        let numCount = {};
        for (n of converted_nums) {
            numCount[n] = 0;
        }
        for (n of converted_nums) {
            numCount[n] += 1;
        }
        
        let mode = numCount[converted_nums[0]]
        
        for (n of converted_nums) {
            if (numCount[n] > mode) {
                mode = n;
            } 
        }

        if (mode === 1) {
            return res.json({'operation': 'mode', 'value': converted_nums})
        } else {
            return res.json({'operation': 'mode', 'value': mode})
        }
        
    } catch(e) {
        next(e);
    }
})

// Error Handling
app.use(function (err, req, res, next) { //Note the 4 parameters!
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;

    // set the status and alert the user
    return res.status(status).json({
      error: { message, status }
    });
  });

//Server listening
module.exports = app;