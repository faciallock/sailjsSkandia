import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import { Steps, Icon, LocaleProvider } from 'antd';

const Step = Steps.Step;

import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import styles from './css/Orders.css';


export default class DiscountSalesMargin extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
        };
    }
    render() {

        let salesMarginData;
        /* const steps = [{
            key:0,
            title: 'Internal',
            description:'Briefing',
            content: 'Briefing',
        }, {
            key:1,
            title: 'First ',
            content: 'Customer Meeting',
            description: 'Customer Meeting'
        }, {
            key:2,
            title: 'Evaluation of',
            content: 'First Customer Meeting',
            description: 'First Customer Meeting'
        }, {
            key:3,
            title: 'Customer',
            content: 'Details Meeting',
            description: 'Details Meeting',
        }, {
            key:4,
            title: 'Proposal',
            content: 'Preparation Meeting',
            description: 'Preparation Meeting'
        }]; */

        let steps=[];
        if (this.props.data.LS_SALES_MARGIN === undefined) {
            return <div>No Data ...</div>
        }
        else{
            salesMarginData =this.props.data.LS_SALES_MARGIN;
            console.log({salesMarginData});
            for (let index = 1; index <=  Object.keys(salesMarginData).length; index++) {

                steps.push({
                    key:index-1,
                    title: salesMarginData[`SMARGIN${index}`].MONTH_NAME,
                    description:salesMarginData[`SMARGIN${index}`].SMARGIN
                })
                
                //const element = array[index];
                //console.log(salesMarginData[`SMARGIN${index}`].MONTH_NAME);
                
            }
            console.log(steps);
        }

        
       
        return (
            <div>
                <LocaleProvider locale={en_US}>
                    <div className={styles.discountSalesMarginContainer} >
                        <Steps className={styles.discountSteps}   size="small">
                            {
                                steps.map(item => 
                                    <Step 
                                        key={item.key} 
                                        onClick={(record) => { 
                                            console.log(record) }}
                                        description={item.description} 
                                        title={item.title} 
                                        status="finish"
                                        icon={<Icon type="calendar" /> }
                                        />
                                )
                            }
                                {
                            /* <Step title="JUL/18" status="finish" icon={<Icon type="calendar" />} description="0/0" />
                            <Step title="JUN/18" status="finish" icon={<Icon type="calendar" />} description="0/0" />
                            <Step title="MAY/18" status="finish"  icon={<Icon type="calendar" />} description="0/0" />
                            <Step title="APR/18" status="finish"  icon={<Icon type="calendar" />} description="0/0" />
                            <Step title="MAR/18" status="finish"  icon={<Icon type="calendar" />} description="0/0" />
                            <Step title="FEB/18" status="finish"  icon={<Icon type="calendar" />} description="0/0" />
                            <Step title="JAN/18" status="finish"  icon={<Icon type="calendar" />} description="0/0" />
                            <Step title="DEC/17" status="finish"  icon={<Icon type="calendar" />} description="0/0" />
                            <Step title="NOV/17" status="finish"  icon={<Icon type="calendar" />} description="0/0" />
                            <Step title="OCT/17" status="finish"  icon={<Icon type="calendar" />} description="0/0" />
                            <Step title="SEP/17" status="finish"  icon={<Icon type="calendar" />}  description="0/0" />
                            <Step title="AUG/17" status="finish"  icon={<Icon type="calendar" />} description="0/0" /> */}
                        </Steps>
                    </div>
                </LocaleProvider>
            </div>
        )


    }
}
