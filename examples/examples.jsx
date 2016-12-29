import ReactDOM from 'react-dom';
import React from 'react';

import { startConsole, stopConsole } from './DevConsole/DevConsole';
import Movement from './Movement/Movement.jsx';
import Display from './HTML/Display.jsx';

import './main.styl';

const PAGES = {
    None: '',
    Display: 'display',
    DevConsole: 'devConsole',
    Movement: 'movement'
};

class App extends React.Component {

    state = {
        option: PAGES.None
    };

    handleChange = event => {
        if (event.target.value !== this.state.option) {
            if (event.target.value === PAGES.DevConsole) {
                startConsole();
            } else {
                stopConsole();
            }

            this.setState({ option: event.target.value });
        }
    };

    renderComponent() {
        switch (this.state.option) {
        case PAGES.Display: return <Display />;
        case PAGES.DevConsole: return <h2 className="console-example">Open the dev console to see the gamepad logs</h2>;
        case PAGES.Movement: return <Movement />;
        default:
        case PAGES.None: return null;
        }
    }

    render() {
        const { option } = this.state;

        return (
            <article className="examples-container">
                <header>
                    <h1 className="title">JoyMap examples</h1>
                    <select value={option} onChange={this.handleChange}>
                        <option value={PAGES.None}>
                            Choose an Example
                        </option>
                        <option value={PAGES.Display}>
                            Gamepad render in HTML
                        </option>
                        <option value={PAGES.DevConsole}>
                            Dev Console
                        </option>
                        <option value={PAGES.Movement}>
                            Movement example in canvas
                        </option>
                    </select>
                </header>
                {this.renderComponent()}
            </article>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
