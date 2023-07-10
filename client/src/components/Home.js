import React from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import *as actions from '../store/actions/index'

class Home extends React.Component {

    componentDidMount() {
        // setTimeout(() => {
        //     this.props.history.push('/todo')
        // }, 3000)
    }

    //HOC: higher order component

    handleDeleteUser = (user) => {
        console.log('>>> check user delete: ', user)
        this.props.deleteUserRedux(user);
    }

    handleCreateUser = () => {
        this.props.addUserRedux();
    }

    render() {
        console.log('>>> check props redux ', this.props.dataRedux)
        let listUsers = this.props.dataRedux;

        return (
            <>
                <div>
                    Hello world from Homepage with Eric & Hoi Dan IT
                </div>
                <div>
                    {listUsers && listUsers.length > 0 &&

                        listUsers.map((item, index) => {
                            return (
                                <div key={item.id}>
                                    {index + 1} - {item.name}
                                    &nbsp; <span onClick={() => this.handleDeleteUser(item)}>x</span>
                                </div>
                            )
                        })
                    }
                    <button onClick={() => this.handleCreateUser()}>Add new</button>


                </div>
            </>
        )
    }
}

// export default withRouter(Home);

const mapStateToProps = (state) => {
    return {
        dataRedux: state.home.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUserRedux: (userDelete) => dispatch({ type: 'DELETE_USER', payload: userDelete }),
        addUserRedux: () => dispatch(actions.addUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
