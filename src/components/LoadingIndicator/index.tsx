import { Col, Icon, Row } from 'antd';
import React from 'react';

export const LoadingIndicator = () => (
    <div className='page'>
        <Row>
            <Col
                span={24}
                className='gds-logo'
            >

                <img
                    src='https://www.globaldrugsurvey.com/wp-content/themes/globaldrugsurvey/assets/img/header-logo-mobile@2x.png'
                    alt='Global Drugs Survey'
                    width='100%'
                    height='auto'
                />
            </Col>
        </Row>
        <Row>
            <Col
                span={24}
            >

                <Icon type="loading" />
            </Col>
        </Row>
    </div>
);
