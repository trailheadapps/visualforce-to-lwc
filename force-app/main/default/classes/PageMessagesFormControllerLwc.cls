public with sharing class PageMessagesFormControllerLwc {
    @AuraEnabled
    public static void createCity(String cityName) {
        // Perform logic that may throw an exception. We will emulate it.
        throw new MyException('A city with that name already exists.');
    }
}
