@isTest
private class TestPageMessagesFormController {
    @isTest
    static void createCity() {
        // Test Data Creation
        PageMessagesFormController controller = new PageMessagesFormController();

        // Method Being Tested
        Test.startTest();
        controller.createCity();
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
            'A city with that name already exists.',
            ApexPages.getMessages()[0].getSummary(),
            'The message should contain the correct text.'
        );
    }

    @isTest
    static void cancel() {
        // Test Data Creation
        PageMessagesFormController controller = new PageMessagesFormController();

        // Method Being Tested
        Test.startTest();
        PageReference pageRef = controller.cancel();
        Test.stopTest();

        // Assertions
        System.assertEquals(
            ApexPages.currentPage(),
            pageRef,
            'The current page reference should have been returned.'
        );
    }
}
