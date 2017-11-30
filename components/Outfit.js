import React,{Component	} from 'react';
import {Link} from 'react-router-dom';
import Slider from './Slider.js';
import ItemSlide from './ItemSlide.js';
import '../styles/outfit.css';
import 'whatwg-fetch';
var classNames = require('classnames');

class Outfit extends Component{
	
  constructor(props){
  	super(props);
  	this.state={};
  	this.getItems= this.getItems.bind(this);
	this.slideChange=this.slideChange.bind(this);
	this.handleScroll = this.handleScroll.bind(this);
	this.getTotalCost = this.getTotalCost.bind(this);
	this.getTotalSection = this.getTotalSection.bind(this);
  }

  componentDidMount(){
   	var outfitId = this.props.match.params.id;
		fetch('http://jackjenglish.com/clothesapi/cl/'+outfitId)
	    .then((resp) => resp.json())
		  .then((response) =>{
		  	this.setState({outfitImage:response.imgsrc,itemGroups:response.data,indices:response.indices});
		  });
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}

  handleScroll(){
  	var scrollLimit = this.outfitContainer.clientHeight - this.sideBar.clientHeight
  	var scrollValue = document.documentElement.scrollTop
  	this.sideBar.style.top = scrollValue + "px";;  		
  }

	getTotalCost(){
		var totalCost =0;
		var selectedItems = this.state.indices;
		if (!selectedItems){
			return;
		}
		for (var i =0; i< selectedItems.length; i++){
			var selectedIndex = selectedItems[i];
			var groups = this.state.itemGroups;
			var cost = parseFloat(groups[i][selectedIndex].price)
			totalCost += cost	
		}
		return totalCost.toFixed(2);
	}

	getTotalSection(){
		if (!this.state.itemGroups){
			return;
		}
		return (
			<div key={"summary"} className = "subtotal-summary">
				<div className ="subtotal-summary-price-container">Total Cost: <span className="subtotal-summary-price">€{this.getTotalCost()}</span></div>
				<div className="addToCartButton-summary">Add ({this.state.itemGroups.length}) Items to Cart</div>
			</div>);
	}

	getItems(){
		var tabs=[];
		if (!this.state.itemGroups){
			return [];
		}
		var itemGroups = this.state.itemGroups;
	  	itemGroups.forEach((itemGroup,index) => {
			var slides=[];
			var itemHeaders= [];

			var initialSlide=this.state.indices[index];
			itemGroup.forEach((itemid,choiceIndex) =>{
				var itemState={
					color:0,
					size:0,
					itemGroupIndex:index,
					itemIndex:choiceIndex
				}
				var slide =(
					<ItemSlide key={choiceIndex} item = {itemGroup[choiceIndex]} itemState={itemState} onClick={this.itemChoiceChange}>
					</ItemSlide>
					);
				slides.push(slide);
			})
			var slider=<Slider index={index} showPosition={true} initialSlide={initialSlide} onChange={this.slideChange}>{slides}</Slider>
			var item =<div className="outfit-slider-container" key={index} >{slider}</div>
			tabs.push(item)
		});
		return tabs;
	}

	slideChange(itemGroupIndex,currentSlide){
		var selectedItems = this.state.indices.slice();
		selectedItems[itemGroupIndex] = currentSlide;
		this.setState({indices:selectedItems});
	}


  render() {

    return (
	     <div className="outfit-root">
			<div className="outfit-body-container" ref = {(input) => (this.outfitContainer = input)}>
				<div className="outfit-content-main" ref = {(input) => (this.outfitItems = input)}>
						{this.getItems()}
						{this.getTotalSection()}
				</div>
				<div className = "outfit-content-sidebar" >
					<div className="sidebar-scroll" ref={(input) => {this.sideBar = input}}>
						<img className="outfit-image" src={"/static/images/"+this.state.outfitImage}/>
					</div>
				</div>
			</div>
	     </div>
     );
  }
}
export default Outfit;
