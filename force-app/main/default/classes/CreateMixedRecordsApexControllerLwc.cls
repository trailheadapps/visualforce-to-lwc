public with sharing class CreateMixedRecordsApexControllerLwc {
    @AuraEnabled
    public static void createContactAndOpportunity(
        String contactFirstName,
        String contactLastName,
        String opportunityName
    ) {
        try {
            Contact newContact = new Contact(
                FirstName = contactFirstName,
                LastName = contactLastName
            );
            insert newContact;

            Opportunity newOpportunity = new Opportunity(
                Name = opportunityName,
                StageName = 'Prospecting',
                CloseDate = System.today()
            );
            insert newOpportunity;
        } catch (Exception e) {
            throw new MyException(e.getMessage());
        }
    }
}
