public with sharing class PageMessagesDataRetrievalController {
    List<Account> accounts { get; private set; }

    public void getAccounts() {
        try {
            // Perform logic that may throw an exception. We will emulate it.
            throw new MyException(
                'An exception occurred while retrieving accounts.'
            );
        } catch (Exception e) {
            ApexPages.addMessages(e);
        }
    }
}
