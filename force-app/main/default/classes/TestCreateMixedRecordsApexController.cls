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
        Contact contact = [SELECT FirstName, LastName FROM Contact];
        Opportunity opportunity = [
            SELECT Name, StageName, CloseDate
            FROM Opportunity
        ];
        System.assertEquals(
            controller.contactFirstName,
            contact.FirstName,
            'The created contact has an incorrect FirstName.'
        );
        System.assertEquals(
            controller.contactLastName,
            contact.LastName,
            'The created contact has an incorrect LastName.'
        );
        System.assertEquals(
            controller.opportunityName,
            opportunity.Name,
            'The created opportunity has an incorrect Name.'
        );
        System.assertEquals(
            'Prospecting',
            opportunity.StageName,
            'The created opportunity has an incorrect StageName.'
        );
        System.assertEquals(
            System.today(),
            opportunity.CloseDate,
            'The created opportunity has an incorrect CloseDate.'
        );
    }
}
