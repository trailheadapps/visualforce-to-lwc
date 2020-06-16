@isTest
private class TestPaginatedListControllerLwc {
    @isTest
    static void getAccountsPaginatedFirstPage() {
        // Test Data Creation
        Account acct1 = new Account(Name = 'ACME 1');
        Account acct2 = new Account(Name = 'ACME 2');
        Account acct3 = new Account(Name = 'ACME 3');
        Account acct4 = new Account(Name = 'ACME 4');
        insert new List<Account>{ acct1, acct2, acct3, acct4 };

        // Method Being Tested
        Test.startTest();
        PaginatedListControllerLwc.PaginatedAccounts paginatedAccts = PaginatedListControllerLwc.getAccountsPaginated(
            2,
            0
        );
        Test.stopTest();

        // Assertions
        System.assertEquals(
            2,
            paginatedAccts.records.size(),
            'Two accounts were expected.'
        );
        System.assertEquals(
            acct1.Id,
            paginatedAccts.records[0].Id,
            'ACME 1 was the expected first account.'
        );
        System.assertEquals(
            acct2.Id,
            paginatedAccts.records[1].Id,
            'ACME 2 was the expected second account.'
        );
        System.assertEquals(
            2,
            paginatedAccts.nextPageToken,
            'Next page token should be 2'
        );
    }

    @isTest
    static void getAccountsPaginatedLastPage() {
        // Test Data Creation
        Account acct1 = new Account(Name = 'ACME 1');
        Account acct2 = new Account(Name = 'ACME 2');
        Account acct3 = new Account(Name = 'ACME 3');
        Account acct4 = new Account(Name = 'ACME 4');
        insert new List<Account>{ acct1, acct2, acct3, acct4 };

        // Method Being Tested
        Test.startTest();
        PaginatedListControllerLwc.PaginatedAccounts paginatedAccts = PaginatedListControllerLwc.getAccountsPaginated(
            2,
            2
        );
        Test.stopTest();

        // Assertions
        System.assertEquals(
            2,
            paginatedAccts.records.size(),
            'Two accounts were expected.'
        );
        System.assertEquals(
            acct3.Id,
            paginatedAccts.records[0].Id,
            'ACME 3 was the expected first account.'
        );
        System.assertEquals(
            acct4.Id,
            paginatedAccts.records[1].Id,
            'ACME 4 was the expected second account.'
        );
        System.assertEquals(
            null,
            paginatedAccts.nextPageToken,
            'Next page token should be 2'
        );
    }
}
