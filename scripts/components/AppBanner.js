var React = require("react");

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<div className="go-blue container-fluid">
					<a className="pull-right go-white" onClick={this.logoutUser}>LOGOUT</a>
				</div>
				<div className="go-light-blue text-center container-fluid">
					<img className="small-img" src="./assets/logo.png" />
					<label id="banner-title" className="add-padding make-white">DESIGN LIKE MAD DESIGNERS/DEVELOPERS</label>
				</div>
				
			</div>
		);
	},
	logoutUser: function(){
		var that = this;
		this.props.loggedInUser.logout({
			success: function(userModel) {
				console.log('user was logged out');
				that.props.routing.navigate("login", {trigger:true});
			},
			error: function(userModel, response) {
				console.log('problem logging out the user', response.responseJSON);
			}
		});
	}
});