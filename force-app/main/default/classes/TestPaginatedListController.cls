@isTest
private class TestPaginatedListController {
    @isTest
    static void constructorSetsPageSize() {
        // Test Data Creation
        ApexPages.StandardSetController stdSetController = new ApexPages.StandardSetController(
            new List<Account>()
        );

        // Method Being Tested
        Test.startTest();
        PaginatedListController controller = new PaginatedListController(
            stdSetController
        );
        Test.stopTest();

        // Assertions
        System.assertEquals(
            5,
            stdSetController.getPageSize(),
            'The page size is not the one set (5).'
        );
    }
}
