@isTest
private class TestPageMessagesDataRetrievalController {
    @isTest
    static void getAccounts() {
        // Test Data Creation
        PageMessagesDataRetrievalController controller = new PageMessagesDataRetrievalController();

        // Method Being Tested
        Test.startTest();
        controller.getAccounts();
        Test.stopTest();

        // Assertions
        System.assertEquals(
            true,
            ApexPages.hasMessages(),
            'The page should have messages.'
        );
        System.assertEquals(
            1,
            ApexPages.getMessages().size(),
            'There should be just one message.'
        );
        System.assertEquals(
            'An exception occurred while retrieving accounts.',
            ApexPages.getMessages()[0].getSummary(),
            'The message should contain the correct text.'
        );
    }
}
