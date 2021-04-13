public with sharing class MemberController {

     @AuraEnabled(cacheable=true)
     public static List<TeamMember__c> getMembersList(String selectedTeam){
        List<TeamMember__c> memberList= [SELECT id, name, skills__c, team__c FROM TeamMember__c WHERE team__r.Name__c = :selectedTeam];

        return memberList;
     }
}
