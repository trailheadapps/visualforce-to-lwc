@isTest
private class TestRecordPagesController {
    @isTest
    static void getSingleAccountViaSOQL() {
        // Test Data Creation
        Account acct = new Account(Name = 'ACME');
        insert acct;

        // Method Being Tested
        Test.startTest();
        Account retrievedAcct = RecordPagesController.getSingleAccountViaSOQL();
        Test.stopTest();

        // Assertions
        System.assert(
            retrievedAcct != null,
            'One Account should had been retrieved.'
        );
    }

    @isTest
    static void getSingleContactViaSOQL() {
        // Test Data Creation
        Contact ctc = new Contact(FirstName = 'Yan', LastName = 'Khang');
        insert ctc;

        // Method Being Tested
        Test.startTest();
        Contact retrievedCtc = RecordPagesController.getSingleContactViaSOQL();
        Test.stopTest();

        // Assertions
        System.assert(
            retrievedCtc != null,
            'One Contact should had been retrieved.'
        );
    }
}
