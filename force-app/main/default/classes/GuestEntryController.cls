public with sharing class GuestEntryController {

@AuraEnabled
public static Id saveGuest(
    String firstName,
    String lastName,
    String phone,
    String email
){
    Guest_Master__c g = new Guest_Master__c();

    g.Guest_First_Name__c = firstName;
    g.Guest_Last_Name__c  = lastName;
    g.Guest_Phone__c      = phone;
    g.Guest_Email__c      = email;

    insert g;

    return g.Id;   
}

}


