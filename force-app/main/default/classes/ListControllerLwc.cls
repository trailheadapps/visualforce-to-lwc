public with sharing class ListControllerLwc {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Name, Type, Phone, NumberOfEmployees
            FROM Account
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT 10
        ];
    }
}
