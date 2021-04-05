import { LightningElement } from 'lwc';
import TEAM_MEMBER from '@salesforce/schema/TeamMember__c';
import NAME_FIELD from '@salesforce/schema/TeamMember__c.Name';
import SKILLS_FIELD from '@salesforce/schema/TeamMember__c.Skills__c';
import TEAM_FIELD from '@salesforce/schema/TeamMember__c.Team__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MemberSkills extends LightningElement {
    memberObject = TEAM_MEMBER;
    memberFields = [NAME_FIELD, TEAM_FIELD, SKILLS_FIELD ];

    handleAddMember(){
        const evt = new ShowToastEvent({
            title: 'Team Membership',
            message: 'Member Added Successfully',
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
}