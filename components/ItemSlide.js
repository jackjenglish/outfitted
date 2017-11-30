import React,{Component	} from 'react';
var classNames = require('classnames');
import '../styles/itemslide.css';
class ItemSlide extends Component{
	
	constructor(props){
		super(props);
		this.state = {imageIndex:0}
		this.getImageSrc = this.getImageSrc.bind(this);
		this.selectImage= this.selectImage.bind(this);
		this.renderAlternativeImages = this.renderAlternativeImages.bind(this);
	}			

	componentDidMount(){
		this.renderAlternativeImages();
	}

	getImageSrc(){
		var images = this.props.item.images;
		return images[this.state.imageIndex];
	}

	selectImage(index){
		this.setState({imageIndex:index});
	}

	renderAlternativeImages(){
		var selectImage = this.selectImage;
		var imageIndex = this.state.imageIndex;
		var alternatives = this.props.item.images.map( function(src,index){
			var isActive = imageIndex == index;
			var classes = classNames("slider-image-alt-li",{"slider-image-alt-li-active":isActive});
			return (
				<li key={index} className={classes} onClick={() => selectImage(index)} >
					<img className="slider-image-alt-img" src={"/static/images/"+src}/>
				</li>
			);
		});
		return alternatives;
	}
	render(){
		return (
		<div className="slide">
			<div className ="slide-flex-container">
				<div className = "slider-details-container">
					<a className ="slider-name" href={this.props.item.srclink}>{this.props.item.name}</a>
				</div>			
		 		<div className="slider-images-container">
		 			<div  className="slide-im">
						<a href={this.props.item.srclink}><img className="slider-image" src={"/static/images/"+this.getImageSrc()}/></a>		
						<ul className="slider-image-alternatives">
						{this.renderAlternativeImages()}
		 				</ul> 				
		 			</div>
		 		</div>
			</div>
	 	</div>
		);
	}
}


export default ItemSlide;