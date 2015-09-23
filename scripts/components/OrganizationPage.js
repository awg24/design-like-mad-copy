var React = require("react");
var async = require("async");
var PDF = require("./PDFViewer");
var UserCollection = require("../collections/UserCollection");
var RelationCollection = require("../collections/RelationCollection");
var userCollection = new UserCollection();
var exisitingRelations = new RelationCollection();
var Relation = require("../models/UserOrganizationRelationModel");
var applicants;
module.exports = React.createClass({
	componentWillMount: function(){
		var that = this;
		async.parallel([
			function(callback){
				userCollection.fetch({
					query: {userType:"applicant"},
					success: function(data){
						callback(null, data);
					},
					error: function(err){
						console.log(err);
						callback(err);
					}
				});
			},
			function(callback){
				exisitingRelations.fetch({
					query: {OrganizerId: that.props.loggedInUser.id},
					success: function(data){
						callback(null, data);

					},
					error: function(err){
						callback(err);
					}
				});
			}
		],
		function(err, results){
			that.setState({applicants: userCollection, 
						pdfFile: userCollection.at(0).get("portfolioUrl")||userCollection.at(0).get("developerLinks"), 
						ratings: exisitingRelations})
		});
	},
	componentWillUnmount: function(){
		if (document.documentElement.clientWidth > 856) {
			document.body.style.background = "#EFEFEF url(./assets/bg-image.jpg)";
			document.body.style.color = "white";
			document.body.style.backgroundSize = "cover";
		}
	},
	getInitialState: function(){
		return {
			applicants: userCollection,
			pdfFile: "../../assets/logo.png",
			ratings: exisitingRelations
		};
	},
	render: function(){
		var that = this;
		
		if(this.state.applicants){
			var toShow = this.state.applicants.map(function(models){
				var rating = "";
				var ratingModel = that.state.ratings.findWhere({ApplicantId: models.id});
				if(ratingModel){
					rating = ratingModel.get("rating");
				}
				return (
					<div onClick={that.showPDF} key={models.cid}>
						<div className="inline hover-this label-width">
							<label className="padding-top hover-this-label">{models.attributes.username}</label>
						</div>
						<select onChange={that.rate} ref="rating" defaultValue={rating} className="selecting small-width pull-right">
							<option value="">Unrated</option>
							<option value="5">5</option>
							<option value="4">4</option>
							<option value="3">3</option>
							<option value="2">2</option>
							<option value="1">1</option>
						</select>
					</div>
				);
			});
		}
		return (
			<div className="give-top-margin container">
				<div className="text-left give-border div-width col-sm-4 make-scroll">
					<h4>Applicants</h4><br/><br/>
					<div className="bottom-border">
						<label>Name</label>
						<label className="pull-right">Rating</label>
					</div>
					{toShow}
				</div>
				<div className="col-sm-1"></div>
				<div className="col-sm-6">
					<PDF key="2" url={this.state.pdfFile}/>
				</div>
				<div className="container container-clear">
					<button onClick={this.goToAveraging} className="btn-blue center-block bottom-margin">SEE TEAMS</button>
				</div>
			</div>
		);
	},
	showPDF: function(event){
		var userToGet = event.target.childNodes[0].innerHTML || event.target.innerHTML;
		if(!event.target.type){
			var that = this;
			var userClicked = new UserCollection();
			userClicked.fetch({
				query: {username: userToGet},
				success: function(data){
					if(data.models.length !== 0){
						console.log(data.models[0].attributes.developerLinks);
						that.setState({pdfFile: data.models[0].attributes.portfolioUrl || data.models[0].attributes.developerLinks});
					}
				}
			});
		}
	},
	goToAveraging: function(){
		this.props.routing.navigate("results", {trigger: true});
	},
	rate: function(event){
		var that = this;
		var applicant = event.target.parentNode.childNodes[0].innerHTML;
		var rating = event.target.value;
		var applicantRated = new UserCollection();
		applicantRated.fetch({
			query: {username: applicant},
			success: function(data){
				var hasBeenRated = new RelationCollection();
				var relation = new Relation({
					ApplicantId: data.models[0].id,
					username: applicant,
					OrganizerId: that.props.loggedInUser.id,
					rating: rating
				});
				hasBeenRated.fetch({
					query: {ApplicantId: data.models[0].id, OrganizerId: that.props.loggedInUser.id},
					success:function(data){
						if(data.length !== 0){
							relation.set({objectId: data.at(0).id})
						}
						relation.save();
					}
				});	
			}
		})	
	}
});