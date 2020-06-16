public with sharing class PaginatedListController {
    private static final Integer PAGE_SIZE = 5;

    public PaginatedListController(
        ApexPages.StandardSetController standardSetController
    ) {
        standardSetController.setPageSize(PAGE_SIZE);
    }
}
