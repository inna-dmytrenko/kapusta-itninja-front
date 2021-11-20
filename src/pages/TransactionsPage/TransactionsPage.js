import React, { useEffect }from "react";
// import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Mobile, Default } from "../../utils/mediaQuery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Balance from "../../components/Balance/Balance";
import GoToStatementsButton from "../../components/GoToStatementsButton/GoToStatementsButton"
import TransactionsExpForm from "../../components/TransactionsExpForm/TransactionsExpForm";
import TransactionsExpense from "../../components/TransactionsExpense/TransactionsExpense";
import TransactionsIncome from "../../components/TransactionsIncome/TransactionsIncome";
import TransactionsIncForm from "../../components/TransactionsIncForm/TransactionsIncForm";
import { AppWrap, BalannceTab } from "../../app/App.styled";
// import * as authOperations from '../../redux/auth/auth-operations';

const TransactionsPage = () => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(authOperations.getCurrentUser());
    // }, [dispatch]);

    return (
        <AppWrap>
            <Default>
                <BalannceTab> 
                    <Balance />
                    <GoToStatementsButton />
                </BalannceTab>
                <AppWrap>
                    <Tabs>
                        <TabList>
                            <Tab>Расход</Tab>
                            <Tab>Доход</Tab>
                        </TabList>
                        <TabPanel>
                            <TransactionsExpForm />
                            <TransactionsExpense />
                        </TabPanel>
                        <TabPanel>
                            <TransactionsIncForm />
                            <TransactionsIncome />
                        </TabPanel>
                    </Tabs>
                </AppWrap> 
            </Default>

            <Mobile>
                <BalannceTab> 
                    <Balance />
                    <GoToStatementsButton />
                </BalannceTab>
                <AppWrap>
                    <Tabs>
                        <TabList>
                            <Tab>Расход</Tab>
                            <Tab>Доход</Tab>
                        </TabList>
                        <TabPanel>
                            <NavLink to="/transactions_expenses_form" className="Add_button">
                                Добавить
                            </NavLink>
                            <TransactionsExpense />
                        </TabPanel>
                        <TabPanel>
                            <NavLink to="/transactions_incomes_form" className="Add_button">
                                Добавить
                            </NavLink>
                            <TransactionsIncome />
                        </TabPanel>
                    </Tabs>
                </AppWrap>
            </Mobile>
        </AppWrap>
    );
};

export default TransactionsPage;
