import ReactDOM from 'react-dom';
import React from 'react';

import { startConsole, stopConsole } from './examples/DevConsole';
import HtmlConsole from './examples/HtmlConsole.jsx';
import Display from './examples/Display.jsx';

import './main.styl';

const PAGES = {
    None: '',
    Display: 'display',
    DevConsole: 'devConsole',
    HtmlConsole: 'htmlConsole'
};

class App extends React.Component {
    
    state = {
        option: ''
    };

    handleChange = (event) => {
        if (event.currentTarget.value !== this.state.value) {
            this.setState({ option: event.currentTarget.value });
        }
    };

    getComponent() {
        switch(this.state.option) {
            case PAGES.Display: return <Display />; break;
            case PAGES.DevConsole: return <h2>Look at the dev console while using gamepad</h2>; break;
            case PAGES.HtmlConsole: return <HtmlConsole />; break;
        }

        return <h2>Choose an option</h2>;
    }

    render() {
        const { option } = this.state;

        // REVIEW
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
                        <option value={PAGES.None}>
                            Select an Option
                        </option>
                        <option value={PAGES.Display}>
                            HUD Display
                        </option>
                        <option value={PAGES.DevConsole}>
                            Dev Console
                        </option>
                        <option value={PAGES.HtmlConsole}>
                            HTML Console
                        </option>
                    </select>
                </header>
                {this.getComponent()}
            </article>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
