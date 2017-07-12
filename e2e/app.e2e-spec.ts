import { PersonalbudgetAppPage } from './app.po';

describe('personalbudget-app App', function() {
  let page: PersonalbudgetAppPage;

  beforeEach(() => {
    page = new PersonalbudgetAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
