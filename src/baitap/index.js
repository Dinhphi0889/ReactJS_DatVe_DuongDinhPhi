import React, { Component, useState } from 'react'
import { connect } from "react-redux"
import TableTickets from './tableTickets';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

class Index extends Component {

    renderHang = () => {
        const { renderSeat } = this.props;
        // const arrCot = Object.entries(renderSeat[0].cot)
        // for (let i = 0; i < arrCot.length; i++) {
        // }
        return renderSeat.map((item, index) => {
            return <TableTickets
                key={index}
                item={item} />

        })
    }
    renderSoGhe = () => {
        const { renderSeat } = this.props;
        let num = []
        const arr = Object.entries(renderSeat[0].danhSachGhe)
        for (let i = 0; i < arr.length; i++) {
            num.push(arr[i][1].soGhe)
        }
        return num.map((number, index) => {
            return <td key={index}>
                {number}
            </td>
        })
    }


    handleOnChange = (event) => {
        this.props.changeDisabled(false, event)

    }


    render() {
        const { isDisabled, isDisabledInput,confirmSeats } = this.props
        return (
            <div className='container'>
                <div className='show'>

                    <h1 className='text-center' style={{ color: 'white' }}>
                        MOVIE SEAT SELECTION
                    </h1>
                    {/* Nhập tên và số ghế */}
                    <div className='info'>
                        <div className='item'>
                            <label className='lb'>Name (*)</label>
                            <input disabled={isDisabledInput} id='inputName' type='text'></input>
                        </div>
                        <div className='item'>
                            <label className='lb'>Number Of Seat (*)</label>
                            <input disabled={isDisabledInput} id='inputNumOfSeat' type='number'></input>
                        </div>
                    </div>
                    {/* Button */}
                    <div className='btnCustom'>
                        <button className='btnStartSelection btn btn-warning' onClick={this.props.changeDisabled}>Start Selecting</button>

                        <input disabled={true} id='seatSelect' type='input'></input>


                        <button className='btnResetSelection btn btn-success' disabled={isDisabled} onClick={this.props.resetChoise}>Reset Selecting</button>
                    </div>

                    {/* Bảng hiển thị số ghế */}
                    <table id='tableSelect'>
                        <tbody id='renderSeats'>
                            <tr>
                                {this.renderSoGhe()}
                            </tr>
                            <>
                                {this.renderHang()}
                            </>
                        </tbody>
                    </table>
                    {/* Bảng hiển thị thông tin, số ghế đã chọn */}

                    <div className='btnConfirm btnCustom'>
                        <button className='btn btn-success' onClick={confirmSeats}>Confirm Selection</button>
                    </div>

                    <div className='showInfo'>
                        <table id='tableShowInfo'>
                            <tbody id='bodyShowInfo'>
                                <tr>
                                    <th>Name</th>
                                    <th>Number Of Seats</th>
                                    <th>Seats</th>
                                </tr>
                                <tr >
                                    <td>
                                        <textarea readOnly id='showName' style={{
                                            textAlign: 'center',
                                        }}></textarea>
                                    </td>
                                    <td>
                                        <textarea readOnly id='showNumOfSeats' style={{
                                            textAlign: 'center',
                                        }}></textarea>
                                    </td>
                                    <td>
                                        <textarea readOnly id='showSeats' style={{
                                            textAlign: 'center',
                                        }}></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeDisabled: (event) => {
            const action = {
                type: 'CHANGE_DISABLED',
                payload: false, event,
            };
            dispatch(action)
        },

        confirmSeats: (seats) => {
            const action = {
                type: 'COMFIRM_SEATS',
                payload: seats,
            }
            dispatch(action)
        },
        resetChoise: () => {
            const action = {
                type: 'RESET_CHOISE',
                payload: false,
            }
            dispatch(action)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        renderSeat: state.ticketsReducer.tickets,
        isDisabled: state.ticketsReducer.isDisabled,
        selectSeats: state.ticketsReducer.selectSeats,
        isDisabledInput: state.ticketsReducer.isDisabledInput,
        info: state.ticketsReducer.info,
        error: state.ticketsReducer.error
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)