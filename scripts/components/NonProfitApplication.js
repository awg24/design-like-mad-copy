var React = require("react");
var $ = require("jquery");
var NonProfitModel = require("../models/NonProfitModel");
var NonProfitCollection = require("../collections/NonProfitCollection");

module.exports = React.createClass({
	getInitialState: function(){
		var nonProf;
		if(this.props.nonProf){
			nonProf = this.props.nonProf.attributes;
		} else {
			nonProf = {};
		}
		var ecVal = false;
		var wVal = false;
		var iVal = false;
		var aVal = false;
		var bVal = false;
		switch(nonProf.nonProfitType){
			case "Event Collateral":
				ecVal = true;
				break;
			case "Web":
				wVal = true;
				break;
			case "Interior Design":
				iVal = true;
				break;
			case "Architecture":
				aVal = true;
				break;
			case "Branding":
				bVal = true;
				break;
		}
		return {
			ecVal: ecVal,
			wVal: wVal,
			iVal: iVal,
			aVal: aVal,
			bVal: bVal
		}
	},
	render: function(){
		var nonProf;
		if(this.props.nonProf){
			nonProf = this.props.nonProf.attributes;
		} else {
			nonProf = {};
		}
		return (
			<div className="text-center">
				<div className="div-bottom-margin set-div-width">
					Non Profit Application
				</div>
				<div>
					<input className="input-style" ref="orgName" type="text" defaultValue={nonProf.orgName} placeholder="Organization Name" />
				</div>
				<div>
					<input className="input-style" ref="site" type="text" defaultValue={nonProf.site} placeholder="Website (if any)" />
				</div>
				<div>
					<input className="input-style" ref="contactName" type="text" defaultValue={nonProf.contactName} placeholder="Contact Person" />
				</div>
				<div>
					<input className="input-style" ref="contactEmail" type="text" defaultValue={nonProf.contactEmail} placeholder="Contact Email" />
				</div>
				<div>
					<input className="input-style" ref="contactNum" type="text" defaultValue={nonProf.contactNum} placeholder="Contact Phone Number" />
				</div>
				<div>
					<textarea className="input-style add-height" ref="missionStatement" defaultValue={nonProf.missionStatement} placeholder="Mission Statement"></textarea>
				</div>
				<div>
					<textarea className="input-style add-height" ref="additionalComments" defaultValue={nonProf.additionalComments} placeholder="Addition Comments"></textarea>
				</div>
				<div className="div-width">
					Please select a package of deliverables that your organization needs
				</div>
				<div className="text-left give-border div-width">
					<div className="bottom-border">
						<input id="radio1" name="nonProfitType" defaultChecked={this.state.ecVal} value="Event Collateral" type="radio"/><label htmlFor="radio1"><span className="change-label">
						</span></label><span>Event Collateral</span>
					</div>
					<div className="side-padding">
						-logo<br/>
						-Invitation<br/>
						-Event Poster/Flyer<br/>
						-Swag such as T-shirts (time premitting)
					</div>
				</div><br/>
				<div className="text-left give-border div-width">
					<div className="bottom-border">
						<input id="radio2" name="nonProfitType" defaultChecked={this.state.wVal} value="Web" type="radio"/><label htmlFor="radio2"><span className="change-label">
						</span></label><span>Web</span><br/>
					</div>
					<div className="side-padding">
						-logo<br/>
						-Invitation<br/>
						-Event Poster/Flyer<br/>
						-Swag such as T-shirts (time premitting)
					</div>
				</div><br/>
				<div className="text-left give-border div-width">
					<div className="bottom-border">
						<input id="radio3" name="nonProfitType" defaultChecked={this.state.iVal} value="Interior Design" type="radio"/><label htmlFor="radio3"><span className="change-label">
						</span></label><span>Interior Design</span><br/>
					</div>
					<div className="side-padding">
						-logo<br/>
						-Invitation<br/>
						-Event Poster/Flyer<br/>
						-Swag such as T-shirts (time premitting)
					</div>
				</div><br/>
				<div className="text-left give-border div-width">
					<div className="bottom-border">
						<input id="radio4" name="nonProfitType" defaultChecked={this.state.bVal} value="Branding" type="radio"/><label htmlFor="radio4"><span className="change-label">
						</span></label><span>Full Branding or Branding Redesign</span><br/>
						</div>
					<div className="side-padding">
						-logo
						-Invitation
						-Event Poster/Flyer
						-Swag such as T-shirts (time premitting)
					</div>
				</div><br/>
				<div className="text-left give-border div-width">
					<div className="bottom-border">
						<input id="radio5" name="nonProfitType" defaultChecked={this.state.aVal} value="Architecture" type="radio"/><label htmlFor="radio5"><span className="change-label">
						</span></label><span>Architecture</span><br/>
					</div>
					<div className="side-padding">
						-logo
						-Invitation
						-Event Poster/Flyer
						-Swag such as T-shirts (time premitting)
					</div>
				</div><br/>
				<div>
					<button onClick={this.submitNonProfitApp} className="btn-blue">SUBMIT APPLICATION</button>
				</div>
				<br/>
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
	submitNonProfitApp: function(){
		var that = this;
		var orgName = this.refs.orgName.getDOMNode().value;
		var site = this.refs.site.getDOMNode().value;
		var contactName = this.refs.contactName.getDOMNode().value;
		var contactEmail = this.refs.contactEmail.getDOMNode().value;
		var contactNum = this.refs.contactNum.getDOMNode().value;
		var missionStatement = this.refs.missionStatement.getDOMNode().value;
		var additionalComments = this.refs.additionalComments.getDOMNode().value;
		var nonProfitType = $("input[name=nonProfitType]:checked").val();

		var nonProfit = new NonProfitModel({
			orgName: orgName,
			site: site,
			contactName: contactName,
			contactEmail: contactEmail,
			contactNum: contactNum,
			missionStatement: missionStatement,
			additionalComments: additionalComments,
			nonProfitType: nonProfitType,
			createdBy: this.props.loggedInUser.id
		});

		nonProfit.save(null, {
			success: function(){
				console.log("saved to server");
				that.props.routing.navigate("success",{trigger: true});
			},
			error: function(){
				console.log("didnt save to server");
				
			}
		});

	}
});