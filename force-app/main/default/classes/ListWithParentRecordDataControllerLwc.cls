public with sharing class ListWithParentRecordDataControllerLwc {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Name, Type, Phone, Owner.Name
            FROM Account
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT 10
        ];
    }
}
