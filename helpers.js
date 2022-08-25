function calculateMean(nums) {
    let total = 0;
        for (n of nums) {
            total += n;
        }
        let mean = total / nums.length
        return mean
}


module.exports = { calculateMean };