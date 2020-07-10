import React, { Component } from "react";
import api from "../../services/api";
export default class Listar extends Component {
  constructor(props) {
     super(props);
     this.state = {
        employees : [],
        acessandoApi: true,
     };
  }

  async componentDidMount() {
    const response = await api.get("employees");
    this.setState(prevState => ({
     acessandoApi : false,
     employees: response.data.data
    }));
  }

  render() {
    const {acessandoApi, employees} = this.state;

    if (acessandoApi) {
      return <h1>Carregando...</h1>;
    } else {
    return (
      <>
        <h1>Merece</h1>
      </>
      );
    }
  }
}