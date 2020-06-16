public with sharing class PaginatedListControllerLwc {
    @AuraEnabled(cacheable=true)
    public static PaginatedAccounts getAccountsPaginated(
        Integer pageSize,
        Integer pageToken
    ) {
        PaginatedAccounts paginatedAccounts = new PaginatedAccounts();
        paginatedAccounts.records = [
            SELECT Name, Type, Phone, NumberOfEmployees, Owner.Name
            FROM Account
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT :pageSize
            OFFSET :pageToken
        ];

        Integer totalCount = [SELECT COUNT() FROM Account];

        paginatedAccounts.nextPageToken = (pageToken + pageSize < totalCount)
            ? pageToken + pageSize
            : null;

        return paginatedAccounts;
    }

    public class PaginatedAccounts {
        @AuraEnabled
        public List<Account> records;
        @AuraEnabled
        public Integer nextPageToken;
    }
}
