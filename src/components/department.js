import React, {Component} from 'react';
import Job from './job';

class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            inputDep:this.props.department.name,
            checked:this.props.department.check,
            fold:this.props.department.fold,
            showAddJob:false,
            department:this.props.department
        };
    }

    renderJobs(){
        return this.props.department.jobs.map((item, i) => {
            return <li key={i} className="single-job">
                <Job job={item} submitJob={this.props.submitJob} key={i} deleteJob={this.props.deleteJob} updateJobCheck={this.props.updateJobCheck}/>
            </li>
        });
    }

    renderButtons() {
        if (this.state.editing) {
            return (
                <span className="btn-dep-pop">
                    <form onSubmit={this.onSaveClick.bind(this)} style={{width:"60%"}}>
                        <input type="text" ref="editInput" value={this.state.inputDep} className="input-dep" onChange={this.updateInputDep.bind(this)} required/>
                    </form>
                    <button onClick={this.onSaveClick.bind(this)} className="btn-dep dep-save" style={{background: "#40C9A2"}}>保存</button>
                    <button onClick={this.onCancelClick.bind(this)} className="btn-dep dep-cancel" style={{background: "#9098b8"}}>取消</button>
                </span>
            );
        }

        return (
            <span className="btn-dep-default">
                <input type="checkbox"  checked={this.props.department.check} onChange={this.onCheck.bind(this)}/>
                <h1 className="title-department">{this.props.department.name}</h1>
                <span className="dep-count">{this.props.addCount(this.props.department.jobs)}位</span>
                <button onClick={this.handleDeleteDep.bind(this)} className="btn-dep dep-delete" style={{background: "#F2545B"}}>删除</button>
                <button onClick={this.onEditClick.bind(this)} className="btn-dep dep-edit" style={{background: "#9098b8"}}>修改</button>
                <button onClick={this.onFoldClick.bind(this)} className="btn-dep dep-fold" style={{background: "#fff"}}>{this.props.department.fold?"▼":"▲"}</button>
            </span>
        );
    }

    render() {
        return (
            <li className="single-department">
                {this.renderButtons()}
                {this.props.department.fold && <div>
                    <ul className="jobs-area">{this.renderJobs()}</ul>
                    {this.state.showAddJob && <div className="add-job-area cf" style={{paddingTop:"10px"}}>
                        <input className="input-add-job-name" placeholder="名称(少于20个字符)"/>
                        <input type="text" className="input-add-job-nu" placeholder="数量(小于100)"/>
                        <button className="btn-comfirm-add-job" onClick={this.comfirmAddJob.bind(this)}>确定</button>
                        <button className="btn-cancel-add-job" onClick={this.hideAddJob.bind(this)}>取消</button>
                    </div>}
                    <button onClick={this.showAddJob.bind(this)} className="btn-add-job">添加职位</button>
                </div>}
            </li>
        );
    }
    onCheck(){
        console.log(this.state.department.name);
        this.props.updateDepCheck(this.state.department.name);
    }
    handleDeleteDep(e) {
        let dep = this.state.inputDep;
        console.log(dep);
        this.props.deleteDepartment(dep);
    }
    showAddJob() {
        this.setState({showAddJob: true})
    }
    hideAddJob() {
        this.setState({showAddJob: false})
    }
    comfirmAddJob(e) {
        const inputTitle = e.target.parentNode.querySelector(".input-add-job-name").value;
        const count = e.target.parentNode.querySelector(".input-add-job-nu").value || 1;
        const dep = e.target.parentNode.parentNode.parentNode.querySelector(".title-department").innerText;
        if (inputTitle) {
            this.props.addJob(dep, inputTitle.trim(), count);
        }else{
            alert("职位名不能为空")
        }
    }

    onEditClick(e) {
        this.setState({editing: true});
    }
    onFoldClick() {
        this.props.updateFold(this.props.department.name);
    }

    onCancelClick() {
        this.setState({editing: false});
    }

    onSaveClick(e) {
        e.preventDefault();
        const value = this.state.inputDep;
        if (value) {
            this.props.submitDep(this.props.department.name, value.trim());
            this.setState({editing: false});
        }
    }
    updateInputDep(e){
        this.setState({inputDep:e.target.value})
    }

}

export default Department;
