@isTest
private class TestListControllerLwc {
    @isTest
    static void getAccounts() {
        // Test Data Creation
        Account account = new Account();
        account.Name = 'ACME';
        account.Type = 'Technology Partner';
        account.Phone = '3362227000';
        account.NumberOfEmployees = 1000;
        insert account;

        // Method Being Tested
        Test.startTest();
        List<Account> accounts = ListControllerLwc.getAccounts();
        Test.stopTest();

        // Assertions
        System.assertEquals(1, accounts.size(), 'One account was expected.');
        System.assertEquals(
            'ACME',
            accounts[0].Name,
            'The account Name is incorrect.'
        );
        System.assertEquals(
            'Technology Partner',
            accounts[0].Type,
            'The account Type is incorrect.'
        );
        System.assertEquals(
            '3362227000',
            accounts[0].Phone,
            'The account Phone is incorrect.'
        );
        System.assertEquals(
            1000,
            accounts[0].NumberOfEmployees,
            'The account NumberOfEmployees is incorrect.'
        );
    }
}
