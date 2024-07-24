import GlobalLayout from "../../shared/layout/GlobalLayout";
import OrganizationProfileSetup from "./OrganizationProfileSetup";
import ProfileSetupStepper from "./ProfileSetupStepper";

export default function ProfileSetupPage(){
    return(
        <GlobalLayout>
            {/* <ProfileSetupStepper></ProfileSetupStepper> */}
            <OrganizationProfileSetup></OrganizationProfileSetup>
        </GlobalLayout>
    );
}