import { createElement } from 'lwc';
import TeamList from 'c/teamList';
import { getListUi } from 'lightning/uiListApi';
import { registerTestWireAdapter, registerLdsTestWireAdapter, registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getMembersList from '@salesforce/apex/MemberController.getMembersList';
import {
    MessageContext
} from 'lightning/messageService';

const flushPromises = () =>
    new Promise((resolve) => setImmediate(resolve));

// Mock realistic data
const mockGetTeamList = require('./data/getTeamList.json');
const mockGetMemberList = require('./data/getMemberList.json');
  
// Register a standard test wire adapter.
const getTeamListUiAdapter = registerLdsTestWireAdapter(getListUi);
const getMemberListApexAdapter = registerApexTestWireAdapter(getMembersList);

registerTestWireAdapter(MessageContext);

const getElement =  (props={})=>{
    const element = createElement('c-team-list', {
    is: TeamList,
    });
    Object.assign(element, props)
    document.body.appendChild(element);
    return element;
}

describe('c-team-list', async () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should render', async () => {
        const element = getElement();        
        expect(element).toMatchSnapshot();
    });

    it('should render all the teams in options in combobox', async () => {
        const element = getElement();
        getTeamListUiAdapter.emit(mockGetTeamList);
        getMemberListApexAdapter.emit(mockGetMemberList);
        await flushPromises();        
        const lightningEL =  element.shadowRoot.querySelector('lightning-combobox');
        console.log('lightningEL: ', lightningEL.options.length == 2);
        expect(lightningEL.length === mockGetTeamList.records.records.length);
        expect(element).toMatchSnapshot();
    });

    it('on select an options the component should render all the available members in that team', async () => {
        const element = getElement();
        getTeamListUiAdapter.emit(mockGetTeamList);
        getMemberListApexAdapter.emit(mockGetMemberList);
        await flushPromises();
        const lightningEL =  element.shadowRoot.querySelector('lightning-combobox');
        lightningEL.value = mockGetTeamList.records.records[0].fields.Name.value;
        await flushPromises();
        expect(element).toMatchSnapshot();
    });
});