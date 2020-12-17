var server = "http://127.0.0.1:5000";
var initialData = {}
var graphs = {}
var datasetDescription = {};
var uploadedImageFile = null;
var selectedOption = {};
var finalSettings = {};
var numberOfParticipants = 0;
selectedOption["selectedSport"] = "AER";
selectedOption["selectedPerson"] = "S1";
selectedOption["selectedSession"] = "CRD1";
selectedOption["competitorPerson"] = "competitorS1";
selectedOption["competitorSession"] = "competitorCRD1";
selectedOption["selectedFeature"] = "HR";
selectedOption["selectedHome"] = true;
var currentMenuSelection = 'originalDatasetScreePlot';
var originalGraphs = {};
var controlTopGraphSize = 0.8;
var colorSchemeEyeTrace = ['#a6611a','#dfc27d','#80cdc1','#018571'];
// controlTopGraphWidth = 0.1 * window.innerWidth;
// controlTopGraphHeight = 0.25 * window.innerHeight;
// console.log("Width and height", window.innerWidth, window.innerHeight);

