@isTest
private class TestViewRelatedRecordsControllerLwc {
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

        // Method Being Tested
        Test.startTest();
        List<Contact> ctcs = ViewRelatedRecordsControllerLwc.getRelatedContacts(
            acct.Id
        );
        Test.stopTest();

        // Assertions
        System.assertEquals(1, ctcs.size(), 'One contact was expected.');
        System.assertEquals(
            'Yan Khang',
            ctcs[0].Name,
            'The contact name does not coincide.'
        );
        System.assertEquals(
            ctc.Title,
            ctcs[0].Title,
            'The contact title does not coincide.'
        );
        System.assertEquals(
            ctc.Email,
            ctcs[0].Email,
            'The contact email does not coincide.'
        );
        System.assertEquals(
            ctc.Phone,
            ctcs[0].Phone,
            'The contact phone does not coincide.'
        );
    }
}
