import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import api from "../../services/api";
export default class Listar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      acessandoApi: true,
      novoEmpregado: null
    };
  }

  async componentDidMount() {
    const response = await api.get("employees");
    this.setState(prevState => ({
      acessandoApi: false,
      employees: response.data.data
    }));
  }

  render() {
    const { acessandoApi, employees } = this.state;
    if (acessandoApi) {
      return <h1>Carregando...</h1>;
    } else {
      return (
        <>
          {/* id, employee_name, employee_salary, employee_age, profile_image */}
          <table className="table table-sm mt-5">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nome</th>
                <th scope="col">Salário</th>
                <th scope="col">Idade</th>
                <th scope="col">Avatar</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(empl => (
                <tr key={empl.id}>
                  <td>{empl.id}</td>
                  <td>{empl.employee_name}</td>
                  <td>{empl.employee_salary}</td>
                  <td>{empl.employee_age}</td>
                  <td>{empl.profile_image}</td>
                  <td>
                    <Button type="button" variant="warning" size="sm">
                      Editar
                    </Button>

                    <Button
                      className="ml-1"
                      type="button"
                      variant="danger"
                      size="sm"
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
  }
}
