public with sharing class CreateRecordPrepopulatedController {
    public CreateRecordPrepopulatedController(
        ApexPages.StandardController stdController
    ) {
        Account acct = (Account) stdController.getRecord();
        acct.Type = 'Prospect';
    }
}
