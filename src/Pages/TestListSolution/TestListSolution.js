import React, { Component } from 'react'
import { Container, Dropdown } from 'react-bootstrap'

// import './TestList.css'

import TestsListSolutionEl from '../../Components/TestSolution/TestsListSolutionEl'


export default class TestList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            testsList: []
        }
    }

    componentDidMount() {
        this.loadList()
    }

    loadList = () => {
        fetch("http://testrf-api.tmweb.ru/api/v1/tests/", {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.updateList(data.data);
            });
    }

    updateList = (data) => {
        this.setState((testsList) => {
            return { testsList: data }
        })
    }

    render() {
        return (
            <Container>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название теста</th>
                            <th scope="col">Тема</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Количество вопросов</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TestsListSolutionEl
                            updateList={this.loadList}
                            testsList={this.state.testsList} />
                    </tbody>
                </table>
            </Container>
        )
    }
}
