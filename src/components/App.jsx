import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx'
import Search from './github/Search.jsx';

class App extends Component{
  constructor(props){
    console.log(props);
    super(props);
    this.state = {
      username: 'biks152207',
      userData: [],
      userRepos : [],
      perPage: 5
    }
  }
  getUserData(){
    $.ajax({
      url: 'https://api.github.com/users/' + this.state.username +'? client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
      dataTypes: 'json',
      cache: false,
      success: function(data){
        this.setState({userData: data})
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({ username: null})
      }.bind(this)
    })
  }
  getUserRepos(){
    $.ajax({
      url: 'https://api.github.com/users/' + this.state.username +'/repos?per_page=' + this.state.perPage + '&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret + '&sort=created',
      dataTypes: 'json',
      cache: false,
      success: function(data){
        console.log(data);
        this.setState({userRepos: data})
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({ username: null})
      }.bind(this)
    })
  }
  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }
  handleFormSubmit(username){
    this.setState({username: username}, function(){
      this.getUserData();
      this.getUserRepos();
    })
  }
  render(){
    return(
      <div>
        <Search onFormSubmit={this.handleFormSubmit.bind(this)}/>
        <Profile {...this.state}/>
      </div>
    )
  }
}

App.propTypes = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string
};
App.defaultProps = {
  clientId: '0ace8ccd32b9e39ec049',
  clientSecret: 'dd114d7e209f894ab272e9ba4ec321a07575ab30'
}

export default App
