@isTest
private class TestViewRelatedRecordsController {
    @isTest
    static void getRelatedContacts() {
        // Test Data Creation
        Account acct = new Account(Name = 'ACME');
        insert acct;
        Contact ctc = new Contact(
            FirstName = 'Yan',
            LastName = 'Khang',
            Title = 'VP',
            Email = 'yan@khang.com',
            Phone = '3362227000',
            AccountId = acct.Id
        );
        insert ctc;

        ApexPages.StandardController stdController = new ApexPages.StandardController(
            acct
        );
        ViewRelatedRecordsController controller = new ViewRelatedRecordsController(
            stdController
        );

        // Method Being Tested
        Test.startTest();
        controller.getRelatedContacts();
        Test.stopTest();

        // Assertions
        System.assertEquals(
            1,
            controller.contacts.size(),
            'One contact was expected.'
        );
        System.assertEquals(
            'Yan Khang',
            controller.contacts[0].Name,
            'The name of the contact does not coincide.'
        );
        System.assertEquals(
            ctc.Title,
            controller.contacts[0].Title,
            'The title of the contact does not coincide.'
        );
        System.assertEquals(
            ctc.Email,
            controller.contacts[0].Email,
            'The email of the contact does not coincide.'
        );
        System.assertEquals(
            ctc.Phone,
            controller.contacts[0].Phone,
            'The phone of the contact does not coincide.'
        );
    }
}
