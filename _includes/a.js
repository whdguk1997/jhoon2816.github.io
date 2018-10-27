import React, { Component } from 'react';
import './App.css';
import Profile from './profile';

class App extends Component {
    state= {

    }
    componentDidMount(){
        setTimeout(this._getProfile, 3000);
    }
    render() {
        const { profiles } = this.state;
        return (
            <div className={profiles ? "App" : "App-loading"}>
                {profiles ? this._renderProfile() : "profiles are being loaded..."}
            </div>
        );
    }
    _callApi = () => {
        return fetch('https://randomuser.me/api/?results=12')
            .then(response => response.json())
            .then(json => json.results)
            .catch(err => console.log(err))
    }
    _getProfile = async () => {
        const profiles = await this._callApi();
        this.setState({profiles})
    }
    _renderProfile = () => {
        const { profiles } = this.state;
        const renderProfiles = profiles.map((profile, index) => {
            return (
                <Profile
                    imgSrc={profile.picture.large}
                    name={profile.name.first}
                    username={profile.login.username}
                    password={profile.login.password}
                    key={index}
                />
            )
        })
        return renderProfiles;
    }
}

export default App;