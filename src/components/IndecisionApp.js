import React from 'react'
import AddOption from './AddOption'
import Options from './Options'
import Header from './Header'
import Action from './Action'
import OptionModal from './OptionModel'

export default class IndecisionApp extends React.Component{
    state={
        options: [],
        selectedOption: undefined
    }
    handleDeleteOptions=()=>{ 
        this.setState(()=>({options:[]}));      
    }
    handleClearSelectedOption=()=>{
        this.setState(()=>({selectedOption: undefined }))
    }
    handleAddOption=(option)=>{
        if(!option){
            //runs if there is empty string
            return 'Enter valid value to add option'
        }else if(this.state.options.indexOf(option)>-1){
            //if the option already exist(-1 is returned is option is not in array)
            return 'This option already exists!'
        }
        this.setState((prevState)=>({ options: prevState.options.concat([option])}))
    }
    handleDeleteOption=(optionToRemove)=>{
        this.setState((prevState)=>({options: prevState.options.filter((option)=>{
                return option!==optionToRemove;
            })
        }))
    }
    handlePick=()=>{
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(()=> (
            {
                selectedOption: option
            }))
    }
    componentDidMount(){
        try{
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
            if(options){
                this.setState(()=>({options}))
            }
        }catch(e){
            //Do nothing!
        }
        
        
        //console.log('fetching data')
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length!==this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options',json)
            //console.log('Saving data')
        }
        
    }
    componentWillUnmount(){
        console.log('Component will unmount!')
    }
    render(){
        const subTitle = "Put your life at the hands of a computer";
        return (
            <div>
                <Header subTitle={subTitle}/>
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length>0?true:false}
                        handlePick = {this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                        options = {this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                    
                    <OptionModal 
                        selectedOption = {this.state.selectedOption}
                        handleClearSelectedOption = {this.handleClearSelectedOption}
                    />
                </div>
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []

}