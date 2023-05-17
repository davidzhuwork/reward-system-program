import React, { useEffect, useState } from "react";
import "./RewardTable.css";
import {
    formatMonthsData,
    calcRewardsAndFormatData,
    generateOutputData,
} from "../Utils/format.js";
import axios from "axios";

function RewardTable({ dataUrl }) {
    const [data, setData] = useState({});
    const [monthsArr, setMonthArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(dataUrl);
            const data = response.data;
            // console.log("data is ", data);
            const formatData = calcRewardsAndFormatData(data);
            setData(formatData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setMonthArr(formatMonthsData(data));
    }, [data]);

    const generateTableBody = () => {
        let outputData = generateOutputData(data, monthsArr);

        return outputData.map((rowData, idx) => {
            return (
                <tr key={idx}>
                    {rowData.map((itemData, idx) => (
                        <td key={idx}>{itemData}</td>
                    ))}
                </tr>
            );
        });
    };

    return (
        <>
            <h1>Rewards Table</h1>
            <table data-testid="table">
                <thead>
                    <tr>
                        <th>Customer Id</th>
                        {monthsArr.map((monthStr, idx) => {
                            return <th key={idx}>{monthStr}</th>;
                        })}
                        <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>{generateTableBody()}</tbody>
            </table>
        </>
    );
}

export default RewardTable;
