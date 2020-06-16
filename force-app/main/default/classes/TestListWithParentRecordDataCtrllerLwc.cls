@isTest
private class TestListWithParentRecordDataCtrllerLwc {
    @isTest
    static void getAccounts() {
        // Test Data Creation
        Account acct = new Account();
        acct.Name = 'ACME';
        acct.Type = 'Technology Partner';
        acct.Phone = '3362227000';
        insert acct;

        // Method Being Tested
        Test.startTest();
        List<Account> accts = ListWithParentRecordDataControllerLwc.getAccounts();
        Test.stopTest();

        // Assertions
        System.assertEquals(1, accts.size(), 'One account was expected.');
        System.assertEquals(
            'ACME',
            accts[0].Name,
            'The account Name is incorrect.'
        );
        System.assertEquals(
            'Technology Partner',
            accts[0].Type,
            'The account Type is incorrect.'
        );
        System.assertEquals(
            '3362227000',
            accts[0].Phone,
            'The account Phone is incorrect.'
        );
        System.assertEquals(
            UserInfo.getName(),
            accts[0].Owner.Name,
            'The account Owner Name is incorrect.'
        );
    }
}
