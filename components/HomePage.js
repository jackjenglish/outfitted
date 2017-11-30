import React,{Component} from 'react';
import Grid from './Grid.js';
import {Link} from 'react-router-dom';

class HomePage extends Component{

  constructor(props){

    super(props);
    this.loadItems = this.loadItems.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state={pageNumber:0,itemdata:[]}
  }

	componentDidMount(){
		this.loadItems(this.props.category);
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(){
		var scrollValue = document.documentElement.scrollTop;
		var documentHeight = document.body.scrollHeight; 
		var windowHeight = window.innerHeight
		if ( scrollValue >= (documentHeight - windowHeight - 250) ){
			if (!this.state.loading){
				this.loadItems(this.props.category);
			}
		}
	}

	componentWillReceiveProps(nextprops){
		if (nextprops.category != this.state.category){
			this.loadItems(nextprops.category);	
		}
	}

	loadItems(category){
		//Load in Grid Items from Database.
		var currentPage = this.state.pageNumber + 1;
		var currentItems = this.state.itemdata;
		var endOfData = this.state.endofdata;
	  	if (category != this.props.category){
	  		currentItems = [];
	  		endOfData=false;
	  		currentPage=1;
	  	}	
		if (endOfData){
			return;
		}
		this.setState({loading:true});
		fetch('http://jackjenglish.com/clothesapi/clothes/outfit/'+category.gender+'/page/'+ currentPage)
	      .then((resp) => resp.json())
		  .then((response) =>{
			this.setState({pageNumber:currentPage,endofdata:response.length==0,itemdata:currentItems.concat(response)},function(){
				this.loadMoreDelay = setTimeout(() => {this.setState({loading:false})},300)
			});
		});
	}
	render(){
		return (
			<div className="root-landing-page">
				<div className="grid-header">
					<div className="grid-header-title">Outfits</div>	
					<div className="grid-header-subtext">{this.props.category.gender}</div>
				</div>
				<Grid category={{gender:this.props.category.gender}} itemdata ={this.state.itemdata} gridItemMinWidth={180} gridItemMaxWidth={260} history={this.props.history}/>
			</div>
		);
	}
}

export default HomePage;
