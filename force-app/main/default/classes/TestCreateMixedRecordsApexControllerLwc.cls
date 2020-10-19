@isTest
private class TestCreateMixedRecordsApexControllerLwc {
    @isTest
    static void createContactAndOpportunity() {
        // Method Being Tested
        Test.startTest();
        CreateMixedRecordsApexControllerLwc.createContactAndOpportunity(
            'Yan',
            'Khang',
            'Possible deal'
        );
        Test.stopTest();

        // Assertions
        Contact ctc = [SELECT FirstName, LastName FROM Contact];
        Opportunity oppty = [
            SELECT Name, StageName, CloseDate
            FROM Opportunity
        ];
        System.assertEquals(
            'Yan',
            ctc.FirstName,
            'The created contact has an incorrect FirsName.'
        );
        System.assertEquals(
            'Khang',
            ctc.LastName,
            'The created contact has an incorrect LastName.'
        );
        System.assertEquals(
            'Possible deal',
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

    @isTest
    static void exceptionCase() {
        // Method Being Tested
        try {
            Test.startTest();
            CreateMixedRecordsApexControllerLwc.createContactAndOpportunity(
                null,
                null,
                null
            );
            Test.stopTest();
            System.assert(false, 'Exception should have happened');
        } catch (Exception e) {
            // Assertions
            System.assert(
                e instanceof MyException,
                'Expected to receive a custom MyException.'
            );
        }
    }
}
