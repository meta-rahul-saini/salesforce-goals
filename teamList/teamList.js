import { LightningElement, wire} from 'lwc';
import TEAM_OBJECT from '@salesforce/schema/Team__c';
import NAME_FIELD from '@salesforce/schema/Team__c.Name'
import { getListUi } from 'lightning/uiListApi';

export default class TeamList extends LightningElement {
    selectedTeam;
    teamList;
    memberList;

    @wire(getListUi,  { objectApiName: TEAM_OBJECT, listViewApiName: 'All', sortBy: NAME_FIELD })
    teamListCallback({ data, error }){
        if(data){
            if(data.records && data.records.records){
                this.teamList = data.records.records.map(record=>{
                    const name = record.fields.Name.value;
                    return  {label: name, value: name}});
            }
        }   
    };

    @wire(getListUi, {
        selectedTeam: '$selectedTeam',
    })
    getObjectInfosCallback({ data, error }) {
        if(data){
            this.memberList = data;            
        }        
    }

    handleChange(event){
        if(event){
            this.selectedTeam = event.detail.value;
        }        
    }

}