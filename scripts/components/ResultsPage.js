var React = require("react");
var async = require("async");
var _ = require("backbone/node_modules/underscore");
var Ratings = require("../collections/RelationCollection");
var Users = require("../collections/UserCollection");
var NonProfits = require("../collections/NonProfitCollection");
Parse.initialize("S6Y7ni0haUcubEj98BcjWPl3lDPaYlVewgl53Prj", "9MYqzYFPqsuMvKAchWSBVZiK3sxzG5hr8jWJ6FU1");

var applicants = new Users();
var nonProfits = new NonProfits();
var ratings = new Ratings();
var master = [];

module.exports = React.createClass({
	getInitialState: function(){
		return {
			results: master
		};
	},
	componentWillMount: function(){
		if (document.documentElement.clientWidth > 856) {
			document.body.style.background = "#EFEFEF "
			document.body.style.color = "#666666";
			document.body.style.backgroundSize = "cover";
		}
		this.calculateResults();
	},
	componentWillUnmount: function(){
		if (document.documentElement.clientWidth > 856) {
			document.body.style.background = "#EFEFEF url(../../assets/bg-image.jpg)"
			document.body.style.color = "white";
			document.body.style.backgroundSize = "cover";
		}
	},
	render: function(){
		var keyCounter = 0;
		var toShow = this.state.results.map(function(project){

			var members = project.members.map(function(member){
				if(member !== ""){
					keyCounter++;
					return <li key={"member "+keyCounter}>{member}</li>
				}
			});
			return (
				<div key={"well "+keyCounter} className="text-left">
					<div className="well center-block col-sm-5 add-more-height">
						<h3 className="bottom-border">Team {" "+project.orgName}</h3>
						<ul><h4>{members}</h4></ul>
					</div>
				</div>
			);

		});
		return (
			<div className="text-center">
				<h1>Team Assignments</h1>
				{toShow}
			</div>
		);
	},
	calculateResults: function(){
		var that = this;
		//master = [];
		async.parallel([
			function(callback){
				Parse.Cloud.run("storeUserRating",{}, {
					success: function(data){
						callback(null, data);
					},
					error: function(err){
						callback(err);
					}
				});
			},
			function(callback){
				applicants.fetch({
					query: {userType: "applicant"},
					success: function(data){
						callback(null, data);
					},
					error: function(err){
						callback(err);
					}
				});
			},
			function(callback){
				nonProfits.fetch({
					success: function(data){
						callback(null, data);
					},
					error: function(err){
						callback(err);
					}
				});
			}
			], function(err, results){
				
				var theRatings = results[0];
				var theApplicants = results[1];
				var theNonProfits = results[2];

				for(var name in theRatings){
					var model = theApplicants.findWhere({username: name});
					model.set("skillRating", theRatings[name]);
				}

				var sortedApplicants = theApplicants.sortBy(function(model){
					return -1*model.get("skillRating");
				});

				var acceptedNonProfits = theNonProfits.models;
				var acceptedApplicants = _.first(sortedApplicants, sortedApplicants.length-10);

				acceptedNonProfits.map(function(model){
					var name = model.get("orgName");
					var type = model.get("nonProfitType");
					if(type === "Web"){
						master.push({orgName: name, type: type, hasDeveloper: false ,members: []});
					} else {
						master.push({orgName: name, type: type, members: []});
					}
				});
				
				var didntMakeIt = [];
				_.each(acceptedApplicants, function(applicant, index){
					var finished = false;
					for(var i = 0; i < master.length; i++){
						switch(master[i].type){
							case "Branding":
								if(master[i].members.length < 3){
									if(applicant.get("designerType") === "Graphic Designer"){
										master[i].members.push(applicant.get("name"));
										finished = true;	
									}
								}
								break;
							case "Event Collateral":
								if(master[i].members.length < 3){
									if(applicant.get("designerType") === "Graphic Designer"){
										master[i].members.push(applicant.get("name"));
										finished = true;
									} 
								}
								break;
							case "Web":
								if(applicant.get("designerType") === "Web Designer"){
									var counter = 0;
									master[i].members.map(function(memberList){
										var stringToCheck = memberList.split("W");
										if(stringToCheck[1] === "eb Designer"){
											counter++;
										}
									});
									if(master[i].members.length < 4 && counter !== 3){
										master[i].members.push(applicant.get("name"));
										finished = true;
									}
									
								} else if(!master[i].hasDeveloper && applicant.get("designerType") === "Developer" &&
											master[i].members.length < 4){
											master[i].members.push(applicant.get("name"));
											master[i].hasDeveloper = true;
											finished = true;
										} 
								break;
							case "Interior Design":
								if(applicant.get("designerType") === "Interior Designer"){
									if(master[i].members.length < 4){
										master[i].members.push(applicant.get("name"));
										finished = true;
									} 
								}
								break;
							case "Architecture":
								if(applicant.get("designerType") === "Architect"){
									if(master[i].members.length < 4){
										master[i].members.push(applicant.get("name"));
										finished = true;
									} 
								}
								break;
							default: console.log("shouldnt running");
								break;
						}
						if(finished){
							break;
						}
					}
				});
				var filteredMaster = _.filter(master, function(group){
					console.log(group);
					 if(group.type === "Event Collateral" || 
							  group.type === "Branding" ){
						if(group.members.length  === 3){
							return group;
						}
					} else if(group.type === "Web" || 
							  group.type === "Architecture" ||
							  group.type === "Interior Design" ){
						if(group.members.length === 4){
							return group;
						}
					} 
				});
				that.setState({results:filteredMaster});
			}
		);
	}
});