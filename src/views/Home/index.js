import React, { Component } from 'react'
import { NavBar } from '../../components'
import trim from 'trim';
import { Button } from 'react-bootstrap'
import { db } from '../../firebase'
import {
    Spinner,
} from 'react-bootstrap';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.idCount = 0;
        this.state = {
            data: [],
            dataRef: [],
            isLoading: false,
            id: '',
            name: '',
            address: '',
            time: '',
            order: '',
            lastId: '',
            isEdit: false,
            idToEdit: '',
        }
    }
    onSubmit = async () => {
        const { data } = this.state;
        await db.collection('test').doc(data ? this.state.lastId + 1 + '' : '0').set({
            id: this.state.lastId + 1,
            name: this.state.name,
            address: this.state.address,
            time: this.state.time,
            order: this.state.order,
        })
        this.getData();
    }
    getData = async () => {
        this.setState({ isLoading: true })
        await db.collection('test').get()
            .then(async querySnapshot => {
                console.log('get')
                const data = await querySnapshot.docs.map(doc => doc.data());
                // console.log(data);
                this.setState({ data, isLoading: false, isLoading: false, dataRef: data });
                const sortedData = this.state.dataRef.sort((a, b) => {
                    if (this.state.dataRef)
                        return a.id - b.id
                    else return []
                })
                let lastId;
                if (!!sortedData.length) {
                    lastId = sortedData[sortedData.length - 1].id
                }
                else
                    lastId = 0
                this.setState({ lastId })

            })
    }
    onDelete = async (id) => {
        await db.collection('test').doc(id + '').delete()
        await this.getData();
    }
    componentDidMount = async () => {
        await this.getData()
    }
    renderTable = () => {
        const tempData = this.state.data.sort((a, b) => {
            return a.id - b.id;
        })
        return tempData.map((e, i) => {
            return <div key={i} style={{ width: '100%', display: 'flex', flexDirection: 'row', marginTop: 8 }}>
                <div style={{ width: '14%' }}>{e.id}</div>
                <div style={{ width: '14%' }}>{e.name}</div>
                <div style={{ width: '14%' }}>{e.address}</div>
                <div style={{ width: '14%' }}>{e.time}</div>
                <div style={{ width: '14%' }}>{e.order}</div>
                <div id = "move1" style={{ width: '5%' }}>
                    <Button variant="outline-danger" onClick={() => this.onDelete(e.id)} disabled={this.state.isEdit}>
                        <i class ="fa fa-trash"></i>
                    </Button>
                </div>
                <div style={{ width: '0%' }}>
                    <Button variant="outline-warning" onClick={() => this.handleEdit(e)}>
                        <i class="fa fa-edit"></i>
                    </Button>
                </div>
            </div>
        })
    }

    handleEdit = (e) => {
        this.setState({
            name: e.name,
            address: e.address,
            time: e.time,
            order: e.order,
            isEdit: !this.state.isEdit,
            idToEdit: e.id,
        })

        if (this.state.isEdit) {
            this.setState({
                name: '',
                address: '',
                time: '',
                order: '',
                // idToEdit: ''
            })
        }
    }
    onEdit = async () => {
        await db.collection('test').doc(+this.state.idToEdit + '').set({
            id: this.state.idToEdit,
            name: this.state.name,
            address: this.state.address,
            time: this.state.time,
            order: this.state.order,
        })
        this.setState({
            isEdit: false,
            name: '',
            address: '',
            time: '',
            order: '',
            idToEdit: '',
        })
        this.getData();
    }
    render() {

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: 350, height: '100%', flexDirection: 'column', width: '100%' }}>
                {/* <div>lasted id is {this.state.lastId + 1}</div> */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '10%' }}>
                        {/* <input  /> */}
                    </div>
                    <div style={{ width: '18%' }}>
                        <input placeholder="Name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    </div>
                    <div style={{ width: '18%' }}>
                        <input placeholder="Address"  value={this.state.address} onChange={e => this.setState({ address: e.target.value })} />
                    </div>
                    <div style={{ width: '8%' }}>
                        <input placeholder="Time"  type="time" value={this.state.time} onChange={e => this.setState({ time: e.target.value })} />
                    </div>
                    <div style={{ width: '15%' }}>
                        <input placeholder="Order" value={this.state.order} onChange={e => this.setState({ order: e.target.value })} />
                    </div>

                    <div style={{ width: '12%' }}>

                        {
                            this.state.isLoading ?
                                <Button id ="butin" variant="primary">
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </Button>
                                :
                                <Button id ="butin" variant="primary" onClick={() => {
                                    this.state.isEdit ? this.onEdit() : this.onSubmit()
                                }}>
                                    {this.state.isEdit ? 'edit' : 'add'}
                                </Button>
                        }

                    </div>

                    <div style={{ width: '14%' }}></div>
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', marginTop: 31 }}>
                    <div id = "font" style={{ width: '14%' }}>id</div>
                    <div id = "font" style={{ width: '14%' }}>name</div>
                    <div id = "font" style={{ width: '14%' }}>address</div>
                    <div id = "font" style={{ width: '14%' }}>time</div>
                    <div id = "font" style={{ width: '14%' }}>order</div>
                    <div style={{ width: '14%' }}></div>
                    <div style={{ width: '14%' }}></div>
                </div>
                <div style={{ height: 1, backgroundColor: 'grey', width: '100%', marginRight: 100, marginTop: 16, marginBottom: 16 }}></div>
                <div style={{ width: '100%' }}>
                    {this.renderTable()}
                </div>
            </div>
        )
    }
}
