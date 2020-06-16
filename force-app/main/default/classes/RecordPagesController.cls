public with sharing class RecordPagesController {
    @AuraEnabled(cacheable=true)
    public static Account getSingleAccountViaSOQL() {
        return [SELECT Id FROM Account WITH SECURITY_ENFORCED LIMIT 1];
    }

    @AuraEnabled(cacheable=true)
    public static Contact getSingleContactViaSOQL() {
        return [SELECT Id FROM Contact WITH SECURITY_ENFORCED LIMIT 1];
    }
}
