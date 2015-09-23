var React = require("react");

module.exports = React.createClass({
	render: function(){
		return (
			<div className="container center-block">
				<div className="well text-center">
					Thank you for your submission, we will get back to shortly!
				</div>
			</div>
		);
	},
	componentWillUnmount: function(){
		if (document.documentElement.clientWidth > 856) {
			document.body.style.background = "#EFEFEF url(../../assets/bg-image.jpg)"
			document.body.style.color = "white";
			document.body.style.backgroundSize = "cover";
		}
	},
	componentWillMount: function(){
		if (document.documentElement.clientWidth > 856) {
			document.body.style.background = "#EFEFEF "
			document.body.style.color = "#666666";
		}
	},
});