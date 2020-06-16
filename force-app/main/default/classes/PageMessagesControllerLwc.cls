public with sharing class PageMessagesControllerLwc {
    @AuraEnabled
    public static void callApex() {
        // Perform logic that may throw an exception. We will emulate it.
        throw new MyException(
            'An exception occurred while launching the process.'
        );
    }
}
