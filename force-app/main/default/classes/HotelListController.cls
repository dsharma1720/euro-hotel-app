public with sharing class HotelListController {

    @AuraEnabled(cacheable=true)
    public static List<Hotel_Master__c> getHotels(String city, String type){

        System.debug('CITY = ' + city);
        System.debug('TYPE = ' + type);

        List<Hotel_Master__c> hotels = [
            SELECT Id,
                   Name,
                   Hotel_City__c,
                   Hotel_Type__c,
                   Per_Day_Cost__c,
                   WiFi_Availability__c,
                   Cash_Pay_Availability__c,
                   Cancellation_Availability__c
            FROM Hotel_Master__c
 WHERE Hotel_City__c = :city AND Hotel_Type__c = :type
        ];

        System.debug('HOTELS FOUND = ' + hotels.size());

        return hotels;
    }
}


