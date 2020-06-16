@isTest
private class TestCreateRecordPrepopulatedController {
    @isTest
    static void constructor() {
        // Test Data Creation
        Account acct = new Account();

        ApexPages.StandardController stdController = new ApexPages.StandardController(
            acct
        );

        // Method Being Tested
        Test.startTest();
        CreateRecordPrepopulatedController controller = new CreateRecordPrepopulatedController(
            stdController
        );
        Test.stopTest();

        // Assertions
        System.assertEquals(
            'Prospect',
            acct.Type,
            'Type was not correctly initialized'
        );
    }
}
