import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../layout";
import {Demo1Landing} from "./Demo1Landing";
import {Demo2Landing} from "./Demo2Landing";
import {Demo3Landing} from "./Demo3Landing";
import {Demo4Landing} from "./Demo4Landing";
import {Demo5Landing} from "./Demo5Landing";
import {Demo6Landing} from "./Demo6Landing";
import {Demo7Landing} from "./Demo7Landing";

export function Landing() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            landing: objectPath.get(
                uiService.config,
                "landing"
            )};
    }, [uiService]);
    //layoutProps.demo = 'demo3'
    console.log(layoutProps)
    
    return <>
        {layoutProps.landing === 'landing1' && <Demo1Landing />}
        {layoutProps.landing === 'landing2' && <Demo2Landing />}
        {layoutProps.landing === 'landing3' && <Demo3Landing />}
        {layoutProps.landing === 'landing4' && <Demo4Landing />}
        {layoutProps.landing === 'landing5' && <Demo5Landing />}
        {layoutProps.landing === 'landing6' && <Demo6Landing />}
        {layoutProps.landing === 'landing7' && <Demo7Landing />}
    </>;
}
