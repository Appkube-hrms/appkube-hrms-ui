"use client";
import CompanyDetails from "@/components/onboard/CompanyDetails";
import Onboarding from "@/components/onboard/Onboarding";
import PreviewDetails from "@/components/onboard/PreviewDetails";
import getAccessTokenFromCookie from "@/utils/getAccessToken";

import { useState } from "react";
import {useRouter} from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import axios from '@/api/axios'

const Page = () => {
  const onBoarded = useSelector((state) => state.Onboardingpersdetails);
  // onBoarded.OnboardingData && onBoarded.companyData
  
  const router = useRouter();
  const [step, setStep] = useState(1);

  const accessToken = getAccessTokenFromCookie();


  const fetchData = async () => {
    try {
      const values = await axios.get("/employee?page=1", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("response", values.data.employees);
      return values.data.employees;
      // console.log("data",employees)
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  if(accessToken && fetchData()){
      return (
    <div>
      {step == 1 && <Onboarding step={step} setStep={setStep} />}
      {step == 2 && <CompanyDetails step={step} setStep={setStep} />}
      {step == 3 && <PreviewDetails step={step} setStep={setStep}/>}
      {console.log(onBoarded)}
      {(step == 4 && onBoarded.OnboardingData ) && router.push("/hrms") }
    </div>
      )
    }
    else{
    router.push('/')
    return null
  }
  ;
};

export default Page;
