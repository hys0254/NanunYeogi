import React, {Component} from 'react';
import '../App.css';
import './HeroSection.css';
import axios from 'axios';
import moment from "moment";

export default class SelfCheckSection extends Component {

    state = {
        startDate: new Date(),
        recordList: [],
    };

    loadMyrecords = async () => {

        const date = this.state.startDate;
        const dateTime = moment(date).format("YYYY-MM-DD HH:mm:ss");
        axios.get('http://nanserver.paas-ta.org/locations/' + window.localStorage.getItem("id"),{params: {date: dateTime}}).then((response) => {
            console.log(response.data)
            this.setState(
                {recordList: response.data}
            )
            console.log(this.state.recordList);
        }).catch((error) => {
            console.log(error);
        });
    };

    componentDidMount() {
        this.loadMyrecords();
    }

    render() {
        const record = this.state.recordList;
        console.log("record",record)
        
        return (
            <div>
                {record.map(myrecord=>(
                    <div className='self-container' key={myrecord.id}>
                        <h1 className='title'>Self-Check</h1>
                        <p>현재 코로나 거리두기 상태 : 2.5단계</p>
                        <p>2주간 사용자 외출 횟수 : {myrecord.total}</p>
                        <p>금일 최대 시설 방문 횟수 : {myrecord.today}</p>
                        <p className="self-alert">외출이 잦습니다. 코로나 감염예방을 위해 집콕을 추천드려요!</p>
                    </div>
                ))}
        </div>
        );
    }
}
