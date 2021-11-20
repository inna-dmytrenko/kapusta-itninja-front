import React, {useState, useEffect} from "react";
import moment from "moment";
import { Summary, Title, SummaryList, SummaryItem  } from "./TransactionMonthSummary.styled"
import {getSummaryExpense, getSummaryIncome} from "../../api/summaryApi"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionMonthSummary = ({type}) => {
    const [summary, setSummary] = useState("");

        useEffect(() => {   
            async function getSummary() {
                try {
                    const exp = await getSummaryExpense();
                    setSummary(exp)
                    if( type === "Incomes") {
                        const inc = await getSummaryIncome();
                    setSummary(inc)
                    }
                } catch (error) {
                    toast.warning(error.message)
                }
            } getSummary()}, []);


    return (
        <Summary>
            <Title>Сводка</Title>
            {summary && summary.map(({month, value}) =>
            <SummaryList key={month}>
                    <SummaryItem >
                        <span>{moment(month).format("MMMM")}</span>
                        <span>{value}</span>
                    </SummaryItem>                
            </SummaryList>)}
        </Summary>
    );
};

export default TransactionMonthSummary;