@isTest
private class TestPageMessagesController {
    @isTest
    static void callApex() {
        // Test Data Creation
        PageMessagesController controller = new PageMessagesController();

        // Method Being Tested
        Test.startTest();
        controller.callApex();
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
            'An exception occurred while launching the process.',
            ApexPages.getMessages()[0].getSummary(),
            'The message should contain the correct text.'
        );
    }
}
