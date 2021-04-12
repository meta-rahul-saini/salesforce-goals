import { createElement } from 'lwc';
import MemberSkills from 'c/memberSkills';
import { registerTestWireAdapter, registerLdsTestWireAdapter, registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import {
    MessageContext
} from 'lightning/messageService';


registerTestWireAdapter(MessageContext);

const flushPromises = ()=>{
    new Promise((resolve) => setImmediate(resolve));
}


const getElement =  (props={})=>{
    const element = createElement('c-member-skills', {
    is: MemberSkills,
    });
    Object.assign(element, props)
    document.body.appendChild(element);
    return element;
}


describe('c-member-skills', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should render', async() => {
        const element = getElement();
        await flushPromises();
        expect(element).toBeDefined();
        expect(element).toMatchSnapshot();
        
    });
    
    it('should render correct heading title', async() => {
        const element = getElement();
        await flushPromises();
        expect(element).toBeDefined();
        const h3El = element.shadowRoot.querySelector('h3');        
        expect(h3El.textContent).toEqual('Add Member');
        expect(element).toMatchSnapshot();
    });

    describe('lightning-record-form',()=>{
        it('should have the correct properties',async()=>{
            const element = getElement();
            const lightningRecordForm = element.shadowRoot.querySelector('lightning-record-form');
            await flushPromises();            
            expect(lightningRecordForm.objectApiName.objectApiName).toEqual('TeamMember__c');
            const fields = ['Name', 'Team__c', 'Skills__c'];
            const formFields = lightningRecordForm.fields;

            formFields.forEach((field, index)=>{
                expect(field.fieldApiName).toEqual(fields[index]);
            })
        })
    })
    
});