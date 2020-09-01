import { Route, Switch,HashRouter } from "react-router-dom";
import React, { Component } from "react";
import App from './App';
import Lazyload from './lazyload';


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
                    <Route path='/lazy' component={Lazyload}/>
                </Switch>
            </HashRouter>
        );
    }
}
export default (Routers);
