public with sharing class PageMessagesController {
    public void callApex() {
        try {
            // Perform logic that may throw an exception. We will emulate it.
            throw new MyException(
                'An exception occurred while launching the process.'
            );
        } catch (Exception e) {
            ApexPages.addMessages(e);
        }
    }
}
