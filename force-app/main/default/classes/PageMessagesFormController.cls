public with sharing class PageMessagesFormController {
    public String cityName { get; set; }

    public void createCity() {
        try {
            // Perform logic that may throw an exception. We will emulate it.
            throw new MyException('A city with that name already exists.');
        } catch (Exception e) {
            ApexPages.addMessages(e);
        }
    }

    public PageReference cancel() {
        PageReference currentPage = ApexPages.currentPage();
        currentPage.setRedirect(true);
        return currentPage;
    }
}
