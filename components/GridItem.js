import React,{Component} from 'react';
var classNames=require('classnames');

class GridItem extends Component {
	
	constructor(props){
		super(props);
		this.onImageLoad = this.onImageLoad.bind(this);
		this.onItemClick = this.onItemClick.bind(this);
		this.onSaveItem = this.onSaveItem.bind(this);
		this.state = {saved:false}
	}

	onImageLoad(){
		this.props.onLoad(this.props.index,this.gridItem.offsetHeight);
	}

	onItemClick(){
		this.props.onClick(this.props.data.id);
	}

	onSaveItem(){
		this.setState({saved:!this.state.saved})
	}

	render(){
		var savedClass = classNames("fa",{"fa-heart-o":!this.state.saved},{"fa-heart":this.state.saved});
		return (
			<div style={this.props.style} ref={(input) => {this.gridItem =input;}}  className="grid-item">
				<div className="grid-item-container">
					<div className="grid-item-gradient" onClick={this.onItemClick} ></div>
					<img className="grid-item-image" src={"/static/images/"+this.props.data.imgsrc} onLoad={this.onImageLoad}/>
					<div className="grid-item-save" onClick={this.onSaveItem}><i className={savedClass} aria-hidden="true"></i></div>
					<div className="grid-item-price">
						<div className="grid-item-price-min">
							<div className="grid-item-price-text">€{this.props.data.pricing.min}</div>
							<div className="grid-item-price-label">Min</div>
						</div>
						<div className="grid-item-price-actual">€{this.props.data.pricing.normal}</div>
						<div className="grid-item-price-max">
							<div className="grid-item-price-text">€{this.props.data.pricing.max}</div>
							<div className="grid-item-price-label">Max</div>
						</div>
					</div>
				</div>
			</div>);
	}
}

export default GridItem;