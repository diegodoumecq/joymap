import ReactDOM from 'react-dom';
import React from 'react';
import './main.styl';

import { startConsole, stopConsole } from './examples/DevConsole';
import HtmlConsole from './examples/HtmlConsole.jsx';
import Display from './examples/Display.jsx';

class App extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            option: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (event.currentTarget.value !== this.state.value) {
            this.setState({ option: event.currentTarget.value });
        }
    }

    getComponent() {
        switch(this.state.option) {
            case 'display': return <Display />; break;
            case 'devConsole': return <h2>Look at the dev console while using gamepad</h2>; break;
            case 'htmlConsole': return <HtmlConsole />; break;
        }

        return <h2>Choose an option</h2>;
    }

    render() {
        const { option } = this.state;

        if (option === 'devConsole') {
            startConsole();
        } else {
            stopConsole();
        }

        return (
            <article className="container">
                <header>
                    Examples:
                    <select value={option} onChange={this.handleChange}>
                        <option value=""> Select an Option </option>
                        <option value="display"> HUD Display </option>
                        <option value="devConsole"> Dev Console </option>
                        <option value="htmlConsole"> HTML Console </option>
                    </select>
                </header>
                {this.getComponent()}
            </article>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
