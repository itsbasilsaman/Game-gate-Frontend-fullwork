
export interface ILoginUser {
    phoneNumber?:string,
    countryCode?:string,
    email?:string
    type?:string 

}

export interface IVerifyOtp {

    contact:string |null
    otp:string
        "fcmToken" : string

}