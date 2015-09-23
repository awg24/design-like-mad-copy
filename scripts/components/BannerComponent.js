var React = require("react");

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<div className="container-fluid">
					<div className="col-md-5"></div>
					<div className="col-md-2">
						<img className="img-responsive" src="./assets/logo.png"/>
					</div>
					<div className="col-md-5">
					</div>
				</div>
				<div className="text-center container">
					<div className="center-block add-bottom-margin change-font">
						ARE YOU READY TO DESIGN LIKE MAD?
					</div>
				</div>
			</div>
		);
	}
});