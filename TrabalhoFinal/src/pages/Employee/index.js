import React, { Component } from "react";
import Listar from "./listagem.js"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import api from "../../services/api";


export default class Employee extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: '',
         salary: '',
         age: '',
         avatar: ''
      };
   }

   handleChange = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
   }

   handleSubmit = (event) => {
      let data = JSON.stringify(this.state);
      console.log(data);
      
      api.post("create", data).then(response => {
         console.log(response);
      });
      event.preventDefault();
   }

   render() {
      return (
         <>
         <Container className="d-flex flex-column justify-content-center align-items-center pt-3">
            <Form onSubmit={this.handleSubmit}>
               <Form.Group>
                  <Form.Label >Nome</Form.Label>
                  <Form.Control type="text" name="name"  placeholder="Nome" onChange={this.handleChange} value={this.state.name}/>
               </Form.Group>

               <Form.Row>
                  <Form.Group as={Col}>
                     <Form.Label >Salário</Form.Label>
                     <Form.Control type="number" min="1" step="any" name="salary" placeholder="Salário" onChange={this.handleChange} value={this.state.salary}/>
                  </Form.Group>
                  <Form.Group as={Col}>
                     <Form.Label >Idade</Form.Label>
                      <Form.Control type="number" min="1" step="any" placeholder="Idade" name="age" onChange={this.handleChange} value={this.state.age}/>
                  </Form.Group>
               </Form.Row>

               <Form.Group>
                  <Form.Label >Avatar</Form.Label>
                  <Form.Control type="text" placeholder="Avatar" name="avatar" onChange={this.handleChange} value={this.state.avatar}/>
               </Form.Group>
               
               <Button type="submit" className="mr-5" variant="primary">
                 Salvar</Button>
               <Button type="button" id="btnCancelar" className="mx-5" variant="danger">
                  Cancelar
               </Button>
            </Form>
         </Container>
         <Listar/>
         </>
      );
   }
}