import { LightningElement, wire, track} from 'lwc';
import TEAM_OBJECT from '@salesforce/schema/Team__c';
import NAME_FIELD from '@salesforce/schema/Team__c.Name'
import { getListUi } from 'lightning/uiListApi';
import { refreshApex } from '@salesforce/apex';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import TeamMember from '@salesforce/messageChannel/TeamMember__c';
import getMembersList from '@salesforce/apex/MemberController.getMembersList';



export default class TeamList extends LightningElement {
    selectedTeam;
    teamList=[];
    memberList=[];
    @track wiredRefreshApexToken = [];
    
    @wire(getListUi,  { objectApiName: TEAM_OBJECT, listViewApiName: 'All', sortBy: NAME_FIELD })
    teamListCallback({ data, error }){
        console.log('data: ', data);
        if(data){
            if(data.records && data.records.records){
                this.teamList = data.records.records.map(record=>{
                    const name = record.fields.Name.value;
                    return  {label: name, value: name}});
            }
        }   
    };

    @wire(getMembersList, {
        selectedTeam: '$selectedTeam',
    })
    getObjectInfosCallback(wiredRefreshApexToken) {
        const { data, error } = wiredRefreshApexToken;
        this.wiredRefreshApexToken = wiredRefreshApexToken;
        if(data){
            this.memberList = data;            
        }        
    }

    handleChange(event){
        if(event){
            this.selectedTeam = event.detail.value;
        }        
    }

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribe();
    }

    disconnectedCallback() {
        this.unsubscribe();
    }

    subscribe() {
        if (this.subscription) {
            return;
        }


        this.subscription = subscribe(
            this.messageContext,
            TeamMember,
            message => {
                this.handleMessage(message);
            },
            { scope: APPLICATION_SCOPE }
        );
    }

    unsubscribe() {
        if (!this.subscription) {
            return;
        }

        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage({ name }) {
        refreshApex(this.wiredRefreshApexToken);
    }

}