import React, { Component } from 'react'
import { connect } from "react-redux"


class TableTickets extends Component {

    handleOnChage = (event) => {
        const { selectSeats } = this.props
        console.log(event.target.value)
        console.log(selectSeats)

        if (!selectSeats.includes(event.target.value)) {
            this.props.listChoise(event.target.value, event)
        }
    }


    renderGhe = () => {
        const { item, isDisabled } = this.props
        return item.danhSachGhe.map((item, index) => {
            return <td key={index}>
                <button disabled={isDisabled} className='btn btn-warning btnSeat' value={item.soGhe} key={index} onClick={this.handleOnChage}>
                    {item.soGhe}
                </button>
            </td>
        })
    }


    render() {
        const { item } = this.props
        return <tr>

            <td>
                {item.hang}
            </td>
            {this.renderGhe()}
        </tr>

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        listChoise: (list, event) => {
            const action = {
                type: 'CHOISE',
                payload: list, event
            };
            dispatch(action)
        },

    }
}


const mapStateToProps = (state) => {
    return {
        isDisabled: state.ticketsReducer.isDisabled,
        selectSeats: state.ticketsReducer.selectSeats,
        classButton: state.ticketsReducer.classButton
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableTickets)