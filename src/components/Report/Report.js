import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ReportContainer } from "./Report.styled";
import ReportCosts from "../ReportCosts/ReportCosts";
import ReportIncome from "../ReportIncome/ReportIncome";

function Report({ dateMonth, dateYears, categoriesCosts, categoriesIncome }) {
  return (
    <ReportContainer>
      <Switch>
        <Route path={`/reports/costs`}>
          <ReportCosts
            categoriesCosts={categoriesCosts}
            dateMonth={dateMonth}
            dateYears={dateYears}
          />
        </Route>
        <Route path={`/reports/income`}>
          <ReportIncome
            categoriesIncome={categoriesIncome}
            dateMonth={dateMonth}
            dateYears={dateYears}
          />
        </Route>
        <Redirect to="/reports/costs" />
      </Switch>
    </ReportContainer>
  );
}

export default Report;
