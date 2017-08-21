import React, {Component} from 'react';
import axios from 'axios';
import Department from './components/department';
import {updateLocalStorage, convertData, resetData} from './handleData';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobData:[],
            showAddDep:false
        };
        this.submitDep = this.submitDep.bind(this);
        this.submitJob = this.submitJob.bind(this);
        this.addJob = this.addJob.bind(this);
        this.deleteDepartment = this.deleteDepartment.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.addCount = this.addCount.bind(this);
        this.updateDepCheck = this.updateDepCheck.bind(this);
        this.updateJobCheck = this.updateJobCheck.bind(this);
        this.updateFold = this.updateFold.bind(this);
    }
    renderDepartments() {
        return this.state.jobData.map((item, i) => {
            return (<Department department={item} submitDep={this.submitDep}  submitJob={this.submitJob} key={i} addJob={this.addJob} deleteDepartment={this.deleteDepartment} deleteJob={this.deleteJob} addCount={this.addCount} updateDepCheck={this.updateDepCheck} updateJobCheck={this.updateJobCheck} updateFold={this.updateFold}/>)
        });
    }

    render() {
        return (
            <div className="app">
                <header style={{textAlign:'center',padding:"40px 0"}}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flipboard_logo.svg/128px-Flipboard_logo.svg.png" alt="logo" style={{width:'2.5em',verticalAlign:"middle",marginRight:"10px"}}/>
                    <span style={{fontSize:"1.5em",fontWeight:"bold"}}>招聘职位</span>
                </header>
                <div className="wrapper">
                    <ul className="department-area" style={{borderBottom:"1px solid #d5dae7",marginBottom:"20px"}}>{this.renderDepartments()}</ul>
                    <p style={{marginBottom:"30px"}}>总数：{this.sum()}</p>
                    {this.state.showAddDep && <div className="add-dep-area">
                        <input className="input-add-dep"/>
                        <button className="btn-comfirm-add-dep" onClick={this.comfirmAddDep.bind(this)}>确定</button>
                        <button className="btn-cancel-add-dep" onClick={this.hideAddDep.bind(this)}>取消</button>
                    </div>}
                    <button className="btn-add-dep" onClick={this.showAddDep.bind(this)} style={{background: "#76a7e1"}}>添加部门</button>
                    <button className="btn-app-save" onClick={this.saveChanges.bind(this)} style={{background: "#40c9a2",margin:"0 5%"}}>保存</button>
                    <button className="btn-reset" onClick={this.getApiData.bind(this)} style={{background: "#f2545b"}}>重置</button>
                </div>
            </div>
        )
    }
    updateFold(dep){
        const jobData = this.state.jobData;
        let depIndex = this.findDep(dep);
        let foldValue = jobData[depIndex].fold;
        jobData[depIndex].fold = !foldValue;
        if(!jobData[depIndex].fold){
            for (var i = 0; i < jobData[depIndex].jobs.length; i++) {
                jobData[depIndex].jobs[i].fold = false;
            }
        }
        this.setState({jobData})
    }
    updateDepCheck(dep){
        const jobData = this.state.jobData;
        let depIndex = this.findDep(dep);
        let checkValue = jobData[depIndex].check;
        jobData[depIndex].check = !checkValue;
        if(!jobData[depIndex].check){
            for (var i = 0; i < jobData[depIndex].jobs.length; i++) {
                jobData[depIndex].jobs[i].check = false;
            }
        }
        this.setState({jobData})
    }
    updateJobCheck(dep,job){
        const jobData = this.state.jobData;
        let depIndex = this.findDep(dep);
        let jobIndex = this.findJob(dep,job);
        let checkValue = jobData[depIndex].jobs[jobIndex].check;
        jobData[depIndex].jobs[jobIndex].check = !checkValue;
        this.setState({jobData})
    }
    deleteJob(dep, job) {
        const jobData = this.state.jobData;
        let depIndex = this.findDep(dep);
        let jobIndex = this.findJob(dep,job);
        jobData[depIndex].jobs.splice(jobIndex, 1);
        this.setState({jobData});
        // this.updateLocalStorage(jobData);
    }
    deleteDepartment(dep) {
        const jobData = this.state.jobData;
        let depIndex = this.findDep(dep);
        jobData.splice(depIndex, 1);
        this.setState({jobData});
    }
    addJob(dep, job, count) {
        console.log(dep+job+count);
        const jobData = this.state.jobData;
        const depIndex = this.findDep(dep);
        let arr = [];
        for (var i = 0; i < jobData[depIndex].jobs.length; i++) {
            arr.push(jobData[depIndex].jobs[i].name)
        }
        console.log(count);
        if (arr.indexOf(job) > -1) {
            alert("工作已经存在");
        } else {
            const obj = {
                name: job,
                count: count
            };
            jobData[depIndex].jobs.push(obj);
            this.setState({jobData});
            console.log(jobData);
            // this.updateLocalStorage(jobData);
        }
    }
    comfirmAddDep(e) {
        const value = e.target.parentNode.querySelector(".input-add-dep").value;
        this.addDepartment(value);
    }
    addDepartment(input) {
        const jobData = this.state.jobData;
        let arr = [];
        for (var i = 0; i < jobData.length; i++) {
            arr.push(jobData[i].name)
        }
        if (arr.indexOf(input) > -1) {
            alert("部门已经存在");
        } else {
            const obj = {
                name: input,
                jobs: [],
                fold:true,
                check:false
            };
            jobData.push(obj);
            this.setState({jobData});
            console.log(jobData);
        }
    }
    showAddDep() {
        this.setState({showAddDep: true})
    }
    hideAddDep() {
        this.setState({showAddDep: false})
    }

    submitDep(dep,value){
        const jobData = this.state.jobData;
        jobData[this.findDep(dep)].name = value;
        this.setState({jobData});
    }
    submitJob(dep,job,value,count){
        let jobIndex = this.findJob(dep,job);
        const jobData = this.state.jobData;
        console.log(dep);
        jobData[this.findDep(dep)].jobs[jobIndex].name = value;
        jobData[this.findDep(dep)].jobs[jobIndex].count = count;
        this.setState({jobData});
    }
    saveChanges(){
        updateLocalStorage(this.state.jobData);
        alert('保存完成')
    }
    getLocalData(){
        let localData = localStorage.getItem('storedItem');
        if (localData) {
            console.log('enter if local data');
            localData = JSON.parse(localData);
            const convertedData = convertData(localData);
            this.setState({jobData:convertedData})
        }else{
            console.log(this.state.jobData);
            this.getApiData()
        }
    }
    getApiData(){
        axios.get("https://s.flipchina.cn/api/exercise/job-list.json").then(
            (res)=>{
                const convertedData = convertData(res.data.teams);
                const resetedData = resetData(convertedData);
                updateLocalStorage(resetedData)
                this.setState({jobData:resetedData});
        }).catch((error)=>{
            console.log('get apiData error');
        })
    }

    componentWillMount(){
        this.getLocalData();
    }
    findDep(dep){
        const jobData = this.state.jobData;
        for (let i = 0; i < jobData.length; i++) {
            if (jobData[i].name === dep) {
                return i
            }
        }
    }
    findJob(dep,job){
        const jobData = this.state.jobData;
        const jobsArr = jobData[this.findDep(dep)].jobs;
        for (let i = 0; i < jobsArr.length; i++) {
            if (jobsArr[i].name === job) {
                return i
            }
        }
    }
    sum(){
        let total = 0;
        const jobData = this.state.jobData;
        for (let j = 0; j < jobData.length; j++) {
            total += this.addCount(jobData[j].jobs)
        }
        return total;
    }
    addCount(jobs){
        let counts = 0;
        for (let i = 0; i < jobs.length; i++) {
            if (jobs[i].check === true) {
                counts = counts + jobs[i].count
            }
        }
        return counts
    }
}

export default App;
