import { passwordPattern, phonePattern } from "@/constants/strings";
import { z } from "zod";

export const AuthSchema = z.object({
     email : z.string().email('Please enter a valid email id'),
     password : z.string().regex(passwordPattern, 'Invalid Password !!!' ),
})

export type AuthType = z.infer<typeof AuthSchema>;


export const RegisterSchema = AuthSchema.extend({
     firstName:z.string().min(3 , "Enter atleast 3 charecters"),
     lastName:z.string().min(3 , "Enter atleast 3 charecters"),
     mobileNo:z.string().regex(phonePattern , "please enter 10 digit mobile number"),
});

export type RegisterType = z.infer<typeof RegisterSchema>;


export const AccountSchema = RegisterSchema.extend({
     image : z.string().url(),
     id:z.string().min(5)
})

export type AccountType = z.infer<typeof AccountSchema>;


export const BusinessDetailSchema = z.object({
     image : z.string(),
     name : z.string(),
     description : z.string(),
     email : z.string().email('Please enter a valid email id'),
     phoneNo : z.string(),
})

export type BusinessDetailsType = z.infer<typeof BusinessDetailSchema>;

export const StoreAddressSchema = z.object({
     address1 : z.string(),
     address2 : z.string(),
     zipcode : z.string(),
     city : z.string(),
     state : z.string(),
     country : z.string(),
})

export type StoreAddressType = z.infer<typeof StoreAddressSchema>;


export const StoreMapSchema = z.object({
     id : z.string(),
     color : z.string(),
     title : z.string(),
     logo : z.string().optional(),
     category : z.string(),
     cordinates : z.array(z.number()).length(2) // [ x, y ]
});

export type StoreMapType = z.infer<typeof StoreMapSchema>;

