public with sharing class ViewRelatedRecordsController {
    public List<Contact> contacts { get; private set; }

    private ApexPages.StandardController standardController;

    public ViewRelatedRecordsController(
        ApexPages.StandardController standardController
    ) {
        this.standardController = standardController;
        this.contacts = new List<Contact>();
    }

    public void getRelatedContacts() {
        this.contacts = [
            SELECT Name, Title, Email, Phone
            FROM Contact
            WHERE AccountId = :standardController.getId()
            WITH SECURITY_ENFORCED
        ];
    }
}
