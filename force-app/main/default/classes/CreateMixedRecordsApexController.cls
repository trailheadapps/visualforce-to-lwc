public with sharing class CreateMixedRecordsApexController {
    public String contactFirstName { get; set; }
    public String contactLastName { get; set; }
    public String opportunityName { get; set; }

    public CreateMixedRecordsApexController() {
        this.contactFirstName = 'Yan';
        this.contactLastName = 'Khang';
        this.opportunityName = 'Possible deal!';
    }

    public void createContactAndOpportunity() {
        Contact newContact = new Contact(
            FirstName = contactFirstName,
            LastName = contactLastName
        );
        insert as user newContact;

        Opportunity newOpportunity = new Opportunity(
            Name = opportunityName,
            StageName = 'Prospecting',
            CloseDate = System.today()
        );
        insert as user newOpportunity;
    }
}
