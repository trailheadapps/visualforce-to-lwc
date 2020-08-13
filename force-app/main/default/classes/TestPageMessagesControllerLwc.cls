@isTest
private class TestPageMessagesControllerLwc {
    @isTest
    static void callApex() {
        try {
            // Method Being Tested
            Test.startTest();
            PageMessagesControllerLwc.callApex();
            Test.stopTest();
            System.assert(false, 'Exception expected');
        } catch (Exception e) {
            // Assertions
            System.assert(
                e.getMessage()
                    .contains(
                        'An exception occurred while launching the process.'
                    ),
                'Expected exception message not received: ' + e.getMessage()
            );
        }
    }
}
