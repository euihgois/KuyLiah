function showChance(studentScore, minScoreProgramme) {
        let difference = studentScore - minScoreProgramme, chance;
        let diffAbs = Math.abs(difference)
        if (difference < 0) {
            if (diffAbs < 5) {
                chance = 60
            }
            if (diffAbs < 10) {
                chance = 45
            }
            if (diffAbs < 20) {
                chance = 30
            }
            if (diffAbs < 30) {
                chance = 15
            }
            if (diffAbs < 40) {
                chance = 5
            } else {
                chance = 0
            }
        } else {
            if (diffAbs > 5) {
                chance = 65
            }
            if (diffAbs > 10) {
                chance = 70
            }
            if (diffAbs > 15) {
                chance = 75
            }
            if (diffAbs > 20) {
                chance = 80
            }
            if (diffAbs > 25) {
                chance = 85
            }
            if (diffAbs > 30) {
                chance = 90
            } else {
                chance = 95
            }
        }
        return chance
}

module.exports = showChance;