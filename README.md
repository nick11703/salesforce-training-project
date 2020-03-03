# Team Project

### Requirements
A client wants to build a website for adult users only. The website has certain section of landing pages available to only those who are 18 years and above. Develop a site in which a particular landing page is visible to certain segment of customer only.

* Add Date of Birth field on Registration form.
* Add validation for user to be above 18 years to register. A user less than 18 years should not be able to register.
* Save the Date of Birth in Profile custom attribute.
* Display as non-editable field on My Account.
* Show an error or redirect the user to another page if unregistered customer or a customer less than 18 year is trying to visit Women->Sample Page.

### Tasks
* Registration Form F/E template
* Registration Form B/E controller
* Registration Form Validation BE & FE
* Custom object for DOB / Name / email
* FE template for my-account for non-editable DOM field
* Error for invalid DOB on FE for regristation
* Controller for Women -> Sample Page
* Redirect or error for invalid page view of Women -> Sample Page
* One DOB validation method
 
### Setup
1. Clone the repo outside of the base SFRA cartridge
2. Run `npm install`
3. Resolve any issues. Possibly run `npm install node-sass`
4. Run `npm run build`
5. Import content and objects
  * Import content from `imports/content` into `Merchant Tools >  Content >  Import & Export`
  * Import objects from `imports/objects` into `Administration >  Site Development >  Import & Export`
6. Upload the cartridge with `npm run uploadCartridge`
