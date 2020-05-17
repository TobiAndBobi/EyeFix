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

// On-Load (Start of Script)
$(function() {
    fetchInitialData();
    submitUserPreferences();
});