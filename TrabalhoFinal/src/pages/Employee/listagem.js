import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../services/api";
import Swal from "sweetalert2";

export default class Listar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      acessandoApi: true,
      novoEmpregado: null,

      mostrarModalEdicao: false,
      idEmployeeAlteracao: 0,
      employeeAlteracao: {
        id: "",
        employee_name: "",
        employee_salary: 0,
        employee_age: 0,
        profile_image: null,
      },
    };
  }

  async componentDidMount() {
    const response = await api.get("employees");
    this.setState((prevState) => ({
      acessandoApi: false,
      employees: response.data.data,
      mostrarModalEdicao: false,
      nome: "",
    }));
  }

  handleClickExcluir = (event) => {
    var idEmployeeRemover = event.target.getAttribute("employee-id");
    Swal.fire({
      title: "Você tem certeza que deseja excluir o empregado?",
      text: "Não será possível reverter esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, desejo remover!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        api.delete(`delete/${idEmployeeRemover}`).then((response) => {
          Swal.fire("Sucesso!", "Empregado removido com sucesso.", "success");
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Operação cancelada.", "", "info");
      }
    });
  };

  handleClickEditar = (event) => {
    var idEmployeeAlteracao = event.target.getAttribute("employee-id");
    this.setState({
      mostrarModalEdicao: true,
      idEmployeeAlteracao: idEmployeeAlteracao,
    });
    api.get(`employee/${idEmployeeAlteracao}`).then((response) => {
      console.log(response.data.data);
      this.setState({
        employeeAlteracao: response.data.data,
      });
    });
  };

  handleCloseModalEditar = (event) =>
    this.setState({ mostrarModalEdicao: false });

  render() {
    const {
      acessandoApi,
      employees,
      mostrarModalEdicao,
      employeeAlteracao,
    } = this.state;

    if (acessandoApi) {
      return <h1>Carregando...</h1>;
    } else {
      return (
        <>
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
              {employees.map((empl) => (
                <tr key={empl.id}>
                  <td>{empl.id}</td>
                  <td>{empl.employee_name}</td>
                  <td>{empl.employee_salary}</td>
                  <td>{empl.employee_age}</td>
                  <td>{empl.profile_image}</td>
                  <td>
                    <Button
                      type="button"
                      variant="warning"
                      size="sm"
                      employee-id={empl.id}
                      onClick={this.handleClickEditar}
                    >
                      Editar
                    </Button>

                    <Button
                      className="ml-1"
                      type="button"
                      variant="danger"
                      size="sm"
                      employee-id={empl.id}
                      onClick={this.handleClickExcluir}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal show={mostrarModalEdicao}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {employeeAlteracao.id}
              {employeeAlteracao.employee_name}
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseModalEditar}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
}
