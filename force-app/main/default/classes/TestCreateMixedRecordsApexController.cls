@isTest
private class TestCreateMixedRecordsApexController {
    @isTest
    static void createContactAndOpportunity() {
        // Test Data Creation
        CreateMixedRecordsApexController controller = new CreateMixedRecordsApexController();

        // Method Being Tested
        Test.startTest();
        controller.createContactAndOpportunity();
        Test.stopTest();

        // Assertions
        Contact ctc = [SELECT FirstName, LastName FROM Contact];
        Opportunity oppty = [
            SELECT Name, StageName, CloseDate
            FROM Opportunity
        ];
        System.assertEquals(
            controller.contactFirstName,
            ctc.FirstName,
            'The created contact has an incorrect FirstName.'
        );
        System.assertEquals(
            controller.contactLastName,
            ctc.LastName,
            'The created contact has an incorrect LastName.'
        );
        System.assertEquals(
            controller.opportunityName,
            oppty.Name,
            'The created opportunity has an incorrect Name.'
        );
        System.assertEquals(
            'Prospecting',
            oppty.StageName,
            'The created opportunity has an incorrect StageName.'
        );
        System.assertEquals(
            System.today(),
            oppty.CloseDate,
            'The created opportunity has an incorrect CloseDate.'
        );
    }
}
