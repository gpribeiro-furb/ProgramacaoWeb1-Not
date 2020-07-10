import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

 import Employee from "./pages/Employee/";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Employee} />
        {/* <Route path="/fornecedores/:idEmpresa" component={Fornecedor} /> */}
      </Switch>
    </BrowserRouter>
  );
}