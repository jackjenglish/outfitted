import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import '../styles/grid.css';
import GridItem from './GridItem.js'; 
var classNames = require('classnames');

class Grid extends Component {

	constructor(props){
		super(props);
		this.getGridItems = this.getGridItems.bind(this);
		this.imageLoaded = this.imageLoaded.bind(this);
		this.gridItemClick = this.gridItemClick.bind(this);

		var gridItemMaxWidth = this.props.gridItemMaxWidth;
		var gridItemMinWidth = this.props.gridItemMinWidth;
		var gridWidth = this.getGridWidth(gridItemMinWidth,gridItemMaxWidth);
		this.state = {gridWidth:gridWidth,gridItemMinWidth:gridItemMinWidth,gridItemMaxWidth:gridItemMaxWidth,imageHeights:{},pageNumber:0,category:this.props.category,itemdata:[]}
	}

	getGridWidth(gridItemMinWidth,gridItemMaxWidth){
		var gridWidth = document.documentElement.clientWidth;
		if (gridWidth > (gridItemMaxWidth * 4)){
			gridWidth = gridItemMaxWidth * 4;
		}	
		return gridWidth;
	}

	gridItemClick(itemid){
		this.props.history.push('/outfit/'+itemid);
	
	}

	imageLoaded(index,height){
		var newHeight = {[index]:height}
		this.setState({imageHeights:Object.assign({},this.state.imageHeights,newHeight)});
	}

	getGridItems(){
		var gridWidth = this.state.gridWidth;
		var numColumns = Math.max( 2,(gridWidth/this.state.gridItemMinWidth) > 4 ? 4: Math.floor(gridWidth/this.state.gridItemMinWidth) );
		var columnWidth = gridWidth / numColumns;
		
		var columnHeights =new Array(numColumns).fill(0);
		var imageHeights = this.state.imageHeights;
		var gridItems =[];

		this.props.itemdata.forEach((item,index) => {
			var style={width:columnWidth +"px"};

			//Add Vertical and Horizontal translations for each GridItem.
			if (imageHeights[index]){
				var insertIntoCol=0;
				for (var i =1;i<numColumns;i++){
					if (columnHeights[i] < columnHeights[insertIntoCol]){
						insertIntoCol = i;
					}
				}
				var translateX = columnWidth * insertIntoCol;
				var translateY = columnHeights[insertIntoCol];
				style.transform = "translateX("+translateX+"px) "+ "translateY("+translateY+"px)";
				columnHeights[insertIntoCol] +=imageHeights[index]
			}

			gridItems.push(<GridItem index={index} key={index} data={item} onLoad={this.imageLoaded} style={style} onClick={this.gridItemClick}></GridItem>);
		});
		return gridItems;
	}

	render(){
		return (
			<div className="grid-root" style={{width:this.state.gridWidth+"px"}}>
				{this.getGridItems()}
			</div>
		);
	}
}

export default Grid;


