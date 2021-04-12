import { LightningElement, wire } from 'lwc';
import TEAM_MEMBER from '@salesforce/schema/TeamMember__c';
import NAME_FIELD from '@salesforce/schema/TeamMember__c.Name';
import SKILLS_FIELD from '@salesforce/schema/TeamMember__c.Skills__c';
import TEAM_FIELD from '@salesforce/schema/TeamMember__c.Team__c';
import { publish, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import TeamMember from '@salesforce/messageChannel/TeamMember__c';


export default class MemberSkills extends LightningElement {
    memberObject = TEAM_MEMBER;
    memberFields = [NAME_FIELD, TEAM_FIELD, SKILLS_FIELD ];

    @wire(MessageContext)
    messageContext;
    
    handleAddMember(event){
    const evt = new ShowToastEvent({
            title: 'Team Membership',
            message: 'Member Added Successfully',
            variant: 'success',
    });

    
    this.dispatchEvent(evt);
        publish(this.messageContext, TeamMember, {
            name:'name'
        });
    }
}