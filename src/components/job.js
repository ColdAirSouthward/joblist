import React, {Component} from 'react';

class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            checked: this.props.job.check,
            inputJob:this.props.job.name,
            inputCount:this.props.job.count
        };
    }

    renderJob() {
        if (this.state.editing) {
            return (
                <span className="btn-job-pop cf">
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" value={this.state.inputJob} className="input-job-name" onChange={this.updateInputDep.bind(this)} required/>
                        <input type="number" value={this.state.inputCount} className="input-job-count" onChange={this.updateInputCount.bind(this)} required/>
                    </form>
                    <button onClick={this.onSaveClick.bind(this)} className="btn-job job-save">确定</button>
                    <button onClick={this.onCancelClick.bind(this)} className="btn-job job-cancel">取消</button>
                </span>
            );
        }

        return (
            <div className="btn-job-default">
                <input type="checkbox" checked={this.props.job.check} onChange={this.onCheck.bind(this)}/>
                <h3 className="title-job">{this.props.job.name}</h3>
                <span className="count-job">{this.props.job.count}位</span>
                <button onClick={this.handleDeleteJob.bind(this)} className="btn-job job-delete" style={{border: "1px solid #e17776",color:"#e17776"}}>删除</button>
                <button onClick={this.onEditClick.bind(this)} className="btn-job job-edit">修改</button>
            </div>
        );
    }
    onCheck(e){
        const job = this.state.inputJob;
        const dep = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.title-department').innerText;
        this.props.updateJobCheck(dep,job);
    }

    render() {
        return this.renderJob();
    }
    handleDeleteJob(e) {
        const job = this.state.inputJob;
        const dep = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.title-department').innerText;
        console.log(dep);
        this.props.deleteJob(dep, job);
    }
    onEditClick(e) {
        this.setState({editing: true});
    }

    onCancelClick() {
        this.setState({editing: false});
    }
    onSaveClick(e) {
        e.preventDefault();
        const dep = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.title-department').innerText;
        const value = this.state.inputJob;
        const job = this.props.job.name;
        const count = +this.state.inputCount;
        console.log(count);
        if (value) {
            this.props.submitJob(dep,job, value.trim(),count);
            this.setState({editing: false});
        }
    }
    updateInputDep(e){
        this.setState({inputJob:e.target.value})
    }
    updateInputCount(e){

        this.setState({inputCount:e.target.value})
    }

}

export default Job;
