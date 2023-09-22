import React, { Component } from "react";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: '',
            sortTitle: '',
            idSortDown: false,
            currentPage: 1,
            rowPage: 5,
            totalPage: 1,
            maxRow: 0,
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props !== prevProps
        ) {
            this.handListData()
        }
    }

    handListData = () => {
        let copylistData = this.props.listData
        let rowPage = this.state.rowPage
        let listData = copylistData && copylistData.length > 0 ? copylistData.filter(this.getFilter) : {}
        this.setState({
            listData: listData,
            maxRow: listData ? listData.length : 0,
            totalPage: listData ? Math.ceil(listData.length / rowPage) : 1,
        })
    }

    sortList = (key) => {
        let sortTitle = this.state.sortTitle
        let sortList = ''
        if (key === sortTitle) {
            sortList = this.sortDown(key)
        } else {
            sortList = this.sortUp(key)
        }
        this.setState({
            listData: sortList
        })
    }

    sortUp = (key) => {
        let copylistData = ''
        copylistData = [...this.state.listData].sort((a, b) =>
            a[key] > b[key] ? 1 : -1
        )
        this.setState({
            idSortDown: false,
            sortTitle: key
        })
        return copylistData;
    }

    sortDown = (key) => {
        let copylistData = ''
        let keyDown = key
        if (this.state.idSortDown) {
            keyDown = 'id'
            return this.sortUp(keyDown)
        } else {
            copylistData = [...this.state.listData].sort((a, b) =>
                a[keyDown] < b[keyDown] ? 1 : -1
            )
        }
        this.setState({
            idSortDown: true,
            sortTitle: keyDown
        })
        return copylistData;
    }

    setClassSort = (title, isDown) => {
        let { sortTitle, idSortDown } = this.state
        if (isDown) {
            if (sortTitle === title && idSortDown) {
                return "select fas fa-long-arrow-alt-down"
            }
            return "fas fa-long-arrow-alt-down"
        } else {
            if (sortTitle === title && !idSortDown) {
                return "select fas fa-long-arrow-alt-up"
            }
            return "fas fa-long-arrow-alt-up"
        }
    }

    getFilter = (data) => {
        let filterKey = this.props.filterKey
        let arrValue = this.props.arrValue
        if (filterKey.trim() === '') {
            return data
        } else {
            for (let i = 1; i < arrValue.length; i++) {
                if (data[arrValue[i]]) {
                    if (data[arrValue[i]].includes(filterKey.trim())) {
                        return true
                    }
                }
            }
        }
        return false
    }

    setPage = (event) => {
        let { currentPage, totalPage } = this.state
        switch (event) {
            case 'next':
                ++currentPage
                break;
            case 'prev':
                --currentPage
                break;
            case 'first':
                currentPage = 1
                break;
            default:
                currentPage = totalPage
                break;
        }
        this.setState({
            currentPage: currentPage
        })
    }

    setRow = (event) => {
        let { maxRow, currentPage } = this.state
        if (maxRow === 0) {
            return this.setState({
                rowPage: event,
                totalPage: 0,
                currentPage: 0
            })
        }
        if (event * currentPage > maxRow) {
            this.setState({
                rowPage: event,
                totalPage: Math.ceil(maxRow / event),
                currentPage: Math.ceil(maxRow / event)
            })
        } else {
            this.setState({
                rowPage: event,
                totalPage: Math.ceil(maxRow / event)
            })
        }
    }

    render() {
        let { listData, currentPage, rowPage, maxRow, totalPage } = this.state;
        let minRowPage = (currentPage - 1) * rowPage + 1
        let maxRowPage = currentPage * rowPage > maxRow ? maxRow : (currentPage * rowPage)
        let { arrLabel, arrValue } = this.props
        // let arrValue = ['id', 'email', 'firstName', 'lastName', 'address']
        // let arrLabel = ['ID', 'Email', 'First Name', 'Last Name', 'Address']
        return (
            <div className="col-12">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            {arrLabel && arrLabel.length > 0 ?
                                arrLabel.map((item, index) => {
                                    if (index !== 0) {
                                        return (
                                            <th className="sortList" key={index}
                                                onClick={() => this.sortList(arrValue[index])}>
                                                <span>{item}</span>
                                                <i className={this.setClassSort(arrValue[index], true)}></i>
                                                <i className={this.setClassSort(arrValue[index], false)}></i>
                                            </th>
                                        )
                                    } else {
                                        return (
                                            <th key={index}>{item}</th>
                                        )
                                    }
                                })
                                : {}}
                            <th>Show</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listData && listData.length > 0 && arrLabel && arrLabel.length > 0 && arrValue && arrValue.length > 0 ?
                            listData.map((item, index) => {
                                if ((minRowPage - 1) <= index || index <= maxRowPage) {
                                    return (
                                        <tr key={item[arrValue[0]]}>
                                            <td>{item.idList}</td>
                                            {arrValue.map((arrItem, arrIndex) => {
                                                if (arrIndex !== 0) {
                                                    return (
                                                        <td key={arrIndex}>{item[arrItem]}</td>
                                                    )
                                                }
                                            })}
                                            <td className="show"><input type="checkbox" name="show"
                                                defaultChecked={item.show}
                                                onClick={() => this.props.show(item.id)}
                                            />
                                            </td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.props.edit(item.id)}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button className="btn-delete" onClick={() => this.props.delete(item.id)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                            : null
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="7">
                                <div className="page-controll col-12 row">
                                    <div className="Row-dropdown col-3 row">
                                        <span className="col-8">Rows per page:</span>
                                        <div className="box-row col-4">
                                            <span>{rowPage === maxRow ? 'All' : rowPage}<i className="fas fa-caret-down"></i></span>
                                            <div className="content-dropdown">
                                                <div onClick={() => this.setRow(5)}><span>5</span></div>
                                                <div onClick={() => this.setRow(10)}><span>10</span></div>
                                                <div onClick={() => this.setRow(25)}><span>25</span></div>
                                                <div onClick={() => this.setRow(maxRow)}><span>All</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-number">
                                        <span>{maxRow === 0 ? 0 : minRowPage}<span> - </span>
                                            {maxRowPage}
                                            <span> of </span>{maxRow}
                                        </span>
                                    </div>
                                    <div className="chance-page">

                                        <button onClick={() => this.setPage('first')}
                                            disabled={currentPage <= 1 ? true : false}>
                                            <i className="fas fa-angle-double-left"></i>
                                        </button>
                                        <button onClick={() => this.setPage('prev')}
                                            disabled={currentPage <= 1 ? true : false}>
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                        <button onClick={() => this.setPage('next')}
                                            disabled={currentPage >= totalPage ? true : false}>
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                        <button onClick={() => this.setPage('last')}
                                            disabled={currentPage >= totalPage ? true : false}>
                                            <i className="fas fa-angle-double-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default Table