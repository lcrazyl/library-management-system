import React, { useEffect, useRef, useState } from 'react';
import { getBookAnalysis } from'../../utils/api';
import './index.css'

import ReactEcharts from 'echarts-for-react'
import { Card } from 'antd';
const Index = () => {
    let CardRef = useRef(null);
    let [allType, setAllType] = useState([]);
    let [bookIntegrity, setBookIntegrity] = useState([]);
    useEffect(() => {
        getBookAnalysis().then(res => {
            setAllType(res.data.allType)
            setBookIntegrity(res.data.bookIntegrity);
        })
    }, [])
    const getTypeOption = () => {
        let option = {
            title: {
                text: '图书类型',
                x: 'center',
            },
            tooltip: {
                trigger: 'item',
                //提示框浮层内容格式器，支持字符串模板和回调函数形式。
                formatter: "{b}类:{c}本 <br/>占比({d}%)"
            },
            series: [
                {
                    type: 'pie',
                    data: allType
                }
            ]
        }
        return option;
    };
    const getIntegrityOption = () => {
        let option = {
            title: {
                text: '图书损坏程度',
                x: 'center',
            },
            tooltip: {
                trigger: 'item',
                //提示框浮层内容格式器，支持字符串模板和回调函数形式。
                formatter: "{b}:{c}本 <br/>占比({d}%)"
            },
            series: [
                {
                    type: 'pie',
                    data: bookIntegrity
                }
            ]
        }
        return option;
    }
    
    const getQuantityGrowthOption = () => {
        let option = {
            title: {  //标题
                text: '图书总量变化',
                x: 'center',
                textStyle: { //字体颜色
                    color: '#ccc'
                }
            },
            tooltip: { //提示框组件
                trigger: 'axis'
            },
            xAxis: { //X轴坐标值
                data: ['2021-1', '2021-5', '2021-10', '2022-1', '2022-5',]
            },
            yAxis: {
                type: 'value' //数值轴，适用于连续数据
            },
            series: [
                {
                    name: '图书总数', //坐标点名称
                    type: 'line', //线类型
                    data: [1000, 1500, 1800, 2500, 2300, 2100, 2800] //坐标点数据
                }
            ]
        }
        return option;
    }
    return <Card id='card' ref={CardRef} title="图书分析" style={{ height: 680, overflowY: 'scroll' }}>
        <ReactEcharts option={getTypeOption()} className='book-type' />
        <ReactEcharts option={getIntegrityOption()} className='book-integrity' />
        <ReactEcharts option={getQuantityGrowthOption()} className='book-quantityGrowthOption' />
    </Card>;
};
export default Index;