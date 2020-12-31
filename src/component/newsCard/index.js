import React from 'react';
import { Card, Empty, Row, Col } from 'antd';
import styles from './index.module.scss';

const NewsCard = (props) => {
    const {title, url, description ,publishedAt, urlToImage} = props.news;
    return (
        <Card>
            <Row>
                <Col span={4}>
                {
                    urlToImage ? <img src={urlToImage} className={styles.imgSize} shape={'square'} alt="No Data"></img> : <Empty/>
                }
                </Col>
                <Col span={12}>
                    <a target="_blank" rel="noopener noreferrer" href={url}>{title}</a>
                    <p>{publishedAt}</p>
                    <p>{description}</p>
                </Col>
            </Row>
        </Card>
    );
};

export default NewsCard;