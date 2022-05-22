import React, { useEffect, useRef, useState } from 'react';
import { getBookAnalysis } from'../../utils/api';
import { Card } from 'antd';
import './index.css'
import ReactEcharts from 'echarts-for-react'

const Index = () => {
    let CardRef = useRef(null);
    let [allType, setAllType] = useState([]);
    useEffect(() => {
        getBookAnalysis().then(res => {
            setAllType(res.data.allType)
        })
    }, [])
    const getAgeOption = () => {
        let option = {
            title: {
                text: '用户年龄与每月借阅数量分析'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['18岁以下', '18-25岁', '26-35岁', '35-50岁', '60岁以上']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'bar',
                    barWidth: '40%',
                    data: [5, 1, 3, 1, 4]
                }
            ]
        }
        return option;
    }
    const getTypeLoveOption = () => {
        let option = {
            title: {
                text: '图书类型喜好',
                x: 'center',
            },
            tooltip: {
                trigger: 'item',
                //提示框浮层内容格式器，支持字符串模板和回调函数形式。
                formatter: "{b}类:{c}人 <br/>占比({d}%)"
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

    const  getUserGrowthOption = ()=>{
        let option = {
            title: {  //标题
                text: '用户总量变化',
                x: 'center',
                textStyle: { //字体颜色
                    color: '#ccc'
                }
            },
            tooltip:{ //提示框组件
                trigger: 'axis'
            },
            xAxis: { //X轴坐标值
                data: ['2021-1','2021-5','2021-10','2022-1','2022-5',]
            },
            yAxis: {
                type: 'value' //数值轴，适用于连续数据
            },
            series : [
                {
                    name:'用户总数', //坐标点名称
                    type:'line', //线类型
                    data:[1000, 1500, 1800, 2500, 2300, 2100, 2800] //坐标点数据
                }
            ]
        }
        return option;
    }
    return <Card id='card' ref={CardRef} title="用户分析" style={{ height: 680, overflowY: 'scroll' }}>
                <ReactEcharts option={getTypeLoveOption()} />
        <ReactEcharts option={getAgeOption()} />

        <ReactEcharts option={getUserGrowthOption()} />
        
    </Card>;
};
export default Index;