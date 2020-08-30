import React from "react";
import { withRouter } from "react-router-dom";
import "./App.css";

class Appp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchTarget: '',
            mobilenumber : '',
            name:''
        };

    }

    componentDidMount() {
        fetch(`http://localhost:3002/getreviews`,{
         method: 'GET', 
         headers: {
            'Content-Type': 'application/json'
        }
        }).then((response) =>
            response.json()
        ).then((res) => res.success === true ? this.setState({
            matchTarget: res.data
        }) : null)
    }

    setData = (e) => {
        this.setState({
            name: e.currentTarget.cells['name'].innerText,
            mobilenumber: e.currentTarget.cells['mobilenumber'].innerText,
            id: e.currentTarget.cells['id'].innerText
        })

    }


    createUuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    insertCheck = (e) => {
        if (this.state.name && this.state.mobilenumber) {
            var id = this.createUuid()
            fetch(`http://localhost:3002/insertdata`, {
                method: 'POST',
                body: JSON.stringify({ id: id, name: this.state.name, mobilenumber: this.state.mobilenumber }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json()).then(res =>
                this.setState({
                    matchTarget: res.tabledata,
                    name: '',
                    mobilenumber: ''
                })
            );
        }
        else {
            alert("Data insufficient");
        }
    }

    updateCheck = (e) => {
        if (this.state.name && this.state.mobilenumber) {
            fetch(`http://localhost:3002/updatedata`, {
                method: 'POST',
                body: JSON.stringify({ name: this.state.name, mobilenumber: this.state.mobilenumber, id: this.state.id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json()).then(res =>
                this.setState({
                    matchTarget: res.tabledata,
                    name: '',
                    mobilenumber: ''
                })
            );
        } else {
            alert("Data insufficient");
        }
    }

    deleteCheck = (e) => {
        if (this.state.id) {
            fetch(`http://localhost:3002/deletedata`, {
                method: 'POST',
                body: JSON.stringify({ id: this.state.id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json()).then(res =>
                this.setState({
                    matchTarget: res.tabledata,
                    name: '',
                    mobilenumber: ''
                })
            );
        } else {
            alert("Data insufficient");
        }
    }



    name = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    mobilenumber = (e) => {
        this.setState({
            mobilenumber: e.target.value
        })
    }




    render() {
        console.log(this.state.matchTarget)
        return (
            <React.Fragment>
                <div>
                    <div style={{ backgroundColor: 'linen', height: '100vh' }}>
                    <h1>React and Node CRUD Application</h1>
                        <div style={{ display: 'flex' }}>
                            <div className='nameTag'>Name : </div>
                            <div className='namedivm'><input className='inputtype' type='text' id='name' onChange={this.name} value={this.state.name}></input></div>
                            <div className='sumlabel'>Mobile Number : </div>
                            <div className='namedivm'><input className='sumText' type='number' id='summary' onChange={this.mobilenumber} value={this.state.mobilenumber}></input></div>
                        </div>
                        <ul className='buttonTag'>
                            <li><button onClick={this.insertCheck}>Insert</button></li>
                            <li><button onClick={this.updateCheck}>Update</button></li>
                            <li><button onClick={this.deleteCheck}>Delete</button></li>
                        </ul>
                        <table id='student-table'>
                            <th>Name</th>
                            <th>Mobile Number</th>
                            <tbody>
                              
                                {this.state.matchTarget ? this.state.matchTarget.map((res) =>
                                    <tr onClick={this.setData} style={{ cursor: 'pointer' }} key={res.id}><td id='name'>{res.name}</td>
                                        <td id='mobilenumber'>{res.mobilenumber}</td><td id='id' hidden={true}>{res.id}</td></tr>
                                    )
                                    : null
                                }
            
                            </tbody>
                        </table>
                    </div>

                </div>
            </React.Fragment>
        );
    }

}
export default withRouter(Appp);
