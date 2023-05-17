const calcRewardsAndFormatData = (transactions) => {
    /**
     * record: {
     *      [id]: {
     *          months: {
     *              February: 200
     *              March: 300
     *              April: 200
     *          },
     *          totalRewards: 700
     *      }
     * }
     */

    const record = {};
    const BASE_REWARDS = 50;
    transactions.forEach((transaction) => {
        const { id, transactionAmount, date } = transaction;

        let month = new Date(date * 1000).toLocaleString("en", {
            month: "long",
        });
        let curReward = 0;
        if (transactionAmount > 100) {
            curReward += BASE_REWARDS + (transactionAmount - 100) * 2;
        } else if (transactionAmount > 50 && transaction <= 100) {
            curReward += transactionAmount - BASE_REWARDS;
        }

        if (record.hasOwnProperty(id)) {
            if (record[id].months.hasOwnProperty(month)) {
                record[id].months[month] += curReward;
            } else {
                record[id].months[month] = curReward;
            }

            record[id].totalRewards += curReward;
        } else {
            record[id] = {
                months: { [month]: curReward },
                totalRewards: curReward,
            };
        }
    });
    return record;
};

const formatMonthsData = (data) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const monthsSet = new Set();
    for (let id in data) {
        let monthsObj = data[id].months;
        Object.keys(monthsObj).forEach((key) => monthsSet.add(key));
    }
    let sortedMonthArr = Array.from(monthsSet).sort(
        (a, b) => months.indexOf(a) - months.indexOf(b)
    );
    return sortedMonthArr;
};

const generateOutputData = (data, monthsArr) => {
    /**
     * outputData = [
     *      [id, id0Month1Reward, id0Month2Reward, id0Month3Reward, totalRewards],
     *      [id, id1Month1Reward, id1Month2Reward. id1Month3Reward, totalRewards],
     *      [id, id2Month1Reward, id2Month2Reward. id2Month3Reward, totalRewards],
     * ]
     */
    let outputData = [];

    Object.keys(data).forEach((id) => {
        let curIdData = [id];
        for (let i = 0; i < monthsArr.length; i++) {
            let month = monthsArr[i];
            let monthReward = 0;
            monthReward = data[id].months[month] || 0;
            curIdData.push(monthReward);
        }
        curIdData.push(data[id].totalRewards);
        outputData.push(curIdData);
    });

    return outputData;
};

export {
    formatMonthsData,
    calcRewardsAndFormatData,
    generateOutputData,
};
