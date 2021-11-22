import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Calendar from "../Calendar/Calendar";
import CategoryInput from "../CategoryInput/CategoryInput";
import { Form, Wrapper, FormInput, FormBtn, InputAmount, InputDesc, ButtonOrange,Button } from "./TransactionsIncForm.styled";
import * as transactionstOperations from "../../redux/transactions/transactions-ops";
import * as authOps from "../../redux/auth/auth-operations";
import { authSelectors } from "../../redux/auth/auth-selectors"
import { setStartedDate } from "../../redux/transactions/transactions-slice";

const TransactionsIncForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [typeTransaction, setTypeTransaction] = useState("");
    const currentBalance = useSelector(authSelectors.getCurrentBalance);
    const dispatch = useDispatch();

    const reset = () => {
    setStartDate(new Date());
    setCategory("");
    setCategoryId("");
    setDescription("");
    setValue("");
    setTypeTransaction("");
    };
    
    const addIncome = (e) => {
        e.preventDefault();
    const date = {
        day: startDate.getDate(),
        month: startDate.getMonth() + 1,
        year: startDate.getFullYear()
    }
    dispatch(transactionstOperations.addIncTransaction({ typeTransaction, date, description, category, categoryId, value }))
    setTimeout(() => {
        dispatch(authOps.changeBalance({balance: currentBalance}));
      }, 500)
        reset();
    };

    return (
        <Form onSubmit={addIncome} >
            <Wrapper>
                <Calendar
                    required
                    selectedDate={startDate}
                    handleChange={(date) => setStartDate(date)}
                    onChange={dispatch(setStartedDate(startDate))} 
                    maxDate={startDate}
                />
                <FormInput>
                    <InputDesc
                        required
                        type="text"
                        autoComplete="off"
                        placeholder="Описание дохода"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <CategoryInput
                        required
                        type="Incomes"
                        name="category"
                        categoryPick={category}
                        setCategory={setCategory}
                        setCategoryId={setCategoryId}
                        setTypeTransaction={setTypeTransaction}
                    />
                    <InputAmount
                        required
                        pattern="\d+(\.\d{1-2})?"
                        title="Введите сумму в формате 00.00"
                        type="text"
                        autoComplete="off"
                        placeholder="0,00"
                        value={value}
                        onChange={(e) => setValue(e.target.value)} 
                    />
                </FormInput>
                <FormBtn>
                    <ButtonOrange
                        type="submit"
                        onSubmit={addIncome}
                    >
                        Ввод
                    </ButtonOrange>
                    <Button
                        type="reset"
                        onClick={reset}
                    >
                        Очистить
                    </Button>
                </FormBtn>
            </Wrapper>
        </Form>
    );
};

export default TransactionsIncForm;