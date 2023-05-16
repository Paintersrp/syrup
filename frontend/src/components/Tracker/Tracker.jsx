import React, { useState } from "react";

import Content from "../../framework/Base/Containers/Content/Content";
import Flexer from "../../framework/Base/Flexer/Flexer";
import Summary from "./components/Summary/Summary";
import TrackerItem from "./components/TrackerItem/TrackerItem";

const initialData = { name: "", amount: 0 };

const Tracker = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [incomeData, setIncomeData] = useState(initialData);
  const [expenseData, setExpenseData] = useState(initialData);

  const handleAddIncome = () => {
    const newIncomes = [...incomes];
    newIncomes.push(incomeData);
    setIncomes(newIncomes);
    setIncomeData(initialData);
  };

  const handleAddExpense = () => {
    const newExpenses = [...expenses];
    newExpenses.push(expenseData);
    setExpenses(newExpenses);
    setExpenseData(initialData);
  };

  return (
    <Content
      maxWidth={1000}
      header="Financial Tracker"
      headerVar="h2"
      boxShadow={0}
      pad={3}
      pt={1.5}
      pb={0}
      j="center"
      a="center"
      divider
    >
      <Flexer a="fs">
        <Flexer w="50%">
          <TrackerItem
            setData={setIncomeData}
            data={incomeData}
            dataArray={incomes}
            headerText="Incomes"
            buttonText="Add Income"
            addClick={handleAddIncome}
            position="left"
          />
        </Flexer>
        <Flexer w="50%">
          <TrackerItem
            setData={setExpenseData}
            data={expenseData}
            dataArray={expenses}
            headerText="Expenses"
            buttonText="Add Expense"
            addClick={handleAddExpense}
            position="right"
          />
        </Flexer>
      </Flexer>

      <Summary incomes={incomes} expenses={expenses} />
    </Content>
  );
};

export default Tracker;
