import { Route, Switch,HashRouter } from "react-router-dom";
import React, { Component } from "react";
import App from './App';


class Routers extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={App}/>
                </Switch>
            </HashRouter>
        );
    }
}
export default (Routers);
