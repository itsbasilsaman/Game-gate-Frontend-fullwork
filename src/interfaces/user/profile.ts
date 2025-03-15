/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Country {
  name: string;
  flag: string;
  dialCode: string;
}

export interface ApiCountry {
  name: { common: string };
  flags: { svg: string };
  idd: { root?: string; suffixes?: string[] };
}


export interface UserProfileData {
    email: string;
    firstName: string;
    lastName: string;
    languages: string[];
    avatar: File | null;
    coverPic: File | null;
    memberSince: string;  
    userName: string;
    dob : string | null;  
    gender: "MALE" | "FEMALE" | "OTHER";  
    followersCount: number;
    country: string;
    countryCode: string;
    folowingCount: number;
    description: string | null 
    blockedUsersCount: number;
    succesfullDeliveries: number;
    nextLevel: string | null;
    sellerProfile: any|null
    level: {
      id: string;
      level: number;
      requiredTransactionsUSD: number;
      requiredTransactionsSR: number;
    };
  };
