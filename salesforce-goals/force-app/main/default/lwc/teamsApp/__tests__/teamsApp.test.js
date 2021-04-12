jest.mock('c/memberSkills');
jest.mock('c/teamList');
import { createElement } from 'lwc';
import TeamsApp from 'c/teamsApp';

const flushPromises = ()=>{
    new Promise((resolve) => setImmediate(resolve));
}

const getElement =  (props={})=>{
    const element = createElement('c-teams-app', {
    is: TeamsApp,
    });
    Object.assign(element, props);
    document.body.appendChild(element);
    return element;
}

describe('c-teams-app', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should render', () => {
        const element = getElement();
        expect(element).toBeDefined();
        expect(element).toMatchSnapshot();   
     });
     
     it('should render team-list child component', async () => {
        const element = getElement();
        await flushPromises();
        const teamListEl = element.shadowRoot.querySelectorAll('c-team-list'); 
        expect(teamListEl).toBeDefined();
        expect(teamListEl.length).toEqual(1);        
     });

     it('should render member-skills child component', async () => {
        const element = getElement();
        await flushPromises();
        const memberSkillsEl = element.shadowRoot.querySelectorAll('c-member-skills'); 
        expect(memberSkillsEl).toBeDefined();
        expect(memberSkillsEl.length).toEqual(1);        
     });

     it('should render team-list and member-skills inside the card component', async () => {
        const element = getElement();
        await flushPromises();
        const teamListEl = element.shadowRoot.querySelectorAll('.slds-card > c-team-list'); 
        const memberSkillsEl = element.shadowRoot.querySelectorAll('.slds-card > c-member-skills'); 
        expect(teamListEl).toBeDefined();
        expect(teamListEl.length).toEqual(1);        
        expect(memberSkillsEl).toBeDefined();
        expect(memberSkillsEl.length).toEqual(1);        
     });
});