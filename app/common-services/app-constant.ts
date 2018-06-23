export class Configuration {
   

    public Server: string = 'http://crystal.tekmindz.com/';
   // public Server: string = 'http://his.psc.com.kw/'; 

    public ApiUrl: string = '/mohips/api/'; 
    public HomePageUrl: string = 'mohips/api/';  
    
    public HomeNavPageUrl: string = 'login';

    public AppMode: string = 'DEV'; //For PROD set 'PROD' mode;
    public ServerWithApiUrl = this.Server + this.ApiUrl;
 
    public SUPERADMIN: string = 'SuperAdmin';
    public ADMIN: string = 'Admin';
  

    public MALE: string = 'Male';
    public FEMALE: string = 'Female';


    public MALE_ID: number = 1;
    public FEMALE_ID: number = 2;
    
    public SESSION_TOKEN_REFRESH_TIME: number = 20000; 

    public restrictedPageForAdmin: string[] = ['/dashboard/home'];
    public restrictedPageForMOI: string[] = ['/dashboard/home'];
    public restrictedPageForUser: string[] = ['/dashboard/'] ;
    public restrictedPageForSC: string[] = ['/dashboard/home'];
    public restrictedPageForCompany: string[] = ['/dashboard/home'];
     
    //*****************************Api URLs *****************************/
    public API_LOGIN_URL: string = 'login';
    public API_SearchUrl: string = 'search/Bycivilid';
    public API_Payment_CalculationUrl:string = 'payment/amount';
    public API_Company_Search:string ='company/search';
    public API_Company_Create:string  = 'company/create';
    public API_Register:string ='customer/update';
    public API_ValidateOTP:string ='customer/validateOTP'
    public API_Knet_Payment:string ='knet/knetPayment';
    public API_InsReceipt:string ='print/InsReceipt';
    public API_Company_ValidateOTP:string ='company/validateOTP';
    public API_Customer_Update: string = 'customer/update';
    public API_QR_CODE: string = 'print/QRcode';

      //*****************************Api URLs Ends *****************************/

    public ADMIN_ROLE_ID: string = '5';
    public MOI_ROLE_ID: string = '4';
    public Company_ROLE_ID: string = '3';
    public SC_ROLE_ID: string = '2';
    public USER_ROLE_ID: string = '1';

    // Regex patterns
    public NUMBER_REGEX: string = '^[0-9]*$'; // eg: 123456
    public DECIMAL_UPTO_TWO_REGEX: string = '^((([0-9]{1,50}))(\.[0-9]{1,2})?$)'; // eg: 123.45
    public DATE_REGEX: string = '(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}';//'^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/](19|20)?[0-9]{2})*$'; //eg: 01/01/2017
    public ALPHANUMERIC_REGEX: string = '^[ a-zA-Z0-9_-]*$'; //eg: a123_g-n
    public EMAIL_REGEX: string = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'; //eg: a@b.com
    public PHONE_REGEX: string = '^[0-9-+]*$';
    public ALPHABETS_REGEX: string = '^[ a-zA-Z]*$';

    public RolesList = [
        {
            key: 'ADMIN',
            value: 'Admin'
        }, {
            key: 'USER',
            value: 'User'
        }
    ];

}