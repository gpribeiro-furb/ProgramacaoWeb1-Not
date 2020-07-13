import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import api from "../../services/api";
import Swal from "sweetalert2";

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      salary: "",
      age: "",
      avatar: "",

      employees: [],
      acessandoApi: true,
      mostrarModalEdicao: false,
      // employeeAlteracao: {
      id: "",
      employee_name: "",
      employee_salary: 0,
      employee_age: 0,
      profile_image: "",
      // },
    };
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let data = JSON.stringify(this.state);
    api
      .post("create", data)
      .then((response) => {
        if (response.status == 200) {
          var novoEmpregadoRetornadoApi = response.data.data;
          var novoEmpregado = {
            id: novoEmpregadoRetornadoApi.id,
            employee_name: novoEmpregadoRetornadoApi.name,
            employee_salary: novoEmpregadoRetornadoApi.salary,
            employee_age: novoEmpregadoRetornadoApi.age,
            profile_image: novoEmpregadoRetornadoApi.profile_image,
          };
          this.setState({
            employees: this.state.employees.concat(novoEmpregado),
          });
          Swal.fire("Sucesso!", "Empregado cadastrado com sucesso!", "success");
        }
      })
      .catch((error) => {
        Swal.fire("Ooops :(", `${error}`, "error");
      });
  };

  handleSubmitAlteracao = (event) => {
    event.preventDefault();
    var employeeEditar = {
      id: this.state.id,
      name: this.state.employee_name,
      salary: this.state.employee_salary,
      age: this.state.employee_age,
      profile_image: this.state.profile_image,
    };
    console.log(employeeEditar);
    api.put(`update/${employeeEditar.id}`, employeeEditar).then((response) => {
      console.log(response);
    });
  };

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
          this.setState({
            employees: this.state.employees.filter(function (employee) {
              return employee.id !== idEmployeeRemover;
            }),
          });

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
      this.setState({
        id: response.data.data.id,
        employee_name: response.data.data.employee_name,
        employee_salary: response.data.data.employee_salary,
        employee_age: response.data.data.employee_age,
        profile_image: response.data.data.profile_image,
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
      //alteracao employee abaixo
      id,
      employee_name,
      employee_salary,
      employee_age,
      profile_image,
    } = this.state;
    if (acessandoApi) {
      return <h1>Carregando...</h1>;
    } else {
      return (
        <>
          <Container className="d-flex flex-column justify-content-center align-items-center pt-3">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Nome"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Salário</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    step="any"
                    name="salary"
                    placeholder="Salário"
                    onChange={this.handleChange}
                    value={this.state.salary}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Idade</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    step="any"
                    placeholder="Idade"
                    name="age"
                    onChange={this.handleChange}
                    value={this.state.age}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Avatar"
                  name="avatar"
                  onChange={this.handleChange}
                  value={this.state.avatar}
                />
              </Form.Group>

              <Button type="submit" className="mr-5" variant="primary">
                Salvar
              </Button>
              <Button
                type="button"
                id="btnCancelar"
                className="mx-5"
                variant="danger"
              >
                Cancelar
              </Button>
            </Form>
          </Container>
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
          <Modal show={mostrarModalEdicao} onHide={this.handleCloseModalEditar}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmitAlteracao}>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="employee_name"
                    placeholder="Nome"
                    onChange={this.handleChange}
                    value={this.state.employee_name}
                  />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Salário</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      step="any"
                      name="employee_salary"
                      placeholder="Salário"
                      onChange={this.handleChange}
                      value={this.state.employee_salary}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Idade</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      step="any"
                      placeholder="Idade"
                      name="employee_age"
                      onChange={this.handleChange}
                      value={this.state.employee_age}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group>
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Avatar"
                    name="profile_image"
                    onChange={this.handleChange}
                    value={this.state.profile_image}
                  />
                </Form.Group>

                <Button type="submit" variant="primary">
                  Salvar
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseModalEditar}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
}
