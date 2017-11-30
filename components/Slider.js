import React,{Component	} from 'react';
import '../styles/slider.css';
var className = require('classnames');
class Slider extends Component{
	
	constructor(props){
		super(props);

		this.state={currentIndex:this.props.initialSlide,slideStyles:{},showPosition:this.props.showPosition };
		this.prevSlide= this.prevSlide.bind(this);
		this.nextSlide= this.nextSlide.bind(this);
		this.slideChange = this.slideChange.bind(this);
		this.getTargetOffset = this.getTargetOffset.bind(this);
		this.initialSlide = this.initialSlide.bind(this);
		this.sliderPosition = this.sliderPosition.bind(this);
		this.goToSlide = this.goToSlide.bind(this);
	}
	componentDidMount(){
		this.initialSlide(this.props.initialSlide);	
	}
	nextSlide(){
		if (this.state.currentIndex == (React.Children.count(this.props.children) -1) || this.state.animating ){
			return
		}
		this.slideChange(this.state.currentIndex +1);
	}
	prevSlide(){
		if (this.state.currentIndex == 0 || this.state.animating){
			return
		}
		this.slideChange(this.state.currentIndex -1);
	}
	slideChange(index,animate=true){
		var callback = () => {
			this.setState({animating:false})
			this.props.onChange(this.props.index,index);
      	};
		console.log(this.slideGroup.offsetWidth);
      	var slideWidth=this.state.slideWidth;
      	var targetOffset= this.getTargetOffset(index,slideWidth);
		var style = {
			transform:'translateX(-' +targetOffset+'px)',
			width:slideWidth +"px"
		}
		if (animate){
			style.transition = 'transform 0.4s ease';
		}

		this.setState({
			animating:true,
			currentIndex:index,
			slideStyles:style
		},
		function() {
			this.animationEndCallback = setTimeout(callback,400);
		})
	}
	initialSlide(index){
		var childCount = React.Children.count(this.props.children);
		var slideWidth=this.slideGroup.offsetWidth / childCount;
		console.log(this.slideGroup.offsetWidth);
		this.setState({slideWidth:slideWidth});
		var targetOffset= this.getTargetOffset(index,slideWidth);
		var style = {
			transform:'translateX(-' +targetOffset+'px)',
			width:slideWidth +"px"
		}
		this.setState({
			currentIndex:index,
			slideStyles:style
		});
	}
	getTargetOffset(targetSlide,slideWidth){
		var targetOffset = slideWidth * (targetSlide);
		return targetOffset;
	}
	goToSlide(index){
		this.slideChange(index,false);
	}
	sliderPosition(){
		var currentIndex = this.state.currentIndex;
		var goToSlide = this.goToSlide;
		var positions = this.props.children.map(function(child,index){
			var itemData = child.props.item;
			var isActive = currentIndex == index;
			var classes= className("slider-position-item",{"slider-position-item-active":isActive})
			return (<li key={index} className={classes} index={index} onClick={() => goToSlide(index)}>
						<span className="slider-pos-item-price">€{itemData.price}</span>
						<span className="slider-pos-item-brand">{itemData.brand}</span>				
					</li>);
		});
		var sliderPosition = (
			<div className="slider-position">
				<ul>
					{positions}
				</ul>
			</div>);
		return sliderPosition;
	}
	render(){
		return (
		<div className="slider-root">
			<div className="slider-main">
				<button  className="slider-button slider-prev"><i onClick ={this.prevSlide} className="fa fa-arrow-left" aria-hidden="true"></i></button>
				<div className="slide-container">
	     			<div ref ={(input) =>{this.slideGroup= input;}} style={this.state.slideStyles} className="slide-group">
	     				{this.props.children}
	     			</div>
				</div>
				<button className="slider-button slider-next"><i onClick ={this.nextSlide} className="fa fa-arrow-right" aria-hidden="true"></i></button>
			</div>
			{this.state.showPosition && this.sliderPosition()}
		</div>
		);
	}
}

export default Slider;








