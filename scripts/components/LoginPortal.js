var React = require("react");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			errors: {}
		};
	},
	render: function(){
		return (
			<div>
				<div className="text-center container-fluid">
					<div className="text-left center-block style-heading">Login</div>
					<div className="container">
						<div className="col-sm-3"></div>
						<div className="col-sm-6">
							<form onSubmit={this.validateUser}>
								<input className="input-style" ref="username" type="text" placeholder="Username" /><br/>
								<input className="input-style" ref="password" type="password" placeholder="Password" />
								<br/>
								<button className="center-block btn-change btn-blue">LOGIN</button>
							</form>
							<span className="errors">{this.state.errors.invalid}</span>
							<br/>
							<label>Not a member? <a href="#signUp">Sign up here!</a></label>
							
						</div>
						<div className="col-sm-3"></div>
					</div>
				</div>
			</div>
		);
	},
	validateUser: function(event){
		event.preventDefault();
		var that = this;
		var errors = {};
		this.props.loggingIn.login({
				username: this.refs.username.getDOMNode().value,
				password: this.refs.password.getDOMNode().value
			},{
				success:function(data){
					that.props.routing.navigate("application/"+data.attributes.userType, {trigger: true});
				},
				error: function(data, res){
					console.log(res);
					errors.invalid = "Username or password are incorrect";
					that.setState({errors: errors});
				}
			}
		);
	}
});