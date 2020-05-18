function fetchDataNeedForChosenOptionsDashboard() {
    selectedOption["selectedFeature"] = "HR";
    selectedOption["competitorPerson"] = "competitorS1";
    selectedOption["competitorSession"] = "competitorCRD1";
    highlightChosenVitalButton(selectedOption["selectedFeature"]);
    competitorPlayersSectionOfSideMenu();
    createWidgetThatDisplayChosenPlayerVitals(selectedOption["selectedPerson"], selectedOption["selectedSession"], "#selectedPlayerVitalMonitor");
    displayDashboard();
    closeNav();
}

function displayWelcomeScreen() {
    $("#dashboard").hide();
    $("#welcome").show();
    console.log("displayWelcomeScreen");
}

function displayDashboard() {
    $("#welcome").hide();
    $("#dashboard").show();
    console.log("displayDashboard");
}

// On-Load (Start of Script)
$(function() {
    displayWelcomeScreen();
    fetchInitialData();
    submitUserPreferences();
    // checkIfSettingChanges();
});