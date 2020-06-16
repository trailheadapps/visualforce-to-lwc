public with sharing class PageMessagesDataRetrievalControllerLwc {
    @AuraEnabled(cacheable=true)
    public static void getAccounts() {
        // Perform logic that may throw an exception. We will emulate it.
        throw new MyException(
            'An exception occurred while retrieving accounts.'
        );
    }
}
