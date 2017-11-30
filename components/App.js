import React,{Component	} from 'react';
import { Route, Switch,Link } from 'react-router-dom';
import Outfit3 from './Outfit.js';
import HomePage from './HomePage.js';
import '../styles/App.css'
var classNames = require('classnames');

class App extends Component{

  constructor(props){
    super(props);
    this.state = {category:{gender:"Male"}}
    this.onGenderClick = this.onGenderClick.bind(this);
  }

  onGenderClick(gender){
    this.setState({ category: Object.assign({}, this.state.category, {gender: gender})});
  }

  render() {
      var maleIconClasses = classNames('male-icon',{'activeGender':this.state.category.gender=="Male"});
      var femaleIconClasses = classNames('female-icon',{'activeGender':this.state.category.gender=="Female"});
      return (
       <div className="appRoot">
          <header className="header">
              <div className={maleIconClasses} onClick={() =>this.onGenderClick("Male")}><i className="fa fa-mars" aria-hidden="true"></i></div>
              <div className={femaleIconClasses} onClick={()=>this.onGenderClick("Female")}><i className="fa fa-venus" aria-hidden="true"></i></div>
              <div className ="logo">Outfitted</div>
          </header>

          <Switch>
              <Route exact path="/"render={(props)=><HomePage category={this.state.category} {...props}></HomePage>}/>
              <Route path="/outfit/:id" component={Outfit3}/>
          </Switch>	
       </div>
       );
    }
}
/*OnEnter within react-router is used for user auth, research, look up that v3 ->v4 article again*/
export default App;