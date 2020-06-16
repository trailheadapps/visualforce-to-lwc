@isTest
private class TestPageMessagesFormControllerLwc {
    @isTest
    static void createCity() {
        try {
            // Method Being Tested
            Test.startTest();
            PageMessagesFormControllerLwc.createCity('Atlanta');
            Test.stopTest();
            System.assert(false, 'Exception expected');
        } catch (Exception e) {
            // Assertions
            System.assert(
                e.getMessage()
                    .contains('A city with that name already exists.'),
                'Expected exception message not received.' + e.getMessage()
            );
        }
    }
}
