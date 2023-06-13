import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (
            this.props.location.pathname !== prevProps.location.pathname
        ) {
            window.scroll({
                top: 0,
                behavior: 'auto'
            });
        }
    }

    render() {
        console.log(this.props.history)
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
// import React, { useEffect, Fragment } from 'react';
// import { withRouter } from 'react-router-dom';

// function ScrollToTop({ history, children }) {
//     useEffect(() => {
//         const unlisten = history.listen((location, action) => {
//             if (action !== 'POP') {
//                 window.scrollTo(0, 0)
//             }
//         })
//         return () => unlisten()
//     }, [])

//     return <Fragment>{children}</Fragment>;
// }

// export default withRouter(ScrollToTop);