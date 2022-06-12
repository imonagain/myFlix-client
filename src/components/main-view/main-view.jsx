import React from 'react';

// React component names must begin with capital letter

export class MainView extends React.Component {

    render() {
        return (
            <div className="main-view">
                <div>Inception</div>
                <div>The Shawshank Redemption</div>
                <div>Gladiator</div>
            </div>
        );
    }
}

export default MainView;