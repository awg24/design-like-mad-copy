var React = require("react");

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<iframe src={this.props.url} />
			</div>
		);
	},
	// componentDidMount: function(){
	// 	console.log(PDFJS);
	// 	this.refs.pdfView.
	// 	// var that = this;
	// 	// PDFJS.getDocument(this.props.url).then(function getPdfHelloWorld(pdf) {
	// 	// 	//
	// 	// 	// Fetch the first page
	// 	// 	//
	// 	// 	console.log(pdf);
	// 	// 	pdf.getPage(2).then(function getPageHelloWorld(page) {
	// 	// 	  var scale = 3;
	// 	// 	  var viewport = page.getViewport(scale);

	// 	// 	  //
	// 	// 	  // Prepare canvas using PDF page dimensions
	// 	// 	  //
	// 	// 	  var canvas = that.refs.pdfView.getDOMNode();
	// 	// 	  var context = canvas.getContext('2d');
	// 	// 	  canvas.height = viewport.height;
	// 	// 	  canvas.width = viewport.width;

	// 	// 	  //
	// 	// 	  // Render PDF page into canvas context
	// 	// 	  //
	// 	// 	  var renderContext = {
	// 	// 		canvasContext: context,
	// 	// 		viewport: viewport
	// 	// 	  };
	// 	// 	  page.render(renderContext);
	// 	// 	});
	// 	// });
	// }
});