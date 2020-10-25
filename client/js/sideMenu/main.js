function checkIfAlgorithmChanges() {
    $("[name='algorithms[]']").on('change', function() {
        createFeaturesSectionOfSideMenu();
        createParametersSectionOfSideMenu();
        // if($(this).is(':checked')){
        //     console.log("checked", $(this).val());
        // } else {
        //     console.log('un-checked', $(this).val());
        // }
    });
}

function checkTheIfAlgorithmSelected(algorithmName) {
    var flag = false;
    $("[name='algorithms[]']:checked").each(function (i) {
        // console.log(algorithmName, $(this).val());
        if (algorithmName == $(this).val()) {
            flag = true;
        }
    });
    return flag;
}

function sideMenu() {
    createOrganisationSectionOfSideMenu();
    createAlgorithmSectionOfSideMenu();
    createParticipantSectionOfSideMenu();
    createFeaturesSectionOfSideMenu();
    createParametersSectionOfSideMenu();
}